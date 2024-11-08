import React, { useState } from 'react';
import { UserCircle2, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  onToggleForm: () => void;
  onForgotPassword: () => void;
}

export default function LoginForm({ onLogin, onToggleForm, onForgotPassword }: LoginFormProps) {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="max-w-md w-full space-y-8">
      <div className="text-center">
        <UserCircle2 className="mx-auto h-12 w-12 text-indigo-600" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to vote</h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="username" className="sr-only">{t('common.Username')}</label>
            <input
              id="username"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">{t('common.Password')}</label>
            <input
              id="password"
              type="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <button
              type="button"
              onClick={onForgotPassword}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {t('common.ForgotPw')}
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
            </span>
            {t('common.Signin')}
          </button>
        </div>
      </form>
      <div className="text-center">
        <button
          onClick={onToggleForm}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          {t('common.NeedRegister')}
        </button>
      </div>
    </div>
  );
}