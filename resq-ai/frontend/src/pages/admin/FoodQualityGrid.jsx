import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Generate 7 weeks × 7 days of quality scores for each entity
const generateWeeklyData = (seed) => {
    const data = [];
    for (let week = 0; week < 7; week++) {
        for (let day = 0; day < 7; day++) {
            // Pseudo-random but consistent per entity
            const val = Math.abs(Math.sin(seed * 13.7 + week * 3.1 + day * 7.2)) * 100;
            data.push(Math.round(val));
        }
    }
    return data;
};

const entities = [
    { id: 1, name: 'Sunrise Restaurant', type: 'restaurant' },
    { id: 2, name: 'TechCorp Canteen', type: 'corporate' },
    { id: 3, name: 'Green Leaf Bistro', type: 'restaurant' },
    { id: 4, name: 'Hope Foundation', type: 'ngo' },
    { id: 5, name: 'Aasha Shelter', type: 'ngo' },
    { id: 6, name: 'Cloud Kitchen 7', type: 'restaurant' },
    { id: 7, name: 'CityCorp Meals', type: 'corporate' },
    { id: 8, name: 'Green Light Trust', type: 'ngo' },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];

const getQualityColor = (score) => {
    if (score >= 80) return { bg: 'bg-emerald-500', label: 'Excellent' };
    if (score >= 60) return { bg: 'bg-green-400', label: 'Good' };
    if (score >= 40) return { bg: 'bg-yellow-400', label: 'Average' };
    if (score >= 20) return { bg: 'bg-orange-500', label: 'Poor' };
    return { bg: 'bg-red-600', label: 'Critical' };
};

const typeColor = { restaurant: 'text-primary', corporate: 'text-purple-500', ngo: 'text-orange-500' };
const typeLabel = { restaurant: '🍽️ Restaurant', corporate: '🏢 Corporate', ngo: '🏠 NGO' };

const FoodQualityGrid = () => {
    const { isDark } = useTheme();
    const [hoveredCell, setHoveredCell] = useState(null);
    const [filter, setFilter] = useState('all');

    const filtered = filter === 'all' ? entities : entities.filter(e => e.type === filter);

    return (
        <ClayCard className="p-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                    <h3 className={`text-2xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Food Quality <span className="text-primary">Heatmap</span>
                    </h3>
                    <p className={`text-xs mt-1 font-bold uppercase tracking-widest ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        7-Week Quality Index · All NGOs & Restaurants
                    </p>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-3 flex-wrap">
                    {[
                        { color: 'bg-red-600', label: 'Critical' },
                        { color: 'bg-orange-500', label: 'Poor' },
                        { color: 'bg-yellow-400', label: 'Average' },
                        { color: 'bg-green-400', label: 'Good' },
                        { color: 'bg-emerald-500', label: 'Excellent' },
                    ].map(({ color, label }) => (
                        <div key={label} className="flex items-center gap-1.5">
                            <div className={`w-3 h-3 rounded-sm ${color}`} />
                            <span className="text-[10px] font-black uppercase text-gray-500">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-3 mb-8">
                {['all', 'restaurant', 'corporate', 'ngo'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === type
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'
                            }`}
                    >
                        {type === 'all' ? '🌐 All' : typeLabel[type]}
                    </button>
                ))}
            </div>

            {/* Day Headers */}
            <div className="overflow-x-auto">
                <div style={{ minWidth: 600 }}>
                    {/* Column headers - weeks */}
                    <div className="flex mb-3" style={{ marginLeft: 180 }}>
                        {weeks.map(w => (
                            <div key={w} className="flex-1 text-center text-[9px] font-black text-gray-500 uppercase tracking-widest">{w}</div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        {filtered.map((entity) => {
                            const scores = generateWeeklyData(entity.id);
                            return (
                                <motion.div
                                    key={entity.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3"
                                >
                                    {/* Entity name */}
                                    <div className="flex-shrink-0" style={{ width: 172 }}>
                                        <div className={`text-xs font-black truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>{entity.name}</div>
                                        <div className={`text-[9px] font-bold uppercase tracking-widest ${typeColor[entity.type]}`}>{entity.type}</div>
                                    </div>

                                    {/* Cube grid: 7 weeks × 7 days */}
                                    <div className="flex gap-1 flex-1">
                                        {weeks.map((_, weekIdx) => (
                                            <div key={weekIdx} className="flex flex-col gap-1 flex-1">
                                                {days.map((day, dayIdx) => {
                                                    const score = scores[weekIdx * 7 + dayIdx];
                                                    const { bg, label } = getQualityColor(score);
                                                    const cellId = `${entity.id}-${weekIdx}-${dayIdx}`;
                                                    return (
                                                        <motion.div
                                                            key={dayIdx}
                                                            whileHover={{ scale: 1.4, zIndex: 10 }}
                                                            onHoverStart={() => setHoveredCell({ entity: entity.name, day, week: `Week ${weekIdx + 1}`, score, label })}
                                                            onHoverEnd={() => setHoveredCell(null)}
                                                            className={`${bg} rounded-sm cursor-pointer relative`}
                                                            style={{ height: 10 }}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Row labels on right */}
                    <div className="flex mt-3 gap-3" style={{ marginLeft: 180 }}>
                        {weeks.map((_, i) => (
                            <div key={i} className="flex-1">
                                {days.slice(0, 3).map(d => (
                                    <div key={d} className="text-[8px] text-gray-500 text-center">{d[0]}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tooltip */}
            {hoveredCell && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-4 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`}
                >
                    <span className="font-black">{hoveredCell.entity}</span>
                    <span className="text-gray-500 mx-2">·</span>
                    <span className="text-xs">{hoveredCell.week}, {hoveredCell.day}</span>
                    <span className="text-gray-500 mx-2">·</span>
                    <span className={`text-xs font-black ${hoveredCell.score >= 60 ? 'text-emerald-500' : 'text-red-500'}`}>
                        Score: {hoveredCell.score}/100 ({hoveredCell.label})
                    </span>
                </motion.div>
            )}
        </ClayCard>
    );
};

export default FoodQualityGrid;
