import React, { createContext, useContext, useState, useEffect } from 'react';
import { TokenResponse } from '@react-oauth/google';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  googleId?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (tokenResponse: TokenResponse) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 从localStorage获取保存的用户信息
const getSavedUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getSavedUser);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulating API response
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email,
        avatarUrl: 'https://i.pravatar.cc/150?u=demo'
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (tokenResponse: TokenResponse) => {
    setIsLoading(true);
    try {
      // 在实际应用中，您需要:
      // 1. 发送此令牌到后端API验证
      // 2. 从后端获取用户信息或创建用户
      
      // 这里我们模拟后端验证过程
      // 理想情况下，您应该调用自己的API验证tokenResponse.access_token
      const googleToken = tokenResponse.access_token;
      
      if (!googleToken) {
        throw new Error('No valid Google token provided');
      }
      
      // 模拟从Google API获取用户信息
      // 在真实应用中，您的后端应处理此逻辑
      const mockGoogleUser: User = {
        id: `google-${Math.random().toString(36).substr(2, 9)}`,
        name: 'Google User',
        email: 'googleuser@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?u=google',
        googleId: `google-${Math.random().toString(36).substr(2, 9)}`
      };
      
      setUser(mockGoogleUser);
      localStorage.setItem('user', JSON.stringify(mockGoogleUser));
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        loginWithGoogle,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};