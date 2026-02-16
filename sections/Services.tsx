import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants.tsx';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-20 text-center lg:text-left">
          <h2 className="text-xs font-black text-[#D4FF00] uppercase tracking-[0.5em] mb-4">Service Modalities</h2>
          <h3 className="text-5xl md:text-7xl font-black font-orbitron text-white tracking-tighter leading-none">CORE <span className="text-gray-700">CAPABILITIES.</span></h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-12 rounded-[3rem] bg-[#121212] border border-white/5 hover:border-[#D4FF00]/20 transition-all group"
            >
              <div className="w-16 h-16 rounded-[1.5rem] bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-center text-[#D4FF00] mb-10 group-hover:bg-[#D4FF00] group-hover:text-black transition-all">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d={service.icon} />
                </svg>
              </div>
              <h4 className="text-2xl font-black font-orbitron text-white uppercase tracking-tighter mb-6 group-hover:text-[#D4FF00] transition-colors">{service.title}</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed group-hover:text-gray-300">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;