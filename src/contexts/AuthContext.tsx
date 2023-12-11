import * as jwt from 'jsonwebtoken';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getItem } from '@/lib/localStorage';

interface UserContextType {
  id: string;
  email: string;
}

interface AuthContextType {
  user: UserContextType | null;
  isAuthenticated: boolean;
  resetAuth?: () => void;
  loadAuth?: () => void;
}

const defaultAuthState = {
  user: null,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType>(defaultAuthState);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextType | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const resetAuth = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const loadAuth = () => {
    const token = getItem('auth');
    const decodedPayload = jwt.decode(token);

    setIsAuthenticated(decodedPayload ? true : false);
    setUser(decodedPayload ? { ...decodedPayload } : null);
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
