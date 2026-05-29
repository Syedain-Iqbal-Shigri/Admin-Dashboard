import { NavLink } from 'react-router-dom';

const messages = [
  { user: 'Abdullah', email: 'abdullah@example.com', date: '2024-05-10', status: 'Unread' },
  { user: 'Emily White', email: 'emily@example.com', date: '2024-05-09', status: 'Handled' },
  { user: 'Farhan Ali', email: 'farhan@example.com', date: '2024-05-06', status: 'Unread' },
];

const statusStyles = {
  Unread: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400',
  Handled: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
};

export default function ContactMessages() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h3 className="text-[14px] font-semibold text-slate-800 dark:text-slate-100">New Contact Messages</h3>
        <NavLink to="/contact-messages" className="text-[12px] text-blue-500 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          View All →
        </NavLink>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-120">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
              {['User', 'Email', 'Date', 'Status'].map((h, i) => (
                <th key={h} className={`px-4 py-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider whitespace-nowrap ${i === 3 ? 'text-right' : 'text-left'}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {messages.map((msg, i) => (
              <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="px-4 py-3 text-[13px] text-blue-500 dark:text-blue-400 font-medium whitespace-nowrap">{msg.user}</td>
                <td className="px-4 py-3 text-[13px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{msg.email}</td>
                <td className="px-4 py-3 text-[13px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{msg.date}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-semibold ${statusStyles[msg.status]}`}>
                    {msg.status}
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
