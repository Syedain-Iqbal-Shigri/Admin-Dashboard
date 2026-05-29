import { NavLink } from 'react-router-dom';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { to: '/', label: 'Dashboard', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
    ],
  },
  {
    label: 'Inventory',
    items: [
      { to: '/packages', label: 'Packages', icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z' },
      { to: '/custom-packages', label: 'Custom Packages', icon: 'M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z' },
      { to: '/hotels', label: 'Hotels', icon: 'M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z' },
      { to: '/cars', label: 'Cars', icon: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { to: '/bookings', label: 'Bookings', icon: 'M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z' },
      { to: '/reviews', label: 'Reviews', icon: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' },
      { to: '/contact-messages', label: 'Messages', icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
    ],
  },
  {
    label: 'Partners',
    items: [
      { to: '/hotel-partners', label: 'Hotel Partners', icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
      { to: '/car-partners', label: 'Car Partners', icon: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z' },
    ],
  },
  {
    label: 'Admin',
    items: [
      { to: '/users', label: 'Users', icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' },
      { to: '/settings', label: 'Settings', icon: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z' },
    ],
  },
];

export default function Sidebar({ open, onToggle }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full z-50 flex flex-col bg-[#1e2d45] transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ width: 240 }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
          <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="currentColor" style={{width:18,height:18}}>
            <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z" />
          </svg>
        </div>
        <div>
          <div className="text-[14px] font-bold text-white leading-none">TravelEase</div>
          <div className="text-[10.5px] text-blue-300/70 mt-0.5">Admin Panel</div>
        </div>
        <button
          onClick={onToggle}
          className="ml-auto p-1 rounded text-white/40 hover:text-white/70 transition-colors lg:hidden"
          aria-label="Close sidebar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-3">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-1">
            <div className="px-2 py-2 text-[10px] font-semibold uppercase tracking-widest text-white/25 select-none">
              {group.label}
            </div>
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => window.innerWidth < 1024 && onToggle()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium mb-0.5 transition-all ${
                    isActive
                      ? 'bg-blue-500/20 text-white'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <svg viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 transition-colors ${isActive ? 'text-blue-400' : 'text-white/40'}`} style={{ width: 16, height: 16 }}>
                      <path d={item.icon} />
                    </svg>
                    <span className="truncate">{item.label}</span>
                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Profile */}
      <div className="px-4 py-4 border-t border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-500/30 border border-blue-400/30 flex items-center justify-center text-blue-200 text-[12px] font-bold shrink-0">
            S
          </div>
          <div className="min-w-0">
            <div className="text-[12.5px] font-semibold text-white truncate">Syedain Shigri</div>
            <div className="text-[10.5px] text-white/40 truncate">Administrator</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
