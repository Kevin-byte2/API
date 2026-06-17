import { Bell, Search, Terminal } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 glass border-b border-slate-800/60 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden md:flex items-center">
          <Search className="w-4 h-4 text-slate-500 absolute left-3" />
          <input 
            type="text" 
            placeholder="Search API endpoints, products, docs..." 
            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
          />
          <div className="absolute right-3 flex items-center gap-1">
            <kbd className="hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700">
              <span className="text-xs">⌘</span> K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800/50 border border-slate-700/50 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-600 transition-colors">
          <Terminal className="w-3.5 h-3.5" />
          API Status: <span className="text-emerald-400 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Operational</span>
        </button>

        <button className="relative p-2 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 border-2 border-slate-950"></span>
        </button>
      </div>
    </header>
  );
}
