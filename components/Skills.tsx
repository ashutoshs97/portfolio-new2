import React, { useState, useEffect } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis
} from 'recharts';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

const data = [
  { subject: 'UI/UX Design', A: 95, fullMark: 100 },
  { subject: 'Figma', A: 95, fullMark: 100 },
  { subject: 'Web Dev', A: 85, fullMark: 100 },
  { subject: 'Generative AI', A: 85, fullMark: 100 },
  { subject: 'Automation', A: 75, fullMark: 100 },
  { subject: 'Research', A: 90, fullMark: 100 },
];

const Skills: React.FC = () => {
    const [lottieData, setLottieData] = useState<any>(null);

    useEffect(() => {
        // Fetch a public development/design Lottie animation
        fetch('https://assets2.lottiefiles.com/packages/lf20_w51pcehl.json')
            .then(res => res.json())
            .then(data => setLottieData(data))
            .catch(err => console.error("Failed to load Lottie animation", err));
    }, []);

    return (
        <section id="skills" className="py-24 md:py-32 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">My Skillset</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Bridging the gap between creative design and technical implementation.</p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                        className="w-full h-[400px] bg-gray-50 dark:bg-slate-800/50 rounded-3xl p-4 border border-gray-100 dark:border-slate-800 flex items-center justify-center overflow-hidden relative"
                    >
                        {lottieData ? (
                            <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-80 mix-blend-multiply dark:mix-blend-lighten">
                                <Lottie animationData={lottieData} loop={true} style={{ width: '130%', height: '130%' }} />
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                                    <PolarGrid stroke="#94a3b8" strokeOpacity={0.3} />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 13, fontWeight: 600 }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar
                                        name="Skills"
                                        dataKey="A"
                                        stroke="#4f46e5"
                                        strokeWidth={3}
                                        fill="#4f46e5"
                                        fillOpacity={0.3}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        )}
                        {/* Overlay text if using lottie, otherwise radar speaks for itself */}
                        {lottieData && (
                            <div className="z-10 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 dark:border-slate-700/50 shadow-xl">
                                <span className="text-lg font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">Design Meets Tech</span>
                            </div>
                        )}
                    </motion.div>
                    
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                        className="space-y-8"
                    >
                        <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Design & Research</h3>
                            <div className="flex flex-wrap gap-3">
                                {['UI/UX Design', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems'].map(skill => (
                                    <span key={skill} className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-800/50 hover:scale-105 transition-all cursor-hover shadow-sm border border-indigo-100 dark:border-indigo-800/50">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Tools & Technologies</h3>
                            <div className="flex flex-wrap gap-3">
                                {['Figma', 'Adobe Creative Suite', 'Framer', 'Webflow', 'Generative AI'].map(skill => (
                                    <span key={skill} className="px-4 py-2 bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-xl text-sm font-semibold hover:bg-pink-100 dark:hover:bg-pink-800/50 hover:scale-105 transition-all cursor-hover shadow-sm border border-pink-100 dark:border-pink-800/50">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Development</h3>
                            <div className="flex flex-wrap gap-3">
                                {['HTML/CSS', 'JavaScript', 'React JS', 'Tailwind CSS'].map(skill => (
                                    <span key={skill} className="px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-xl text-sm font-semibold hover:bg-purple-100 dark:hover:bg-purple-800/50 hover:scale-105 transition-all cursor-hover shadow-sm border border-purple-100 dark:border-purple-800/50">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;