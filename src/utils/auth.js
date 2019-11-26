import { useState, useEffect, createContext, useContext } from 'react';

export const authCtx = createContext();

export function useSession() {
  return useContext(authCtx);
}

export function useAuth(firebaseAuth) {
  const [auth, setAuth] = useState(() => {
    const u = firebaseAuth.currentUser;
    return { initializing: true, user: u };
  });

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(user => {
      setAuth({
        initializing: false,
        user,
      });
    });

    return unsubscribe;
  }, [firebaseAuth]);

  return auth;
}
