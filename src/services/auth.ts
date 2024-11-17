import { auth, db } from '../firebaseConfig';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, updateDoc } from 'firebase/firestore';
import { VotingService } from './votingService';
import type { User } from '../types';

const USERS_COLLECTION = 'users';

export const AuthService = {
  async login(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    if (!userCredential.user.email) {
      throw new Error('User email is required');
    }

    const userDocRef = doc(db, USERS_COLLECTION, userCredential.user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      throw new Error('User data not found');
    }
    
    const userData = userDoc.data();
    
    // Update last login timestamp
    await updateDoc(userDocRef, {
      lastLoginAt: new Date().toISOString()
    });

    // Convert votedOptions array to Set
    const votedOptionsArray = userData.votedOptions || [];
    const votedOptionsSet = new Set<string>(votedOptionsArray);

    return {
      id: userCredential.user.uid,
      email: userCredential.user.email,
      name: userData.displayName,
      isAdmin: userData.isAdmin || false,
      votedOptions: votedOptionsSet,
      lastLoginAt: userData.lastLoginAt
    };
  },

  async register(email: string, displayName: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    if (!userCredential.user.email) {
      throw new Error('User email is required');
    }

    // Update display name in Firebase Auth
    await updateProfile(userCredential.user, {
      displayName
    });

    const userData = {
      email,
      displayName,
      isAdmin: false,
      votedOptions: [], // Initialize empty votedOptions array
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      status: 'active'
    };
    
    await setDoc(doc(db, USERS_COLLECTION, userCredential.user.uid), userData);

    return {
      id: userCredential.user.uid,
      email,
      name: displayName,
      isAdmin: false,
      votedOptions: new Set<string>(),
      lastLoginAt: userData.lastLoginAt
    };
  },

  async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email, {
      url: window.location.origin + '/login',
      handleCodeInApp: true
    });
  },

  async logout(): Promise<void> {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, USERS_COLLECTION, user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Save votedOptions back to array format before logout
        await updateDoc(userDocRef, {
          lastLogoutAt: new Date().toISOString(),
          votedOptions: Array.from(userData.votedOptions || [])
        });
      }
    }
    await signOut(auth);
  },

  async updateUserProfile(userId: string, data: Partial<User>): Promise<void> {
    const userDocRef = doc(db, USERS_COLLECTION, userId);
    
    // Convert Set to Array for storage
    const updateData = {
      ...data,
      votedOptions: data.votedOptions ? Array.from(data.votedOptions) : undefined,
      updatedAt: new Date().toISOString()
    };
    
    await updateDoc(userDocRef, updateData);
  },

  async checkAdminStatus(userId: string): Promise<boolean> {
    const userDoc = await getDoc(doc(db, USERS_COLLECTION, userId));
    return userDoc.exists() ? userDoc.data().isAdmin : false;
  },

  async deactivateUser(userId: string): Promise<void> {
    const userDocRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userDocRef, {
      status: 'inactive',
      deactivatedAt: new Date().toISOString()
    });
  }
};