import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';

import PageLoader from './components/ui/PageLoader';
import ScrollToTop from './components/ui/ScrollToTop';
import FloatingActionButton from './components/ui/FloatingActionButton';

import Landing from './pages/Landing';
import DonorDashboard from './pages/donor/DonorDashboard';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import NGODashboard from './pages/ngo/NGODashboard';
import CorporateDashboard from './pages/corporate/CorporateDashboard';
import CommunityFeed from './pages/community/CommunityFeed';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import Profile from './pages/profile/Profile';
import RiderDashboard from './pages/rider/RiderDashboard';
import NotFound from './pages/NotFound';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <ThemeProvider>
        <PageLoader />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <AppProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              borderRadius: '20px',
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(0,0,0,0.05)',
            },
            duration: 3000,
          }}
        />

        <ScrollToTop />
        <FloatingActionButton />

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/donor" element={
            <ProtectedRoute allowedRoles={['donor']}>
              <DonorDashboard />
            </ProtectedRoute>
          } />
          <Route path="/restaurant" element={
            <ProtectedRoute allowedRoles={['restaurant']}>
              <RestaurantDashboard />
            </ProtectedRoute>
          } />
          <Route path="/ngo" element={
            <ProtectedRoute allowedRoles={['ngo']}>
              <NGODashboard />
            </ProtectedRoute>
          } />
          <Route path="/corporate" element={
            <ProtectedRoute allowedRoles={['corporate']}>
              <CorporateDashboard />
            </ProtectedRoute>
          } />
          <Route path="/community" element={
            <ProtectedRoute>
              <CommunityFeed />
            </ProtectedRoute>
          } />
          <Route path="/rider" element={
            <ProtectedRoute allowedRoles={['rider']}>
              <RiderDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;