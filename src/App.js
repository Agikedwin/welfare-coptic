// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavbarComponent from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './components/LoginPage';
import AddUserPage from './components/AddUserPage';
import ViewUsersPage from './components/ViewUsersPage';
import SignupPage from './components/SignupPage';
import PaymentForm from './components/PaymentForm';
import PaymentHistory from './components/PaymentHistory';
import MainDashboardCards from './components/MainDashboardCards'
import ExpenditureForm from './components/ExpenditureForm';
import ExpenditureView from './components/ExpenditureView';
import PendingVerification from './components/PendingVerification';

function LayoutWrapper({ children }) {
  const location = useLocation();
  const publicRoutes = ['/', '/signup'];
  const isAuthPage = publicRoutes.includes(location.pathname);

  return isAuthPage ? (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      {children}
    </div>
  ) : (
    <div>
      <NavbarComponent />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1 p-4">{children}</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<MainDashboardCards/>} />
          <Route path="/add-user" element={<AddUserPage />} />
          <Route path="/view-users" element={<ViewUsersPage />} />
           <Route path="/payment" element={<PaymentForm />} />
           <Route path="/payment-history/:userId" element={<PaymentHistory />} />
           <Route path="/expenses" element={<ExpenditureForm/>} />
           <Route path="/expenses-view" element={<ExpenditureView/>} />
           <Route path="/payments-pending" element={<PendingVerification/>} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
