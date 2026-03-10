import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck, Truck, MapPin, CheckCircle2 } from 'lucide-react';
import ClayCard from '../ui/ClayCard';

const steps = [
    {
        icon: <ShieldCheck size={32} />,
        title: 'AI Safety Check',
        desc: 'Gemini Vision AI scans food quality, freshness, and safety metrics before rescue.',
        color: '#63b3ed'
    },
    {
        icon: <Truck size={32} />,
        title: 'Smart Pickup',
        desc: 'Optimized matching connects the nearest rider for instant collection.',
        color: '#68d391'
    },
    {
        icon: <MapPin size={32} />,
        title: 'Live Tracking',
        desc: 'Real-time telemetry and polyline route animation tracks every meal.',
        color: '#805ad5'
    },
    {
        icon: <CheckCircle2 size={32} />,
        title: 'Impact Delivery',
        desc: 'Successful delivery triggers karma rewards, CO2 logging, and certificates.',
        color: '#ed8936'
    },
];

const HowItWorks = () => {
    const { isDark } = useTheme();

    return (
        <section className={`py-24 px-6 ${isDark ? 'bg-white/5' : 'bg-white/50 border-y border-gray-100'}`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
            >
                <div className="text-[10px] uppercase font-black text-primary tracking-[0.3em] mb-4">The Story of a Rescue</div>
                <h2 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-gray-900'} tracking-tighter`}>
                    Four Steps to{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-mint underline decoration-mint/20 underline-offset-8">
                        Zero Waste
                    </span>
                </h2>
            </motion.div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {steps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group"
                    >
                        <ClayCard className="h-full border-2 border-transparent hover:border-primary/20 transition-all duration-500 hover:-translate-y-2">
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                                style={{ background: `${step.color}15`, color: step.color }}
                            >
                                {step.icon}
                            </div>
                            <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Phase 0{i + 1}</div>
                            <h3 className={`text-xl font-black mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {step.title}
                            </h3>
                            <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-600'} font-medium`}>
                                {step.desc}
                            </p>
                        </ClayCard>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;