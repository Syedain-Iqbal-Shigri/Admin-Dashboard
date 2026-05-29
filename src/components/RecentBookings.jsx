import { NavLink } from 'react-router-dom';

const bookings = [
  { user: 'Ahmed Khan', type: 'Luxury Skardu Tour', item: 'Deluxe Hotel', date: '2024-05-12', status: 'Confirmed' },
  { user: 'Sarah Ali', type: 'Mike Hotel Room', item: 'Luxury Car', date: '2024-05-10', status: 'Pending' },
  { user: 'John Doe', type: 'Swat, Naran', item: 'Hiking Camping', date: '2024-05-16', status: 'Cancelled' },
  { user: 'Emma White', type: 'Economy Room', item: 'Economy Room', date: '2024-05-01', status: 'Confirmed' },
];

const statusStyles = {
  Confirmed: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Pending: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
  Cancelled: 'bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400',
};

export default function RecentBookings() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h3 className="text-[14px] font-semibold text-slate-800 dark:text-slate-100">Recent Bookings</h3>
        <NavLink to="/bookings" className="text-[12px] text-blue-500 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          View All →
        </NavLink>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
              {['User', 'Type', 'Item', 'Date', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {bookings.map((b, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-3 text-[13px] text-blue-500 dark:text-blue-400 font-medium whitespace-nowrap">{b.user}</td>
                <td className="px-4 py-3 text-[13px] text-slate-600 dark:text-slate-300 whitespace-nowrap">{b.type}</td>
                <td className="px-4 py-3 text-[13px] text-slate-600 dark:text-slate-300 whitespace-nowrap">{b.item}</td>
                <td className="px-4 py-3 text-[13px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{b.date}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusStyles[b.status]}`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
