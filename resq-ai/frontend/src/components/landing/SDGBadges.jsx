import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../ui/ClayCard';

const sdgs = [
    { number: 2, title: 'Zero Hunger', icon: '🌾', color: '#dda63a', desc: 'Rescued food reaches those most in need.' },
    { number: 11, title: 'Sustainable Cities', icon: '🏙️', color: '#f99d26', desc: 'Smart city waste intelligence network.' },
    { number: 12, title: 'Responsible Consumption', icon: '♻️', color: '#bf8b2e', desc: 'Zero waste food supply chain ecosystem.' },
    { number: 13, title: 'Climate Action', icon: '🌍', color: '#3f7e44', desc: 'Every kg rescued prevents 2.5kg of CO2.' },
];

const SDGBadges = () => {
    const { isDark } = useTheme();

    return (
        <section className={`py-10 px-6 ${isDark ? 'bg-darkbg' : 'bg-lightbg'}`}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className={`text-4xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    UN{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-mint">
                        SDG Alignment
                    </span>
                </h2>
                <p className={`mt-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Every action on ResQ-AI maps directly to global sustainability goals.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {sdgs.map((sdg, i) => (
                    <ClayCard key={i} delay={i * 0.1} className="text-center">
                        <div className="text-4xl mb-3">{sdg.icon}</div>
                        <div
                            className="text-xs font-black mb-1 px-2 py-1 rounded-lg inline-block"
                            style={{ background: `${sdg.color}20`, color: sdg.color }}
                        >
                            SDG {sdg.number}
                        </div>
                        <h3 className={`font-bold text-base my-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {sdg.title}
                        </h3>
                        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{sdg.desc}</p>
                    </ClayCard>
                ))}
            </div>
        </section>
    );
};

export default SDGBadges;