import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className, onClick }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // Physics-based spring for smooth magnetic effect
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const x = useSpring(0, springConfig);
    const y = useSpring(0, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        
        // Move element slightly towards the cursor (magnet strength factor: 0.2)
        x.set(middleX * 0.2);
        y.set(middleY * 0.2);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ x, y }}
            className={`inline-block ${className || ''}`}
        >
            {/* The child will receive the magnetic animation */}
            <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default MagneticButton;
