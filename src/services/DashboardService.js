// src/services/DashnordService.js
import { collection, getDocs, query} from "firebase/firestore";
import { db } from "../firebase";

const paymentCollection = collection(db, "payments");

export const getExpendituresTotal = async () => {
  const snapshot = await getDocs(collection(db, "expenditures"));
  let total = 0;
  snapshot.forEach(doc => {
    total += parseFloat(doc.data().amount || 0);
  });
  console.log('Total 1 ::: ',total)
  return total;
};

export const getPaymentsTotal = async () => {
  const snapshot = await getDocs(collection(db, "payments"));
  let total = 0;
  snapshot.forEach(doc => {
    total += parseFloat(doc.data().amount || 0);
  });
  console.log('Total ::: 2',total)
  return total;
};


export const fetchPayments = async () => {
  let q = paymentCollection;

 
  q = query(paymentCollection);

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getUserArrearsTotal = async () => {
  const snapshot = await getDocs(collection(db, "users_arrears"));
  let total = 0;
  snapshot.forEach(doc => {
    total += parseFloat(doc.data().outstanding_arrears || 0);
  });
  console.log('Total ::: 3',total)
  return total;
};


export const fetchPaymentTotalsByType = async () => {
   // const user = await getCurrentUser();
  const payments = await fetchPayments();
 

  // Initialize totals
  const totals = {
    Monthly: 0,
    Arrears: 0,
  };

  payments.forEach(({ paymentType, amount }) => {
    if (
      
      (paymentType === 'Monthly' || paymentType === 'Arrears')
    ) {
      totals[paymentType] += Number(amount) || 0;
    }
  });
  console.log('Total :: ',totals)

  return totals;
};
