import { useState } from 'react'
import { useQuery } from '../hooks/useQuery'
import { getMessages, updateMessageStatus } from '../services/messages'
import PageHeader from '../components/ui/PageHeader'
import MiniStat from '../components/ui/MiniStat'
import ErrorBanner from '../components/ui/ErrorBanner'
import { useToast } from '../components/ui/Toast'

const statusStyles = {
  Unread: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'In Progress': 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Resolved: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
}

export default function ContactMessages() {
  const { data, loading, error, refetch } = useQuery(getMessages)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const toast = useToast()

  const filtered = data.filter(m =>
    (m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())) &&
    (statusFilter === 'All' || m.status === statusFilter)
  )

  const handleResolve = async (id) => {
    try {
      await updateMessageStatus(id, 'Resolved')
      setSelected(prev => prev?.id === id ? { ...prev, status: 'Resolved' } : prev)
      toast('Message marked as resolved.', 'success')
      refetch()
    } catch {
      toast('Failed to update message. Please try again.', 'error')
    }
  }

  const handleMarkInProgress = async (id) => {
    try {
      await updateMessageStatus(id, 'In Progress')
      setSelected(prev => prev?.id === id ? { ...prev, status: 'In Progress' } : prev)
      toast('Message marked as in progress.', 'success')
      refetch()
    } catch {
      toast('Failed to update message. Please try again.', 'error')
    }
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Contact Messages"
        description="Manage customer inquiries and support requests"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniStat label="Total" value={data.length} color="text-blue-500" loading={loading} />
        <MiniStat label="Unread" value={data.filter(m => m.status === 'Unread').length} color="text-amber-500" loading={loading} />
        <MiniStat label="In Progress" value={data.filter(m => m.status === 'In Progress').length} color="text-blue-400" loading={loading} />
        <MiniStat label="Resolved" value={data.filter(m => m.status === 'Resolved').length} color="text-emerald-500" loading={loading} />
      </div>

      <ErrorBanner error={error} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 items-start">
        {/* Message list */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 gap-2 flex-1 max-w-xs">
              <svg className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input type="text" placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)}
                className="bg-transparent outline-none text-[13px] text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 w-full" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Unread', 'In Progress', 'Resolved'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors ${statusFilter === s ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="px-4 py-3.5 space-y-2">
                  <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded animate-pulse w-1/3" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded animate-pulse w-2/3" />
                  <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded animate-pulse w-1/2" />
                </div>
              ))
              : filtered.length === 0
                ? (
                  <div className="px-4 py-16 flex flex-col items-center gap-3 text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-400 dark:text-slate-500">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
                    </div>
                    <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">No messages found.</p>
                  </div>
                )
                : filtered.map(m => (
                  <div key={m.id} onClick={() => setSelected(m)}
                    className={`px-4 py-3.5 cursor-pointer transition-colors ${selected?.id === m.id ? 'bg-blue-50 dark:bg-blue-500/10' : 'hover:bg-slate-50 dark:hover:bg-slate-700/30'} ${m.status === 'Unread' ? 'border-l-2 border-blue-500' : 'border-l-2 border-transparent'}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[13px] font-semibold ${m.status === 'Unread' ? 'text-slate-800 dark:text-slate-100' : 'text-slate-600 dark:text-slate-300'}`}>{m.name}</span>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:inline">{m.email}</span>
                        </div>
                        <div className={`text-[12.5px] truncate mb-0.5 ${m.status === 'Unread' ? 'font-semibold text-slate-700 dark:text-slate-200' : 'text-slate-500 dark:text-slate-400'}`}>{m.subject}</div>
                        <div className="text-[12px] text-slate-400 dark:text-slate-500 truncate">{m.message}</div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 mb-1.5 whitespace-nowrap">{m.date}</div>
                        <span className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[m.status]}`}>{m.status}</span>
                      </div>
                    </div>
                  </div>
                ))
            }
          </div>
        </div>

        {/* Message detail / empty state */}
        {selected ? (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5 sticky top-20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[14px] font-semibold text-slate-800 dark:text-slate-100">{selected.subject}</h3>
                <div className="text-[12px] text-slate-400 dark:text-slate-500 mt-0.5">{selected.date}</div>
              </div>
              <button onClick={() => setSelected(null)}
                className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-2.5 mb-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-[12px] font-bold shrink-0">
                {selected.name[0]}
              </div>
              <div>
                <div className="text-[13px] font-semibold text-slate-800 dark:text-slate-100">{selected.name}</div>
                <div className="text-[12px] text-blue-500 dark:text-blue-400">{selected.email}</div>
              </div>
              <span className={`ml-auto text-[11px] font-semibold px-2.5 py-1 rounded-full ${statusStyles[selected.status]}`}>
                {selected.status}
              </span>
            </div>

            <div className="text-[13.5px] text-slate-600 dark:text-slate-300 leading-relaxed mb-5 bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4">
              {selected.message}
            </div>

            <div className="space-y-2">
              <textarea
                placeholder="Type your reply..."
                rows={3}
                className="w-full text-[13px] text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg p-3 resize-none outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder-slate-400 dark:placeholder-slate-500"
              />
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-[13px] font-medium py-2 rounded-lg transition-colors">
                  Send Reply
                </button>
                <button
                  onClick={() => handleResolve(selected.id)}
                  className="px-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[13px] font-medium py-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors">
                  Resolve
                </button>
              </div>
              {selected.status === 'Unread' && (
                <button
                  onClick={() => handleMarkInProgress(selected.id)}
                  className="w-full text-[12.5px] font-medium text-blue-500 hover:text-blue-600 py-1.5 transition-colors">
                  Mark as In Progress
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 flex flex-col items-center justify-center text-center min-h-50">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-3">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-400 dark:text-slate-500">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
            <div className="text-[13px] font-medium text-slate-600 dark:text-slate-300">Select a message</div>
            <div className="text-[12px] text-slate-400 dark:text-slate-500 mt-1">Click any message to view and reply</div>
          </div>
        )}
      </div>
    </div>
  )
}
