"use client";

import { useState } from "react";
import { Settings, Save, CheckCircle } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/auth-context";

export default function SegmentsPage() {
  const { user, appUser } = useAuth();
  const [segment, setSegment] = useState(appUser?.businessSegment || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    if (!user || !appUser) return;
    setLoading(true);
    setSuccess(false);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        businessSegment: segment,
      });
      // Force reload to update context if necessary, or let onAuthStateChanged handle it
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      alert("Error updating segment: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!appUser) return null;

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <Settings className="w-8 h-8 text-slate-400" />
          Business Segments
        </h1>
        <p className="text-slate-400">Manage your business category and industry classification.</p>
      </div>

      <div className="glass-card rounded-xl p-8 max-w-2xl border border-slate-700/60">
        <h3 className="text-lg font-medium text-slate-200 mb-6">Current Configuration</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Selected Business Segment</label>
            <select
              value={segment || appUser.businessSegment}
              onChange={(e) => setSegment(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            >
              <option value="Hardware Store">Hardware Store</option>
              <option value="Pharmacy / Drugstore">Pharmacy / Drugstore</option>
              <option value="Grocery / SME Retail">Grocery / SME Retail</option>
            </select>
            <p className="text-xs text-slate-500 mt-2">
              Changing this will immediately filter your dashboard to only show products relevant to this segment.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={loading || segment === appUser.businessSegment}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium transition-colors"
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving..." : "Save Changes"}
            </button>
            {success && (
              <span className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle className="w-4 h-4" /> Segment updated successfully!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
