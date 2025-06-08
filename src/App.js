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

function LayoutWrapper({ children }) {
  const location = useLocation();
  const publicRoutes = ['/login', '/signup'];
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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<MainDashboardCards/>} />
          <Route path="/add-user" element={<AddUserPage />} />
          <Route path="/view-users" element={<ViewUsersPage />} />
           <Route path="/payment" element={<PaymentForm />} />
           <Route path="/payment-history/:userId" element={<PaymentHistory />} />
           <Route path="/expenses" element={<ExpenditureForm/>} />
           <Route path="/expenses-view" element={<ExpenditureView/>} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
}

export default App;
