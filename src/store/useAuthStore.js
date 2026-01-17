import { create } from "zustand";

const useAuthStore = create((set) => ({
  role: "ADMIN", // USER | ADMIN
  setRole: (role) => set({ role }),
}));

export default useAuthStore;
