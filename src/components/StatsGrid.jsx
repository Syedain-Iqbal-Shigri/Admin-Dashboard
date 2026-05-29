const stats = [
  {
    label: 'Total Users',
    value: '5,420',
    sub: '+12% from last month',
    trend: 'up',
    iconBg: 'bg-blue-50 dark:bg-blue-500/10',
    iconColor: 'text-blue-500',
    iconPath: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  },
  {
    label: 'Total Bookings',
    value: '1,250',
    sub: '+8% this month',
    trend: 'up',
    iconBg: 'bg-orange-50 dark:bg-orange-500/10',
    iconColor: 'text-orange-500',
    iconPath: 'M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z',
  },
  {
    label: 'Total Hotels',
    value: '120',
    sub: '+5 new this month',
    trend: 'up',
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    iconPath: 'M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z',
  },
  {
    label: 'Total Cars',
    value: '75',
    sub: 'Across all cities',
    trend: 'neutral',
    iconBg: 'bg-violet-50 dark:bg-violet-500/10',
    iconColor: 'text-violet-500',
    iconPath: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z',
  },
  {
    label: 'Total Packages',
    value: '60',
    sub: '+3 added recently',
    trend: 'up',
    iconBg: 'bg-orange-50 dark:bg-orange-500/10',
    iconColor: 'text-orange-500',
    iconPath: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z',
  },
  {
    label: 'Pending Reviews',
    value: '18',
    sub: 'Awaiting moderation',
    trend: 'down',
    iconBg: 'bg-amber-50 dark:bg-amber-500/10',
    iconColor: 'text-amber-500',
    iconPath: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z',
  },
  {
    label: 'New Messages',
    value: '8',
    sub: '4 unread messages',
    trend: 'neutral',
    iconBg: 'bg-sky-50 dark:bg-sky-500/10',
    iconColor: 'text-sky-500',
    iconPath: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
  },
  {
    label: 'Monthly Revenue',
    value: '$52,300',
    sub: '+18% vs last month',
    trend: 'up',
    iconBg: 'bg-emerald-50 dark:bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    iconPath: 'M5 9.2h3V19H5V9.2zM10.6 5h2.8v14h-2.8V5zm5.6 8H19v6h-2.8v-6z',
  },
];

const trendUp = <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z" /></svg>;
const trendDown = <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z" /></svg>;

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.iconBg}`}>
              <svg viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 ${s.iconColor}`}>
                <path d={s.iconPath} />
              </svg>
            </div>
          </div>
          <div className="text-[26px] font-bold text-slate-800 dark:text-slate-100 leading-none mb-1">{s.value}</div>
          <div className="text-[12.5px] font-medium text-slate-500 dark:text-slate-400 mb-2">{s.label}</div>
          <div className={`flex items-center gap-1 text-[11.5px] font-medium ${
            s.trend === 'up' ? 'text-emerald-500' : s.trend === 'down' ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'
          }`}>
            {s.trend === 'up' && trendUp}
            {s.trend === 'down' && trendDown}
            <span>{s.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
