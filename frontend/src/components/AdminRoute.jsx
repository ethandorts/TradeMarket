import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.login) || {};

    // Check if userInfo is defined and truthy
    const isAuthenticated = userInfo && userInfo.token;

    return userInfo && userInfo.isAdmin ? (<Outlet />) : (<Navigate to="/login" replace />);
};

export default AdminRoute;