import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import StatsGrid from '../components/StatsGrid';
import RecentBookings from '../components/RecentBookings';
import PendingPackages from '../components/PendingPackages';
import NewHotels from '../components/NewHotels';
import ContactMessages from '../components/ContactMessages';

const revenueData = [
  { month: 'Jan', revenue: 32000, bookings: 85 },
  { month: 'Feb', revenue: 38500, bookings: 102 },
  { month: 'Mar', revenue: 41200, bookings: 118 },
  { month: 'Apr', revenue: 36800, bookings: 94 },
  { month: 'May', revenue: 48600, bookings: 137 },
  { month: 'Jun', revenue: 52300, bookings: 152 },
  { month: 'Jul', revenue: 49100, bookings: 141 },
  { month: 'Aug', revenue: 55800, bookings: 163 },
  { month: 'Sep', revenue: 47200, bookings: 129 },
  { month: 'Oct', revenue: 61400, bookings: 178 },
  { month: 'Nov', revenue: 58900, bookings: 169 },
  { month: 'Dec', revenue: 67300, bookings: 194 },
];

const categoryData = [
  { name: 'Hotels', value: 420 },
  { name: 'Packages', value: 310 },
  { name: 'Custom', value: 185 },
  { name: 'Cars', value: 335 },
];

const fmtRevenue = (v) => `$${(v / 1000).toFixed(0)}k`;

export default function Dashboard() {
  const { dark } = useTheme();

  const gridColor = dark ? '#1e293b' : '#f1f5f9';
  const tickColor = dark ? '#64748b' : '#94a3b8';
  const tooltipStyle = {
    borderRadius: 8,
    border: `1px solid ${dark ? '#334155' : '#e2e8f0'}`,
    backgroundColor: dark ? '#1e293b' : '#fff',
    color: dark ? '#f1f5f9' : '#1e293b',
    fontSize: 12,
  };

  return (
    <>
      <StatsGrid />

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-[14px] font-semibold text-slate-800 dark:text-slate-100">Revenue & Bookings</h3>
              <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">Full year overview</p>
            </div>
            <span className="text-[11px] font-semibold text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 rounded-full">Last 12 months</span>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gBook" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="l" tickFormatter={fmtRevenue} tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [n === 'revenue' ? `$${v.toLocaleString()}` : v, n === 'revenue' ? 'Revenue' : 'Bookings']} />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 12 }} />
              <Area yAxisId="l" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#gRev)" name="revenue" dot={false} />
              <Area yAxisId="r" type="monotone" dataKey="bookings" stroke="#10b981" strokeWidth={2} fill="url(#gBook)" name="bookings" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5">
          <div className="mb-5">
            <h3 className="text-[14px] font-semibold text-slate-800 dark:text-slate-100">Bookings by Category</h3>
            <p className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">This year</p>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={categoryData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={28}>
              <defs>
                <linearGradient id="bGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0.9} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: tickColor }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" name="Bookings" radius={[5, 5, 0, 0]} fill="url(#bGrad)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <div className="space-y-4">
          <RecentBookings />
          <PendingPackages />
        </div>
        <div className="space-y-4">
          <NewHotels />
          <ContactMessages />
        </div>
      </div>
    </>
  );
}
