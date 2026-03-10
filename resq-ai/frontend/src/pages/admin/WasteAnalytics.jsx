import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    donations: Math.floor(Math.random() * 20 + (i >= 11 && i <= 14 ? 30 : i >= 18 && i <= 21 ? 25 : 5)),
}));

const sourceData = [{ name: 'Restaurant', value: 45 }, { name: 'Corporate', value: 35 }, { name: 'Individual', value: 20 }];
const foodData = [{ name: 'Rice', value: 38 }, { name: 'Bread', value: 22 }, { name: 'Cooked Meals', value: 28 }, { name: 'Other', value: 12 }];
const COLORS = ['#63b3ed', '#68d391', '#805ad5', '#ed8936'];

const WasteAnalytics = () => {
    const { isDark } = useTheme();
    const tick = { fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 11 };
    const tooltip = { contentStyle: { background: isDark ? '#1a1f2e' : '#fff', border: 'none', borderRadius: 12, fontSize: 12 } };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ClayCard>
                    <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>🍽️ Waste by Source</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={sourceData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                {sourceData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                            </Pie>
                            <Tooltip {...tooltip} />
                        </PieChart>
                    </ResponsiveContainer>
                </ClayCard>

                <ClayCard>
                    <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>🥗 Food Categories</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={foodData} layout="vertical">
                            <XAxis type="number" tick={tick} axisLine={false} tickLine={false} />
                            <YAxis type="category" dataKey="name" tick={tick} axisLine={false} tickLine={false} width={80} />
                            <Tooltip {...tooltip} />
                            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                                {foodData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ClayCard>
            </div>

            <ClayCard>
                <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>⏰ Hourly Waste Heatmap</h3>
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={hourlyData.filter((_, i) => i % 2 === 0)}>
                        <XAxis dataKey="hour" tick={tick} axisLine={false} tickLine={false} />
                        <YAxis tick={tick} axisLine={false} tickLine={false} />
                        <Tooltip {...tooltip} />
                        <Bar dataKey="donations" fill="#63b3ed" radius={[4, 4, 0, 0]} name="Donations" />
                    </BarChart>
                </ResponsiveContainer>
                <div className="flex gap-4 mt-3 flex-wrap">
                    {[{ label: '🔴 Peak Hours', desc: '12PM-2PM, 7PM-9PM' }, { label: '🟡 Moderate', desc: '8AM-11AM' }, { label: '🟢 Low Activity', desc: 'Late night' }].map((h) => (
                        <div key={h.label} className="text-xs"><span className="font-semibold">{h.label}</span><span className={`ml-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{h.desc}</span></div>
                    ))}
                </div>
            </ClayCard>
        </div>
    );
};

export default WasteAnalytics;