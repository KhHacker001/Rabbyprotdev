
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/shared/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Services from './sections/Services';
import Projects from './sections/Projects';
import Process from './sections/Process';
import Stats from './sections/Stats';
import Contact from './sections/Contact';
import AdminPanel from './admin/AdminPanel';
import { trackVisit } from './services/analyticsService';

const BackToTop: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={goToTop}
          className="fixed bottom-10 right-10 z-[100] w-12 h-12 rounded-full bg-[#D4FF00] text-black shadow-2xl flex items-center justify-center border-none hover:bg-white transition-all group"
        >
          <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash);
      trackVisit(window.location.hash || '/');
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAdmin = currentPath.startsWith('#/admin');

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="bg-[#0A0A0A] text-white selection:bg-[#D4FF00] selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Services />
        <Process />
        <Projects />
        <Contact />
      </main>
      <BackToTop />
      <footer className="py-20 border-t border-white/5 bg-[#0A0A0A] text-center">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
             <div className="text-left">
                <h2 className="text-4xl font-black font-orbitron text-white tracking-tighter mb-4 uppercase">Let's build<br/><span className="text-[#D4FF00]">The Future.</span></h2>
                <p className="text-gray-500 font-medium">Focused on scalability, efficiency, and engineering excellence.</p>
             </div>
             <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
                <a href="#hero" className="hover:text-[#D4FF00] transition-colors">Home</a>
                <a href="#projects" className="hover:text-[#D4FF00] transition-colors">Projects</a>
                <a href="#contact" className="hover:text-[#D4FF00] transition-colors">Contact</a>
             </div>
          </div>
          <div className="h-px w-full bg-white/5 mb-10" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest text-gray-600">
             <p>© {new Date().getFullYear()} KH Rabby Hossein. All rights reserved.</p>
             <p className="flex items-center gap-2">Built with <span className="text-[#D4FF00]">Pythonic Energy</span> & React</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
