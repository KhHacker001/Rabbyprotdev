
import React from 'react';
import { motion } from 'framer-motion';

const Process: React.FC = () => {
  const steps = [
    { 
      title: 'Analysis', 
      desc: 'Detailed mapping of logic and system constraints.', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> 
    },
    { 
      title: 'Design', 
      desc: 'Crafting API blueprints and data flows.', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /> 
    },
    { 
      title: 'Coding', 
      desc: 'Optimized Python execution with integrity tests.', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /> 
    },
    { 
      title: 'Scale', 
      desc: 'Final cloud deployment to robust infrastructures.', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /> 
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#0A0A0A]">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-24 text-center">
           <h2 className="text-xs font-black text-[#D4FF00] uppercase tracking-[0.5em] mb-4">Working Protocol</h2>
           <h3 className="text-5xl font-black font-orbitron text-white tracking-tighter uppercase leading-none">THE <span className="text-gray-700">LIFECYCLE.</span></h3>
        </div>
        
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-10 group"
            >
              <div className="flex flex-col items-center">
                 <div className="w-16 h-16 rounded-2xl bg-[#121212] border border-white/5 flex items-center justify-center text-[#D4FF00] group-hover:bg-[#D4FF00] group-hover:text-black transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {step.icon}
                    </svg>
                 </div>
                 {index !== steps.length - 1 && <div className="w-0.5 h-20 bg-white/5 group-hover:bg-[#D4FF00]/20 transition-all" />}
              </div>
              <div className="pt-2">
                 <h4 className="text-2xl font-black font-orbitron text-white uppercase tracking-tighter mb-2">{step.title}</h4>
                 <p className="text-gray-500 font-medium">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
