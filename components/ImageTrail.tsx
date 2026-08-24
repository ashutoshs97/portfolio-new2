import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    'images/projects/bondspe-app/1.webp',
    'images/projects/saltoris-mobile/1.webp',
    'images/projects/profit-plum-website/1.webp',
    'images/Louvre Dating App.webp',
    'images/SI Track Landing Page.webp',
];

interface TrailImage {
    id: number;
    x: number;
    y: number;
    url: string;
}

const ImageTrail: React.FC = () => {
    const [trail, setTrail] = useState<TrailImage[]>([]);
    const mousePos = useRef({ x: 0, y: 0 });
    const lastMousePos = useRef({ x: 0, y: 0 });
    const imageIndex = useRef(0);
    const idCounter = useRef(0);

    useEffect(() => {
        // Only run on desktop/fine pointer
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };

            const dx = mousePos.current.x - lastMousePos.current.x;
            const dy = mousePos.current.y - lastMousePos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Create a new image if moved enough distance
            if (dist > 150) {
                lastMousePos.current = { ...mousePos.current };
                
                const newImg = {
                    id: idCounter.current++,
                    x: mousePos.current.x,
                    y: mousePos.current.y,
                    url: images[imageIndex.current % images.length],
                };
                
                imageIndex.current++;
                
                setTrail(prev => [...prev, newImg]);
                
                // Remove the image after animation completes
                setTimeout(() => {
                    setTrail(prev => prev.filter(img => img.id !== newImg.id));
                }, 1000);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
            <AnimatePresence>
                {trail.map((img) => (
                    <motion.img
                        key={img.id}
                        src={img.url}
                        initial={{ opacity: 0.8, scale: 0.5, x: img.x - 100, y: img.y - 100 }}
                        animate={{ opacity: 0, scale: 1.2, y: img.y + 50 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="absolute w-[200px] h-[250px] object-cover rounded-2xl shadow-2xl border-2 border-white/20"
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ImageTrail;
