import { Navigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { user, loading } = useApp();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-950">
                <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) {
        // Redirect to login with role context if available
        const searchParams = allowedRoles.length > 0 ? `?role=${allowedRoles[0]}` : '';
        return <Navigate to={`/login${searchParams}`} state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        // Role not authorized, send back to their own dashboard or landing
        const defaultPath = user.role === 'admin' ? '/admin' : `/${user.role}`;
        return <Navigate to={defaultPath} replace />;
    }

    return children;
};

export default ProtectedRoute;
