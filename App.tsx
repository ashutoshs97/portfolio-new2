import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Profiles from './components/Profiles';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import DesignShowcase from './components/DesignShowcase';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import NotFound from './components/NotFound';
import Preloader from './components/Preloader';
import Chatbot from './components/Chatbot';
import AtAGlancePopup from './components/AtAGlancePopup';
import Lenis from 'lenis';

const Home: React.FC = () => {
    return (
        <div className="relative z-10 bg-gray-50 dark:bg-[#020617] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500">
            <Header />
            <main className="flex-grow">
                <Hero />
                <About />
                <Profiles />
                <Skills />
                <Experience />
                <Projects />
                <DesignShowcase />
                <Testimonials />
                <Contact />
            </main>
        </div>
    );
};

const AppContent: React.FC = () => {
    const [isPreloading, setIsPreloading] = useState(true);
    const [footerHeight, setFooterHeight] = useState(0);
    const footerRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    useEffect(() => {
        // Initialize Lenis for Smooth Scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Scroll Progress
        const handleScroll = () => {
            const progressBar = document.getElementById('progress-bar');
            if (progressBar) {
                const scrollable = document.documentElement.scrollHeight - window.innerHeight;
                const scrolled = window.scrollY;
                const progress = scrollable > 0 ? (scrolled / scrollable) * 100 : 0;
                progressBar.style.width = `${progress}%`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            lenis.destroy();
        };
    }, []);

    // Initial theme check & Dynamic Favicon
    useEffect(() => {
        const updateTheme = () => {
            const isDark = localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
            
            // Dynamic Favicon
            let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (!link) {
                link = document.createElement('link');
                link.rel = 'icon';
                document.head.appendChild(link);
            }
            link.href = isDark ? 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⚡</text></svg>' : 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>✨</text></svg>';

            if (isDark) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        };

        updateTheme();
        // Listen for storage changes if theme changes in another tab
        window.addEventListener('storage', updateTheme);
        return () => window.removeEventListener('storage', updateTheme);
    }, []);

    // Footer Reveal Height calculation
    useEffect(() => {
        if (!footerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setFooterHeight(entry.target.clientHeight);
            }
        });
        observer.observe(footerRef.current);
        return () => observer.disconnect();
    }, []);

    const isHome = location.pathname === '/';

    return (
        <>
            <div id="progress-bar"></div>
            <CustomCursor />
            <Chatbot />
            <AtAGlancePopup />
            
            {isPreloading ? (
                <Preloader onComplete={() => setIsPreloading(false)} />
            ) : (
                <div style={{ paddingBottom: isHome ? footerHeight : 0 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    
                    {/* Fixed Footer Behind Content */}
                    <div 
                        ref={footerRef}
                        className={`fixed bottom-0 left-0 w-full z-0 transition-opacity duration-300 ${!isHome && 'hidden'}`}
                    >
                        <Footer />
                    </div>
                </div>
            )}
        </>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;