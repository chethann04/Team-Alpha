import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Calendar, Package, ArrowRight, CheckCircle2, Clock, MapPin, TrendingUp } from 'lucide-react';

const WeeklyActivity = ({ role = 'donor' }) => {
    const { isDark } = useTheme();

    // Mock data based on role
    const activityData = {
        donor: [
            { id: 1, title: 'Rescue: Organic Grains', date: '2 days ago', status: 'Delivered', value: '4.2 kg', icon: <Package size={16} />, color: 'text-emerald-500' },
            { id: 2, title: 'Quality Check: Apples', date: '4 days ago', status: 'Verified', value: '98% Intel', icon: <CheckCircle2 size={16} />, color: 'text-sky-500' },
            { id: 3, title: 'Rescue: Canteen Surplus', date: '6 days ago', status: 'Collected', value: '12.5 kg', icon: <ArrowRight size={16} />, color: 'text-amber-500' },
        ],
        rider: [
            { id: 1, title: 'Mission: NGO Drop-off', date: '1 day ago', status: 'Completed', value: '+50 Karma', icon: <TrendingUp size={16} />, color: 'text-emerald-500' },
            { id: 2, title: 'Pickup: Downtown Cafe', date: '3 days ago', status: 'Success', value: '8.2 km', icon: <MapPin size={16} />, color: 'text-sky-500' },
            { id: 3, title: 'Active Shift: 4h 20m', date: '5 days ago', status: 'Logged', value: '12 Rescues', icon: <Clock size={16} />, color: 'text-primary' },
        ],
        corporate: [
            { id: 1, title: 'Weekly ESG Audit', date: '1 day ago', status: 'Certified', value: 'A+ Grade', icon: <CheckCircle2 size={16} />, color: 'text-emerald-500' },
            { id: 2, title: 'Surplus Prediction Run', date: '4 days ago', status: 'Optimal', value: '14.8kg Target', icon: <TrendingUp size={16} />, color: 'text-sky-500' },
            { id: 3, title: 'Canteen Logistics Sync', date: 'Week Start', status: 'Active', value: '3 Riders', icon: <Clock size={16} />, color: 'text-amber-500' },
        ],
        ngo: [
            { id: 1, title: 'Urgency Match: High Priority', date: '2 days ago', status: 'Resolved', value: '45 Meals', icon: <Package size={16} />, color: 'text-rose-500' },
            { id: 2, title: 'Incoming Batch: Rider #12', date: '4 days ago', status: 'Distributed', value: '12.4 kg', icon: <MapPin size={16} />, color: 'text-emerald-500' },
            { id: 3, title: 'Resource Sync Root', date: '6 days ago', status: 'Verified', value: 'Intel High', icon: <Clock size={16} />, color: 'text-sky-500' },
        ]
    };

    const systemActivity = [
        ...activityData.donor.map(a => ({ ...a, roleLabel: 'DONOR' })),
        ...activityData.rider.map(a => ({ ...a, roleLabel: 'RIDER' })),
        ...activityData.ngo.map(a => ({ ...a, roleLabel: 'NGO' })),
        ...activityData.corporate.map(a => ({ ...a, roleLabel: 'CORP' }))
    ].sort(() => Math.random() - 0.5).slice(0, 10); // Mock sort/limit

    const currentActivity = role === 'system' ? systemActivity : (activityData[role] || activityData.donor);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>
                        <Calendar size={20} />
                    </div>
                    <div>
                        <h3 className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-stone-900 uppercase'}`}>Last 7 Days</h3>
                        <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>Protocol Activity Log</p>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border 
                    ${isDark ? 'bg-white/5 border-white/5 text-stone-500' : 'bg-stone-100 border-stone-200 text-stone-400'}`}>
                    Live Intel
                </div>
            </div>

            <div className="grid gap-4">
                {currentActivity.map((item, i) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-5 rounded-2xl border transition-all duration-300 group
                            ${isDark
                                ? 'bg-stone-900 border-white/5 hover:border-emerald-500/30'
                                : 'bg-white border-stone-100 hover:border-emerald-500/30 shadow-sm'}`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110
                                    ${isDark ? 'bg-white/5' : 'bg-stone-50'} ${item.color}`}>
                                    {item.icon}
                                </div>
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-black tracking-tight">{item.title}</h4>
                                        {item.roleLabel && (
                                            <span className={`text-[8px] px-1.5 py-0.5 rounded border ${isDark ? 'bg-white/5 border-white/10 text-stone-400' : 'bg-stone-100 border-stone-200 text-stone-500'} font-black`}>
                                                {item.roleLabel}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>{item.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-stone-700" />
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.status}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-black tracking-tighter">{item.value}</div>
                                <div className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">Impact Metric</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <button className={`w-full py-4 rounded-xl border-2 border-dashed transition-all font-black text-[10px] uppercase tracking-[0.2em]
                ${isDark
                    ? 'border-white/5 text-stone-600 hover:border-emerald-500/20 hover:text-emerald-500'
                    : 'border-stone-100 text-stone-400 hover:border-emerald-500/20 hover:text-emerald-500'}`}>
                Export Weekly Audit Report (PDF)
            </button>
        </div>
    );
};

export default WeeklyActivity;
