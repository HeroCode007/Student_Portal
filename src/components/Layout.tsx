import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-200">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Content Container */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-br from-slate-900/50 to-blue-900/50 backdrop-blur-xl border-t border-sky-400/20 shadow-inner">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-2xl border border-sky-400/20 hover:border-sky-400/40 transition-all">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
