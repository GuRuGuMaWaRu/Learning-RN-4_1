import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from '../storage';

type TokenType = {
  access: string;
};

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (token: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      status: 'idle',
      signIn: (token: TokenType) => set({ token, status: 'signIn' }),
      signOut: () => set({ token: null, status: 'signOut' }),
      hydrate: () => {
        const token = get().token;
        if (token) {
          set({ token, status: 'signIn' });
        } else {
          set({ status: 'signOut' });
        }
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useAuth;

export const getToken = () => useAuth.getState().token;
export const signOut = () => useAuth.getState().signOut;
