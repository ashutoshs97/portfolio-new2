import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useClickSound } from '../hooks/useSound';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
        setIsMobileMenuOpen(false);
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = ['About', 'Profiles', 'Skills', 'Projects', 'Testimonials'];

    return (
        <motion.header 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 top-0 transition-all duration-300 ${isScrolled ? 'glass-effect shadow-md border-b border-gray-200/50 dark:border-gray-800/50' : 'bg-transparent'}`}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-6">
                <div className="flex items-center justify-between h-20">
                    <div className="shrink-0 mr-4">
                        <a 
                            href="#hero" 
                            onClick={(e) => handleNavClick(e, '#hero')}
                            className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white cursor-hover"
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
                                <a 
                                    href="#contact"
                                    onClick={(e) => handleNavClick(e, '#contact')}
                                    className="btn-shine ml-4 text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-full font-medium cursor-hover inline-block shadow-lg shadow-indigo-600/20"
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                <button 
                                    onClick={toggleTheme} 
                                    className="ml-4 p-2.5 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 transition-colors cursor-hover"
                                    aria-label="Toggle Theme"
                                >
                                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                                </button>
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile Toggle */}
                    <div className="md:hidden flex items-center">
                        <button 
                            onClick={toggleTheme} 
                            className="mr-4 p-2 rounded-full bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-900 dark:text-white"
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden"
                    >
                        <nav className="px-5 pb-6 pt-2 flex flex-col space-y-2">
                            {navItems.map((item) => (
                                <a 
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                    {item}
                                </a>
                            ))}
                            <a 
                                href="#contact"
                                onClick={(e) => handleNavClick(e, '#contact')}
                                className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800"
                            >
                                Contact
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;