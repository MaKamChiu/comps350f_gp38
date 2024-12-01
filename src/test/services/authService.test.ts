import { describe, it, expect, vi } from 'vitest';
import { AuthService } from '../../services/auth';
import { auth, db } from '../../firebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  getAuth,
} from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

// Mock Firebase Auth
vi.mock('firebase/auth', () => {
  const actual = vi.importActual('firebase/auth'); // Partially import the real module
  return {
    ...actual,
    getAuth: vi.fn(() => ({
      currentUser: null, // Mock currentUser if needed
    })),
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
    updateProfile: vi.fn(),
  };
});

// Mock Firestore
vi.mock('firebase/firestore', () => {
  const actual = vi.importActual('firebase/firestore');
  return {
    ...actual,
    doc: vi.fn(),
    setDoc: vi.fn(),
    updateDoc: vi.fn(),
  };
});

// Mock firebaseConfig to ensure `auth` and `db` are mocked
vi.mock('../../firebaseConfig', () => ({
  auth: {
    currentUser: null,
    // Mock additional properties or methods as needed
  },
  db: {}, // Mock Firestore instance
}));

describe('AuthService', () => {
  const mockUser = {
    id: 'user-1',
    email: 'test@example.com',
    name: 'Test User',
    isAdmin: false,
    votedOptions: new Set<string>(),
  };

  it('logs in user successfully', async () => {
    const mockCredential = {
      user: {
        uid: 'user-1',
        email: 'test@example.com',
      },
    };

    (signInWithEmailAndPassword as any).mockResolvedValueOnce(mockCredential);
    vi.spyOn(AuthService, 'getUserData').mockResolvedValueOnce({
      displayName: 'Test User',
      isAdmin: false,
      votedOptions: [],
    });

    const result = await AuthService.login('test@example.com', 'password');
    expect(result.email).toBe(mockUser.email);
    expect(result.name).toBe(mockUser.name);
  });

  it('registers new user successfully', async () => {
    const mockCredential = {
      user: {
        uid: 'user-1',
        email: 'test@example.com',
      },
    };

    (createUserWithEmailAndPassword as any).mockResolvedValueOnce(mockCredential);
    (setDoc as any).mockResolvedValueOnce(undefined); // Mock Firestore setDoc

    const result = await AuthService.register('test@example.com', 'Test User', 'password');
    expect(result.email).toBe(mockUser.email);
    expect(result.name).toBe(mockUser.name);
  });

  it('logs out user successfully', async () => {
    (signOut as any).mockResolvedValueOnce(undefined);

    await expect(AuthService.logout()).resolves.not.toThrow();
    expect(signOut).toHaveBeenCalledWith(auth);
  });

  it('updates user profile successfully', async () => {
    const updates = {
      name: 'Updated Name',
      votedOptions: new Set(['1']),
    };

    (updateDoc as any).mockResolvedValueOnce(undefined); // Mock Firestore updateDoc

    await expect(AuthService.updateUserProfile('user-1', updates as any)).resolves.not.toThrow();
  });
});
