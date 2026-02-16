import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants.tsx';
import Button from '../components/ui/Button.tsx';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-[#0A0A0A]">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 className="text-xs font-black text-[#D4FF00] uppercase tracking-[0.5em] mb-4">Selected Case Studies</h2>
            <h3 className="text-5xl md:text-7xl font-black font-orbitron text-white tracking-tighter uppercase leading-none">Production <span className="text-gray-700">Archive.</span></h3>
          </div>
          <Button variant="outline" className="rounded-full px-12" onClick={() => window.open('https://github.com/rabbyhossein')}>Open Github Repository</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-[3rem] overflow-hidden bg-[#121212] border border-white/5 aspect-[16/10] mb-8">
                <img 
                  src={project.imageUrl} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-12 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <Button variant="secondary" className="w-fit rounded-full" onClick={() => window.open(project.githubUrl)}>Inspect Source Code</Button>
                </div>
              </div>
              
              <div className="px-6 flex justify-between items-start">
                 <div className="max-w-md">
                    <h4 className="text-3xl font-black font-orbitron text-white uppercase tracking-tighter mb-4 group-hover:text-[#D4FF00] transition-colors">{project.title}</h4>
                    <p className="text-gray-500 font-medium line-clamp-2 mb-6">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                       {project.tags.slice(0, 3).map(tag => (
                         <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-gray-400 bg-white/5 px-3 py-1 rounded-full">{tag}</span>
                       ))}
                    </div>
                 </div>
                 <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-[#D4FF00] group-hover:text-black transition-all rotate-[-45deg] group-hover:rotate-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;