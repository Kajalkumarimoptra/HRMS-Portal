// components/ProtectedRoute.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useSearchParams } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    let [searchParams] = useSearchParams();
    let token = sessionStorage.getItem('token'); // Check if the token exists
    // const token = sessionStorage.getItem('token') || searchParams.get('token'); // Check if the token exists

    // If token is found in URL and not already stored in sessionStorage, store it
    let urlToken = searchParams.get('token');

     // If the token is found in sessionStorage but not already stored, store it
    if (token && !sessionStorage.getItem('token')) {
        sessionStorage.setItem('token', token);
    }

    // If the token is found in the URL and not in sessionStorage, store it
    if (urlToken && !token) {
        sessionStorage.setItem('token', urlToken);
        token = urlToken; // Update the token variable to reflect the URL token
    }

    console.log('got token:', token);
    if (!token) {
        return <Navigate to="/" />;
    }

    return children;
};


export default ProtectedRoutes;
