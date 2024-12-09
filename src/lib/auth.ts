import { create } from 'zustand';
import { User } from '@/types';
import * as jose from 'jose';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  refreshToken: () => Promise<void>;
}

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  signIn: async (email: string, password: string) => {
    try {
      const response = await fetch('https://api.farmandbreed.com/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const { token, refreshToken, user } = await response.json();

      // Verify JWT token
      const { payload } = await jose.jwtVerify(
        token,
        new TextEncoder().encode(process.env.VITE_JWT_SECRET)
      );

      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

      set({ user, token, isAuthenticated: true });
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  signOut: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    set({ user: null, token: null, isAuthenticated: false });
  },

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch('https://api.farmandbreed.com/v1/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const { token, user } = await response.json();
      localStorage.setItem(TOKEN_KEY, token);

      set({ user, token, isAuthenticated: true });
    } catch (error) {
      console.error('Token refresh error:', error);
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
}));