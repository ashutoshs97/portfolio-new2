import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useClickSound } from '../hooks/useSound';

const featuredProjects = [
    { id: 1, title: 'Profit Plum Website', image: 'images/projects/profit-plum-website/1.webp' },
    { id: 2, title: 'Bondspe App', image: 'images/projects/bondspe-app/1.webp' },
    { id: 3, title: 'Saltoris Mobile', image: 'images/projects/saltoris-mobile/1.webp' },
    { id: 4, title: 'Napworks Website', image: 'images/projects/napworks-website/1.webp' },
];

const AtAGlancePopup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const playSound = useClickSound();

    useEffect(() => {
        // Show the popup shortly after the page loads
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 2500); // 2.5 second delay

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        playSound();
        setIsOpen(false);
    };

    const handleNavigate = () => {
        playSound();
        setIsOpen(false);
        setTimeout(() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 md:p-8 pb-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-2">At a Glance ✨</h2>
                                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">A quick peek into some of my featured work.</p>
                            </div>
                            <button 
                                onClick={handleClose}
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors cursor-hover"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Grid */}
                        <div className="px-6 md:px-8 py-2">
                            <div className="grid grid-cols-2 gap-4">
                                {featuredProjects.map((project, idx) => (
                                    <motion.div 
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * idx }}
                                        onClick={handleNavigate}
                                        className="relative group rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 dark:bg-slate-800 cursor-pointer"
                                    >
                                        <img 
                                            src={project.image} 
                                            alt={project.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                                        <div className="absolute bottom-3 left-4 right-4">
                                            <h3 className="text-white font-bold text-sm md:text-base truncate">{project.title}</h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 md:p-8 pt-6 flex flex-col sm:flex-row justify-end items-center gap-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                            <button 
                                onClick={handleClose}
                                className="text-slate-500 hover:text-slate-800 dark:hover:text-white font-medium text-sm transition-colors cursor-hover w-full sm:w-auto"
                            >
                                Maybe Later
                            </button>
                            <button 
                                onClick={handleNavigate}
                                className="group relative inline-flex h-12 w-full sm:w-auto items-center justify-center overflow-hidden rounded-full bg-indigo-600 px-8 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] cursor-hover"
                            >
                                <span className="mr-2 relative z-10">Explore Full Portfolio</span>
                                <ArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" size={18} />
                                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AtAGlancePopup;
