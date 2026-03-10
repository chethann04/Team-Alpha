import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const testimonials = [
    { name: 'Meera Krishnan', role: 'Restaurant Owner', text: 'ResQ-AI made food donation effortless. The AI safety check gives us confidence every time.', avatar: '👩‍🍳' },
    { name: 'Arjun Sharma', role: 'ResQ Rider', text: 'I have completed 60+ rescues. The karma system keeps me motivated. Food Hero badge is my pride!', avatar: '🚴‍♂️' },
    { name: 'Hope Foundation', role: 'NGO Partner', text: 'The urgency matching system ensures our most critical requests are addressed first. Life-changing.', avatar: '🏠' },
    { name: 'TechCorp CSR Team', role: 'Corporate Sponsor', text: 'Our canteen now has zero waste days thanks to ResQ-AI surplus prediction. The ESG reports are excellent.', avatar: '🏢' },
];

const Testimonials = () => {
    const { isDark } = useTheme();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={`py-10 px-6 ${isDark ? 'bg-white/5' : 'bg-white/50'}`}>
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={`text-4xl font-extrabold text-center mb-12 ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
                What Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-mint">
                    Community Says
                </span>
            </motion.h2>

            <div className="max-w-2xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -60 }}
                        transition={{ duration: 0.4 }}
                        className="clay-card p-8 text-center"
                    >
                        <div className="text-5xl mb-4">{testimonials[current].avatar}</div>
                        <p className={`text-lg italic mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            "{testimonials[current].text}"
                        </p>
                        <div className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {testimonials[current].name}
                        </div>
                        <div className="text-primary text-sm">{testimonials[current].role}</div>
                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-center gap-2 mt-6">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-primary w-6' : 'bg-gray-400'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;