import * as React from 'react';

import { getItem } from '@/lib/localStorage';

interface AuthContextType {
  token: string;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = React.useState<AuthContextType | undefined>(
    undefined
  );

  React.useEffect(() => {
    const token = getItem('auth');
    setAuth(token ? { token } : undefined);
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuthState = () => React.useContext(AuthContext);
