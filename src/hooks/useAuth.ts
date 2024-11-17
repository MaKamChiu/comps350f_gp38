import { useState, useCallback } from 'react';
import { AuthService } from '../services/auth';
import type { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      const userData = await AuthService.login(email, password);
      setUser(userData);
    } catch (err) {
      setError('Invalid email or password');
      console.error('Login error:', err);
    }
  }, []);

  const register = useCallback(async (email: string, displayName: string, password: string) => {
    try {
      setError(null);
      const userData = await AuthService.register(email, displayName, password);
      setUser(userData);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration error:', err);
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setError(null);
      await AuthService.resetPassword(email);
    } catch (err) {
      setError('Password reset failed. Please try again.');
      console.error('Password reset error:', err);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (user) {
        // Ensure votedOptions is saved before logout
        await AuthService.updateUserProfile(user.id, { votedOptions: user.votedOptions });
      }
      await AuthService.logout();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  }, [user]);

  const updateUser = useCallback(async (userData: User) => {
    try {
      await AuthService.updateUserProfile(userData.id, userData);
      setUser(userData);
    } catch (err) {
      console.error('Update user error:', err);
    }
  }, []);

  return {
    user,
    error,
    login,
    register,
    resetPassword,
    logout,
    updateUser
  };
}