import { createContext, useContext, useEffect, useState } from 'react';
import { getMeApi } from '../admin/features/auth/services/apiAuth';
import Loading from '../components/Loading';
import { BACKEND } from '../config';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const me = await getMeApi();
      setUser(me || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  async function logout() {
    await fetch(`${BACKEND}/api/auth/logout`, {
      credentials: 'include',
    });
    setUser(null);
    window.location.href = '/admin/login';
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        isAdmin,
        loading,
        logout,
        refreshUser: fetchUser,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
