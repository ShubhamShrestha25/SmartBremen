import { create } from "zustand";

const useAuthStore = create((set) => ({
  role: "USER", // USER | ADMIN
  setRole: (role) => set({ role }),
}));

export default useAuthStore;
