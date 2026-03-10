import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { riderAPI } from '../../utils/api';
import ClayCard from '../../components/ui/ClayCard';
import KarmaBadge from '../../components/ui/KarmaBadge';
import AnimatedNumber from '../../components/ui/AnimatedNumber';

const PERIOD_LABELS = {
    weekly: 'This Week',
    monthly: 'This Month',
    allTime: 'All Time',
};

const medalConfig = [
    { bg: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/30', medal: '🥇', shadow: '0 0 20px rgba(236,201,74,0.3)' },
    { bg: 'from-gray-400/15 to-gray-500/10', border: 'border-gray-400/30', medal: '🥈', shadow: '0 0 20px rgba(160,174,192,0.3)' },
    { bg: 'from-orange-700/15 to-orange-800/10', border: 'border-orange-700/30', medal: '🥉', shadow: '0 0 20px rgba(180,83,9,0.3)' },
];

const RiderLeaderboard = () => {
    const { isDark } = useTheme();
    const [period, setPeriod] = useState('monthly');
    const [riders, setRiders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        setLoading(true);
        riderAPI.leaderboard()
            .then(({ data }) => {
                if (data.leaderboard?.length) setRiders(data.leaderboard);
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [period]);

    return (
        <div className="space-y-6">
            {/* Period Toggle */}
            <div className="flex gap-2">
                {Object.entries(PERIOD_LABELS).map(([key, label]) => (
                    <motion.button
                        key={key}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setPeriod(key)}
                        className={`flex-1 py-2.5 rounded-2xl text-xs font-bold transition-all ${period === key
                            ? 'bg-gradient-to-r from-primary to-mint text-white shadow-lg'
                            : isDark
                                ? 'bg-white/10 text-gray-300'
                                : 'bg-white shadow-clay text-gray-700'
                            }`}
                    >
                        {label}
                    </motion.button>
                ))}
            </div>

            {/* Top 3 Podium */}
            {riders.length >= 3 && (
                <div className="flex items-end justify-center gap-4 pb-2">
                    {/* 2nd place */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div
                            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-400/20 to-gray-500/10
                flex items-center justify-center text-xl border border-gray-400/20"
                        >
                            🚴
                        </div>
                        <div className="text-center">
                            <p
                                className={`text-xs font-bold truncate w-20 ${isDark ? 'text-white' : 'text-gray-900'
                                    }`}
                            >
                                {riders[1]?.name.split(' ')[0]}
                            </p>
                            <p className="text-xs text-gray-400">
                                {riders[1]?.karmaPoints} ⚡
                            </p>
                        </div>
                        <div
                            className="w-20 rounded-t-xl flex items-start justify-center pt-2 font-extrabold text-gray-400"
                            style={{ height: 64, background: 'rgba(160,174,192,0.12)', border: '1px solid rgba(160,174,192,0.2)' }}
                        >
                            🥈
                        </div>
                    </motion.div>

                    {/* 1st place */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <motion.div
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-orange-400/15
                flex items-center justify-center text-2xl border border-yellow-500/30 shadow-glow"
                        >
                            🚴
                        </motion.div>
                        <div className="text-center">
                            <p
                                className={`text-sm font-extrabold truncate w-24 ${isDark ? 'text-white' : 'text-gray-900'
                                    }`}
                            >
                                {riders[0]?.name.split(' ')[0]}
                            </p>
                            <p className="text-xs text-yellow-400 font-bold">
                                {riders[0]?.karmaPoints} ⚡
                            </p>
                        </div>
                        <div
                            className="w-24 rounded-t-xl flex items-start justify-center pt-2 font-extrabold text-yellow-400"
                            style={{ height: 88, background: 'rgba(236,201,74,0.10)', border: '1px solid rgba(236,201,74,0.25)' }}
                        >
                            🥇
                        </div>
                    </motion.div>

                    {/* 3rd place */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <div
                            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-700/15 to-orange-800/10
                flex items-center justify-center text-xl border border-orange-700/20"
                        >
                            🚴
                        </div>
                        <div className="text-center">
                            <p
                                className={`text-xs font-bold truncate w-20 ${isDark ? 'text-white' : 'text-gray-900'
                                    }`}
                            >
                                {riders[2]?.name.split(' ')[0]}
                            </p>
                            <p className="text-xs text-gray-400">
                                {riders[2]?.karmaPoints} ⚡
                            </p>
                        </div>
                        <div
                            className="w-20 rounded-t-xl flex items-start justify-center pt-2 font-extrabold text-orange-600"
                            style={{ height: 48, background: 'rgba(180,83,9,0.10)', border: '1px solid rgba(180,83,9,0.2)' }}
                        >
                            🥉
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Full Leaderboard */}
            <ClayCard>
                <h3
                    className={`font-bold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'
                        }`}
                >
                    🏆 {PERIOD_LABELS[period]} Rankings
                </h3>

                <div className="space-y-3">
                    {riders.map((rider, i) => {
                        const isTopThree = i < 3;
                        const cfg = medalConfig[i] || {};

                        return (
                            <motion.div
                                key={rider._id}
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.07 }}
                                whileHover={{ scale: 1.02 }}
                                onClick={() =>
                                    setSelected(selected?._id === rider._id ? null : rider)
                                }
                                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer
                  transition-all ${isTopThree
                                        ? `bg-gradient-to-r ${cfg.bg} border ${cfg.border}`
                                        : isDark
                                            ? 'bg-white/5 hover:bg-white/10 border border-white/5'
                                            : 'bg-gray-50 hover:bg-gray-100 border border-gray-100'
                                    }`}
                                style={isTopThree ? { boxShadow: cfg.shadow } : {}}
                            >
                                {/* Rank */}
                                <div className="w-8 text-center flex-shrink-0">
                                    {isTopThree ? (
                                        <span className="text-xl">{cfg.medal}</span>
                                    ) : (
                                        <span
                                            className={`text-sm font-extrabold ${isDark ? 'text-gray-400' : 'text-gray-500'
                                                }`}
                                        >
                                            #{i + 1}
                                        </span>
                                    )}
                                </div>

                                {/* Avatar */}
                                <div
                                    className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-mint
                    flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                                >
                                    {rider.name.charAt(0)}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p
                                            className={`font-bold text-sm truncate ${isDark ? 'text-white' : 'text-gray-900'
                                                }`}
                                        >
                                            {rider.name}
                                        </p>
                                        {rider.badges?.slice(0, 1).map((b) => (
                                            <KarmaBadge key={b} badge={b} size="xs" />
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {rider.totalDeliveries} deliveries
                                    </p>
                                </div>

                                {/* Karma */}
                                <div className="text-right flex-shrink-0">
                                    <p
                                        className="font-extrabold text-sm"
                                        style={{ color: isTopThree ? '#f59e0b' : '#63b3ed' }}
                                    >
                                        <AnimatedNumber
                                            value={rider.karmaPoints}
                                            suffix=" ⚡"
                                            duration={1200}
                                        />
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </ClayCard>

            {/* Rider Detail Panel */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <ClayCard>
                            <div className="flex items-center justify-between mb-4">
                                <h4
                                    className={`font-extrabold text-base ${isDark ? 'text-white' : 'text-gray-900'
                                        }`}
                                >
                                    {selected.name}'s Profile
                                </h4>
                                <button
                                    onClick={() => setSelected(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-4">
                                {[
                                    { label: 'Total Karma', value: selected.karmaPoints, icon: '⚡', color: '#63b3ed' },
                                    { label: 'Deliveries', value: selected.totalDeliveries, icon: '✅', color: '#68d391' },
                                    { label: 'Pickups', value: selected.totalPickups, icon: '📦', color: '#805ad5' },
                                    { label: 'Badges Earned', value: selected.badges?.length || 0, icon: '🏆', color: '#ed8936' },
                                ].map((s, i) => (
                                    <div
                                        key={i}
                                        className={`p-3 rounded-2xl text-center ${isDark ? 'bg-white/5' : 'bg-gray-50'
                                            }`}
                                    >
                                        <div className="text-xl mb-1">{s.icon}</div>
                                        <div
                                            className="font-extrabold text-base"
                                            style={{ color: s.color }}
                                        >
                                            {s.value}
                                        </div>
                                        <div className="text-xs text-gray-400">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                {selected.badges?.map((b) => (
                                    <KarmaBadge key={b} badge={b} size="sm" />
                                ))}
                                {selected.badges?.length === 0 && (
                                    <span className="text-xs text-gray-400">
                                        No badges yet — keep rescuing! 🌱
                                    </span>
                                )}
                            </div>
                        </ClayCard>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RiderLeaderboard;