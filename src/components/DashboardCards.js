// components/DashboardCards.js
import React, { useEffect, useState } from 'react';
import './styles/DashboardCards.css';

const DashboardCards = ({ stats,totals }) => {
  const [openingBalance,setOpeningBalance] =useState(28700)
  const [upfrontPayment,setUpfrontPayments] =useState(1200)

  useEffect(()=>{
    console.log('The data ----HHHHHHHH:: ', totals
)

  },[])
  const cards = [ {
      title: 'Opening Balance(May 2025)',
      value: `KSH ${openingBalance} | T_ID:TF37C93YJZ`,
      icon: '🏦',
      color: 'bg-primary text-white',
    },
    {
      title: 'Upfront Payments as of May 2025',
      value: `KSH ${upfrontPayment}`,
      icon: '💸',
      color: 'bg-secondary text-white',
    },
    {
      title: 'Total Amount in Arrears',
      value: `KSH ${totals.user_arrears}`,
      icon: '🟡',
      color: 'bg-warning text-black',
    },
    {
      title: 'Total Paid Arrears',
      value: `KSH ${totals.payments.Arrears}`,
      icon: '💰',
      color: 'bg-info text-white',
    },
    {
      title: 'Total Monthly Contribution',
      value: `KSH ${totals.payments.Monthly}`,
      icon: '🟢',
      color: 'bg-success text-white',
    },
    
    {
      title: 'Total Expenses',
      value: `KSH ${totals.expenditures}`,
      icon: '📉',
      color: 'bg-danger text-white',
    },
    

    {
      title: 'NET BALANCE', // less upfront payments
      value: `KSH ${openingBalance + totals.payments.Arrears + totals.payments.Monthly - totals.expenditures- upfrontPayment}`,
      icon: '💵',
      color: 'bg-teal text-black',
    },
   
  ];

  return (
    <div className="dashboard-cards container-fluid row g-4 py-4">
      {cards.map((card, index) => (
        <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
          <div className={`card card-stat shadow-sm h-100 ${card.color}`}>
            <div className="card-body d-flex flex-column justify-content-center align-items-center text-center">
              <div className="stat-icon fs-2 mb-2">{card.icon}</div>
              <div className="stat-value fw-bold fs-4">{card.value}</div>
              <div className="stat-title small mt-1">{card.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
