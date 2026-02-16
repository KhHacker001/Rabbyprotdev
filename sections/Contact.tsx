import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button.tsx';
import { saveInquiry } from '../services/analyticsService.ts';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', type: 'General' as 'General' | 'Hire' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#contact-hire') {
        setFormData(prev => ({ ...prev, type: 'Hire' }));
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    saveInquiry({
      name: formData.name, email: formData.email, message: formData.message, type: formData.type
    });
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '', type: 'General' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#0A0A0A] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#D4FF00]/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-5"
          >
            <h2 className="text-xs font-black text-[#D4FF00] uppercase tracking-[0.5em] mb-8">Connection Pipeline</h2>
            <h3 className="text-6xl md:text-8xl font-black font-orbitron text-white leading-[0.85] tracking-tighter uppercase mb-12">
              INITIATE <span className="text-gray-700">THE</span><br/><span className="text-[#D4FF00]">PROJECT.</span>
            </h3>
            <p className="text-xl text-gray-500 font-medium mb-16 leading-relaxed">
              Ready to architect something remarkable? Let's discuss your requirements and bridge the gap between concept and code.
            </p>
            
            <div className="space-y-6">
               <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[#D4FF00] group-hover:bg-[#D4FF00] group-hover:text-black transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-white uppercase tracking-tighter font-orbitron">rabby.dev@systems.io</span>
               </div>
               <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[#D4FF00] group-hover:bg-[#D4FF00] group-hover:text-black transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-white uppercase tracking-tighter font-orbitron">Availability: Remote / Worldwide</span>
               </div>
               <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-[#D4FF00] group-hover:bg-[#D4FF00] group-hover:text-black transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold text-white uppercase tracking-tighter font-orbitron">Secure Protocol Enforced</span>
               </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 p-10 md:p-16 rounded-[4rem] bg-[#121212] border border-white/5 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
               <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-4 ml-2">Identified Name</label>
                    <input 
                      type="text" required value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-8 py-5 rounded-2xl bg-[#0A0A0A] border border-white/5 focus:border-[#D4FF00] outline-none text-white font-bold transition-all"
                      placeholder="FULL NAME"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-4 ml-2">Direct Channel</label>
                    <input 
                      type="email" required value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-8 py-5 rounded-2xl bg-[#0A0A0A] border border-white/5 focus:border-[#D4FF00] outline-none text-white font-bold transition-all"
                      placeholder="EMAIL@DOMAIN.COM"
                    />
                  </div>
               </div>
               <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-4 ml-2">Mission Payload</label>
                  <textarea 
                    required rows={5} value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-8 py-5 rounded-2xl bg-[#0A0A0A] border border-white/5 focus:border-[#D4FF00] outline-none text-white font-bold transition-all resize-none"
                    placeholder="DESCRIBE PROJECT SCOPE..."
                  ></textarea>
               </div>
               <Button type="submit" className="w-full py-6 rounded-[2rem] text-sm">
                 {status === 'loading' ? (
                   <span className="flex items-center justify-center gap-2">
                     <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                     </svg>
                     PROCESSING...
                   </span>
                 ) : status === 'success' ? (
                   <span className="flex items-center justify-center gap-2">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                     </svg>
                     TRANSMISSION COMPLETE
                   </span>
                 ) : 'EXECUTE HANDSHAKE'}
               </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;