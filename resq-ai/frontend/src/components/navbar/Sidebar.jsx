import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Zap,
    Globe,
    Award,
    Database,
    Settings,
    HelpCircle,
    LogOut,
    ChevronRight,
    Search,
    Users,
    MessageCircle,
    TrendingUp
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, active, collapsed, onClick }) => {
    const { isDark } = useTheme();

    return (
        <motion.div
            whileHover={{ x: 5 }}
            onClick={onClick}
            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all mb-1 relative group ${active
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : isDark ? 'text-gray-400 hover:bg-white/5' : 'text-gray-500 hover:bg-gray-100'
                }`}
        >
            <div className="flex-shrink-0">
                <Icon size={20} className={active ? 'text-white' : 'group-hover:text-primary transition-colors'} />
            </div>

            <AnimatePresence>
                {!collapsed && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-sm font-black whitespace-nowrap uppercase tracking-widest"
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>

            {active && (
                <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-white rounded-full"
                />
            )}
        </motion.div>
    );
};

const Sidebar = () => {
    const { isDark } = useTheme();
    const { user, logout } = useApp();
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    if (!user) return null;

    const roleLinks = {
        donor: [
            { icon: LayoutDashboard, label: 'Rescues', path: '/donor' },
            { icon: MessageCircle, label: 'Community', path: '/community' },
            { icon: Award, label: 'Achievements', path: '/donor#milestones' },
        ],
        restaurant: [
            { icon: LayoutDashboard, label: 'Kitchen Hub', path: '/restaurant' },
            { icon: TrendingUp, label: 'Impact Data', path: '/restaurant' },
            { icon: MessageCircle, label: 'Community', path: '/community' },
        ],
        ngo: [
            { icon: Search, label: 'Matching', path: '/ngo' },
            { icon: Database, label: 'Surplus Intel', path: '/ngo#intel' },
            { icon: Globe, label: 'Global Map', path: '/community' },
        ],
        corporate: [
            { icon: Globe, label: 'ESG Portal', path: '/corporate' },
            { icon: Award, label: 'Certificates', path: '/corporate#certs' },
            { icon: Users, label: 'Corporate Social', path: '/community' },
        ],
        admin: [
            { icon: Database, label: 'Control Room', path: '/admin' },
            { icon: Search, label: 'User Intel', path: '/admin#users' },
            { icon: Globe, label: 'World View', path: '/admin#map' },
        ]
    };

    const links = roleLinks[user.role] || [];

    return (
        <motion.div
            onMouseEnter={() => setCollapsed(false)}
            onMouseLeave={() => setCollapsed(true)}
            animate={{ width: collapsed ? 80 : 260 }}
            className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col pt-24 pb-10 px-4 transition-all duration-300 ${isDark ? 'bg-black/40 border-r border-white/5' : 'bg-white/80 border-r border-gray-100'
                } backdrop-blur-3xl`}
        >
            <div className="flex-1 space-y-2">
                {links.map((link) => (
                    <SidebarItem
                        key={link.label}
                        icon={link.icon}
                        label={link.label}
                        path={link.path}
                        active={location.pathname === link.path}
                        collapsed={collapsed}
                        onClick={() => navigate(link.path)}
                    />
                ))}
            </div>

            <div className="space-y-2">
                <div className={`h-px mx-4 mb-4 ${isDark ? 'bg-white/5' : 'bg-gray-100'}`} />

                <SidebarItem
                    icon={Settings}
                    label="Intelligence Settings"
                    collapsed={collapsed}
                />
                <SidebarItem
                    icon={HelpCircle}
                    label="Protocol Support"
                    collapsed={collapsed}
                />

                <div className="mt-8">
                    <SidebarItem
                        icon={LogOut}
                        label="Terminate Session"
                        collapsed={collapsed}
                        onClick={() => {
                            logout();
                            navigate('/');
                        }}
                        className="text-red-400 hover:bg-red-500/10"
                    />
                </div>
            </div>

            <div className="absolute right-[-12px] top-1/2 -translate-y-1/2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border shadow-xl ${isDark ? 'bg-gray-900 border-white/10 text-white' : 'bg-white border-gray-100 text-gray-500'
                    }`}>
                    <ChevronRight size={12} className={`transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} />
                </div>
            </div>
        </motion.div>
    );
};

export default Sidebar;
