import React from 'react';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import './ProtectedRoute.css';
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Pacifico:400']
    }
});

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            loginWithRedirect();
        }
    }, [isLoading, isAuthenticated, loginWithRedirect]);
    console.log("is authenticated", isAuthenticated);
    if (isLoading) {
        return <div className='loading-page'>
            <h2 className='loading-title'>Loading...</h2>
        </div>;
    }

    return isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default ProtectedRoute;
