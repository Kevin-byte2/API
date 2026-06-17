import { 
  Activity, 
  CreditCard, 
  Database, 
  Server, 
  ArrowUpRight, 
  ArrowRight,
  Code
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome back, Developer</h1>
          <p className="text-slate-400">Here's what's happening with your InventaAPI integration today.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/docs" className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm font-medium text-slate-200 hover:bg-slate-700 transition-colors flex items-center gap-2">
            <Code className="w-4 h-4" />
            View Docs
          </Link>
          <Link href="/dashboard/api-keys" className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-sm font-medium text-white transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <Database className="w-4 h-4" />
            Generate Key
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-16 h-16 text-indigo-400" />
          </div>
          <p className="text-sm font-medium text-slate-400 mb-1">API Requests Used</p>
          <h3 className="text-2xl font-bold text-white mb-4">0</h3>
          <div className="flex items-center text-xs text-slate-400">
            <span className="text-slate-400 flex items-center mr-1">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> 0%
            </span>
            vs last week
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Database className="w-16 h-16 text-emerald-400" />
          </div>
          <p className="text-sm font-medium text-slate-400 mb-1">Requests Remaining</p>
          <h3 className="text-2xl font-bold text-white mb-4">50</h3>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
            <div className="bg-gradient-to-r from-emerald-400 to-indigo-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CreditCard className="w-16 h-16 text-purple-400" />
          </div>
          <p className="text-sm font-medium text-slate-400 mb-1">Active Plan</p>
          <h3 className="text-2xl font-bold text-white mb-1">Starter</h3>
          <p className="text-xs text-indigo-400 font-medium">Free Plan</p>
        </div>

        <div className="glass-card rounded-xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Server className="w-16 h-16 text-blue-400" />
          </div>
          <p className="text-sm font-medium text-slate-400 mb-1">Products Available</p>
          <h3 className="text-2xl font-bold text-white mb-4">0</h3>
          <Link href="/dashboard/products" className="text-xs text-blue-400 hover:text-blue-300 flex items-center font-medium transition-colors">
            Explore catalog <ArrowRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">API Usage Analytics</h3>
            <select className="bg-slate-900 border border-slate-700 text-slate-300 text-xs rounded-md px-2 py-1 focus:outline-none focus:border-indigo-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 opacity-80">
            {/* Mock Chart Bars */}
            {[0, 0, 0, 0, 0, 0, 0].map((height, i) => (
              <div key={i} className="w-full bg-slate-800 rounded-t-sm relative group cursor-pointer hover:bg-slate-700 transition-colors" style={{ height: '100%' }}>
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-sm transition-all duration-500 group-hover:from-indigo-500 group-hover:to-indigo-300"
                  style={{ height: `${height}%` }}
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs text-slate-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <Activity className="w-8 h-8 text-slate-600 mb-3" />
              <p className="text-sm font-medium text-slate-300">No recent activity</p>
              <p className="text-xs text-slate-500 mt-1">Make your first API request to see it here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
