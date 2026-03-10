import { motion } from 'framer-motion';

export const ImpactToast = ({ donorName, meals, co2 }) => (
  <motion.div
    initial={{ opacity: 0, x: 60 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 60 }}
    className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-xl max-w-xs"
  >
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-mint flex items-center justify-center text-xl flex-shrink-0">
      🌱
    </div>
    <div>
      <p className="text-sm font-bold text-gray-900">
        🎉 {donorName} just donated!
      </p>
      <p className="text-xs text-gray-500">
        {meals} meals • {co2}kg CO2 saved
      </p>
    </div>
  </motion.div>
);

export default ImpactToast;