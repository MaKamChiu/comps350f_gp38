import { describe, it, expect, vi } from 'vitest';
import { AuthService } from '../../services/auth';
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

// Mock Firebase Auth
vi.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
  updateProfile: vi.fn(),
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

    await expect(AuthService.updateUserProfile('user-1', updates as any)).resolves.not.toThrow();
  });
});