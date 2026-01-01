import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
    return (
        <section id="about" className="py-24 md:py-32 bg-white dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { 
                            opacity: 1, 
                            y: 0,
                            transition: { 
                                duration: 0.6,
                                ease: "easeOut",
                                staggerChildren: 0.2 
                            }
                        }
                    }}
                    className="text-center"
                >
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">About Me</motion.h2>
                    <motion.div variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }} className="w-24 h-1 bg-indigo-600 dark:bg-indigo-500 mx-auto mb-8 rounded-full origin-center transition-transform"></motion.div>
                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        I am a driven <span className="text-indigo-600 dark:text-indigo-400 font-bold">Product Designer & UI/UX Specialist</span> focused on crafting intuitive and impactful digital products. I combine a strong foundation in UI/UX principles with technical knowledge in web development and emerging AI technologies to bridge the gap between aesthetic excellence and functional efficiency.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;