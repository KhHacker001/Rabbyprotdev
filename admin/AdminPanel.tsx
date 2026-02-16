
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  getLogs, 
  getStatsSummary, 
  getInquiries, 
  getChatMessages, 
  saveChatMessage, 
  exportAllData 
} from '../services/analyticsService.ts';
import Button from '../components/ui/Button.tsx';
import { formatTimestamp } from '../utils/helpers.ts';

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Rabby121') setIsAuthenticated(true);
    else alert('Access Denied');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
        <form onSubmit={handleLogin} className="p-12 rounded-[2rem] bg-[#121212] border border-white/5 text-center">
          <h1 className="text-xl font-orbitron mb-8">ADMIN_LOGIN</h1>
          <input 
            type="password" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full p-4 bg-black border border-white/10 rounded-xl mb-4 outline-none focus:border-[#D4FF00] text-center"
            placeholder="PASSWORD"
          />
          <Button type="submit" className="w-full">ACCESS</Button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-20 bg-black min-h-screen">
      <h1 className="text-4xl font-orbitron mb-10">DASHBOARD_ACTIVE</h1>
      <button onClick={() => window.location.hash = ''} className="text-[#D4FF00]">LOGOUT</button>
      <p className="mt-10 text-gray-500">Analytics tracking initialized...</p>
    </div>
  );
};

export default AdminPanel;
