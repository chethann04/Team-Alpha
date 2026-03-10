import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import StatCounter from '../../components/ui/StatCounter';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyCarbon = [
    { month: 'Aug', co2: 1200 }, { month: 'Sep', co2: 1900 }, { month: 'Oct', co2: 1600 },
    { month: 'Nov', co2: 2800 }, { month: 'Dec', co2: 3800 }, { month: 'Jan', co2: 3100 },
];

const CarbonDashboard = () => {
    const { isDark } = useTheme();
    const tick = { fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 };
    const tooltip = { contentStyle: { background: isDark ? '#1a1f2e' : '#fff', border: 'none', borderRadius: 12 } };

    const metrics = [
        { icon: '🌍', label: 'Total CO2 Prevented', value: 48320, suffix: ' kg', color: '#68d391' },
        { icon: '🍽️', label: 'Meals Fed', value: 48320, suffix: '', color: '#63b3ed' },
        { icon: '🗑️', label: 'Landfill Reduction', value: 15462, suffix: ' kg', color: '#805ad5' },
        { icon: '🌳', label: 'Trees Equivalent', value: 2416, suffix: ' trees', color: '#48bb78' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                {metrics.map((m, i) => (
                    <ClayCard key={i} delay={i * 0.1} className="text-center">
                        <div className="text-4xl mb-2">{m.icon}</div>
                        <div className="text-2xl font-extrabold" style={{ color: m.color }}>
                            <StatCounter end={m.value} suffix={m.suffix} />
                        </div>
                        <div className={`text-xs font-semibold mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{m.label}</div>
                    </ClayCard>
                ))}
            </div>

            <ClayCard>
                <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>📈 CO2 Prevention Trend</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={monthlyCarbon}>
                        <defs>
                            <linearGradient id="co2Grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#68d391" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#68d391" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="month" tick={tick} axisLine={false} tickLine={false} />
                        <YAxis tick={tick} axisLine={false} tickLine={false} />
                        <Tooltip {...tooltip} />
                        <Area type="monotone" dataKey="co2" stroke="#68d391" strokeWidth={3} fill="url(#co2Grad)" name="CO2 kg Prevented" />
                    </AreaChart>
                </ResponsiveContainer>
            </ClayCard>

            <ClayCard>
                <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>🌱 SDG Climate Impact</h3>
                <div className="space-y-3">
                    {[
                        { label: 'SDG 13 — Climate Action', percent: 78, color: '#3f7e44' },
                        { label: 'SDG 12 — Responsible Consumption', percent: 85, color: '#bf8b2e' },
                        { label: 'SDG 2 — Zero Hunger', percent: 92, color: '#dda63a' },
                        { label: 'SDG 11 — Sustainable Cities', percent: 65, color: '#f99d26' },
                    ].map((s, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-sm mb-1">
                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{s.label}</span>
                                <span className="font-bold" style={{ color: s.color }}>{s.percent}%</span>
                            </div>
                            <div className={`w-full h-2 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-200'}`}>
                                <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.percent}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                                    className="h-full rounded-full" style={{ background: s.color }} />
                            </div>
                        </div>
                    ))}
                </div>
            </ClayCard>
        </div>
    );
};

export default CarbonDashboard;