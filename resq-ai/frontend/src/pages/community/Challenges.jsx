import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import { demoChallenges } from '../../utils/demoData';
import toast from 'react-hot-toast';

const Challenges = () => {
  const { isDark } = useTheme();

  const handleJoin = (challenge) => {
    toast.success(`🎯 Joined "${challenge.title}"! Good luck!`);
  };

  return (
    <div className="space-y-4">
      <h3
        className={`text-xl font-extrabold mb-6 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}
      >
        🏆 Community Challenges
      </h3>

      {demoChallenges.map((challenge, i) => (
        <ClayCard key={challenge.id} delay={i * 0.1}>
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${challenge.color}20` }}
            >
              {challenge.icon}
            </div>

            <div className="flex-1 min-w-0">
              <h4
                className={`font-extrabold text-base ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {challenge.title}
              </h4>
              <p
                className={`text-sm mt-1 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {challenge.description}
              </p>

              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: `${challenge.color}15`,
                    color: challenge.color,
                  }}
                >
                  👥 {challenge.participants} participants
                </span>
                <span className="text-xs font-semibold text-orange-400">
                  ⏳ {challenge.daysLeft} days left
                </span>
              </div>

              {/* Progress Bar */}
              <div
                className={`mt-3 w-full h-2 rounded-full overflow-hidden ${
                  isDark ? 'bg-white/10' : 'bg-gray-200'
                }`}
              >
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${
                      ((30 - challenge.daysLeft) / 30) * 100
                    }%`,
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${challenge.color}, ${challenge.color}99)`,
                  }}
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => handleJoin(challenge)}
              className="px-4 py-2 rounded-xl text-white text-xs font-bold flex-shrink-0 self-start shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${challenge.color}, ${challenge.color}cc)`,
              }}
            >
              Join
            </motion.button>
          </div>
        </ClayCard>
      ))}
    </div>
  );
};

export default Challenges;