
import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Bio Bento */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 p-12 rounded-[3rem] bg-[#121212] border border-white/5"
          >
            <h2 className="text-xs font-black text-[#D4FF00] uppercase tracking-[0.5em] mb-8">Core Profile</h2>
            <h3 className="text-4xl md:text-5xl font-black font-orbitron text-white mb-8 tracking-tighter leading-none">Architecting <span className="text-gray-500">Solutions, Not Just Code.</span></h3>
            <p className="text-lg text-gray-400 font-medium leading-relaxed">
              I am a Python Systems Architect focused on bridging business requirements with rock-solid technical foundations. My philosophy centers on stability, efficiency, and writing code that scales alongside your vision.
            </p>
          </motion.div>

          {/* Identity Bento */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 p-12 rounded-[3rem] bg-[#121212] border border-white/5 flex flex-col justify-center text-center items-center"
          >
             <div className="w-32 h-32 rounded-[2.5rem] bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-center text-[#D4FF00] mb-8 transition-all">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
             </div>
             <h4 className="text-2xl font-black font-orbitron text-white uppercase tracking-tighter">KH Rabby Hossein</h4>
             <p className="text-xs font-bold text-[#D4FF00] uppercase tracking-widest mt-2">Professional Engineer</p>
          </motion.div>

          {/* Highlights Bento */}
          <div className="lg:col-span-12 grid md:grid-cols-3 gap-6">
             {[
               { 
                 title: 'Obsessed with Quality', 
                 desc: 'Code isn\'t finished until it\'s clean, tested, and optimized.', 
                 icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
               },
               { 
                 title: 'Automation First', 
                 desc: 'If it can be automated, it should be. Efficiency is my baseline.', 
                 icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
               },
               { 
                 title: 'Collaborative Mind', 
                 desc: 'Working with stakeholders to ensure technical debt is zero.', 
                 icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
               }
             ].map((item, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="p-10 rounded-[2.5rem] bg-[#121212] border border-white/5 group hover:border-[#D4FF00]/20 transition-all"
               >
                  <div className="w-12 h-12 rounded-xl bg-[#D4FF00]/5 border border-[#D4FF00]/10 flex items-center justify-center text-[#D4FF00] mb-6 group-hover:bg-[#D4FF00] group-hover:text-black transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {item.icon}
                    </svg>
                  </div>
                  <h5 className="text-xl font-black font-orbitron text-white mb-2 uppercase tracking-tighter">{item.title}</h5>
                  <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
               </motion.div>
             ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
