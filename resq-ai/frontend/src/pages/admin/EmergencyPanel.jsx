import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ClayCard from '../../components/ui/ClayCard';
import StatusPill from '../../components/ui/StatusPill';
import { demoNGOs } from '../../utils/demoData';
import toast from 'react-hot-toast';

const EmergencyPanel = () => {
  const { isDark } = useTheme();
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [ngos, setNGOs]                   = useState(demoNGOs);
  const [alertSent, setAlertSent]         = useState({});
  const [countdown, setCountdown]         = useState(null);
  const [log, setLog]                     = useState([]);

  /* Countdown timer */
  useEffect(() => {
    if (!countdown) return;
    if (countdown <= 0) {
      setCountdown(null);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const addLog = (msg, type = 'info') => {
    setLog((prev) => [
      {
        id:   Date.now(),
        msg,
        type,
        time: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 19),
    ]);
  };

  const handleEmergencyToggle = () => {
    if (!emergencyMode) {
      setEmergencyMode(true);
      setCountdown(30);
      addLog('🚨 Emergency mode activated — all NGOs alerted', 'critical');
      addLog('📱 SMS alerts sent to 312 riders', 'warning');
      addLog('📧 Admin notified via email', 'info');
      toast.error('🚨 Emergency Mode Active! All systems alerted.', {
        duration: 5000,
      });
    } else {
      setEmergencyMode(false);
      setCountdown(null);
      addLog('✅ Emergency mode deactivated', 'success');
      toast.success('Emergency mode deactivated');
    }
  };

  const handleSendAlert = (ngo) => {
    setAlertSent((prev) => ({ ...prev, [ngo._id]: true }));
    addLog(`📢 Manual alert sent to ${ngo.name}`, 'warning');
    toast.success(`Alert sent to ${ngo.name}!`);
  };

  const handleUpgradeUrgency = (ngoId) => {
    setNGOs((prev) =>
      prev.map((n) =>
        n._id === ngoId ? { ...n, urgency: 'critical' } : n
      )
    );
    const ngo = ngos.find((n) => n._id === ngoId);
    addLog(`🔴 ${ngo?.name} upgraded to CRITICAL`, 'critical');
    toast.error(`${ngo?.name} marked as CRITICAL!`);
  };

  const logTypeStyles = {
    critical: 'text-red-400',
    warning:  'text-yellow-400',
    success:  'text-green-400',
    info:     isDark ? 'text-gray-400' : 'text-gray-600',
  };

  return (
    <div className="space-y-6">
      {/* Emergency Toggle */}
      <motion.div
        animate={
          emergencyMode
            ? { boxShadow: ['0 0 20px #ef444440', '0 0 60px #ef444480', '0 0 20px #ef444440'] }
            : { boxShadow: '0 0 0px transparent' }
        }
        transition={{ duration: 1.5, repeat: emergencyMode ? Infinity : 0 }}
        className={`p-6 rounded-3xl border-2 transition-all ${
          emergencyMode
            ? 'bg-red-500/10 border-red-500/40'
            : isDark
            ? 'bg-white/5 border-white/10'
            : 'bg-white border-gray-200 shadow-clay'
        }`}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3
              className={`text-xl font-extrabold ${
                emergencyMode
                  ? 'text-red-400'
                  : isDark
                  ? 'text-white'
                  : 'text-gray-900'
              }`}
            >
              {emergencyMode ? '🚨 EMERGENCY MODE ACTIVE' : '🚨 Emergency Control'}
            </h3>
            <p
              className={`text-sm mt-1 ${
                emergencyMode ? 'text-red-300' : 'text-gray-400'
              }`}
            >
              {emergencyMode
                ? `All riders and donors are alerted. Auto-deactivate in ${countdown || 0}s`
                : 'Activate to broadcast emergency food shortage alerts to all network members'}
            </p>
          </div>

          {countdown && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-3xl font-extrabold text-red-400 flex-shrink-0"
            >
              {countdown}s
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEmergencyToggle}
            className={`px-8 py-4 rounded-2xl font-extrabold text-base transition-all ${
              emergencyMode
                ? 'bg-gray-500 text-white'
                : 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg'
            }`}
          >
            {emergencyMode ? '✅ Deactivate' : '🚨 Activate Emergency'}
          </motion.button>
        </div>
      </motion.div>

      {/* NGO Status Grid */}
      <ClayCard>
        <h3
          className={`font-bold text-lg mb-5 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          🏠 NGO Urgency Status
        </h3>
        <div className="space-y-3">
          {ngos.map((ngo, i) => (
            <motion.div
              key={ngo._id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`p-4 rounded-2xl border transition-all ${
                ngo.urgency === 'critical'
                  ? isDark
                    ? 'bg-red-500/10 border-red-500/30'
                    : 'bg-red-50 border-red-200'
                  : ngo.urgency === 'medium'
                  ? isDark
                    ? 'bg-yellow-500/10 border-yellow-500/20'
                    : 'bg-yellow-50 border-yellow-200'
                  : isDark
                  ? 'bg-white/5 border-white/8'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={
                      ngo.urgency === 'critical'
                        ? { scale: [1, 1.2, 1] }
                        : {}
                    }
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-2xl"
                  >
                    {ngo.urgency === 'critical' ? '🔴' : ngo.urgency === 'medium' ? '🟡' : '🟢'}
                  </motion.div>
                  <div>
                    <p
                      className={`font-bold text-sm ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {ngo.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      Needs {ngo.mealsRequired} meals ·{' '}
                      {ngo.location?.address || 'Bangalore'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <StatusPill
                    status={ngo.urgency}
                    pulse={ngo.urgency === 'critical'}
                  />

                  {ngo.urgency !== 'critical' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleUpgradeUrgency(ngo._id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold
                        bg-red-500/10 text-red-400 border border-red-500/20
                        hover:bg-red-500 hover:text-white transition-all"
                    >
                      ↑ Upgrade
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSendAlert(ngo)}
                    disabled={alertSent[ngo._id]}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      alertSent[ngo._id]
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-white'
                    }`}
                  >
                    {alertSent[ngo._id] ? '✅ Sent' : '📢 Alert'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ClayCard>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '🔴', label: 'Critical NGOs',   value: ngos.filter((n) => n.urgency === 'critical').length, color: '#ef4444' },
          { icon: '🟡', label: 'Medium Urgency',  value: ngos.filter((n) => n.urgency === 'medium').length,   color: '#f59e0b' },
          { icon: '🟢', label: 'Stable NGOs',     value: ngos.filter((n) => n.urgency === 'low').length,      color: '#10b981' },
        ].map((s, i) => (
          <ClayCard key={i} className="text-center !p-4">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="font-extrabold text-xl" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-xs text-gray-400">{s.label}</div>
          </ClayCard>
        ))}
      </div>

      {/* Activity Log */}
      <ClayCard>
        <h3
          className={`font-bold text-base mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          📋 Activity Log
        </h3>
        {log.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-6">
            No activity yet. Try activating emergency mode or sending alerts.
          </p>
        ) : (
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
            <AnimatePresence>
              {log.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex items-start gap-3 p-2.5 rounded-xl text-xs ${
                    isDark ? 'bg-white/5' : 'bg-gray-50'
                  }`}
                >
                  <span className="text-gray-400 font-mono flex-shrink-0">
                    {entry.time}
                  </span>
                  <span
                    className={`flex-1 font-semibold ${
                      logTypeStyles[entry.type]
                    }`}
                  >
                    {entry.msg}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </ClayCard>
    </div>
  );
};

export default EmergencyPanel;