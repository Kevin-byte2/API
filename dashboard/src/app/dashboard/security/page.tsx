"use client";
import { ShieldCheck } from "lucide-react";
export default function SecurityPage() {
  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-rose-400" />
          Security Settings
        </h1>
        <p className="text-slate-400">Manage your account security and authentication rules.</p>
      </div>
      <div className="glass-card rounded-xl p-8 border-dashed border-slate-700/60 flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium text-slate-300">Security Configuration</h3>
          <p className="text-sm text-slate-500 mt-2">Your account is currently secure.</p>
        </div>
      </div>
    </div>
  );
}
