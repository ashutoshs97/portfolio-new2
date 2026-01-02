import React, { useState } from 'react';
import { Project } from '../types';
import { useClickSound } from '../hooks/useSound';
import { motion, AnimatePresence } from 'framer-motion';

const projects: Project[] = [
    { id: 1, title: 'Saltoris Mobile Design', category: 'mobile', description: 'Mobile application design for a water utility service.', image: 'images/saltoris-mobile-design.png' },
    { id: 2, title: 'Penny Upp App Design', category: 'mobile', description: 'UI/UX design for a micro-investing mobile application.', image: 'https://picsum.photos/600/400?random=2' },
    { id: 3, title: 'Bondspe Website Redesign', category: 'web', description: 'A complete redesign of the Bondspe investment platform website.', image: 'https://picsum.photos/600/400?random=3' },
    { id: 4, title: 'Saltoris Web Design', category: 'web', description: 'Web interface for the Saltoris water utility management system.', image: 'https://picsum.photos/600/400?random=4' },
    { id: 5, title: 'Bondspe App Redesign', category: 'mobile', description: 'A fresh take on the Bondspe mobile application interface.', image: 'https://picsum.photos/600/400?random=5' },
    { id: 6, title: 'Profit Plum Website Design', category: 'web', description: 'UI/UX design for the Profit Plum financial services website.', image: 'https://picsum.photos/600/400?random=6' },
    { id: 7, title: 'Roofing Website Design', category: 'web', description: 'Professional roofing service website designed for trust and conversion.', image: 'https://picsum.photos/600/400?random=7' },
    { id: 8, title: 'Chimney Website Design', category: 'web', description: 'Clean, modern interface for chimney repair and maintenance services.', image: 'https://picsum.photos/600/400?random=8' },
    { id: 9, title: 'Exterior Painting Website Design', category: 'web', description: 'Visual-centric design showcasing premium exterior painting projects.', image: 'https://picsum.photos/600/400?random=9' },
    { id: 10, title: 'Landscaping Website Design', category: 'web', description: 'Organic and green-themed portfolio site for landscaping services.', image: 'https://picsum.photos/600/400?random=10' },
];

const Projects: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'mobile' | 'web'>('all');
    const playSound = useClickSound();

    const filteredProjects = projects.filter(p => filter === 'all' || p.category === filter);

    return (
        <section id="projects" className="py-24 md:py-32 bg-white dark:bg-slate-900 transition-colors duration-300 relative">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Featured Projects</h2>
                    
                    <div className="flex justify-center space-x-2 p-1.5 bg-gray-100 dark:bg-slate-800 inline-flex rounded-full">
                        {['all', 'mobile', 'web'].map((f) => (
                            <button
                                key={f}
                                onClick={() => { setFilter(f as any); playSound(); }}
                                className={`relative px-6 py-2 rounded-full font-medium capitalize text-sm transition-colors duration-200 cursor-hover
                                    ${filter === f ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                            >
                                {filter === f && (
                                    <motion.div 
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-indigo-600 rounded-full shadow-md"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{f}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                                className="group card rounded-2xl overflow-hidden bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 cursor-hover"
                            >
                                <div className="overflow-hidden h-64 relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                                    <img 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        src={project.image} 
                                        alt={project.title} 
                                    />
                                </div>
                                <div className="p-8">
                                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 block">{project.category}</span>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{project.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;