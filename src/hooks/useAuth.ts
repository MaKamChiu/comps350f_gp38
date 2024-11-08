import { useState, useCallback } from 'react';
import { AuthService } from '../services/auth';
import type { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const user = await AuthService.login(username, password); // 加入 await
      if (!user) {
        setError('Invalid username or password');
        return false;
      }
      setUser(user);
      setError(null);
      return true;
    } catch (err) {
      setError('An error occurred during login');
      return false;
    }
  }, []);
  
  const register = useCallback(async (username: string, name: string, password: string) => {
    try {
      const user = AuthService.register(username, name, password);
      if (!user) {
        setError('Username already exists');
        return false;
      }
      setUser(user);
      setError(null);
      return true;
    } catch (err) {
      setError('An error occurred during registration');
      return false;
    }
  }, []);

  const resetPassword = useCallback(async (username: string, email: string) => {
    try {
      const success = await AuthService.resetPassword(username, email);
      if (!success) {
        setError('User not found');
        return false;
      }
      setError(null);
      return true;
    } catch (err) {
      setError('An error occurred while resetting password');
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  const updateUser = useCallback((updatedUser: User) => {
    AuthService.updateUser(updatedUser);
    setUser(updatedUser);
  }, []);

  return {
    user,
    error,
    login,
    register,
    resetPassword,
    logout,
    updateUser,
  };
}