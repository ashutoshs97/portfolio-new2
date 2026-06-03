import React, { useState } from 'react';
import { useClickSound } from '../hooks/useSound';
import { motion, AnimatePresence, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';
import Marquee from 'react-fast-marquee';

const designImages = [
    'images/Checkout.webp',
    'images/Home Page.webp',
    'images/KYC.webp',
    'images/bondspe-app.webp',
    'images/bondspe-website-redesign.webp',
    'images/brief.webp',
    'images/checkout (2).webp',
    'images/design-showcase-9.webp',
    'images/design-showcase-10.webp',
    'images/design-showcase-11.webp',
    'images/design-showcase-12.webp',
    'images/kyc2.webp',
    'images/pennyupp-app-design.webp',
    'images/profit-plum-website.webp',
    'images/profit-plum.webp',
    'images/profitplum.webp',
    'images/saltoris-mobile-design.webp',
    'images/saltoris-web-design.webp',
    'images/saltoris.webp',
    'images/sign-up-page.webp',
    'images/testcase.webp',
    'images/Louvre Dating App.webp',
    'images/Napworks Website.webp',
    'images/SI Track Landing Page.webp',
    'images/SI Track Web Admin Dashboard for Virtual Inspection.webp',
    'images/SI Track Web Admin Dashboard.webp',
    'images/Virtual Inspection App Design.webp',
    'images/FlowDance Landing Page.webp'
];

const designs = designImages.map((img, i) => ({
    id: i + 1,
    image: img
}));

const DesignShowcase: React.FC = () => {
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const playSound = useClickSound();

    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const skewVelocity = useTransform(smoothVelocity, [-1000, 1000], [15, -15]);

    const handleImageClick = (image: string) => {
        playSound();
        setActiveImage(image);
    };

    const midPoint = Math.ceil(designs.length / 2);
    const topRow = designs.slice(0, midPoint);
    const bottomRow = designs.slice(midPoint);

    return (
        <section id="designs" className="py-24 md:py-32 bg-gray-50 dark:bg-[#020617] transition-colors duration-300 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">Design Showcase</h2>
                </motion.div>
            </div>
                
            {/* Infinite Marquees with Scroll Velocity Skew */}
            <motion.div style={{ skewY: skewVelocity }} className="w-full">
                <Marquee gradient={false} speed={40} pauseOnHover={true} className="mb-8 overflow-hidden py-4">
                    {topRow.map((design) => (
                        <div 
                            key={design.id} 
                            onClick={() => handleImageClick(design.image)}
                            className="mx-4 relative group overflow-hidden rounded-2xl cursor-zoom-in shadow-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/50 dark:border-white/10 p-2 w-[280px] h-[220px] md:w-[350px] md:h-[280px]"
                        >
                            <div className="w-full h-full rounded-xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                                <img src={design.image} alt={`Design ${design.id}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                        </div>
                    ))}
                </Marquee>

                <Marquee gradient={false} speed={35} direction="right" pauseOnHover={true} className="overflow-hidden py-4">
                    {bottomRow.map((design) => (
                        <div 
                            key={design.id} 
                            onClick={() => handleImageClick(design.image)}
                            className="mx-4 relative group overflow-hidden rounded-2xl cursor-zoom-in shadow-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/50 dark:border-white/10 p-2 w-[280px] h-[220px] md:w-[350px] md:h-[280px]"
                        >
                            <div className="w-full h-full rounded-xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
                                <img src={design.image} alt={`Design ${design.id}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            </div>
                        </div>
                    ))}
                </Marquee>
            </motion.div>

            <div className="text-center mt-12 space-y-6">
                <div className="block mt-4">
                     <a href="https://www.behance.net" target="_blank" rel="noreferrer" className="nav-link text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 font-medium cursor-hover inline-block pb-1">
                        View Full Portfolio on Behance
                    </a>
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {activeImage && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl flex items-center justify-center z-[100] p-4 cursor-pointer"
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