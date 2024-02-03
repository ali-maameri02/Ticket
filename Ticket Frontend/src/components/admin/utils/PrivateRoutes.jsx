import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const PrivateRoutes = ({ Component  , isAuthenticated}) => {
   
  return isAuthenticated ? (
    <Component  />
  ) : (
    <Navigate to="/admin" replace />
  );
};

export default PrivateRoutes;
