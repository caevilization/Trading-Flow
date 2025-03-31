import React, { useState, useEffect, createContext, useContext } from 'react';
import { api } from '../utils/api';

interface User {
  id: string;
  username: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    // console.log('Fetch user parameters:', { token, userId });

    if (!token || !userId) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await api.get('/auth/me');
      const userData = response.data.data.user;

      // console.log('User data:', userData);

      if (!userData || !userData._id) {
        throw new Error('Invalid user data');
      }

      setUser({
        id: userData._id,
        username: userData.username,
        avatar: userData.avatar,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userId = params.get('userId');
    const username = params.get('username');
    const avatar = params.get('avatar');

    // 检查参数是否完整
    // console.log('Login parameters:', { token, userId, username, avatar });

    if (token && userId && username) {
      // 存储认证信息
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      // 设置用户信息
      setUser({
        id: userId,
        username,
        avatar: avatar || undefined,
      });

      // 只清除 URL 参数，不需要重定向
      window.history.replaceState({}, '', window.location.pathname);
      setLoading(false);
      return;
    }

    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
    window.location.href = '/';
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
