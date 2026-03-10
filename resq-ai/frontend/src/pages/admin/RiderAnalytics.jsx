import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import KarmaBadge from '../../components/ui/KarmaBadge';
import StatusPill from '../../components/ui/StatusPill';
import ProgressRing from '../../components/ui/ProgressRing';
import { demoRiders } from '../../utils/demoData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const COLORS = ['#63b3ed', '#68d391', '#805ad5', '#ed8936', '#f687b3'];

const RiderAnalytics = () => {
  const { isDark } = useTheme();

  const chartData = demoRiders.map((r) => ({
    name:      r.name.split(' ')[0],
    karma:     r.karmaPoints,
    deliveries: r.totalDeliveries,
  }));

  const tick = {
    fill: isDark ? '#9ca3af' : '#6b7280',
    fontSize: 11,
  };

  const tooltipStyle = {
    contentStyle: {
      background:   isDark ? '#1a1f2e' : '#fff',
      border:       'none',
      borderRadius: 12,
      fontSize:     12,
    },
  };

  return (
    <div className="space-y-6">
      {/* Summary Rings */}
      <ClayCard>
        <h3
          className={`font-bold text-lg mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          🚴 Rider Performance Overview
        </h3>
        <div className="flex justify-around flex-wrap gap-6">
          {[
            { label: 'Pickup Rate',   sublabel: '95% success', percent: 95, color: '#63b3ed' },
            { label: 'On-Time',       sublabel: '88% on-time', percent: 88, color: '#68d391' },
            { label: 'Satisfaction',  sublabel: '92% rating',  percent: 92, color: '#805ad5' },
            { label: 'Active Today',  sublabel: '28 of 312',   percent: 76, color: '#ed8936' },
          ].map((item, i) => (
            <ProgressRing
              key={i}
              percent={item.percent}
              size={90}
              strokeWidth={8}
              color={item.color}
              label={item.label}
              sublabel={item.sublabel}
            />
          ))}
        </div>
      </ClayCard>

      {/* Bar Chart */}
      <ClayCard>
        <h3
          className={`font-bold text-lg mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          📊 Karma vs Deliveries
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} barGap={4}>
            <XAxis
              dataKey="name"
              tick={tick}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={tick} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="karma" name="Karma Points" radius={[6, 6, 0, 0]}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ClayCard>

      {/* Rider Cards */}
      <ClayCard>
        <h3
          className={`font-bold text-lg mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          🏆 Top Rescuers
        </h3>
        <div className="space-y-3">
          {demoRiders.map((rider, i) => (
            <motion.div
              key={rider._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-center gap-4 p-4 rounded-2xl ${
                isDark ? 'bg-white/5' : 'bg-gray-50'
              }`}
            >
              <div className="w-8 text-center font-extrabold text-gray-400">
                #{i + 1}
              </div>
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-mint
                  flex items-center justify-center text-lg flex-shrink-0"
              >
                🚴
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`font-bold text-sm truncate ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {rider.name}
                </p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {rider.badges.slice(0, 2).map((b) => (
                    <KarmaBadge key={b} badge={b} size="sm" />
                  ))}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-extrabold text-primary text-sm">
                  ⚡ {rider.karmaPoints}
                </p>
                <p className="text-xs text-gray-400">
                  {rider.totalDeliveries} deliveries
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </ClayCard>
    </div>
  );
};

export default RiderAnalytics;