"use client";

import { useState, useEffect } from "react";
import { Package, Plus, Edit2, Trash2, ShieldAlert, CheckCircle2, Search } from "lucide-react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    product_name: "",
    barcode: "",
    category: "Hardware",
    variation: "",
    size: "",
    supplier: "",
    description: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "products"), orderBy("product_name"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setShowAddModal(false);
      setFormData({
        product_name: "", barcode: "", category: "Hardware", variation: "", size: "", supplier: "", description: ""
      });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const filteredProducts = products.filter(p => 
    p.product_name?.toLowerCase().includes(search.toLowerCase()) || 
    p.barcode?.includes(search)
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
            <ShieldAlert className="w-8 h-8 text-purple-400" />
            Admin Panel
          </h1>
          <p className="text-slate-400">Manage the centralized DaaS product catalog.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-sm font-medium text-white transition-colors flex items-center gap-2 shadow-lg shadow-purple-500/20"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-6 relative overflow-hidden group border-purple-500/30">
          <p className="text-sm font-medium text-slate-400 mb-1">Total Products</p>
          <h3 className="text-2xl font-bold text-white mb-1">{products.length}</h3>
        </div>
        <div className="glass-card rounded-xl p-6 relative overflow-hidden group border-emerald-500/30">
          <p className="text-sm font-medium text-slate-400 mb-1">Pending Approval</p>
          <h3 className="text-2xl font-bold text-white mb-1">0</h3>
        </div>
        <div className="glass-card rounded-xl p-6 relative overflow-hidden group border-blue-500/30">
          <p className="text-sm font-medium text-slate-400 mb-1">Active Suppliers</p>
          <h3 className="text-2xl font-bold text-white mb-1">12</h3>
        </div>
      </div>

      <div className="glass-card rounded-xl overflow-hidden mt-8">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h3 className="text-lg font-bold text-white">Product Management</h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500/50"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/30 border-b border-slate-800/60">
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name & Barcode</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Supplier</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-center">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mx-auto mb-2"></div>
                    <p className="text-xs">Loading products...</p>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500">
                    <p className="text-sm">No products found.</p>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <p className="text-sm font-medium text-slate-200">{product.product_name}</p>
                      <p className="text-xs text-slate-500 font-mono">{product.barcode}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">{product.category}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs text-slate-300">{product.supplier || "Unknown"}</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Approved
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-1.5 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors border border-red-500/20">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-card w-full max-w-lg rounded-2xl p-6 relative border-purple-500/30 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-xs font-medium text-slate-300">Product Name</label>
                  <input type="text" required value={formData.product_name} onChange={e => setFormData({...formData, product_name: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Barcode</label>
                  <input type="text" required value={formData.barcode} onChange={e => setFormData({...formData, barcode: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500">
                    <option>Hardware</option>
                    <option>Grocery</option>
                    <option>Pharmacy</option>
                    <option>General Merchandise</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Variation</label>
                  <input type="text" value={formData.variation} onChange={e => setFormData({...formData, variation: e.target.value})} placeholder="e.g. Red, XL" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Size/Capacity</label>
                  <input type="text" value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} placeholder="e.g. 1 Liter" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1.5 col-span-2">
                  <label className="text-xs font-medium text-slate-300">Supplier</label>
                  <input type="text" value={formData.supplier} onChange={e => setFormData({...formData, supplier: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-purple-500" />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-lg bg-slate-800 text-sm font-medium text-slate-300 hover:bg-slate-700">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-purple-500 text-sm font-medium text-white hover:bg-purple-600">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
