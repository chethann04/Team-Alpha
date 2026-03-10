import { useApp } from '../context/AppContext';
import Navbar from './navbar/Navbar';
import Sidebar from './navbar/Sidebar';
import { motion } from 'framer-motion';

const MainLayout = ({ children }) => {
    const { user } = useApp();

    return (
        <div className="min-h-screen relative">
            <Navbar />
            {user && <Sidebar />}
            <main
                className={`transition-all duration-300 ${user ? 'pl-20' : ''}`}
            >
                <div className="relative z-0">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default MainLayout;
