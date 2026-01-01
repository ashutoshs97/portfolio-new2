import React from 'react';
import { ExternalLink, Linkedin, Github, Dribbble, PenTool, Award, Image } from 'lucide-react';
import { Profile } from '../types';
import { motion } from 'framer-motion';

const profiles: Profile[] = [
    {
        id: 'behance',
        name: 'Behance',
        url: 'https://behance.net/ashutoshs97',
        iconColor: '#053eff',
        icon: <span className="text-2xl font-bold">Bē</span>
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        url: 'https://linkedin.com/in/ashutoshs97',
        iconColor: '#0077B5',
        icon: <Linkedin size={32} />
    },
    {
        id: 'dribbble',
        name: 'Dribbble',
        url: 'https://dribbble.com/ashutoshs97',
        iconColor: '#ea4c89',
        icon: <Dribbble size={32} />
    },
    {
        id: 'github',
        name: 'GitHub',
        url: 'https://github.com/ashutoshs97',
        iconColor: '#111',
        icon: <Github size={32} />
    },
    {
        id: 'figma',
        name: 'Figma',
        url: 'https://www.figma.com/@ashutoshs97',
        iconColor: '#A259FF',
        icon: <PenTool size={32} />
    },
    {
        id: 'genai',
        name: 'GenAI Art',
        url: 'https://ashutoshuix.wixsite.com/genaiart',
        iconColor: '#9333ea',
        icon: <Image size={32} />
    },
    {
        id: 'certs',
        name: 'Certificates',
        url: 'https://www.linkedin.com/in/ashutoshs97/details/certifications/',
        iconColor: '#f59e0b',
        icon: <Award size={32} />
    }
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
};

const Profiles: React.FC = () => {
    return (
        <section id="profiles" className="py-24 md:py-32 bg-gray-50 dark:bg-[#020617] transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                     <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">Find Me Online</h2>
                     <p className="text-slate-600 dark:text-slate-400">Connect with me across various platforms</p>
                </motion.div>
                
                <motion.div 
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {profiles.map((profile) => (
                        <motion.a 
                            key={profile.id}
                            variants={item}
                            href={profile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-100 dark:border-slate-700 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-hover overflow-hidden"
                            style={{ '--icon-color': profile.iconColor } as React.CSSProperties}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--icon-color)] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                            <div 
                                className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-gray-50 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 transition-all duration-300 group-hover:scale-110 shadow-inner text-slate-700 dark:text-slate-400 group-hover:text-[var(--icon-color)]"
                            >
                                {profile.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-[var(--icon-color)] transition-colors">{profile.name}</h3>
                            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold inline-flex items-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                View Profile <ExternalLink size={12} className="ml-1" />
                            </p>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Profiles;