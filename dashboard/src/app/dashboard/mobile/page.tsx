"use client";
import { Smartphone } from "lucide-react";
export default function MobileAppPage() {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <Smartphone className="w-8 h-8 text-teal-400" />
          Mobile Application
        </h1>
        <p className="text-slate-400">Connect and manage your mobile POS application.</p>
      </div>
      <div className="glass-card rounded-xl p-8 border-dashed border-slate-700/60 flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <Smartphone className="w-12 h-12 text-slate-600 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-slate-300">Mobile Settings</h3>
          <p className="text-sm text-slate-500 mt-2">Download the mobile app or get connection settings.</p>
        </div>
      </div>
    </div>
  );
}
