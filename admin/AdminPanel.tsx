
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getLogs, 
  getStatsSummary, 
  getInquiries, 
  getChatMessages, 
  saveChatMessage, 
  exportAllData 
} from '../services/analyticsService';
import { VisitorLog, Inquiry, ChatMessage } from '../types';
import Button from '../components/ui/Button';
import { formatTimestamp } from '../utils/helpers';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [logs, setLogs] = useState<VisitorLog[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'visitors' | 'inquiries' | 'chat'>('visitors');
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, activeTab]);

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
    setChatMessages(getChatMessages());
    setStats(getStatsSummary());
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'Admin',
      text: newMessage,
      timestamp: new Date().toISOString()
    };
    saveChatMessage(msg);
    setChatMessages(prev => [...prev, msg]);
    setNewMessage('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4FF00]/10 rounded-full blur-[120px] -z-0" />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md p-12 rounded-[3rem] bg-[#121212] border border-white/5 shadow-2xl relative z-10 text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-[#D4FF00] flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(212,255,0,0.3)]">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h1 className="text-3xl font-black font-orbitron mb-2 text-white uppercase tracking-tighter">Root Interface</h1>
          <p className="text-gray-500 font-bold text-[10px] tracking-[0.4em] mb-12 uppercase">Authorized Access Required</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" autoFocus placeholder="SECURITY KEY"
              className="w-full px-8 py-5 rounded-2xl bg-[#0A0A0A] border border-white/5 outline-none focus:border-[#D4FF00] text-center text-xl font-black tracking-[0.5em] text-white transition-all"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full py-5 rounded-2xl">Execute Login</Button>
            <button type="button" onClick={() => window.location.hash = ''} className="text-[9px] font-black text-gray-600 hover:text-white uppercase tracking-[0.4em] pt-4 block mx-auto transition-colors">Abort Mission</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Header */}
      <div className="bg-[#121212]/80 backdrop-blur-2xl border-b border-white/5 sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-[#D4FF00] flex items-center justify-center font-black text-black font-orbitron">R</div>
             <h1 className="text-xl font-black font-orbitron tracking-tighter uppercase">Systems <span className="text-[#D4FF00]">OS</span></h1>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={exportAllData} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:text-[#D4FF00] transition-all">Export Dump (.json)</button>
             <button onClick={() => window.location.hash = ''} className="px-5 py-2.5 rounded-xl bg-[#D4FF00] text-black font-black text-[10px] tracking-widest uppercase hover:bg-white transition-all">Sign Off</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8 lg:p-12">
        {/* Real-time System Stats */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Traffic', val: stats.totalVisits, sub: 'Global Pings', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { label: 'Inbound Leads', val: stats.totalInquiries, sub: 'Handshakes', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
              { label: 'Cloud Status', val: '99.9%', sub: 'Healthy', icon: 'M5 13l4 4L19 7' },
              { label: 'Top Geozone', val: stats.topCountries[0]?.[0] || 'Local', sub: 'Regional Data', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }
            ].map((s) => (
              <div key={s.label} className="p-8 rounded-[2.5rem] bg-[#121212] border border-white/5 hover:border-[#D4FF00]/30 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#D4FF00] group-hover:bg-[#D4FF00] group-hover:text-black transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} /></svg>
                  </div>
                  <span className="text-[8px] font-black text-gray-700 group-hover:text-[#D4FF00] transition-colors">LIVE</span>
                </div>
                <p className="text-gray-500 text-[9px] font-black uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-3xl font-black font-orbitron text-white leading-none tracking-tighter">{s.val}</p>
                <p className="text-[10px] font-bold text-gray-700 mt-2 uppercase">{s.sub}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab Navigator */}
        <div className="flex gap-4 mb-8 bg-[#121212] p-2 rounded-2xl border border-white/5 w-fit">
          {['visitors', 'inquiries', 'chat'].map(tab => (
            <button 
              key={tab} onClick={() => setActiveTab(tab as any)}
              className={`px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#D4FF00] text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <div className="rounded-[3rem] bg-[#121212] border border-white/5 overflow-hidden shadow-2xl min-h-[500px] relative">
          <AnimatePresence mode="wait">
            
            {/* Visitors Tab */}
            {activeTab === 'visitors' && (
              <motion.div key="v" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-[#0A0A0A]/50 border-b border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-gray-500">
                    <tr>
                      <th className="px-10 py-6">Timestamp</th>
                      <th className="px-10 py-6">Network node (IP)</th>
                      <th className="px-10 py-6">Geozone</th>
                      <th className="px-10 py-6">Specs</th>
                      <th className="px-10 py-6">Route</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {logs.map(log => (
                      <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-10 py-6 text-[11px] font-bold text-gray-600 whitespace-nowrap">{formatTimestamp(log.timestamp)}</td>
                        <td className="px-10 py-6 font-mono text-[11px] text-[#D4FF00] font-bold">{log.ip}</td>
                        <td className="px-10 py-6 text-sm font-black text-white">{log.country}</td>
                        <td className="px-10 py-6 text-[10px] text-gray-600 font-bold uppercase tracking-tight">{log.browser} / {log.device}</td>
                        <td className="px-10 py-6"><span className="px-3 py-1 rounded bg-[#D4FF00]/5 text-[#D4FF00] text-[9px] font-black uppercase border border-[#D4FF00]/10">{log.path}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}

            {/* Inquiries Tab */}
            {activeTab === 'inquiries' && (
              <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-10 space-y-6">
                {inquiries.map(inq => (
                  <div key={inq.id} className="p-10 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 hover:border-[#D4FF00]/20 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="text-2xl font-black font-orbitron uppercase tracking-tighter text-white mb-1">{inq.name}</h4>
                        <p className="text-[#D4FF00] font-bold font-mono text-xs">{inq.email}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${inq.type === 'Hire' ? 'bg-[#D4FF00] text-black' : 'bg-white/5 text-gray-500'}`}>{inq.type} Request</span>
                    </div>
                    <div className="p-8 rounded-[1.5rem] bg-[#121212] border border-white/5 text-gray-400 font-medium leading-relaxed italic">"{inq.message}"</div>
                    <div className="mt-8 flex justify-between items-center">
                       <span className="text-[9px] font-black text-gray-700 uppercase tracking-widest">{formatTimestamp(inq.timestamp)}</span>
                       <button onClick={() => window.location.href=`mailto:${inq.email}`} className="px-6 py-2 bg-white text-black text-[9px] font-black uppercase rounded-lg hover:bg-[#D4FF00] transition-all">Send Response</button>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <motion.div key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-[600px]">
                <div className="flex-1 overflow-y-auto p-10 space-y-6">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.sender === 'Admin' ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">{msg.sender}</span>
                        <span className="text-[8px] text-gray-800 font-bold">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className={`max-w-[80%] p-5 rounded-[1.5rem] text-sm font-medium ${msg.sender === 'Admin' ? 'bg-[#D4FF00] text-black rounded-tr-none' : msg.sender === 'System' ? 'bg-white/5 text-[#D4FF00] border border-[#D4FF00]/20 font-mono text-xs' : 'bg-white/5 text-white rounded-tl-none'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="p-8 bg-[#0A0A0A]/50 border-t border-white/5 flex gap-4">
                  <input 
                    type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type mission updates or reply to leads..."
                    className="flex-1 bg-white/5 border border-white/5 rounded-2xl px-8 py-4 outline-none focus:border-[#D4FF00] text-white font-medium"
                  />
                  <button type="submit" className="w-14 h-14 rounded-2xl bg-[#D4FF00] text-black flex items-center justify-center hover:scale-105 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="max-w-7xl mx-auto px-12 py-12 flex flex-col md:flex-row justify-between items-center text-[9px] font-black text-gray-700 uppercase tracking-[0.5em] gap-8">
         <p>Rabby Systems OS v2.0.4 - Local Storage Encryption Enabled</p>
         <div className="flex gap-10">
            <span className="text-[#D4FF00]">System Load: Minimal</span>
            <span>Uptime: Persistent</span>
         </div>
      </div>
    </div>
  );
};

export default AdminPanel;
