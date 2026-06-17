"use client";

import { useState } from "react";
import { BookOpen, Copy, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("curl");
  const [copied, setCopied] = useState(false);

  const mockEndpoint = {
    method: "GET",
    path: "/products",
    description: "Fetch the centralized product catalog. You can filter by category or retrieve a specific product via barcode.",
    headers: [
      { key: "x-api-key", required: true, description: "Your unique API access key (e.g. INV-API-XXXX)" }
    ]
  };

  const codeSnippets: Record<string, string> = {
    curl: `curl -X GET "https://api.inventa.ph/products" \\
  -H "x-api-key: YOUR_API_KEY"`,
    js: `const response = await fetch("https://api.inventa.ph/products", {
  method: "GET",
  headers: {
    "x-api-key": "YOUR_API_KEY"
  }
});
const data = await response.json();
console.log(data);`,
    android: `val client = OkHttpClient()
val request = Request.Builder()
  .url("https://api.inventa.ph/products")
  .addHeader("x-api-key", "YOUR_API_KEY")
  .build()

client.newCall(request).enqueue(object : Callback {
  override fun onResponse(call: Call, response: Response) {
    println(response.body?.string())
  }
})`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-10">
      {/* Sidebar Nav for Docs */}
      <div className="w-full lg:w-64 flex-shrink-0">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          Documentation
        </h2>
        <nav className="space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-4 px-2">Getting Started</div>
          <a href="#" className="flex items-center gap-2 px-2 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-200">
            Authentication
          </a>
          
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 mt-6 px-2">Endpoints</div>
          <a href="#" className="flex items-center justify-between px-2 py-1.5 text-sm font-medium text-indigo-400 bg-indigo-500/10 rounded-md group">
            <span className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1 rounded">GET</span>
              /products
            </span>
            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="#" className="flex items-center justify-between px-2 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-200 group">
            <span className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1 rounded">GET</span>
              /products/:barcode
            </span>
            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="#" className="flex items-center justify-between px-2 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-200 group">
            <span className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-1 rounded">GET</span>
              /categories
            </span>
            <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="glass-card rounded-xl p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 font-bold text-sm border border-emerald-500/20">
              {mockEndpoint.method}
            </span>
            <h1 className="text-2xl font-bold text-white font-mono tracking-tight">{mockEndpoint.path}</h1>
          </div>
          
          <p className="text-slate-400 mb-8 max-w-3xl leading-relaxed">
            {mockEndpoint.description}
          </p>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-800 pb-2">Headers</h3>
                <div className="space-y-3">
                  {mockEndpoint.headers.map((h, i) => (
                    <div key={i} className="flex gap-4 border-b border-slate-800/50 pb-3 last:border-0">
                      <div className="w-1/3">
                        <span className="text-sm font-mono text-slate-200">{h.key}</span>
                        {h.required && <span className="ml-2 text-[10px] text-red-400 uppercase font-bold">Required</span>}
                      </div>
                      <div className="w-2/3 text-sm text-slate-400">{h.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Examples */}
            <div>
              <div className="bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between bg-slate-900/80 px-4 border-b border-slate-800">
                  <div className="flex">
                    {["curl", "js", "android"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                          "px-4 py-3 text-xs font-medium border-b-2 transition-colors",
                          activeTab === tab 
                            ? "border-indigo-500 text-indigo-400" 
                            : "border-transparent text-slate-500 hover:text-slate-300"
                        )}
                      >
                        {tab === "curl" ? "cURL" : tab === "js" ? "JavaScript" : "Kotlin"}
                      </button>
                    ))}
                  </div>
                  <button onClick={handleCopy} className="text-slate-500 hover:text-slate-300 transition-colors" title="Copy code">
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-xs font-mono leading-relaxed text-slate-300">
                    <code>{codeSnippets[activeTab]}</code>
                  </pre>
                </div>
              </div>

              <div className="mt-6 bg-[#0f172a] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-slate-900/80 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Response Example</span>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-xs font-mono leading-relaxed text-emerald-400/90">
{`{
  "product_name": "Boysen Paint",
  "size": "1 Liter",
  "category": "Paint",
  "barcode": "4801234567890",
  "variation": "White"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
