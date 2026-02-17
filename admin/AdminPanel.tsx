
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLogs, getStatsSummary, getInquiries } from '../services/analyticsService';
import { VisitorLog, Inquiry } from '../types';
import Button from '../components/ui/Button';
import { formatTimestamp } from '../utils/helpers';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'visitors' | 'inquiries'>('visitors');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Rabby121') {
      setIsAuthenticated(true);
      refreshData();
    } else {
      alert('Invalid security credentials.');
    }
  };

  const refreshData = () => {
    setLogs(getLogs());
    setInquiries(getInquiries());
    setStats(getStatsSummary());
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-lg p-12 rounded-[4rem] bg-white border border-slate-100 shadow-[0_50px_100px_rgba(0,0,0,0.05)] text-center"
        >
          <div className="w-24 h-24 rounded-[2rem] bg-blue-600 flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-blue-600/30">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h1 className="text-4xl font-black font-orbitron mb-4 text-slate-900 uppercase">Secure Access</h1>
          <p className="text-slate-400 font-bold text-xs tracking-widest mb-12 uppercase">Authorized Personnel Only</p>
          <form onSubmit={handleLogin} className="space-y-8">
            <input 
              type="password" autoFocus placeholder="AUTH KEY"
              className="w-full px-8 py-6 rounded-[2rem] bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 text-center text-3xl font-black tracking-[0.5em] text-slate-900 shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full py-6 rounded-[2rem] uppercase tracking-widest font-black shadow-2xl">Initialize Dashboard</Button>
            <button onClick={() => window.location.hash = ''} className="text-xs font-black text-slate-300 hover:text-slate-900 uppercase tracking-[0.3em] transition-colors pt-4 block mx-auto">Abort Mission</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-5">
             <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-white text-xl font-orbitron">R</div>
             <h1 className="text-2xl font-black font-orbitron hidden sm:block tracking-tighter uppercase">Rabby <span className="text-blue-600">HQ</span></h1>
          </div>
          <div className="flex items-center gap-6">
             <button onClick={refreshData} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all">
                <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
             </button>
             <button onClick={() => window.location.hash = ''} className="px-6 py-3 rounded-xl bg-slate-900 text-white font-black text-xs tracking-widest uppercase hover:bg-black shadow-xl shadow-slate-900/10">Log Out</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 lg:p-12">
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { 
                label: 'Analytics', 
                val: stats.totalVisits, 
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
                color: 'blue' 
              },
              { 
                label: 'Total Inquiries', 
                val: stats.totalInquiries, 
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                color: 'cyan' 
              },
              { 
                label: 'Hire Intent', 
                val: stats.hireRequests, 
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745V6c0-1.105.895-2 2-2h14c1.105 0 2 .895 2 2v7.255zM12 11a1 1 0 100-2 1 1 0 000 2z" />,
                color: 'green' 
              },
              { 
                label: 'Main Locale', 
                val: stats.topCountries[0]?.[0] || 'N/A', 
                icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />,
                color: 'purple' 
              }
            ].map((s) => (
              <div key={s.label} className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 group">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {s.icon}
                  </svg>
                </div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-2">{s.label}</p>
                <p className="text-4xl font-black font-orbitron truncate tracking-tighter">{s.val}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-6 mb-12">
           <button 
            onClick={() => setActiveTab('visitors')}
            className={`px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'visitors' ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' : 'bg-white text-slate-400 hover:text-slate-900 border border-slate-100'}`}
           >
            Network Traffic
           </button>
           <button 
            onClick={() => setActiveTab('inquiries')}
            className={`px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'inquiries' ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/30' : 'bg-white text-slate-400 hover:text-slate-900 border border-slate-100'}`}
           >
            Incoming Leads
           </button>
        </div>

        <div className="rounded-[4rem] overflow-hidden border border-slate-100 bg-white shadow-2xl shadow-slate-200/50">
          <AnimatePresence mode="wait">
            {activeTab === 'visitors' ? (
              <motion.div key="v" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    <tr>
                      <th className="px-10 py-6">Timestamp</th>
                      <th className="px-10 py-6">Network IP</th>
                      <th className="px-10 py-6">Region</th>
                      <th className="px-10 py-6">System Spec</th>
                      <th className="px-10 py-6">EntryPoint</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {logs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-10 py-7 text-xs font-bold text-slate-500 whitespace-nowrap">{formatTimestamp(log.timestamp)}</td>
                        <td className="px-10 py-7 font-mono text-xs text-blue-600 font-bold">{log.ip}</td>
                        <td className="px-10 py-7 text-sm font-black text-slate-900">{log.country}</td>
                        <td className="px-10 py-7 text-[10px] text-slate-400 font-bold">{log.browser} · {log.device}</td>
                        <td className="px-10 py-7"><span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-black tracking-widest uppercase">{log.path}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 lg:p-14 space-y-10">
                {inquiries.map(inquiry => (
                  <div key={inquiry.id} className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:border-blue-600 transition-all group relative">
                    <div className="absolute top-10 right-10 flex items-center gap-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${inquiry.type === 'Hire' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {inquiry.type} Project
                      </span>
                      <span className="text-[10px] text-slate-300 font-black uppercase tracking-widest">{formatTimestamp(inquiry.timestamp)}</span>
                    </div>
                    
                    <div className="mb-10">
                       <h3 className="text-3xl font-black text-slate-900 mb-2 font-orbitron tracking-tight">{inquiry.name}</h3>
                       <p className="text-blue-600 font-bold text-sm">{inquiry.email}</p>
                    </div>
                    
                    <div className="p-8 rounded-[2rem] bg-white border border-slate-200 shadow-inner">
                       <p className="text-slate-600 leading-relaxed text-lg font-medium italic">"{inquiry.message}"</p>
                    </div>
                    
                    <div className="mt-10 flex justify-end">
                       <button onClick={() => window.location.href = `mailto:${inquiry.email}`} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-blue-600 transition-all">Reply Pipeline</button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
