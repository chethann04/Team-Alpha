import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, ChevronDown, Leaf, LogOut, User, LayoutDashboard, Menu, X } from 'lucide-react';
import NotificationBell from '../ui/NotificationBell';

const Navbar = () => {
    const { isDark, setIsDark } = useTheme();
    const { user, logout } = useApp();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/');
    };

    const getDashboardPath = () => {
        if (!user) return '/';
        const role = user.role;
        return role ? `/${role}` : '/';
    };

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-24 py-4
                ${scrolled
                    ? `py-3 ${isDark ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-md border-b ${isDark ? 'border-white/5 shadow-2xl' : 'border-slate-100 shadow-sm'}`
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2.5 cursor-pointer"
                >
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                        <Leaf size={18} className="text-white fill-current" />
                    </div>
                    <span className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
                        ResQ<span className="text-primary">-AI</span>
                    </span>
                </motion.div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-6 mr-4 text-sm font-semibold">
                        <button onClick={() => navigate('/')} className={`hover:text-primary transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Network</button>
                        <button className={`hover:text-primary transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Impact</button>
                        <button className={`hover:text-primary transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>About</button>
                    </div>

                    <div className="flex items-center gap-3">
                        {pathname !== '/' && <NotificationBell />}

                        <button
                            onClick={() => setIsDark(!isDark)}
                            className={`p-2 rounded-xl transition-all ${isDark
                                ? 'bg-white/5 text-slate-400 hover:text-yellow-400 hover:bg-white/10'
                                : 'bg-slate-100 text-slate-600 hover:text-indigo-600 hover:bg-slate-200'
                                }`}
                        >
                            {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>

                        {!user ? (
                            <button
                                onClick={() => navigate('/login')}
                                className="btn-primary text-sm !px-5 !py-2"
                            >
                                Sign In
                            </button>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className={`flex items-center gap-3 px-2 py-1.5 rounded-xl border transition-all ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-slate-200 hover:shadow-sm'
                                        }`}
                                >
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        className="w-7 h-7 rounded-lg bg-primary/10"
                                    />
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                className={`absolute right-0 mt-3 w-56 rounded-2xl overflow-hidden shadow-2xl z-50 border ${isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-100'
                                                    }`}
                                            >
                                                <div className="px-4 py-3 border-b border-inherit">
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Signed in as</p>
                                                    <p className={`text-sm font-black capitalize ${isDark ? 'text-white' : 'text-slate-900'}`}>{user.role}</p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        navigate(getDashboardPath());
                                                        setDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-semibold transition-colors ${isDark ? 'text-slate-300 hover:bg-white/5' : 'text-slate-700 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <LayoutDashboard size={18} className="text-primary" />
                                                    Dashboard
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        navigate('/profile');
                                                        setDropdownOpen(false);
                                                    }}
                                                    className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-semibold transition-colors ${isDark ? 'text-slate-300 hover:bg-white/5' : 'text-slate-700 hover:bg-slate-50'
                                                        }`}
                                                >
                                                    <User size={18} className="text-mint" />
                                                    Profile
                                                </button>
                                                <div className={`h-px mx-4 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`} />
                                                <button
                                                    onClick={handleLogout}
                                                    className={`w-full text-left px-4 py-3 flex items-center gap-3 text-sm font-semibold text-red-500 transition-colors ${isDark ? 'hover:bg-red-500/10' : 'hover:bg-red-50'
                                                        }`}
                                                >
                                                    <LogOut size={18} />
                                                    Sign Out
                                                </button>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;