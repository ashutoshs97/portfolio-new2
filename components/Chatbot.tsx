import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { useClickSound } from '../hooks/useSound';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

const predefinedAnswers: Record<string, string> = {
    "experience": "I have 2+ years of solid experience working with companies like Saltoris, Pennyupp, Bondspe, and Picxele as a UI/UX & Product Designer. I'm currently designing digital experiences at Nap Works!",
    "skills": "My core skills are UI/UX Design, Wireframing, Prototyping, and Design Systems. I use Figma, Framer, and Webflow. On the development side, I know React, Tailwind CSS, and standard web technologies.",
    "education": "I'm currently pursuing my MCA from Vivekananda Institute of Professional Studies (2024-2026), and I completed my BCA from Maharaja Surajmal Institute with a 9.025 GPA.",
    "projects": "I've designed mobile apps like Saltoris and Penny Upp, and web platforms like Bondspe and Profit Plum. Scroll down to my Projects section to see my featured work!",
    "philosophy": "I believe in bridging the gap between aesthetic excellence and functional efficiency. Good design is intuitive, accessible, and solves real user problems.",
    "location": "I'm based in New Delhi, India! However, I am open to remote opportunities globally.",
    "contact": "You can reach out to me via the contact form at the bottom of the page, or download my resume from the Hero section!",
    "default": "I'm a smart interactive agent! Try clicking one of the quick prompts below."
};

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hi! I'm Ashutosh's AI Assistant. What would you like to know about him?", sender: 'bot' }
    ]);
    const playSound = useClickSound();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handlePrompt = (topic: string) => {
        playSound();
        const userMsg = { id: Date.now(), text: `Tell me about his ${topic.toLowerCase()}.`, sender: 'user' as const };
        setMessages(prev => [...prev, userMsg]);

        setTimeout(() => {
            const botMsg = { id: Date.now() + 1, text: predefinedAnswers[topic.toLowerCase()] || predefinedAnswers['default'], sender: 'bot' as const };
            setMessages(prev => [...prev, botMsg]);
        }, 600);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-16 right-0 w-[320px] md:w-[380px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-gray-200 dark:border-slate-700 shadow-2xl rounded-2xl overflow-hidden flex flex-col h-[480px]"
                    >
                        <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="font-bold text-sm">Ashutosh AI Assistant</span>
                            </div>
                            <button onClick={() => { playSound(); setIsOpen(false); }} className="hover:bg-indigo-700 p-1 rounded-md transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3">
                            {messages.map(msg => (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id} 
                                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white self-end rounded-tr-sm' : 'bg-gray-100 dark:bg-slate-800 text-slate-800 dark:text-white self-start rounded-tl-sm'}`}
                                >
                                    {msg.text}
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 backdrop-blur-md">
                            <p className="text-xs text-slate-500 mb-2 font-medium">Quick Prompts:</p>
                            <div className="flex flex-wrap gap-2">
                                {['Experience', 'Skills', 'Projects', 'Philosophy', 'Location', 'Contact'].map(topic => (
                                    <button 
                                        key={topic}
                                        onClick={() => handlePrompt(topic)}
                                        className="text-[11px] bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 px-3 py-1.5 rounded-full hover:bg-indigo-50 dark:hover:bg-slate-600 hover:border-indigo-200 transition-colors text-slate-700 dark:text-slate-300 shadow-sm"
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { playSound(); setIsOpen(!isOpen); }}
                className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-colors cursor-hover relative"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
                {!isOpen && (
                     <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default Chatbot;
