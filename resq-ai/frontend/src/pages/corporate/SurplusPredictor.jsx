import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { corporateAPI } from '../../utils/api';
import ClayCard from '../../components/ui/ClayCard';
import toast from 'react-hot-toast';

const SurplusPredictor = () => {
  const { isDark } = useTheme();
  const [meals, setMeals] = useState([{ meal: 'Breakfast', quantity: 200, time: '8:00 AM' }, { meal: 'Lunch', quantity: 450, time: '1:00 PM' }]);
  const [wastePercent, setWastePercent] = useState(20);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const { data } = await corporateAPI.predictSurplus({ companyName: 'TechCorp', dailyMealSchedule: meals, historicalWastePercent: wastePercent });
      setResult(data.prediction);
    } catch {
      const total = meals.reduce((a, m) => a + m.quantity, 0);
      const surplus = Math.floor(total * (wastePercent / 100));
      setResult({ totalMealsPlanned: total, predictedSurplusMeals: surplus, predictedSurplusKg: (surplus * 0.4).toFixed(1), scheduledPickupWindows: ['12:30 PM - 1:00 PM', '7:30 PM - 8:00 PM'], message: `Predicted ${surplus} surplus meals. Auto rescue ticket ready.` });
      toast.success('Demo: Surplus predicted!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ClayCard>
        <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>🔮 Surplus Predictor</h3>
        <div className="space-y-4">
          {meals.map((m, i) => (
            <div key={i} className="grid grid-cols-3 gap-3">
              <input value={m.meal} readOnly className={`p-3 rounded-2xl ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-white shadow-clay'} focus:outline-none`} />
              <input type="number" value={m.quantity} onChange={(e) => { const n = [...meals]; n[i].quantity = parseInt(e.target.value); setMeals(n); }}
                className={`p-3 rounded-2xl ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-white shadow-clay'} focus:outline-none`} placeholder="Quantity" />
              <input value={m.time} readOnly className={`p-3 rounded-2xl ${isDark ? 'bg-white/10 text-white border border-white/20' : 'bg-white shadow-clay'} focus:outline-none`} />
            </div>
          ))}
          <div>
            <label className={`text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Historical Waste %: {wastePercent}%</label>
            <input type="range" min="5" max="50" value={wastePercent} onChange={(e) => setWastePercent(parseInt(e.target.value))}
              className="w-full mt-2 accent-primary" />
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={handlePredict} disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-mint text-white font-bold disabled:opacity-50">
            {loading ? '🤖 Predicting...' : '🔮 Predict Surplus'}
          </motion.button>
        </div>
      </ClayCard>

      {result && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <ClayCard>
            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>📊 Prediction Results</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[{ label: 'Total Planned', value: result.totalMealsPlanned, color: '#63b3ed' }, { label: 'Predicted Surplus', value: `${result.predictedSurplusMeals} meals`, color: '#f59e0b' }, { label: 'Surplus Weight', value: `${result.predictedSurplusKg} kg`, color: '#68d391' }].map((s, i) => (
                <div key={i} className={`p-4 rounded-2xl text-center ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                  <div className="text-xl font-extrabold" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
            <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
              <p className="text-sm font-semibold text-mint mb-2">🕐 Scheduled Pickup Windows:</p>
              {result.scheduledPickupWindows?.map((w, i) => <div key={i} className="text-sm text-primary">• {w}</div>)}
            </div>
          </ClayCard>
        </motion.div>
      )}
    </div>
  );
};

export default SurplusPredictor;