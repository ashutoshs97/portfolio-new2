import React, { useEffect, useState, useRef } from 'react';
import { useClickSound } from '../hooks/useSound';
import { motion, AnimatePresence, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowDown, Layout, MousePointer2 } from 'lucide-react';

const Hero: React.FC = () => {
    const [currentVerbIndex, setCurrentVerbIndex] = useState(0);
    const verbs = ['Create', 'Innovate', 'Design', 'Build'];
    const playSound = useClickSound();
    
    // Mouse Parallax Logic
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
            const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    const springConfig = { damping: 25, stiffness: 100 };
    const x = useSpring(useTransform(mouseX, [-1, 1], [-30, 30]), springConfig);
    const y = useSpring(useTransform(mouseY, [-1, 1], [-30, 30]), springConfig);
    const xReverse = useSpring(useTransform(mouseX, [-1, 1], [30, -30]), springConfig);
    const yReverse = useSpring(useTransform(mouseY, [-1, 1], [30, -30]), springConfig);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVerbIndex((prev) => (prev + 1) % verbs.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleScrollToProjects = (e: React.MouseEvent) => {
        e.preventDefault();
        playSound();
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="hero" ref={ref} className="relative flex items-center justify-center min-h-screen pt-16 overflow-hidden bg-gray-50 dark:bg-[#020617] transition-colors duration-300 perspective-1000">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

            {/* Parallax Blobs */}
            <motion.div style={{ x: xReverse, y: yReverse }} className="absolute top-20 left-10 w-[500px] h-[500px] bg-purple-400/30 dark:bg-purple-900/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob" />
            <motion.div style={{ x, y }} className="absolute top-40 right-10 w-[500px] h-[500px] bg-indigo-400/30 dark:bg-indigo-900/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000" />
            <motion.div style={{ x: xReverse, y }} className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] bg-pink-400/30 dark:bg-pink-900/40 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-4000" />

            {/* Floating Glass Elements */}
            <motion.div 
                style={{ x, y: yReverse, rotate: -5 }}
                className="absolute top-[20%] left-[10%] hidden lg:flex items-center gap-3 p-4 rounded-2xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl z-10"
            >
                <div className="p-2.5 bg-blue-500 rounded-xl text-white shadow-lg shadow-blue-500/30">
                    <Layout size={24} />
                </div>
                <div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white">UI Design</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Pixel Perfect</div>
                </div>
            </motion.div>

            <motion.div 
                style={{ x: xReverse, y, rotate: 5 }}
                className="absolute bottom-[25%] right-[10%] hidden lg:flex items-center gap-3 p-4 rounded-2xl bg-white/30 dark:bg-slate-800/30 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-xl z-10"
            >
                <div className="p-2.5 bg-pink-500 rounded-xl text-white shadow-lg shadow-pink-500/30">
                    <MousePointer2 size={24} />
                </div>
                <div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white">Interaction</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Seamless Flows</div>
                </div>
            </motion.div>

            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-left md:text-center max-w-5xl mx-auto">
                    
                    {/* Status Badge */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-start md:justify-center mb-8"
                    >
                         <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-sm font-semibold shadow-sm backdrop-blur-sm">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                            </span>
                            Open to new opportunities
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-8"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                            <span className="block mb-2 md:mb-4">I</span>
                            <div className="flex flex-col md:flex-row md:justify-center items-start md:items-center gap-3 md:gap-6">
                                <div className="h-[1.1em] overflow-hidden relative min-w-[320px] md:min-w-[450px] text-left">
                                    <AnimatePresence mode='wait'>
                                        <motion.span 
                                            key={verbs[currentVerbIndex]}
                                            initial={{ y: "110%", rotateX: -90, opacity: 0 }}
                                            animate={{ y: 0, rotateX: 0, opacity: 1 }}
                                            exit={{ y: "-110%", rotateX: 90, opacity: 0 }}
                                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Custom ease
                                            className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 absolute top-0 left-0"
                                        >
                                            {verbs[currentVerbIndex]}
                                        </motion.span>
                                    </AnimatePresence>
                                </div>
                                <span className="relative">Digital.</span>
                            </div>
                        </h1>
                    </motion.div>
                    
                    {/* Subtitle */}
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-lg md:text-2xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        A <span className="text-slate-900 dark:text-white font-semibold">Product Designer & UI/UX Specialist</span> focused on creating intuitive, user-centric interfaces that drive business growth and user satisfaction.
                    </motion.p>
                    
                    {/* CTA Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                    >
                        <a 
                            href="#projects" 
                            onClick={handleScrollToProjects}
                            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-slate-900 dark:bg-white px-8 text-base font-bold text-white dark:text-slate-900 transition-all duration-300 hover:w-full sm:hover:w-auto hover:scale-105 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] cursor-hover"
                        >
                            <span className="mr-2">Explore Projects</span>
                            <ArrowDown className="transition-transform group-hover:translate-y-1" size={20} />
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </a>
                        <a 
                            href="#contact" 
                            onClick={(e) => { e.preventDefault(); playSound(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} 
                            className="inline-flex h-14 items-center justify-center rounded-full border-2 border-slate-200 dark:border-slate-800 bg-transparent px-8 text-base font-bold text-slate-900 dark:text-white transition-all hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 cursor-hover"
                        >
                            Contact Me
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
            >
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Scroll</span>
                <div className="w-[1px] h-16 bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-700 dark:to-transparent relative overflow-hidden rounded-full">
                    <motion.div 
                        animate={{ y: [0, 64] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-1/2 bg-indigo-500 shadow-[0_0_10px_#6366f1]"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;