import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Flame, Trophy, Star, Zap, Target, TrendingUp, Award } from 'lucide-react';
import ClayCard from './ClayCard';

const AchievementsSection = ({ role = 'donor', streak = 5, milestones = [] }) => {
    const { isDark } = useTheme();

    const roleData = {
        donor: {
            title: 'Impact Milestones',
            subtitle: 'Global Recovery Progress',
            metrics: [
                { label: 'Avg Recovery', value: '14.2 kg', icon: <TrendingUp size={16} />, color: 'text-emerald-500' },
                { label: 'Network Rank', value: 'Top 5%', icon: <Award size={16} />, color: 'text-sky-500' },
                { label: 'CO2 Saved', value: '492 kg', icon: <Zap size={16} />, color: 'text-amber-500' },
            ]
        },
        rider: {
            title: 'Mission Mastery',
            subtitle: 'Logistics Hero Status',
            metrics: [
                { label: 'Success Rate', value: '98.4%', icon: <Target size={16} />, color: 'text-rose-500' },
                { label: 'Avg Response', value: '4.2 min', icon: <Zap size={16} />, color: 'text-amber-500' },
                { label: 'Total Karma', value: '840', icon: <Flame size={16} />, color: 'text-orange-500' },
            ]
        }
    };

    const data = roleData[role] || roleData.donor;

    return (
        <div id="milestones" className="space-y-8 py-10">
            {/* Header with Streak */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <h2 className={`text-3xl font-[900] ${isDark ? 'text-white' : 'text-stone-900'} uppercase tracking-tighter`}>
                        {data.title}
                    </h2>
                    <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                        {data.subtitle}
                    </p>
                </div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 rounded-[2rem] border-2 flex items-center gap-4 px-8 
                        ${isDark ? 'bg-orange-500/10 border-orange-500/30 text-orange-500' : 'bg-orange-50 border-orange-200 text-orange-600'}`}
                >
                    <div className="relative">
                        <Flame size={32} className="fill-current animate-pulse" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                            <Star size={8} className="text-orange-500 fill-current" />
                        </div>
                    </div>
                    <div>
                        <div className="text-2xl font-[1000] leading-none">{streak} DAY</div>
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Active Streak</div>
                    </div>
                </motion.div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {data.metrics.map((m, i) => (
                    <ClayCard key={i} className="p-6 text-center group">
                        <div className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center mb-4 ${isDark ? 'bg-white/5' : 'bg-stone-50'} ${m.color}`}>
                            {m.icon}
                        </div>
                        <div className={`text-xl font-black ${isDark ? 'text-white' : 'text-stone-900'} tracking-tighter`}>{m.value}</div>
                        <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mt-1">{m.label}</div>
                    </ClayCard>
                ))}
            </div>

            {/* Achievement Badges Row */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-black uppercase tracking-widest ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>Unlocked Protocol Badges</h3>
                    <span className="text-[10px] font-bold text-primary cursor-pointer hover:underline">View All</span>
                </div>
                <div className="flex flex-wrap gap-4">
                    {['Zero Waste Champion', 'SDG 12 Master', 'Climate Guardian', 'Food Security Elite'].map((badge, i) => (
                        <div
                            key={i}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all hover:scale-105 cursor-default
                                ${isDark ? 'bg-stone-900 border-white/5 text-stone-400 hover:border-emerald-500/30' : 'bg-white border-stone-100 text-stone-500 hover:border-emerald-500/30 shadow-sm'}`}
                        >
                            <Trophy size={12} className="inline mr-2 text-amber-500" />
                            {badge}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AchievementsSection;
