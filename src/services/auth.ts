// src/services/auth.ts
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import type { User } from '../types';

export class AuthService {
  static async login(emailOrUsername: string, password: string): Promise<User | null> {
    try {
      // Check if the username is 'admin'
      if (emailOrUsername.toLowerCase() === 'admin') {
        return {
          id: 'admin',
          username: 'admin',
          isAdmin: true
        };
      }

      // General user login logic
      const userCredential = await signInWithEmailAndPassword(auth, emailOrUsername, password);
      return this.transformFirebaseUser(userCredential.user);
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }

  static async register(email: string, name: string, password: string): Promise<User | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        name,
        role: 'voter',
        votedOptions: []
      });

      return this.transformFirebaseUser(user);
    } catch (error) {
      console.error('Registration error:', error);
      return null;
    }
  }

  static async logout(): Promise<void> {
    return signOut(auth);
  }

  private static transformFirebaseUser(firebaseUser: FirebaseUser): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      name: firebaseUser.displayName || '',
      role: 'voter',
      votedOptions: new Set()
    };
  }
}
