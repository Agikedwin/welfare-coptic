import React, { useEffect, useState } from "react";

import DashboardCards from './DashboardCards';
import { 
  getExpendituresTotal,
  getPaymentsTotal,
  getUserArrearsTotal,
  fetchPaymentTotalsByType
 } from '../services/DashboardService';

const stats = {
  totalMembersArrears: 12,
  totalMembersMonthly: 34,
  totalPaidArrears: 2100,
  totalExpenses: 1450,
  openingBalance: 8500,
};

const MainDashboardCards = ()=> {
  const [totals, setTotals] = useState({
    expenditures: 0,
    payments: 0,
    user_arrears: 0,
  });
  const [loading, setLoading] = useState(true);


useEffect(() => {
    const fetchAllTotals = async () => {
      try {
        const [expenditures, payments, user_arrears] = await Promise.all([
          getExpendituresTotal(),
          //getPaymentsTotal(),
          fetchPaymentTotalsByType(),
          getUserArrearsTotal(),
        ]);
        setTotals({ expenditures, payments, user_arrears });
      } catch (error) {
        console.error("Error fetching totals:", error);
      } finally {
        setLoading(false); // Show content after all data loads
      }
    };

    fetchAllTotals();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading financial data...</p>
      </div>
    );
  }
  else{
  return (
    <div className="container py-4">
      <h3 className="mb-4">📊 Financial Summary</h3>
      <DashboardCards stats={stats} totals={totals} />
    </div>
  );
}
}
export default MainDashboardCards
