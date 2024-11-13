import { useState, useCallback } from 'react';
import { AuthService } from '../services/auth';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  votedOptions: Set<string>;
}

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
      await AuthService.logout();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  }, []);

  const updateUser = useCallback((userData: User) => {
    setUser(userData);
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