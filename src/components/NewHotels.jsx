import { NavLink } from 'react-router-dom';

const hotels = [
  { name: 'Mountain View Resort', city: 'Skardu', owner: 'Bilal Zaman', rooms: 80 },
  { name: 'Deluxe Hunza Hotel', city: 'Hunza', owner: 'Noor Ahmed', rooms: 60 },
  { name: 'Swat Valley Inn', city: 'Swat', owner: 'Naveed Khan', rooms: 50 },
];

export default function NewHotels() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h3 className="text-[14px] font-semibold text-slate-800 dark:text-slate-100">New Hotels</h3>
        <NavLink to="/hotels" className="text-[12px] text-blue-500 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          View All →
        </NavLink>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-90">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
              {['Hotel Name', 'City', 'Owner', 'Rooms'].map((h, i) => (
                <th key={h} className={`px-4 py-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap ${i === 3 ? 'text-right' : 'text-left'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {hotels.map((h, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-3 text-[13px] font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">{h.name}</td>
                <td className="px-4 py-3 text-[13px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{h.city}</td>
                <td className="px-4 py-3 text-[13px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{h.owner}</td>
                <td className="px-4 py-3 text-[13px] font-semibold text-slate-700 dark:text-slate-200 text-right whitespace-nowrap">{h.rooms}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
