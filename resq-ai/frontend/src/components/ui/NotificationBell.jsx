import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';

const NotificationBell = () => {
    const { isDark } = useTheme();
    const { notifications, setNotifications } = useApp();
    const [isOpen, setIsOpen] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full relative transition-all ${isDark ? 'bg-white/10 text-gray-300' : 'bg-white/70 text-gray-600'
                    } shadow-clay`}
            >
                <Bell size={18} />
                {unreadCount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900"
                    >
                        {unreadCount}
                    </motion.span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className={`absolute right-0 mt-3 w-80 rounded-3xl overflow-hidden shadow-2xl z-50 border ${isDark
                                    ? 'bg-gray-900 border-white/10 text-white'
                                    : 'bg-white border-gray-100 text-gray-800'
                                }`}
                        >
                            <div className="p-4 flex items-center justify-between border-b border-white/5 bg-gradient-to-r from-primary/10 to-transparent">
                                <h3 className="font-bold text-sm">Notifications</h3>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllRead}
                                        className="text-[10px] font-bold uppercase tracking-wider text-primary hover:underline"
                                    >
                                        Mark all read
                                    </button>
                                )}
                            </div>

                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length > 0 ? (
                                    notifications.map((n) => (
                                        <div
                                            key={n.id}
                                            className={`p-4 border-b border-white/5 transition-colors ${!n.read ? (isDark ? 'bg-primary/5' : 'bg-primary/5') : ''
                                                }`}
                                        >
                                            <div className="flex gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${isDark ? 'bg-gray-800' : 'bg-gray-100'
                                                    }`}>
                                                    {n.type === 'success' ? '✅' : '📢'}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs leading-relaxed">{n.msg}</p>
                                                    <span className="text-[10px] text-gray-500 mt-1 block">Just now</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-10 text-center opacity-40">
                                        <Bell className="mx-auto mb-2 opacity-20" size={32} />
                                        <p className="text-xs">No notifications yet</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NotificationBell;