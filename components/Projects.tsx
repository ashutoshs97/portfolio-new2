import React, { useState, useRef } from 'react';
import { Project } from '../types';
import { useClickSound } from '../hooks/useSound';
import { motion, AnimatePresence, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const projects: Project[] = [
    { id: 1, title: 'Saltoris Mobile Design', category: 'mobile', description: 'Mobile application design for a water utility service.', images: ['images/projects/saltoris-mobile/1.webp'] },
    { id: 2, title: 'Penny Upp App Design', category: 'mobile', description: 'UI/UX design for a micro-investing mobile application.', images: ['images/projects/pennyupp-app/1.webp'] },
    { id: 3, title: 'Bondspe Website Redesign', category: 'web', description: 'A complete redesign of the Bondspe investment platform website.', images: ['images/projects/bondspe-website/1.webp'] },
    { id: 4, title: 'Saltoris Web Design', category: 'web', description: 'Web interface for the Saltoris water utility management system.', images: ['images/projects/saltoris-web/1.webp'] },
    { id: 5, title: 'Bondspe App Redesign', category: 'mobile', description: 'A fresh take on the Bondspe mobile application interface.', images: ['images/projects/bondspe-app/1.webp'] },
    { id: 6, title: 'Profit Plum Website Design', category: 'web', description: 'UI/UX design for the Profit Plum financial services website.', images: ['images/projects/profit-plum-website/1.webp'] },
    { id: 8, title: 'Napworks Website', category: 'web', description: 'A sleek and responsive corporate website design.', images: ['images/projects/napworks-website/1.webp', 'images/projects/napworks-website/Portfolio Hub.png'] },
    // { id: 10, title: 'SI Track Virtual Inspection Dashboard', category: 'web', description: 'Web admin dashboard interface for virtual inspections.', images: ['images/SI Track Web Admin Dashboard for Virtual Inspection.webp'] },
    // { id: 11, title: 'SI Track Admin Dashboard', category: 'web', description: 'Comprehensive web admin dashboard design.', images: ['images/SI Track Web Admin Dashboard.webp'] },
    // { id: 12, title: 'Virtual Inspection App', category: 'mobile', description: 'Mobile application interface for remote virtual inspections.', images: ['images/Virtual Inspection App Design.webp'] },
    // { id: 13, title: 'FlowDance Landing Page', category: 'web', description: 'Dynamic and engaging landing page design.', images: ['images/FlowDance Landing Page.webp'] },
];

const ProjectCard: React.FC<{ project: Project; onClick: (project: Project, index: number) => void }> = ({ project, onClick }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const filterId = `liquid-${project.id}`;
    
    const playSound = useClickSound();

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        playSound();
        setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        playSound();
        setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onClick(project, currentImageIndex)}
            className="group relative rounded-2xl overflow-hidden bg-white dark:bg-slate-800/80 backdrop-blur-xl border border-slate-100 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-hover"
        >
            {/* SVG Filter for Liquid Distortion */}
            <svg className="absolute w-0 h-0 pointer-events-none">
                <filter id={filterId}>
                    <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="1" result="noise" />
                    <motion.feDisplacementMap 
                        in="SourceGraphic" 
                        in2="noise" 
                        xChannelSelector="R" 
                        yChannelSelector="G" 
                        initial={{ scale: 0 }}
                        animate={{ scale: isHovered ? 30 : 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                    />
                </filter>
            </svg>

            <div 
               className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-20 mix-blend-overlay"
               style={{
                   background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4), transparent 40%)`
               }}
            />
            <div className="overflow-hidden h-64 relative bg-slate-200 dark:bg-slate-700">
                {!isLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-slate-300 dark:bg-slate-600 z-20" />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                
                <AnimatePresence mode="wait">
                    <motion.img 
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src={project.images[currentImageIndex]} 
                        alt={`${project.title} - Image ${currentImageIndex + 1}`} 
                        onLoad={() => setIsLoaded(true)}
                        style={{ filter: isHovered ? `url(#${filterId})` : 'none' }}
                    />
                </AnimatePresence>

                {/* Carousel Controls */}
                {project.images.length > 1 && (
                    <>
                        <button 
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white shadow-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all cursor-hover"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button 
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white shadow-md border border-white/20 opacity-0 group-hover:opacity-100 transition-all cursor-hover"
                        >
                            <ChevronRight size={20} />
                        </button>
                        
                        {/* Dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                            {project.images.map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`h-1.5 rounded-full transition-all shadow-sm ${i === currentImageIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/70'}`} 
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="p-8 relative z-10">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-2 block">{project.category}</span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{project.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{project.description}</p>
            </div>
        </motion.div>
    );
};

const Projects: React.FC = () => {
    const [filter, setFilter] = useState<'all' | 'mobile' | 'web'>('all');
    const [activeProject, setActiveProject] = useState<{ project: Project; index: number } | null>(null);
    const playSound = useClickSound();
    
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [10, -10]);
    const scaleVelocity = useTransform(smoothVelocity, [-1000, 0, 1000], [1.1, 1, 1.1]);

    const filteredProjects = projects.filter(p => filter === 'all' || p.category === filter);

    return (
        <section id="projects" className="py-24 md:py-32 bg-gray-50 dark:bg-[#020617] transition-colors duration-300 relative">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.h2 
                        style={{ skewX: skewVelocity, scale: scaleVelocity }}
                        className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 display-font inline-block transform-origin-bottom"
                    >
                        Featured Projects
                    </motion.h2>
                    <br />
                    
                    <div className="flex justify-center space-x-2 p-1.5 bg-white dark:bg-slate-800 shadow-sm inline-flex rounded-full border border-gray-200 dark:border-slate-700">
                        {['all', 'mobile', 'web'].map((f) => (
                            <button
                                key={f}
                                onClick={() => { setFilter(f as any); playSound(); }}
                                className={`relative px-6 py-2 rounded-full font-medium capitalize text-sm transition-colors duration-200 cursor-hover
                                    ${filter === f ? 'text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                            >
                                {filter === f && (
                                    <motion.div 
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-indigo-600 rounded-full shadow-md"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{f}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} onClick={(p, idx) => { playSound(); setActiveProject({ project: p, index: idx }); }} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {activeProject && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[100] p-4 cursor-pointer"
                        onClick={() => setActiveProject(null)}
                    >
                        <motion.img 
                            key={activeProject.index}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            src={activeProject.project.images[activeProject.index]} 
                            alt={`Enlarged ${activeProject.project.title}`} 
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        />
                        <button className="absolute top-6 right-8 text-white/50 hover:text-white text-5xl font-light cursor-hover transition-colors">&times;</button>
                        
                        {activeProject.project.images.length > 1 && (
                            <>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playSound();
                                        setActiveProject(prev => prev ? { ...prev, index: (prev.index - 1 + prev.project.images.length) % prev.project.images.length } : null);
                                    }}
                                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all cursor-hover shadow-lg"
                                >
                                    <ChevronLeft size={32} />
                                </button>
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playSound();
                                        setActiveProject(prev => prev ? { ...prev, index: (prev.index + 1) % prev.project.images.length } : null);
                                    }}
                                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 md:p-4 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md text-white border border-white/20 transition-all cursor-hover shadow-lg"
                                >
                                    <ChevronRight size={32} />
                                </button>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;