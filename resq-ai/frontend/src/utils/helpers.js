// ─── Time Helpers ───────────────────────────────────────────────────────────

export const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours   = Math.floor(diff / 3600000);
  const days    = Math.floor(diff / 86400000);

  if (minutes < 1)  return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24)   return `${hours}h ago`;
  return `${days}d ago`;
};

export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

export const formatTime = (dateStr) =>
  new Date(dateStr).toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit',
  });

// ─── Number Helpers ─────────────────────────────────────────────────────────

export const formatNumber = (n) =>
  n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n?.toString() ?? '0';

export const calculateCO2 = (kgFood) =>
  parseFloat((kgFood * 2.5).toFixed(2));

export const calculateMeals = (kgFood) =>
  Math.floor(kgFood / 0.4);

// ─── String Helpers ─────────────────────────────────────────────────────────

export const truncate = (str, n = 100) =>
  str?.length > n ? str.slice(0, n) + '...' : str;

export const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

// ─── Validation Helpers ─────────────────────────────────────────────────────

export const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone) =>
  /^[6-9]\d{9}$/.test(phone);

// ─── Color Helpers ──────────────────────────────────────────────────────────

export const urgencyColor = (urgency) => ({
  critical: '#ef4444',
  medium:   '#f59e0b',
  low:      '#10b981',
}[urgency] ?? '#9ca3af');

export const statusColor = (status) => ({
  verified:   '#63b3ed',
  in_transit: '#f59e0b',
  delivered:  '#10b981',
  pending:    '#9ca3af',
  rejected:   '#ef4444',
}[status] ?? '#9ca3af');

// ─── Risk Score Helper ───────────────────────────────────────────────────────

export const getRiskLabel = (score) => {
  if (score >= 90) return { label: 'Excellent', color: '#10b981' };
  if (score >= 80) return { label: 'Good',      color: '#68d391' };
  if (score >= 60) return { label: 'Moderate',  color: '#f59e0b' };
  return               { label: 'Poor',         color: '#ef4444' };
};

// ─── CSR Badge Helper ────────────────────────────────────────────────────────

export const getCSRBadge = (totalMeals) => {
  if (totalMeals >= 10000) return { badge: 'platinum', color: '#e2e8f0', icon: '💎' };
  if (totalMeals >= 5000)  return { badge: 'gold',     color: '#ecc94b', icon: '🥇' };
  if (totalMeals >= 1000)  return { badge: 'silver',   color: '#a0aec0', icon: '🥈' };
  return                          { badge: 'bronze',   color: '#ed8936', icon: '🥉' };
};