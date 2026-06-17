"use client";

import { useState, useEffect } from "react";
import { Key, Copy, RefreshCw, Trash2, Eye, EyeOff, AlertCircle } from "lucide-react";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/auth-context";

export default function ApiKeysPage() {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiKeys, setApiKeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchApiKeys();
    }
  }, [user]);

  const fetchApiKeys = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "api_keys"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      // For MVP, we fetch all keys (or in a real app, query by user id)
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApiKeys(data);
    } catch (error) {
      console.error("Error fetching API keys:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateNewKey = async () => {
    try {
      const newKeyString = `INV-API-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      
      const keyData = {
        key: newKeyString,
        userId: user?.uid || "anonymous",
        userEmail: user?.email || "anonymous",
        plan: "Starter",
        requestsUsed: 0,
        createdAt: serverTimestamp(),
        lastUsed: null,
      };

      await addDoc(collection(db, "api_keys"), keyData);
      fetchApiKeys();
    } catch (error) {
      console.error("Error generating new API key:", error);
    }
  };

  const revokeKey = async (id: string) => {
    if (confirm("Are you sure you want to revoke this API key? This action cannot be undone and any applications using it will stop working immediately.")) {
      try {
        await deleteDoc(doc(db, "api_keys", id));
        fetchApiKeys();
      } catch (error) {
        console.error("Error revoking API key:", error);
      }
    }
  };

  const handleCopy = (keyString: string) => {
    navigator.clipboard.writeText(keyString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <Key className="w-8 h-8 text-indigo-400" />
          API Keys
        </h1>
        <p className="text-slate-400">Manage your secret API keys to authenticate requests to the InventaAPI platform.</p>
      </div>

      <div className="glass-card rounded-xl p-6 lg:p-8 border-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Key className="w-32 h-32 text-indigo-400" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-xl font-bold text-white mb-4">Your Active Keys</h2>
          
          <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-1 mb-6 inline-flex">
            <button className="px-4 py-2 rounded-md bg-indigo-500/20 text-indigo-400 text-sm font-medium">Secret Keys</button>
            <button className="px-4 py-2 rounded-md text-slate-400 hover:text-slate-200 text-sm font-medium transition-colors">Webhooks</button>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
              </div>
            ) : apiKeys.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-slate-700 rounded-xl bg-slate-900/50">
                <p className="text-slate-400 mb-4">You don't have any active API keys yet.</p>
                <button 
                  onClick={generateNewKey}
                  className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-sm font-medium text-white transition-colors flex items-center gap-2 mx-auto shadow-lg shadow-indigo-500/20"
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate New Key
                </button>
              </div>
            ) : (
              apiKeys.map((apiKey) => (
                <div key={apiKey.id} className="bg-[#0f172a] border border-slate-700 rounded-xl p-5 shadow-inner">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-white font-medium flex items-center gap-2">
                        Production Key
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">Created: {apiKey.createdAt?.toDate ? apiKey.createdAt.toDate().toLocaleDateString() : "Just now"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleCopy(apiKey.key)}
                        className="px-3 py-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors flex items-center gap-1.5"
                      >
                        {copied ? <span className="text-emerald-400">Copied!</span> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                      </button>
                      <button 
                        onClick={() => revokeKey(apiKey.id)}
                        className="px-3 py-1.5 rounded-md bg-red-500/10 hover:bg-red-500/20 text-xs font-medium text-red-400 transition-colors flex items-center gap-1.5 border border-red-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Revoke
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 font-mono text-sm tracking-widest text-indigo-300 flex items-center justify-between">
                      {showKey ? apiKey.key : apiKey.key.replace(/./g, '•').substring(0, 24)}
                      <button onClick={() => setShowKey(!showKey)} className="text-slate-500 hover:text-slate-300 transition-colors ml-4">
                        {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 border-t border-slate-800 pt-4">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Requests</p>
                      <p className="text-sm text-slate-300 font-medium">{apiKey.requestsUsed || 0} / 50</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Last Used</p>
                      <p className="text-sm text-slate-300 font-medium">{apiKey.lastUsed ? new Date(apiKey.lastUsed).toLocaleDateString() : "Never"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Plan</p>
                      <p className="text-sm text-indigo-400 font-medium">{apiKey.plan || "Starter"}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            
            {apiKeys.length > 0 && (
              <div className="flex justify-end mt-4">
                <button 
                  onClick={generateNewKey}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-200 transition-colors flex items-center gap-2 border border-slate-700"
                >
                  <RefreshCw className="w-4 h-4" />
                  Generate Another Key
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-4">
            <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-amber-400 mb-1">Keep your keys secret</h4>
              <p className="text-xs text-amber-400/80 leading-relaxed">
                Your API keys carry many privileges. Do not share these secret keys in publicly accessible areas such as GitHub, client-side code, or public forums. 
                Consider rotating your keys periodically to enhance security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
