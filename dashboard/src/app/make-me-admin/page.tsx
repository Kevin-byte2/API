"use client";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/auth-context";
import { useRouter } from "next/navigation";

export default function MakeMeAdminPage() {
  const { user, appUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const makeAdmin = async () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }
    setLoading(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        role: "Admin"
      });
      alert("Success! You are now an Admin.");
      router.push("/dashboard");
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-white">
      <div className="glass-card p-8 rounded-xl text-center max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold">Admin Promotion</h1>
        <p className="text-slate-400">
          Click the button below to promote your current account ({appUser?.email}) to Admin.
        </p>
        <button 
          onClick={makeAdmin}
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-medium transition-all"
        >
          {loading ? "Promoting..." : "Make Me Admin"}
        </button>
      </div>
    </div>
  );
}
