import { create } from "zustand";

const useAuthStore = create((set) => ({
  role: null, // USER | ADMIN | null
  setRole: (role) => set({ role }),
  userId: null,
  setUserId: (userId) => set({ userId }),
}));

export default useAuthStore;
