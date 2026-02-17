
import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-20">
          <h2 className="text-xs font-black text-[#D4FF00] uppercase tracking-[0.5em] mb-4">Capability Stack</h2>
          <h3 className="text-5xl md:text-7xl font-black font-orbitron text-white tracking-tighter">ENGINEERED <span className="text-gray-700">TOOLS.</span></h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {SKILLS.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, borderColor: 'rgba(212, 255, 0, 0.4)' }}
              className="p-8 rounded-[2rem] bg-[#121212] border border-white/5 transition-all group"
            >
              <div className="flex flex-col h-full justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white mb-8 group-hover:bg-[#D4FF00] group-hover:text-black transition-all">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={skill.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-black font-orbitron text-white uppercase tracking-tighter mb-1">{skill.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          className="h-full bg-[#D4FF00]"
                       />
                    </div>
                    <span className="text-[10px] font-black text-gray-500">{skill.level}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
