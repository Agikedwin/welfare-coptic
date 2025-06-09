import { getFirestore, collection, addDoc, getDocs,query, where, doc, updateDoc,getDoc} from 'firebase/firestore';
import {db} from '../firebase'

import { getCurrentUser } from '../auth/AuthUser';

const paymentCollection = collection(db, "payments");
const arrearsCollection = collection(db, "users_arrears");


export const savePayment = async (data) => {
  const docRef = await addDoc(paymentCollection, data);
  return docRef;
};

/**
 * Fetch payments filtered by userId
 * @param {string} userId - Firebase Auth UID
 */
export const fetchPayments = async (userId) => {
  let q = paymentCollection;

  if (userId) {
    q = query(paymentCollection, where('user_id', '==', userId));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const fetchPaymentTotalsByType = async (userId) => {
   // const user = await getCurrentUser();
  const payments = await fetchPayments();
  console.log("THE PAYMENT SERVICE :::", payments)

  // Initialize totals
  const totals = {
    Monthly: 0,
    Arrears: 0,
  };

  payments.forEach(({ paymentType, amount, user_id, status }) => {
    if (
      user_id === userId  &&
      status === 'Verified' &&
      (paymentType === 'Monthly' || paymentType === 'Arrears')
    ) {
      totals[paymentType] += Number(amount) || 0;
    }
  });

  return totals;
};

// ✅ Update status of a payment
export const updatePaymentStatus = async (paymentId, newStatus) => {
  const paymentRef = doc(paymentCollection, paymentId);
  await updateDoc(paymentRef, {
    status: newStatus,
  });
};


export const fetchOutstandingArrears = async (userId) => {
  try {
    const q = query(
      arrearsCollection,
      where('user_id', '==', userId)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const data = snapshot.docs[0].data();
      console.log(`Outstanding Arrears for user ${userId}:`, data.outstanding_arrears);
      return data.outstanding_arrears || 0;
    } else {
      console.warn(`No arrears found for userId: ${userId}`);
      return 0;
    }
  } catch (error) {
    console.error('Error fetching outstanding arrears:', error);
    return 0;
  }
};

export const checkIfEntryExists = async (userId, month, year) => {
  const q = query(paymentCollection, // Replace with your collection name
    where("user_id", "==", userId),
    where("month", "==", month),
    where("year", "==", year)
  );

  try {
    const querySnapshot = await getDocs(q);
    console.log('Check payment exists:: ',!querySnapshot.empty )
    return !querySnapshot.empty; // true if exists
  } catch (error) {
    console.error("Error checking Firestore:", error);
    return true;
  }
};