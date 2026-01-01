import React from 'react';
import { Mail, Linkedin, PenTool, Github, Dribbble, Globe } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const links = [
        { icon: <Mail size={20} />, url: 'mailto:ashutoshuix@gmail.com', label: 'Email' },
        { icon: <Linkedin size={20} />, url: 'https://linkedin.com/in/ashutoshs97', label: 'LinkedIn' },
        { icon: <PenTool size={20} />, url: 'https://www.figma.com/@ashutoshs97', label: 'Figma' },
        { icon: <Globe size={20} />, url: 'https://behance.net/ashutoshs97', label: 'Behance' },
        { icon: <Github size={20} />, url: 'https://github.com/ashutoshs97', label: 'GitHub' },
        { icon: <Dribbble size={20} />, url: 'https://dribbble.com/ashutoshs97', label: 'Dribbble' },
    ];

    return (
        <footer className="py-8 bg-[#f3f4f6] dark:bg-[#0F172A] border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">&copy; {currentYear} Ashutosh Sharma. All rights reserved.</p>
                <div className="flex justify-center space-x-6 mt-4 flex-wrap">
                    {links.map((link, idx) => (
                        <a 
                            key={idx}
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-hover p-2"
                            aria-label={link.label}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;