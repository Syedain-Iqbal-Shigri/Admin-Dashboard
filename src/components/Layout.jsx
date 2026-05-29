import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const sync = () => setSidebarOpen(window.innerWidth >= 1024);
    sync();
    window.addEventListener('resize', sync);
    return () => window.removeEventListener('resize', sync);
  }, []);

  const toggle = () => setSidebarOpen(v => !v);

  return (
    <div className="flex min-h-screen bg-[#f4f6fb] dark:bg-slate-900 transition-colors duration-200">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggle}
        />
      )}

      <Sidebar open={sidebarOpen} onToggle={toggle} />

      <div className={`flex flex-col flex-1 min-w-0 transition-all duration-200 ${sidebarOpen ? 'lg:ml-60' : 'ml-0'}`}>
        <Header onToggle={toggle} />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <div className="space-y-5 max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
