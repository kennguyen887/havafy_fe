import { plainToInstance } from 'class-transformer';
import * as jwt from 'jsonwebtoken';
import Router from 'next/router';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getItem } from '@/lib/localStorage';
import { removeItem } from '@/lib/localStorage';
class UserContextTypeDto {
  id!: string;

  email!: string;
}

class AuthContextTypeDto {
  user!: UserContextTypeDto | null;

  isAuthenticated!: boolean;

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

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const resetAuth = () => {
    removeItem('auth');
    setUser(null);
    setIsAuthenticated(false);
    Router.push('/');
  };

  const loadAuth = () => {
    const token = getItem('auth');
    const decodedPayload = jwt.decode(token as string);
    setIsAuthenticated(decodedPayload ? true : false);
    setUser(
      decodedPayload
        ? plainToInstance(UserContextTypeDto, decodedPayload)
        : null
    );
  };

  useEffect(() => {
    loadAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, resetAuth, loadAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthState = () => useContext(AuthContext);
