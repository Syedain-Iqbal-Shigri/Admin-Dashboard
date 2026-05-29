import { useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const routeLabels = {
  '/': 'Dashboard',
  '/packages': 'Packages',
  '/custom-packages': 'Custom Packages',
  '/bookings': 'Bookings',
  '/hotels': 'Hotels',
  '/cars': 'Cars',
  '/hotel-partners': 'Hotel Partners',
  '/car-partners': 'Car Partners',
  '/users': 'Users',
  '/reviews': 'Reviews',
  '/contact-messages': 'Contact Messages',
  '/settings': 'Settings',
};

export default function Header({ onToggle }) {
  const { pathname } = useLocation();
  const { dark, toggle } = useTheme();
  const pageTitle = routeLabels[pathname] ?? 'Dashboard';

  return (
    <header className="sticky top-0 z-40 flex items-center h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 lg:px-6 gap-3 transition-colors duration-200">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggle}
          className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="min-w-0 hidden sm:block">
          <h1 className="text-[15px] font-semibold text-slate-800 dark:text-slate-100 leading-none truncate">{pageTitle}</h1>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">TravelEase Admin Panel</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 ml-auto shrink-0">
        {/* Search */}
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 gap-2 w-52 lg:w-64 transition-colors">
          <svg className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-[13px] text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 w-full"
          />
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={toggle}
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {dark ? (
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
            </svg>
          ) : (
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
            </svg>
          )}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" aria-label="Notifications">
          <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden sm:block" />

        {/* User */}
        <div className="hidden sm:flex items-center gap-2.5 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-[#1e2d45] dark:bg-slate-600 flex items-center justify-center text-white text-[12px] font-semibold shrink-0">
            S
          </div>
          <div className="hidden lg:block">
            <div className="text-[12.5px] font-semibold text-slate-800 dark:text-slate-100 leading-none">Syedain</div>
            <div className="text-[10.5px] text-slate-400 dark:text-slate-500 mt-0.5">Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}
