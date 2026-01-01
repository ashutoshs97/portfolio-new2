import React, { useState, useEffect } from 'react';
import { Testimonial } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials: Testimonial[] = [
    {
        id: 1,
        text: "Ashutosh's ability to translate complex requirements into intuitive and beautiful user interfaces is exceptional. He was a key player in our project's success.",
        author: "Ashish Kumar",
        position: "CEO of Saltoris",
        image: "https://picsum.photos/100/100?random=1"
    },
    {
        id: 2,
        text: "Working with Ashutosh was a pleasure. He is a great communicator and a true team player who consistently delivers high-quality work on time.",
        author: "Deepanshu Kumar",
        position: "CEO of Pennyupp & Bondspe",
        image: "https://picsum.photos/100/100?random=2"
    },
    {
        id: 3,
        text: "Ashutosh has a fantastic eye for design and a deep understanding of user experience. He was instrumental in shaping the visual identity of our platform.",
        author: "Rishav",
        position: "Picxele",
        image: "https://picsum.photos/100/100?random=3"
    }
];

const Testimonials: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="testimonials" className="py-24 md:py-32 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">What People Are Saying</h2>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="relative h-96 md:h-80"
                >
                    <AnimatePresence mode='wait'>
                        <motion.div 
                            key={testimonials[activeIndex].id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="bg-gray-50 dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-slate-700 shadow-xl max-w-3xl w-full">
                                <div className="text-4xl text-indigo-300 dark:text-indigo-900 absolute top-8 left-8">"</div>
                                <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 text-center italic font-medium leading-relaxed relative z-10 mb-8">
                                    {testimonials[activeIndex].text}
                                </p>
                                <div className="flex items-center justify-center">
                                    <img src={testimonials[activeIndex].image} alt={testimonials[activeIndex].author} className="w-14 h-14 rounded-full object-cover border-2 border-indigo-600" />
                                    <div className="ml-4 text-left">
                                        <p className="font-bold text-lg text-slate-900 dark:text-white">{testimonials[activeIndex].author}</p>
                                        <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">{testimonials[activeIndex].position}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                <div className="flex justify-center mt-8 space-x-3">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-2 rounded-full transition-all duration-300 cursor-hover ${index === activeIndex ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-300 dark:bg-slate-700 hover:bg-gray-400'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;