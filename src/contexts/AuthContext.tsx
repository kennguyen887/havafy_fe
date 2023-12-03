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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserContextType | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getItem('auth');
    const decodedPayload = jwt.decode(token);
    setIsAuthenticated(decodedPayload ? true : false);

    setUser(decodedPayload ? { ...decodedPayload } : null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthState = () => useContext(AuthContext);
