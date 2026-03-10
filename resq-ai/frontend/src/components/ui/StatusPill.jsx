import { motion } from 'framer-motion';

const config = {
  verified:   { bg: 'bg-blue-500/15',   text: 'text-blue-400',   dot: 'bg-blue-400',   label: 'Verified'    },
  in_transit: { bg: 'bg-yellow-500/15', text: 'text-yellow-400', dot: 'bg-yellow-400', label: 'In Transit'  },
  delivered:  { bg: 'bg-green-500/15',  text: 'text-green-400',  dot: 'bg-green-400',  label: 'Delivered'   },
  pending:    { bg: 'bg-gray-500/15',   text: 'text-gray-400',   dot: 'bg-gray-400',   label: 'Pending'     },
  critical:   { bg: 'bg-red-500/15',    text: 'text-red-400',    dot: 'bg-red-400',    label: 'Critical'    },
  medium:     { bg: 'bg-orange-500/15', text: 'text-orange-400', dot: 'bg-orange-400', label: 'Medium'      },
  low:        { bg: 'bg-green-500/15',  text: 'text-green-400',  dot: 'bg-green-400',  label: 'Low'         },
  available:  { bg: 'bg-mint/15',       text: 'text-mint',       dot: 'bg-mint',        label: 'Available'  },
  on_mission: { bg: 'bg-primary/15',    text: 'text-primary',    dot: 'bg-primary',    label: 'On Mission'  },
  offline:    { bg: 'bg-gray-500/15',   text: 'text-gray-400',   dot: 'bg-gray-400',   label: 'Offline'     },
};

const StatusPill = ({ status, pulse = false, size = 'sm' }) => {
  const c = config[status] || config.pending;
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm';
  const padding  = size === 'sm' ? 'px-2.5 py-1' : 'px-3 py-1.5';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${c.bg} ${c.text} ${textSize} ${padding}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${c.dot} ${
          pulse ? 'animate-pulse' : ''
        }`}
      />
      {c.label}
    </span>
  );
};

export default StatusPill;