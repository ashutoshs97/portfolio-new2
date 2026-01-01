import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;
        if (!cursor || !follower) return;

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        const speed = 0.1;
        let isHovering = false;

        const moveCursor = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        };

        const animateFollower = () => {
            followerX += (mouseX - followerX) * speed;
            followerY += (mouseY - followerY) * speed;

            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;

            requestAnimationFrame(animateFollower);
        };

        const handleMouseEnter = () => {
            isHovering = true;
            cursor.classList.add('hover-effect');
            follower.classList.add('hover-effect');
        };

        const handleMouseLeave = () => {
            isHovering = false;
            cursor.classList.remove('hover-effect');
            follower.classList.remove('hover-effect');
        };

        window.addEventListener('mousemove', moveCursor);
        const animFrame = requestAnimationFrame(animateFollower);

        // Attach listeners to interactive elements dynamically
        const interactiveSelectors = 'a, button, .interactive, input, textarea, .cursor-hover';
        
        const attachListeners = () => {
            const elements = document.querySelectorAll(interactiveSelectors);
            elements.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        attachListeners();
        // Re-attach listeners periodically for dynamic content (simple approach)
        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            cancelAnimationFrame(animFrame);
            observer.disconnect();
            
            const elements = document.querySelectorAll(interactiveSelectors);
            elements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="cursor hidden md:block" />
            <div ref={followerRef} className="cursor-follower hidden md:block" />
        </>
    );
};

export default CustomCursor;