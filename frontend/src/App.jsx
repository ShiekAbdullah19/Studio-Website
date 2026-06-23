import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages Imports
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import TrackProject from './pages/Customer/TrackProject';
import StaffDashboard from './pages/Staff/StaffDashboard';
import TaskDetails from './pages/Staff/TaskDetails';
import PaymentPage from './pages/Customer/PaymentPage';

// Admin Imports
import AdminDashboard from './pages/Admin/Dashboard';
import AdminLogin from './pages/Admin/AdminLogin';

// Secure Route Shield Wrapper Component
const AdminGuard = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  // If token is missing, prevent entry and bounce back to normal login
  if (!token || token !== 'SECRET_MUHURTHAM_ADMIN_NODE_KEY') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Main Login Screen (Staff & Customer Only) */}
        <Route path="/login" element={<Login />} />
        
        {/* Secret Hidden Admin Login Path Route */}
        <Route path="/login/admin" element={<AdminLogin />} />
        
        {/* Customer Portal Routes */}
        <Route path="/customer/track" element={<TrackProject />} />
        <Route path="/customer/payment" element={<PaymentPage />} />

        {/* Staff Portal Routes */}
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/task/:taskId" element={<TaskDetails />} />

        {/* Fully Shielded Admin Portal Route */}
        <Route 
          path="/admin/dashboard" 
          element={
            <AdminGuard>
              <AdminDashboard />
            </AdminGuard>
          } 
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;