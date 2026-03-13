// frontend/src/stores/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        localStorage.setItem('accessToken', token);
        set({ user, isAuthenticated: true });
      },
      clearAuth: () => {
        localStorage.removeItem('accessToken');
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: 'auth', partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }) }
  )
);