import * as React from 'react';

import { useAuthState } from '@/contexts/AuthContext';

export default function useLogged() {
  const auth = useAuthState();
  const [logged, setLogged] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (auth) {
      setLogged(true);
    }
  }, [auth]);

  return logged;
}
