import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
    const [status, setStatus] = useState<string>('');
    const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = e.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch('https://formspree.io/f/xpwjwaal', {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus("Thanks for your submission! I'll get back to you soon.");
                setStatusType('success');
                form.reset();
            } else {
                const result = await response.json();
                if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
                    setStatus(result.errors.map((error: any) => error.message).join(", "));
                } else {
                    setStatus("Oops! There was a problem submitting your form");
                }
                setStatusType('error');
            }
        } catch (error) {
            setStatus("Oops! There was a problem submitting your form");
            setStatusType('error');
        } finally {
            setIsSubmitting(false);
            // Clear success message after 5 seconds
            setTimeout(() => {
                if (statusType === 'success') {
                    setStatus('');
                    setStatusType('');
                }
            }, 5000);
        }
    };

    return (
        <section id="contact" className="py-24 md:py-32 bg-gray-50 dark:bg-[#020617] transition-colors duration-300 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-indigo-200 dark:bg-indigo-900/20 rounded-full blur-3xl opacity-30" />
                <div className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] bg-pink-200 dark:bg-pink-900/20 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Let's Connect</h2>
                    <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                        I'm currently available for freelance work and open to discussing new projects.
                    </p>
                </motion.div>

                <div className="max-w-lg mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-slate-700">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="name">Name</label>
                            <input 
                                id="name" type="text" name="name" 
                                className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow cursor-hover" 
                                placeholder="Your Name" required 
                            />
                        </div>
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="email">Email</label>
                            <input 
                                id="email" type="email" name="email" 
                                className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow cursor-hover" 
                                placeholder="name@example.com" required 
                            />
                        </div>
                        <div>
                            <label className="block text-slate-700 dark:text-slate-300 text-sm font-bold mb-2 ml-1" htmlFor="message">Message</label>
                            <textarea 
                                id="message" name="message" rows={4} 
                                className="w-full bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow resize-none cursor-hover" 
                                placeholder="Tell me about your project..."
                                required
                            ></textarea>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            type="submit" 
                            className={`btn-shine w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-600/30 cursor-hover text-lg flex items-center justify-center ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                        >
                            {isSubmitting ? (
                                <span className="inline-block h-5 w-5 border-2 border-white border-r-transparent rounded-full animate-spin mr-2"></span>
                            ) : null}
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>
                    </form>
                    
                    <AnimatePresence>
                        {status && (
                            <motion.div 
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                className={`text-center p-4 rounded-lg border ${statusType === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'}`}
                            >
                                {status}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Contact;