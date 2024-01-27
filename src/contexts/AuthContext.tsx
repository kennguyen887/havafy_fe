import { plainToInstance } from 'class-transformer';
import Router from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import React from 'react';

import { getItem, removeItem } from '@/lib/localStorage';
import { getApi } from '@/lib/request';

class UserContextTypeDto {
  id!: string;

  email!: string;

  avatar!: string;

  firstName!: string;

  lastName!: string;
}

class AuthContextTypeDto {
  user!: UserContextTypeDto | null;

  isAuthenticated!: boolean | null;

  resetAuth?: () => void;

  loadAuth?: () => void;
}

const defaultAuthState: AuthContextTypeDto = {
  user: null,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextTypeDto>(defaultAuthState);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextTypeDto | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const resetAuth = () => {
    removeItem('auth');
    setUser(null);
    setIsAuthenticated(false);
    Router.push('/');
  };

  const loadAuth = React.useCallback(async () => {
    const token = getItem('auth');
    if (!token) {
      setIsAuthenticated(false);
    }

    token &&
      getApi('user/me')
        .then(({ data }) => {
          if (!data.id) {
            return;
          }
          setUser(data ? plainToInstance(UserContextTypeDto, data) : null);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          if (error.response) {
            const { status } = error.response;
            if (status === 401) {
              resetAuth();
            }
          }
        });
  }, []);

  useEffect(() => {
    loadAuth();
  }, [loadAuth]);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, resetAuth, loadAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthState = () => useContext(AuthContext);
