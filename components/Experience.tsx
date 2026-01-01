import React from 'react';
import { Experience as ExpType, Education as EduType } from '../types';
import { motion } from 'framer-motion';

const experiences: ExpType[] = [
    {
        id: 1,
        role: "Product Designer",
        company: "Saltoris",
        period: "Nov 2023 - May 2024",
        description: "Designed a billing app for water utilities. Collaborated across 6 sprints with developers, ensuring on-time delivery. Early testing showed ~30% faster task completion."
    },
    {
        id: 2,
        role: "Product Designer & UI/UX Designer",
        company: "Pennyupp And Bondspe",
        period: "Aug 2023 - Jun 2024",
        description: "Developed comprehensive user flows and interface layouts for two finance platforms, leveraging research for simplified user journeys."
    },
    {
        id: 3,
        role: "UI/UX & Graphic Designer",
        company: "Picxele",
        period: "Sep 2023 - Feb 2024",
        description: "Created intuitive interface layouts and visual designs for mobile and web platforms, demonstrating an organized and autonomous work ethic."
    }
];

const education: EduType[] = [
    {
        id: 1,
        degree: "Master of Computer Applications (MCA)",
        institution: "Vivekananda Institute of Professional Studies",
        period: "Expected: 2024 – 2026"
    },
    {
        id: 2,
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "Maharaja Surajmal Institute",
        period: "GPA: 9.025 | 2020 – 2023"
    }
];

const Experience: React.FC = () => {
    return (
        <section id="experience" className="py-24 md:py-32 bg-gray-50 dark:bg-[#020617] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Work Experience */}
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center mb-12"
                        >
                            <span className="w-12 h-1 bg-indigo-600 rounded-full mr-4"></span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Experience</h2>
                        </motion.div>
                        
                        <div className="relative border-l-2 border-indigo-200 dark:border-slate-700 ml-4 md:ml-6 space-y-12">
                            {experiences.map((exp, index) => (
                                <motion.div 
                                    key={exp.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="pl-8 md:pl-12 relative timeline-item group"
                                >
                                    {/* Dot */}
                                    <div className="absolute -left-[9px] top-6 w-5 h-5 rounded-full border-4 border-white dark:border-[#020617] bg-indigo-600 transition-transform duration-300 group-hover:scale-125" />
                                    
                                    <div className="card p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex flex-wrap justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">{exp.period}</span>
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">{exp.company}</p>
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{exp.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    <div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center mb-12"
                        >
                            <span className="w-12 h-1 bg-pink-600 rounded-full mr-4"></span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white">Education</h2>
                        </motion.div>

                        <div className="relative border-l-2 border-pink-200 dark:border-slate-700 ml-4 md:ml-6 space-y-12">
                            {education.map((edu, index) => (
                                <motion.div 
                                    key={edu.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                                    className="pl-8 md:pl-12 relative timeline-item group"
                                >
                                     {/* Dot */}
                                     <div className="absolute -left-[9px] top-6 w-5 h-5 rounded-full border-4 border-white dark:border-[#020617] bg-pink-600 transition-transform duration-300 group-hover:scale-125" />

                                    <div className="card p-8 rounded-2xl bg-white dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{edu.degree}</h3>
                                        <p className="text-pink-600 dark:text-pink-400 mb-2 font-medium">{edu.institution}</p>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm">{edu.period}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;