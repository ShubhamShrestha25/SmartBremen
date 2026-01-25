"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getUserProfile } from "@/lib/firestore";
import useAuthStore from "@/store/useAuthStore";

export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const { setRole, setUserId } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setUserId(user.uid);
          setRole(profile.role === "admin" ? "ADMIN" : "USER");
        }
      } else {
        // User is signed out
        setUserId(null);
        setRole(null);
      }
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [setRole, setUserId]);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return children;
}
