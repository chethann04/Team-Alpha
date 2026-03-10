import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import { Box, Thermometer, Clock, ShieldCheck } from 'lucide-react';

const FoodBinDashboard = () => {
    const { isDark } = useTheme();

    const binStats = [
        { label: 'Current Load', value: '42%', color: 'primary' },
        { label: 'Avg Temp', value: '4°C', color: 'mint' },
        { label: 'Sanitized', value: '100%', color: 'mint' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
                {binStats.map((stat, i) => (
                    <ClayCard key={i} className="text-center py-4">
                        <div className={`text-xl font-black text-${stat.color}`}>{stat.value}</div>
                        <div className="text-[10px] uppercase font-bold text-gray-500 tracking-tighter">{stat.label}</div>
                    </ClayCard>
                ))}
            </div>

            <ClayCard className="relative overflow-hidden pt-8 pb-12 px-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 rounded-xl bg-primary text-white"><Box size={24} /></div>
                    <div>
                        <h3 className={`font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>Smart ResQ Bin #104</h3>
                        <p className="text-xs text-gray-500">Koramangala Hub • Active</p>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="relative h-48 w-full bg-gray-200/10 rounded-3xl border-2 border-dashed border-gray-300/20 flex items-end overflow-hidden">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: '42%' }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="w-full bg-gradient-to-t from-primary/40 to-primary/10 flex items-center justify-center"
                        >
                            <span className="text-primary font-black text-2xl animate-pulse">42% FULL</span>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-2xl flex items-center gap-3 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                            <Thermometer className="text-red-400" size={20} />
                            <div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase">Temp</div>
                                <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>4.2°C</div>
                            </div>
                        </div>
                        <div className={`p-4 rounded-2xl flex items-center gap-3 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                            <Clock className="text-primary" size={20} />
                            <div>
                                <div className="text-[10px] font-bold text-gray-500 uppercase">Last Pickup</div>
                                <div className={`text-sm font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>24m ago</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-mint/10 border border-mint/20">
                        <ShieldCheck className="text-mint" size={20} />
                        <span className="text-xs font-bold text-mint uppercase">✓ UV-C Sanitization Cycle Complete</span>
                    </div>
                </div>
            </ClayCard>
        </div>
    );
};

export default FoodBinDashboard;