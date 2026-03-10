import Navbar from '../components/navbar/Navbar';
import HeroSection from '../components/landing/HeroSection';
import ImpactCounters from '../components/landing/ImpactCounters';
import ImpactMap from '../components/landing/ImpactMap';
import HowItWorks from '../components/landing/HowItWorks';
import CorporateHighlight from '../components/landing/CorporateHighlight';
import CommunityPreview from '../components/landing/CommunityPreview';
import SDGBadges from '../components/landing/SDGBadges';
import Testimonials from '../components/landing/Testimonials';
import Footer from '../components/landing/Footer';
import { useTheme } from '../context/ThemeContext';

const Landing = () => {
    const { isDark } = useTheme();
    return (
        <div className={`flex flex-col gap-16 ${isDark ? 'bg-darkbg' : 'bg-lightbg'}`}>
            <Navbar />
            <div className="flex flex-col gap-16">
                <HeroSection />
                <div id="how-it-works"><ImpactCounters /></div>
                <ImpactMap />
                <HowItWorks />
                <CorporateHighlight />
                <CommunityPreview />
                <SDGBadges />
                <Testimonials />
            </div>
            <Footer />
        </div>
    );
};

export default Landing;