"use client";

import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, PackageSearch, AlertTriangle } from "lucide-react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/auth-context";

export default function AnalyticsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { appUser } = useAuth();

  useEffect(() => {
    if (!appUser) return;
    
    setLoading(true);
    let q;
    if (appUser.role === "Admin") {
      q = query(collection(db, "products"));
    } else {
      q = query(collection(db, "products"), where("businessType", "==", appUser.businessSegment));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching analytics data:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [appUser]);

  const totalProducts = products.length;
  const totalValue = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0);
  const outOfStock = products.filter(p => (p.stock || 0) <= 0).length;
  const lowStock = products.filter(p => (p.stock || 0) > 0 && (p.stock || 0) <= 10).length;

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-blue-400" />
          Analytics
        </h1>
        <p className="text-slate-400">Deep dive into your inventory insights and product statistics.</p>
      </div>

      {loading ? (
        <div className="glass-card rounded-xl p-12 flex justify-center border-slate-700/60">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-xl border border-slate-700/60">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-400">Total Products</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{totalProducts}</h3>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <PackageSearch className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500">Active SKUs in catalog</p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-slate-700/60">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-400">Inventory Value</p>
                  <h3 className="text-2xl font-bold text-emerald-400 mt-1">₱{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                </div>
                <div className="p-3 bg-emerald-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500">Total estimated value</p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-slate-700/60">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-400">Low Stock</p>
                  <h3 className="text-2xl font-bold text-amber-400 mt-1">{lowStock}</h3>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500">Items with 10 or fewer in stock</p>
            </div>

            <div className="glass-card p-6 rounded-xl border border-slate-700/60">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-slate-400">Out of Stock</p>
                  <h3 className="text-2xl font-bold text-red-400 mt-1">{outOfStock}</h3>
                </div>
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
              </div>
              <p className="text-xs text-slate-500">Items requiring immediate restock</p>
            </div>
          </div>

          <div className="glass-card rounded-xl p-8 border-dashed border-slate-700/60 flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-slate-600 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-slate-300">More charts coming soon</h3>
              <p className="text-sm text-slate-500 mt-2">Sales trends and DaaS API usage graphs will appear here.</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
