import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import StatCounter from '../ui/StatCounter';
import ClayCard from '../ui/ClayCard';
import { Utensils, Globe2, Home, TrendingUp } from 'lucide-react';

const stats = [
    { icon: <Utensils size={24} />, label: 'Meals Saved', value: 48320, suffix: '+', color: '#059669' },
    { icon: <Globe2 size={24} />, label: 'CO2 Prevented', value: 19328, suffix: ' kg', color: '#0ea5e9' },
    { icon: <Home size={24} />, label: 'NGOs Supported', value: 142, suffix: '', color: '#8b5cf6' },
    { icon: <TrendingUp size={24} />, label: 'Active Rescuers', value: 856, suffix: '', color: '#f59e0b' },
];

const ImpactCounters = () => {
    const { isDark } = useTheme();

    return (
        <section className={`py-24 px-6 ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <div className="text-[11px] uppercase font-bold text-primary tracking-[0.2em] mb-4">Real-Time Impact Analytics</div>
                    <h2 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight max-w-2xl mx-auto leading-tight`}>
                        Measurable contributions to a <span className="text-primary italic">Better Planet.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <ClayCard key={i} delay={i * 0.1} className="relative overflow-hidden group">
                            <div className="flex items-start justify-between mb-8">
                                <div className={`p-3 rounded-xl flex items-center justify-center transition-colors`} style={{ backgroundColor: `${stat.color}10`, color: stat.color }}>
                                    {stat.icon}
                                </div>
                                <div className={`text-[10px] font-bold px-2 py-1 rounded bg-slate-500/10 text-slate-500 uppercase tracking-tighter`}>Live</div>
                            </div>

                            <div className="space-y-1">
                                <div className={`text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    <StatCounter end={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className={`text-xs font-bold uppercase tracking-widest text-slate-400`}>
                                    {stat.label}
                                </div>
                            </div>

                            {/* Decorative background element */}
                            <div className="absolute -bottom-2 -right-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                                {stat.icon}
                            </div>
                        </ClayCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactCounters;