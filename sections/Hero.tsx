import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button.tsx';

const Hero: React.FC = () => {
  const [role, setRole] = useState('');
  const roles = ['Python Architect', 'System Engineer', 'Backend Dev', 'Automation Specialist'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 30 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex < roles[roleIndex].length) {
        setRole(prev => prev + roles[roleIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setRole(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else if (!isDeleting && charIndex === roles[roleIndex].length) {
        setTimeout(() => setIsDeleting(true), 3000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex(prev => (prev + 1) % roles.length);
      }
    }, typeSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 mask-radial">
         <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#D4FF00]/10 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Main Hero Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 p-12 md:p-16 rounded-[3rem] bg-[#121212] border border-white/5 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse" />
                Available for Architecture
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-orbitron leading-[0.8] tracking-tighter text-white mb-10">
                RABBY<br />
                <span className="text-[#D4FF00]">HOSSEIN</span>
              </h1>
              <p className="text-xl md:text-3xl font-bold font-mono text-gray-500 mb-12">
                <span className="text-[#D4FF00]">&gt; </span>
                <span className="text-white">{role}</span>
                <span className="animate-pulse">_</span>
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={() => document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})} className="rounded-full">View Repository</Button>
                <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})} className="rounded-full">Get Connected</Button>
              </div>
            </div>
            
            <div className="absolute right-[-5%] bottom-[-5%] opacity-5 text-[#D4FF00] font-orbitron text-[20rem] font-black pointer-events-none select-none">R</div>
          </motion.div>

          {/* Side Info Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-10 rounded-[3rem] bg-[#121212] border border-white/5 flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-center text-[#D4FF00] mb-6">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                 <h3 className="text-2xl font-black font-orbitron mb-2 uppercase tracking-tighter">Python Expert</h3>
                 <p className="text-sm text-gray-500 font-medium">Specialized in Django, FastAPI, and high-concurrency backend architecture.</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-10 rounded-[3rem] bg-[#D4FF00] text-black group overflow-hidden relative"
            >
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="text-4xl font-black font-orbitron leading-none tracking-tighter mb-4">
                   5+ YEARS<br/>OF SYSTEMS
                </div>
                <button 
                   onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                   className="mt-6 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all"
                >
                   Let's Talk <span className="text-2xl">→</span>
                </button>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-black/10 rounded-full blur-3xl -z-0" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;