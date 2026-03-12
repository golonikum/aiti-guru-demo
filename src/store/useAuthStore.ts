import { create } from "zustand";

interface AuthState {
  user: unknown | null;
  token: string | null;
  login: (user: unknown, token: string, remember: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token") || sessionStorage.getItem("token"),
  login: (user, token, remember) => {
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
