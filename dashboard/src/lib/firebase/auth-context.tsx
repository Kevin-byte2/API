"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";
import { useRouter, usePathname } from "next/navigation";

interface AppUser {
  uid: string;
  email: string;
  fullName: string;
  businessName: string;
  role: string;
  plan: string;
}

interface AuthContextType {
  user: User | null;
  appUser: AppUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  appUser: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      let currentAppUser: AppUser | null = null;
      
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            currentAppUser = userDoc.data() as AppUser;
            setAppUser(currentAppUser);
          } else {
            console.warn("User document not found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setAppUser(null);
      }
      
      setLoading(false);
      
      // Protected routes logic
      const isDashboardRoute = pathname.startsWith("/dashboard");
      const isAdminRoute = pathname.startsWith("/admin");
      const isAuthRoute = pathname === "/login" || pathname === "/signup";
      
      if (!currentUser) {
        if (isDashboardRoute || isAdminRoute) {
          router.push("/login");
        }
      } else {
        if (isAuthRoute) {
          router.push("/dashboard");
        } else if (isAdminRoute && currentAppUser?.role !== "Admin") {
          // Block non-admins from admin panel
          console.warn("Access Denied: Admin role required.");
          router.push("/dashboard");
        }
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const logout = async () => {
    try {
      setLoading(true);
      await firebaseSignOut(auth);
      setUser(null);
      setAppUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, appUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
