
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/shared/Navbar.tsx';
import Hero from './sections/Hero.tsx';
import About from './sections/About.tsx';
import Skills from './sections/Skills.tsx';
import Services from './sections/Services.tsx';
import Projects from './sections/Projects.tsx';
import Process from './sections/Process.tsx';
import Stats from './sections/Stats.tsx';
import Contact from './sections/Contact.tsx';
import AdminPanel from './admin/AdminPanel.tsx';
import { trackVisit } from './services/analyticsService.ts';

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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={goToTop}
          className="fixed bottom-10 right-10 z-[100] w-12 h-12 rounded-full bg-[#D4FF00] text-black flex items-center justify-center border-none shadow-xl"
        >
          ↑
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

  if (currentPath.startsWith('#/admin')) return <AdminPanel />;

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
      <footer className="py-20 border-t border-white/5 text-center text-[10px] text-gray-500 uppercase tracking-widest">
        © {new Date().getFullYear()} KH Rabby Hossein. All Rights Reserved.
      </footer>
    </div>
  );
};

export default App;
