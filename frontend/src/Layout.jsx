import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-dark-900 animate-fade-in">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
