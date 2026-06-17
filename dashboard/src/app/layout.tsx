import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { AuthProvider } from "@/lib/firebase/auth-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "InventaAPI - Dashboard",
  description: "API-Based Data-as-a-Service Platform Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-slate-950 text-slate-50 overflow-x-hidden`}>
        <AuthProvider>
          {/* Ambient background blobs */}
          <div className="blob blob-1" />
          <div className="blob blob-2" />
          
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
              {/* Top Navbar */}
              <Navbar />

              {/* Main Content Area */}
              <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                <div className="max-w-7xl mx-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
