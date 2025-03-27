// components/ProtectedRoute.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useSearchParams } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
    let [searchParams] = useSearchParams();
    let token = localStorage.getItem('token'); // Check if the token exists

    // Get role from localStorage
    let role = localStorage.getItem('role');

    // If other token has to get from URL, store it
    let urlToken = searchParams.get('token');

     // If the token is found in sessionStorage but not already stored, store it
    if (token && !localStorage.getItem('token')) {
        localStorage.setItem('token', token);
    }

    // If the token is found in the URL and not in sessionStorage, store it
    if (urlToken) {
        console.log("URL Token:", urlToken);
        sessionStorage.setItem('urltoken', urlToken);
        // token = urlToken; // Update the token variable to reflect the URL token
    }

    // Check if both token and role exist
    if (!token && !role) {
        return <Navigate to="/" />; // Redirect to login if no token or role
    }

    console.log('got token:', token);
    console.log('role stored:', role);
    console.log("URL Token:", urlToken);
    // if (!token) {
    //     return <Navigate to="/" />;
    // }

    return children;
};


export default ProtectedRoutes;
