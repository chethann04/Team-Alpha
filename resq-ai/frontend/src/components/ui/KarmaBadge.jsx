import { motion } from 'framer-motion';

const badgeColors = {
    'Food Hero': 'from-green-400 to-emerald-500',
    'CSR Champion': 'from-blue-400 to-cyan-500',
    'Climate Warrior': 'from-purple-400 to-indigo-500',
};

const badgeIcons = {
    'Food Hero': '🍱',
    'CSR Champion': '🏆',
    'Climate Warrior': '🌍',
};

const KarmaBadge = ({ badge, size = 'sm' }) => {
    const sizeClasses = size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-2';
    return (
        <motion.span
            whileHover={{ scale: 1.1 }}
            className={`inline-flex items-center gap-1 rounded-full text-white font-semibold bg-gradient-to-r ${badgeColors[badge] || 'from-gray-400 to-gray-500'} ${sizeClasses}`}
        >
            {badgeIcons[badge] || '⭐'} {badge}
        </motion.span>
    );
};

export default KarmaBadge;
