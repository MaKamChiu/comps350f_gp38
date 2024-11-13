import { auth, db } from '../firebaseConfig';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';

// Define the collection name as a constant
const USERS_COLLECTION = 'users';

interface UserData {
  email: string;
  displayName: string;
  isAdmin: boolean;
  votedOptions: string[];
  createdAt: string;
}

interface AuthUser {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  votedOptions: Set<string>;
}

export const AuthService = {
  async login(email: string, password: string): Promise<AuthUser> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    if (!userCredential.user.email) {
      throw new Error('User email is required');
    }

    // Get user document from Firestore
    const userDocRef = doc(db, USERS_COLLECTION, userCredential.user.uid);
    const userDoc = await getDoc(userDocRef);
    
    // If user document doesn't exist, create it
    if (!userDoc.exists()) {
      const userData: UserData = {
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || 'User',
        isAdmin: false,
        votedOptions: [],
        createdAt: new Date().toISOString()
      };
      await setDoc(userDocRef, userData);
      
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        name: userData.displayName,
        isAdmin: false,
        votedOptions: new Set<string>()
      };
    }
    
    const userData = userDoc.data() as UserData;
    return {
      id: userCredential.user.uid,
      email: userCredential.user.email,
      name: userData.displayName,
      isAdmin: userData.isAdmin,
      votedOptions: new Set<string>(userData.votedOptions)
    };
  },

  async register(email: string, displayName: string, password: string): Promise<AuthUser> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (!userCredential.user.email) {
      throw new Error('User email is required');
    }

    // Create user document in Firestore
    const userData: UserData = {
      email,
      displayName,
      isAdmin: false,
      votedOptions: [],
      createdAt: new Date().toISOString()
    };
    
    await setDoc(doc(db, USERS_COLLECTION, userCredential.user.uid), userData);

    return {
      id: userCredential.user.uid,
      email,
      name: displayName,
      isAdmin: false,
      votedOptions: new Set<string>()
    };
  },

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: window.location.origin + '/login', // Redirect URL after password reset
        handleCodeInApp: true
      });
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    await signOut(auth);
  },

  async resetAllVotes(): Promise<void> {
    // Implementation for resetting all votes
    // This should only be callable by admin users
  },

  async checkAdminStatus(userId: string): Promise<boolean> {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, userId));
    return userDoc.exists() ? (userDoc.data() as UserData).isAdmin : false;
  }
};