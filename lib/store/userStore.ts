import { create } from 'zustand';

interface UserState {
  username: string;
  isLoggedIn: boolean;
  setUser: (user: { username: string; isLoggedIn: boolean }) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  username: 'Гість',
  isLoggedIn: false,
  setUser: (user) => set(user),
}));
