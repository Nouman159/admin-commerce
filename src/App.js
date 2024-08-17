import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PortalLayout from './Layouts/PortalLayout';
import './App.css';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import PendingOrders from './Pages/PendingOrders/PendingOrders';
import CompletedOrders from './Pages/CompletedOrders/CompletedOrders';
import OrderDetails from './Pages/OrderDetails/OrderDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        <Route
          path="/admin/*"
          element={
            <PortalLayout>
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="pending-orders" element={<PendingOrders />} />
                <Route path="completed-orders" element={<CompletedOrders />} />

                <Route path="order-details/:orderId" element={<OrderDetails />} />
              </Routes>
            </PortalLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
