import type { User } from '../types';

// In-memory storage for demo purposes
// In a real app, this would be a database
const users: Map<string, User> = new Map();

export const AuthService = {
  register: (username: string, name: string, password: string, email: string): User | null => {
    if (users.has(username)) {
      return null;
    }

    const user: User = {
      id: crypto.randomUUID(),
      username,
      name,
      email,
      password,
      isAdmin: username.includes('admin'),
      votedOptions: new Set(),
      registeredAt: new Date().toISOString(),
    };

    users.set(username, user);
    return null; // Return null to force login after registration
  },

  login: (username: string, password: string): User | null => {
    const user = users.get(username);
    if (!user || user.password !== password) {
      return null;
    }
    return {
      ...user,
      votedOptions: user.votedOptions || new Set()
    };
  },

  resetPassword: async (username: string, email: string): Promise<boolean> => {
    const user = Array.from(users.values()).find(u => u.username === username && u.email === email);
    if (!user) {
      return false;
    }
    // In a real app, send password reset email
    // For demo, just return true
    return true;
  },

  updateUser: (user: User): void => {
    users.set(user.username, user);
  },

  resetAllVotes: (): void => {
    // Reset votedOptions for all users
    users.forEach(user => {
      user.votedOptions = new Set();
      users.set(user.username, user);
    });
  },
};