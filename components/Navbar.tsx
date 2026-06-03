import React, { useState, useEffect } from 'react';
import { Moon, Sun, User, LayoutDashboard, Briefcase, Mail } from 'lucide-react';
import { useClickSound } from '../hooks/useSound';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const playSound = useClickSound();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        setIsDark(document.documentElement.classList.contains('dark'));
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        playSound();
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        playSound();
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = ['About', 'Profiles', 'Skills', 'Projects', 'Testimonials'];

    return (
        <>
            <motion.header 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed w-full z-50 top-0 transition-all duration-300 ${isScrolled ? 'glass-effect shadow-md border-b border-gray-200/50 dark:border-gray-800/50' : 'bg-transparent'}`}
            >
                <div className="max-w-7xl mx-auto px-5 sm:px-6">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <div className="shrink-0 mr-4">
                            <a 
                                href="#hero" 
                                onClick={(e) => handleNavClick(e, '#hero')}
                                className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white cursor-hover display-font"
                            >
                                Ashutosh<span className="text-indigo-600 dark:text-indigo-400">.</span>
                            </a>
                        </div>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex md:grow">
                            <ul className="flex grow justify-end flex-wrap items-center space-x-1">
                                {navItems.map((item) => (
                                    <li key={item}>
                                        <a 
                                            href={`#${item.toLowerCase()}`}
                                            onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                                            className="nav-link font-medium text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 px-4 py-2 flex items-center transition duration-150 ease-in-out cursor-hover"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <MagneticButton>
                                        <a 
                                            href="#contact"
                                            onClick={(e) => handleNavClick(e, '#contact')}
                                            className="btn-shine ml-4 text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-full font-medium cursor-hover inline-block shadow-lg shadow-indigo-600/20"
                                        >
                                            Contact
                                        </a>
                                    </MagneticButton>
                                </li>
                                <li>
                                    <button 
                                        onClick={toggleTheme} 
                                        className="ml-4 p-3 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors cursor-hover"
                                        aria-label="Toggle Theme"
                                    >
                                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        {/* Mobile Top Bar (Just Theme Toggle) */}
                        <div className="md:hidden flex items-center">
                            <button 
                                onClick={toggleTheme} 
                                className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-sm"
                            >
                                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Bottom App Bar */}
            <div className="md:hidden fixed bottom-0 left-0 w-full z-50 glass-effect border-t border-gray-200/50 dark:border-slate-800/50 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
                <nav className="flex justify-around items-center px-2 py-1">
                    {[
                        { name: 'About', icon: User },
                        { name: 'Skills', icon: LayoutDashboard },
                        { name: 'Projects', icon: Briefcase },
                        { name: 'Contact', icon: Mail },
                    ].map((item) => (
                        <a 
                            key={item.name}
                            href={`#${item.name.toLowerCase()}`}
                            onClick={(e) => handleNavClick(e, `#${item.name.toLowerCase()}`)}
                            className="flex flex-col items-center p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 active:scale-95 transition-transform"
                        >
                            <item.icon size={22} className="mb-1" />
                            <span className="text-[10px] font-bold">{item.name}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Header;