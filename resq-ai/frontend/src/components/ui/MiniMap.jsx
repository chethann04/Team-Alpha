import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const MiniMap = ({
  markers = [],
  height  = 200,
  animated = true,
}) => {
  const { isDark } = useTheme();

  const statusColors = {
    verified:   '#63b3ed',
    in_transit: '#f59e0b',
    delivered:  '#10b981',
    critical:   '#ef4444',
    medium:     '#f59e0b',
    low:        '#10b981',
  };

  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden"
      style={{
        height,
        background: isDark
          ? 'linear-gradient(135deg, #0f1729 0%, #1a2744 50%, #0f1729 100%)'
          : 'linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 50%, #dbeafe 100%)',
      }}
    >
      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={`h${i}`}
            className="absolute w-full border-t"
            style={{
              top:         `${i * 20}%`,
              borderColor: isDark ? '#ffffff' : '#000000',
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`v${i}`}
            className="absolute h-full border-l"
            style={{
              left:        `${i * 14}%`,
              borderColor: isDark ? '#ffffff' : '#000000',
            }}
          />
        ))}
      </div>

      {/* Route Line */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <motion.polyline
          points="10,70 30,50 55,65 75,40 90,60"
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth="2"
          strokeDasharray="300"
          initial={{ strokeDashoffset: 300 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 }}
          vectorEffect="non-scaling-stroke"
        />
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="50%"  stopColor="#f59e0b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Markers */}
      {markers.map((marker, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, y: -10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: i * 0.15, type: 'spring', stiffness: 300 }}
          className="absolute flex flex-col items-center gap-0.5"
          style={{
            left: `${10 + i * 20}%`,
            top:  `${30 + (i % 3) * 15}%`,
          }}
        >
          <motion.div
            animate={
              animated && marker.status === 'critical'
                ? { scale: [1, 1.3, 1] }
                : {}
            }
            transition={{ duration: 1, repeat: Infinity }}
            className="w-3 h-3 rounded-full shadow-lg"
            style={{
              background: statusColors[marker.status] || '#9ca3af',
              boxShadow: `0 0 8px ${statusColors[marker.status] || '#9ca3af'}80`,
            }}
          />
          {marker.label && (
            <span
              className="text-xs font-bold px-1.5 py-0.5 rounded-md whitespace-nowrap"
              style={{
                background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.9)',
                color:      isDark ? '#fff' : '#1a202c',
                fontSize:   '9px',
              }}
            >
              {marker.label}
            </span>
          )}
        </motion.div>
      ))}

      {/* Animated Rider */}
      <motion.div
        animate={{ left: ['5%', '85%'] }}
        transition={{
          duration:    6,
          repeat:      Infinity,
          ease:        'linear',
          repeatDelay: 2,
        }}
        className="absolute text-xl"
        style={{ top: '42%' }}
      >
        🚴‍♂️
      </motion.div>

      {/* Legend */}
      <div className="absolute bottom-2 right-3 flex gap-2">
        {[
          { color: '#63b3ed', label: 'Pickup'  },
          { color: '#f59e0b', label: 'Transit' },
          { color: '#10b981', label: 'Done'    },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: l.color }}
            />
            <span
              className="font-semibold"
              style={{
                color:    isDark ? '#9ca3af' : '#6b7280',
                fontSize: '9px',
              }}
            >
              {l.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniMap;