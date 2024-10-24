import React from 'react';
import { Vote, LogOut } from 'lucide-react';

interface NavbarProps {
  user: { name: string; isAdmin: boolean } | null;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2">
            <Vote className="w-8 h-8" />
            <span className="font-bold text-xl">SecureVote</span>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                Welcome, {user.name} {user.isAdmin && '(Admin)'}
              </span>
              <button
                onClick={onLogout}
                className="flex items-center space-x-1 bg-indigo-700 hover:bg-indigo-800 px-3 py-2 rounded-md text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}