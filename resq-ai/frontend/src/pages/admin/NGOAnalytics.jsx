import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import StatusPill from '../../components/ui/StatusPill';
import { demoNGOs } from '../../utils/demoData';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

const ngoDeliveryData = [
  { name: 'Hope Foundation', meals: 4200, co2: 1680 },
  { name: 'Aasha Shelter',   meals: 1800, co2: 720  },
  { name: 'Green Light',     meals: 900,  co2: 360  },
];

const coverageData = [
  { subject: 'North Zone', A: 80 },
  { subject: 'South Zone', A: 65 },
  { subject: 'East Zone',  A: 45 },
  { subject: 'West Zone',  A: 70 },
  { subject: 'Central',    A: 90 },
];

const COLORS = ['#63b3ed', '#68d391', '#805ad5'];

const NGOAnalytics = () => {
  const { isDark } = useTheme();

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
      {/* NGO Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {demoNGOs.map((ngo, i) => (
          <ClayCard key={ngo._id} delay={i * 0.1}>
            <div className="flex items-center justify-between mb-3">
              <StatusPill
                status={ngo.urgency}
                pulse={ngo.urgency === 'critical'}
              />
              <span className="text-2xl">🏠</span>
            </div>
            <h4
              className={`font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {ngo.name}
            </h4>
            <p className="text-sm text-primary font-semibold mt-1">
              Needs {ngo.mealsRequired} meals
            </p>
            <div
              className={`mt-3 p-3 rounded-xl text-xs ${
                isDark ? 'bg-white/5' : 'bg-gray-50'
              }`}
            >
              <div className="flex justify-between">
                <span className="text-gray-400">Meals Received</span>
                <span
                  className={`font-bold ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {ngoDeliveryData[i]?.meals.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-gray-400">CO2 Prevented</span>
                <span className="font-bold text-mint">
                  {ngoDeliveryData[i]?.co2} kg
                </span>
              </div>
            </div>
          </ClayCard>
        ))}
      </div>

      {/* Delivery Bar Chart */}
      <ClayCard>
        <h3
          className={`font-bold text-lg mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          📦 Meals Delivered Per NGO
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ngoDeliveryData}>
            <XAxis
              dataKey="name"
              tick={tick}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={tick} axisLine={false} tickLine={false} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="meals" name="Meals" radius={[8, 8, 0, 0]}>
              {ngoDeliveryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ClayCard>

      {/* Radar Coverage Chart */}
      <ClayCard>
        <h3
          className={`font-bold text-lg mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          🗺️ Zone Coverage Heatmap
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <RadarChart data={coverageData}>
            <PolarGrid stroke={isDark ? 'rgba(255,255,255,0.1)' : '#e5e7eb'} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 11 }}
            />
            <Radar
              name="Coverage"
              dataKey="A"
              stroke="#63b3ed"
              fill="#63b3ed"
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Tooltip {...tooltipStyle} />
          </RadarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2 flex-wrap">
          {coverageData.map((z) => (
            <div key={z.subject} className="flex items-center gap-1.5 text-xs">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background:
                    z.A > 80
                      ? '#68d391'
                      : z.A > 60
                      ? '#63b3ed'
                      : '#f59e0b',
                }}
              />
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                {z.subject} — {z.A}%
              </span>
            </div>
          ))}
        </div>
      </ClayCard>
    </div>
  );
};

export default NGOAnalytics;