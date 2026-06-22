"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Package, ChevronDown, Download, Image as ImageIcon, ScanBarcode } from "lucide-react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuth } from "@/lib/firebase/auth-context";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
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
      // Client side sort since we might not have a composite index for businessType + name
      data.sort((a: any, b: any) => (a.name || "").localeCompare(b.name || ""));
      setProducts(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching products from Firestore:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [appUser]);

  const filteredProducts = products.filter(p =>
    (p.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
    (p.barcode || "").includes(search) ||
    (p.category?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
            <Package className="w-8 h-8 text-blue-400" />
            Product Explorer
          </h1>
          <p className="text-slate-400">Search and browse the centralized DaaS product catalog.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm font-medium text-slate-200 hover:bg-slate-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20">
            <ScanBarcode className="w-4 h-4" />
            Scan Barcode
          </button>
        </div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        {/* Filters Bar */}
        <div className="p-4 border-b border-slate-800/60 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, category, or Barcode..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-slate-600"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">
              <Filter className="w-4 h-4 text-slate-400" />
              Category
              <ChevronDown className="w-3 h-3 text-slate-500 ml-1" />
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800/60">
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Product</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Barcode</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Price (₱)</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Stock</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
                    <p className="text-sm font-medium">Loading products from Firestore...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    <Package className="w-8 h-8 mx-auto mb-3 opacity-50" />
                    <p className="text-sm font-medium">No products found</p>
                    <p className="text-xs mt-1">Your catalog is currently empty.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-slate-500" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200">{product.name || product.product_name}</p>
                          <p className="text-xs text-slate-500 truncate max-w-xs">{product.businessType || "Unknown Segment"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-mono text-slate-300 bg-slate-900 px-2 py-1 rounded border border-slate-800">{product.barcode || "-"}</span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {product.category || "General"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-sm font-medium text-emerald-400">₱{product.price?.toFixed(2) || "0.00"}</div>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm font-medium px-2 py-1 rounded border ${product.stock > 10 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                        {product.stock || 0}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="text-xs font-medium text-blue-400 hover:text-blue-300 hover:underline">Edit</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-800/60 flex items-center justify-between">
          <p className="text-xs text-slate-500">Showing <span className="font-medium text-slate-300">{filteredProducts.length > 0 ? 1 : 0}</span> to <span className="font-medium text-slate-300">{filteredProducts.length}</span> of <span className="font-medium text-slate-300">{products.length}</span> results</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border border-slate-700 bg-slate-800 text-slate-400 text-xs font-medium disabled:opacity-50">Previous</button>
            <button className="px-3 py-1 rounded border border-slate-700 bg-slate-800 text-slate-200 text-xs font-medium hover:bg-slate-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
