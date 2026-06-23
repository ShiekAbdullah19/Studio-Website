import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages Imports
import Login from './pages/Login';
import Portfolio from './pages/Portfolio';
import TrackProject from './pages/Customer/TrackProject';
import StaffDashboard from './pages/Staff/StaffDashboard';
import TaskDetails from './pages/Staff/TaskDetails';
import PaymentPage from './pages/Customer/PaymentPage';

// Owner Imports (Successfully Renamed from Admin)
import OwnerDashboard from './pages/Owner/OwnerDashboard';
import OwnerLogin from './pages/Owner/OwnerLogin';
import JobCardManager from './pages/Owner/JobCardManager'; // Future Import for Job Cards

// Secure Route Shield Wrapper Component for Owner
const OwnerGuard = ({ children }) => {
  // Token renamed to ownerToken for consistency
  const token = localStorage.getItem('ownerToken');
  
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
        
        {/* Secret Hidden Owner Login Path Route */}
        <Route path="/login/owner" element={<OwnerLogin />} />
        
        {/* Customer Portal Routes */}
        <Route path="/customer/track" element={<TrackProject />} />
        <Route path="/customer/payment" element={<PaymentPage />} />

        {/* Staff Portal Routes */}
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/task/:taskId" element={<TaskDetails />} />

        {/* Fully Shielded Owner Portal Routes */}
        <Route 
          path="/owner/dashboard" 
          element={
            <OwnerGuard>
              <OwnerDashboard />
            </OwnerGuard>
          } 
        />
        
        <Route 
          path="/owner/job-cards" 
          element={
            <OwnerGuard>
              <JobCardManager />
            </OwnerGuard>
          } 
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;