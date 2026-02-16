
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
      alert('Security violation. Access denied.');
    }
  };

  const refreshData = () => {
    setLogs(getLogs());
    setInquiries(getInquiries());
    setStats(getStatsSummary());
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4FF00]/10 rounded-full blur-[120px] -z-0" />
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-md p-12 rounded-[3rem] bg-[#121212] border border-white/5 shadow-2xl relative z-10 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-[#D4FF00] flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(212,255,0,0.3)]">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black font-orbitron mb-2 text-white uppercase tracking-tighter">Mission Control</h1>
          <p className="text-gray-500 font-bold text-[10px] tracking-[0.4em] mb-12 uppercase">Access Restricted to Root</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" autoFocus placeholder="AUTH KEY"
              className="w-full px-8 py-6 rounded-2xl bg-[#0A0A0A] border border-white/5 outline-none focus:border-[#D4FF00] text-center text-2xl font-black tracking-[0.5em] text-white shadow-inner transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full py-5 rounded-2xl font-black shadow-2xl">Initialize Core</Button>
            <button 
              type="button"
              onClick={() => window.location.hash = ''} 
              className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-[0.3em] transition-colors pt-4 block mx-auto"
            >
              Abort Handshake
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Admin Nav */}
      <div className="bg-[#121212]/80 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-[#D4FF00] flex items-center justify-center font-black text-black text-lg font-orbitron">R</div>
             <h1 className="text-xl font-black font-orbitron hidden sm:block tracking-tighter uppercase">Systems <span className="text-[#D4FF00]">HQ</span></h1>
          </div>
          <div className="flex items-center gap-6">
             <button onClick={refreshData} className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-gray-400 hover:text-[#D4FF00]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
             </button>
             <button 
              onClick={() => window.location.hash = ''} 
              className="px-6 py-2.5 rounded-xl bg-white text-black font-black text-[10px] tracking-widest uppercase hover:bg-[#D4FF00] transition-all"
             >
              Terminate Session
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 lg:p-12">
        {/* Analytics Bento Grid */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Network Visits', val: stats.totalVisits, icon: <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> },
              { label: 'Transmission Inbound', val: stats.totalInquiries, icon: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /> },
              { label: 'Hiring Nodes', val: stats.hireRequests, icon: <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745V6c0-1.105.895-2 2-2h14c1.105 0 2 .895 2 2v7.255z" /> },
              { label: 'Primary Geozone', val: stats.topCountries[0]?.[0] || 'LOCAL', icon: <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /> }
            ].map((s) => (
              <div key={s.label} className="p-8 rounded-[2.5rem] bg-[#121212] border border-white/5 group hover:border-[#D4FF00]/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 text-gray-500 group-hover:bg-[#D4FF00] group-hover:text-black transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {s.icon}
                  </svg>
                </div>
                <p className="text-gray-500 text-[9px] font-black uppercase tracking-[0.4em] mb-2">{s.label}</p>
                <p className="text-3xl font-black font-orbitron truncate tracking-tighter text-white">{s.val}</p>
              </div>
            ))}
          </div>
        )}

        {/* Interface Tabs */}
        <div className="flex gap-4 mb-10 p-2 bg-[#121212] rounded-3xl border border-white/5 w-fit">
           <button 
            onClick={() => setActiveTab('visitors')}
            className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'visitors' ? 'bg-[#D4FF00] text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
           >
            Traffic Logs
           </button>
           <button 
            onClick={() => setActiveTab('inquiries')}
            className={`px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'inquiries' ? 'bg-[#D4FF00] text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
           >
            Leads Feed
           </button>
        </div>

        {/* Content Viewport */}
        <div className="rounded-[3rem] overflow-hidden border border-white/5 bg-[#121212] shadow-2xl relative">
          <AnimatePresence mode="wait">
            {activeTab === 'visitors' ? (
              <motion.div 
                key="v" 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="overflow-x-auto"
              >
                <table className="w-full text-left">
                  <thead className="bg-[#0A0A0A]/50 border-b border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
                    <tr>
                      <th className="px-10 py-5">T-Stamp</th>
                      <th className="px-10 py-5">Origin Node (IP)</th>
                      <th className="px-10 py-5">Geozone</th>
                      <th className="px-10 py-5">Core Specs</th>
                      <th className="px-10 py-5">Access Route</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {logs.length === 0 ? (
                      <tr><td colSpan={5} className="px-10 py-20 text-center text-gray-600 font-bold uppercase tracking-widest">No Active Signals Detected</td></tr>
                    ) : (
                      logs.map(log => (
                        <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-10 py-6 text-[11px] font-bold text-gray-500 whitespace-nowrap">{formatTimestamp(log.timestamp)}</td>
                          <td className="px-10 py-6 font-mono text-[11px] text-[#D4FF00] font-bold">{log.ip}</td>
                          <td className="px-10 py-6 text-sm font-black text-white">{log.country}</td>
                          <td className="px-10 py-6 text-[10px] text-gray-600 font-bold uppercase tracking-tight">{log.browser} · {log.device}</td>
                          <td className="px-10 py-6">
                            <span className="px-3 py-1 rounded-md bg-[#D4FF00]/5 text-[#D4FF00] text-[9px] font-black tracking-widest uppercase border border-[#D4FF00]/10">
                              {log.path}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div 
                key="i" 
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                className="p-10 space-y-8"
              >
                {inquiries.length === 0 ? (
                  <div className="py-32 text-center text-gray-600 font-bold uppercase tracking-[0.5em]">The lead vault is currently empty</div>
                ) : (
                  inquiries.map(inquiry => (
                    <div key={inquiry.id} className="p-10 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 hover:border-[#D4FF00]/20 transition-all group relative overflow-hidden">
                      <div className="absolute top-10 right-10 flex items-center gap-6">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${inquiry.type === 'Hire' ? 'bg-[#D4FF00] text-black' : 'bg-white/10 text-white'}`}>
                          {inquiry.type} Project
                        </span>
                        <span className="text-[9px] text-gray-600 font-black uppercase tracking-widest">{formatTimestamp(inquiry.timestamp)}</span>
                      </div>
                      
                      <div className="mb-8">
                         <h3 className="text-3xl font-black text-white mb-2 font-orbitron tracking-tighter uppercase">{inquiry.name}</h3>
                         <p className="text-[#D4FF00] font-bold text-xs font-mono">{inquiry.email}</p>
                      </div>
                      
                      <div className="p-8 rounded-[1.5rem] bg-[#121212] border border-white/5 shadow-inner">
                         <p className="text-gray-400 leading-relaxed text-lg font-medium italic">"{inquiry.message}"</p>
                      </div>
                      
                      <div className="mt-8 flex justify-end">
                         <button 
                          onClick={() => window.location.href = `mailto:${inquiry.email}`} 
                          className="px-8 py-3 bg-white text-black rounded-xl font-black text-[9px] uppercase tracking-[0.3em] hover:bg-[#D4FF00] transition-all"
                         >
                          Initiate Uplink
                         </button>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-12 py-10 text-[9px] font-black text-gray-700 uppercase tracking-[0.5em] text-center">
         Systems Intelligence V1.4.0 · Local Secure Protocol Enforced
      </div>
    </div>
  );
};

export default AdminPanel;
