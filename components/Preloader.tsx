import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';
        
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                document.body.style.overflow = 'unset';
                onComplete();
            }, 800); // Wait for fade out animation
        }, 2000); // Show preloader for 2 seconds

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = 'unset';
        };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gray-50 dark:bg-[#020617]"
                >
                    <div className="relative flex items-center justify-center">
                        <motion.div 
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white relative z-10"
                        >
                            Ashutosh<span className="text-indigo-600 dark:text-indigo-400">.</span>
                        </motion.div>
                        
                        {/* Outer rotating ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute w-32 h-32 md:w-48 md:h-48 border-t-2 border-indigo-500 rounded-full opacity-30"
                        />
                        {/* Inner rotating ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute w-28 h-28 md:w-40 md:h-40 border-b-2 border-purple-500 rounded-full opacity-30"
                        />
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="absolute bottom-10 text-sm font-semibold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500"
                    >
                        Loading Experience
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
