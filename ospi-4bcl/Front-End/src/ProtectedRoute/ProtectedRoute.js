import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ user, children }) {
    if (!user) {
        return <Navigate to="/Home/UpdatePassword" replace />;
    }
    return children;
}
//replace this with updated password file route
