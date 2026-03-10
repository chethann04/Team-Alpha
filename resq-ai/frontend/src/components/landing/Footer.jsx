import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { Leaf } from 'lucide-react';

const Footer = () => {
    const { isDark } = useTheme();

    return (
        <footer className={`py-16 px-6 ${isDark ? 'bg-black/40 border-t border-white/5' : 'bg-white/70 border-t border-gray-200'}`}>
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-mint flex items-center justify-center">
                                <Leaf size={16} className="text-white" />
                            </div>
                            <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                ResQ<span className="text-primary">-AI</span>
                            </span>
                        </div>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            AI-powered zero waste logistics connecting surplus food to communities in need.
                        </p>
                        <div className="flex gap-3 mt-4">
                            {['🌱 SDG 2', '♻️ SDG 12', '🌍 SDG 13', '🏙️ SDG 11'].map((tag) => (
                                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {[
                        { title: 'Platform', links: ['About', 'How It Works', 'Impact Map', 'Blog'] },
                        { title: 'Partners', links: ['CSR Programs', 'NGO Network', 'Rider Program', 'API'] },
                        { title: 'Connect', links: ['Community', 'Contact', 'Admin', 'Press'] },
                    ].map((col) => (
                        <div key={col.title}>
                            <h4 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{col.title}</h4>
                            {col.links.map((link) => (
                                <div key={link} className={`text-sm mb-2 cursor-pointer hover:text-primary transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {link}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className={`pt-8 border-t text-center text-sm ${isDark ? 'border-white/10 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
                    © 2025 ResQ-AI. Built with 💚 for a zero-waste world. All food rescued is love delivered.
                </div>
            </div>
        </footer>
    );
};

export default Footer;