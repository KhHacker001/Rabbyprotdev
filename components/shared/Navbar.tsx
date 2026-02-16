
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: 'hero' },
    { name: 'About', href: 'about' },
    { name: 'Projects', href: 'projects' },
    { name: 'Contact', href: 'contact' }
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-4' : 'py-10'}`}>
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center justify-between px-8 py-4 rounded-full border border-white/5 bg-[#0A0A0A]/60 backdrop-blur-2xl shadow-2xl transition-all ${isScrolled ? 'scale-95' : 'scale-100'}`}
        >
          <button onClick={() => scrollToSection('hero')} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#D4FF00] flex items-center justify-center text-black font-black font-orbitron text-xs">R</div>
            <span className="text-sm font-black font-orbitron tracking-tighter text-white">RABBY<span className="text-[#D4FF00]">.PY</span></span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.href)}
                className="text-[10px] font-bold text-gray-500 hover:text-[#D4FF00] transition-all uppercase tracking-[0.3em]"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => window.location.hash = '/admin'}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-[#D4FF00] transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6" : "M4 6h16M4 12h16"} /></svg>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 top-24 bg-[#0A0A0A] border border-white/5 rounded-[2rem] z-[110] p-10 md:hidden flex flex-col justify-center items-center space-y-8"
          >
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => scrollToSection(link.href)}
                className="text-4xl font-black font-orbitron text-white hover:text-[#D4FF00]"
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
