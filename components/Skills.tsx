import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis
} from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { subject: 'UI/UX Design', A: 95, fullMark: 100 },
  { subject: 'Figma', A: 95, fullMark: 100 },
  { subject: 'Web Dev', A: 85, fullMark: 100 },
  { subject: 'Generative AI', A: 85, fullMark: 100 },
  { subject: 'Automation', A: 75, fullMark: 100 },
  { subject: 'Research', A: 90, fullMark: 100 },
];

const Skills: React.FC = () => {
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
                        className="w-full h-[400px] bg-gray-50 dark:bg-slate-800/50 rounded-3xl p-4 border border-gray-100 dark:border-slate-800"
                    >
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
                        className="space-y-6"
                    >
                        <motion.h3 variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }} className="text-2xl font-bold text-slate-900 dark:text-white">Holistic Approach</motion.h3>
                        <motion.p variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }} className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            This visualization represents my balanced expertise. My strongest assets lie in <span className="text-indigo-600 dark:text-indigo-400 font-semibold">UI/UX Design</span> and proficiency with tools like <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Figma</span>.
                        </motion.p>
                        <motion.p variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }} className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            However, my background in <span className="text-pink-600 dark:text-pink-400 font-semibold">Web Development</span> allows me to communicate effectively with engineering teams, ensuring that my designs are not just beautiful, but feasible and performant.
                        </motion.p>
                        <motion.p variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }} className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                             I am also deeply invested in <span className="text-purple-600 dark:text-purple-400 font-semibold">Generative AI</span> workflows to accelerate ideation and asset creation.
                        </motion.p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;