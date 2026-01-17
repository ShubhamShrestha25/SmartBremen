import { create } from "zustand";

const useAuthStore = create((set) => ({
  role: null, // USER | ADMIN | null
  setRole: (role) => set({ role }),
}));

export default useAuthStore;
