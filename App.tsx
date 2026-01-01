import React, { useEffect, useState } from 'react';
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

const App: React.FC = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);

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
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initial theme check
    useEffect(() => {
        if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    if (!isLoaded) return null;

    return (
        <>
            <div id="progress-bar"></div>
            <CustomCursor />
            
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

            <Footer />
        </>
    );
};

export default App;