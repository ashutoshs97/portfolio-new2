import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useClickSound } from '../hooks/useSound';

const NotFound: React.FC = () => {
    const playSound = useClickSound();

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-50 dark:bg-[#020617] text-slate-900 dark:text-white perspective-1000">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center px-4"
            >
                <motion.h1 
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="text-8xl md:text-9xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"
                >
                    404
                </motion.h1>
                <h2 className="text-2xl md:text-4xl font-bold mb-6">Page Not Found</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-md mx-auto">
                    Oops! The page you are looking for doesn't exist or has been moved.
                </p>
                <Link 
                    to="/"
                    onClick={playSound}
                    className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-slate-900 dark:bg-white px-8 text-base font-bold text-white dark:text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] cursor-hover"
                >
                    <Home className="mr-2" size={20} />
                    <span>Back to Home</span>
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
            </motion.div>

            {/* Floating 404 Elements */}
            <motion.div 
                animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-[20%] left-[20%] text-6xl opacity-10 dark:opacity-20 font-black blur-[2px]"
            >
                ?
            </motion.div>
            <motion.div 
                animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }} 
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-[30%] right-[20%] text-8xl opacity-10 dark:opacity-20 font-black blur-[2px]"
            >
                404
            </motion.div>
        </section>
    );
};

export default NotFound;
