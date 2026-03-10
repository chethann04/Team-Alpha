import { motion } from 'framer-motion';

const ProgressRing = ({
  percent = 0,
  size = 80,
  strokeWidth = 8,
  color = '#63b3ed',
  label = '',
  sublabel = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-sm font-extrabold"
            style={{ color }}
          >
            {percent}%
          </span>
        </div>
      </div>
      {label && (
        <div className="text-center">
          <p className="text-xs font-bold text-gray-300">{label}</p>
          {sublabel && (
            <p className="text-xs text-gray-500">{sublabel}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressRing;