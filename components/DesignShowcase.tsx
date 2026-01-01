import React, { useState } from 'react';
import { useClickSound } from '../hooks/useSound';
import { motion, AnimatePresence } from 'framer-motion';

const designs = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/500/500?random=${i + 10}`
}));

const DesignShowcase: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const playSound = useClickSound();

    const toggleExpand = () => {
        playSound();
        setIsExpanded(!isExpanded);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
    };

    return (
        <section id="designs" className="py-24 md:py-32 bg-gray-50 dark:bg-[#020617] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">Design Showcase</h2>
                </motion.div>
                
                {/* Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[200px]"
                >
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.95 }}
                        className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl cursor-zoom-in shadow-md" onClick={() => setActiveImage(designs[0].image)}
                    >
                        <img src={designs[0].image} alt="Design 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </motion.div>
                    <motion.div 
                         variants={itemVariants}
                         whileHover={{ scale: 0.98 }}
                         whileTap={{ scale: 0.95 }}
                        className="md:col-span-2 relative group overflow-hidden rounded-2xl cursor-zoom-in shadow-md" onClick={() => setActiveImage(designs[1].image)}
                    >
                        <img src={designs[1].image} alt="Design 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </motion.div>
                    <motion.div 
                         variants={itemVariants}
                         whileHover={{ scale: 0.98 }}
                         whileTap={{ scale: 0.95 }}
                        className="md:col-span-1 relative group overflow-hidden rounded-2xl cursor-zoom-in shadow-md" onClick={() => setActiveImage(designs[2].image)}
                    >
                        <img src={designs[2].image} alt="Design 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </motion.div>
                    <motion.div 
                         variants={itemVariants}
                         whileHover={{ scale: 0.98 }}
                         whileTap={{ scale: 0.95 }}
                        className="md:col-span-1 relative group overflow-hidden rounded-2xl cursor-zoom-in shadow-md" onClick={() => setActiveImage(designs[3].image)}
                    >
                        <img src={designs[3].image} alt="Design 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </motion.div>
                    
                    {/* Expanded Items */}
                    <AnimatePresence>
                        {isExpanded && designs.slice(4).map((design) => (
                            <motion.div 
                                key={design.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.3 }}
                                className="relative group overflow-hidden rounded-2xl h-[200px] cursor-zoom-in shadow-md" 
                                onClick={() => setActiveImage(design.image)}
                            >
                                <img src={design.image} alt={`Design ${design.id}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <div className="text-center mt-12 space-y-6">
                    <button 
                        onClick={toggleExpand}
                        className="btn-shine text-indigo-600 dark:text-indigo-400 bg-transparent border-2 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 px-8 py-3 rounded-full font-bold cursor-hover inline-block transition-colors"
                    >
                        {isExpanded ? 'Show Less' : 'Expand More'}
                    </button>
                    <div className="block">
                         <a href="https://www.behance.net" target="_blank" rel="noreferrer" className="text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-medium cursor-hover inline-block underline underline-offset-4 decoration-2">
                            View Full Portfolio on Behance
                        </a>
                    </div>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {activeImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-50 p-4 cursor-pointer"
                        onClick={() => setActiveImage(null)}
                    >
                        <motion.img 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={activeImage} 
                            alt="Enlarged design" 
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        />
                        <button className="absolute top-6 right-8 text-white/50 hover:text-white text-5xl font-light cursor-hover transition-colors">&times;</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default DesignShowcase;