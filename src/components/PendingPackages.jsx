import { NavLink } from 'react-router-dom';

const packages = [
  { user: 'Ali Raza', type: 'Skardu', destination: 'Luxury Hotel', activities: 'River Rafting, Snow Trekking', price: '$950' },
  { user: 'Hamza Ahmed', type: 'Hunza', destination: 'Hunza', activities: 'Jeep Safari, Camping', price: '$1,050' },
  { user: 'Sara Khan', type: 'Swat', destination: 'Swat, Naran Tour', activities: 'Hiking, Camping, Rafting', price: '$800' },
];

export default function PendingPackages() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h3 className="text-[14px] font-semibold text-slate-800 dark:text-slate-100">Pending Custom Packages</h3>
        <NavLink to="/custom-packages" className="text-[12px] text-blue-500 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          View All →
        </NavLink>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-140">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
              {['User', 'Type', 'Destination', 'Activities', 'Est. Price'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {packages.map((pkg, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-3 text-[13px] text-blue-500 dark:text-blue-400 font-medium whitespace-nowrap">{pkg.user}</td>
                <td className="px-4 py-3 text-[13px] text-slate-600 dark:text-slate-300 whitespace-nowrap">{pkg.type}</td>
                <td className="px-4 py-3 text-[13px] text-slate-600 dark:text-slate-300 whitespace-nowrap">{pkg.destination}</td>
                <td className="px-4 py-3 text-[13px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{pkg.activities}</td>
                <td className="px-4 py-3 text-[13px] font-semibold text-slate-800 dark:text-slate-100 whitespace-nowrap">{pkg.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
