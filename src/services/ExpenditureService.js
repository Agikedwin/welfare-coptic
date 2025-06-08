// src/services/ExpenditureService.js
import { collection, addDoc , getDocs} from 'firebase/firestore';
import {db} from '../firebase'

const expendituresCollection = collection(db, 'expenditures');

export const addExpenditure = async (expenditureData) => {
  try {
    const docRef = await addDoc(expendituresCollection, expenditureData);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving expenditure:', error);
    return { success: false, error };
  }
};

export const getAllExpenditures = async () => {
  try {
    const snapshot = await getDocs(expendituresCollection);
    const data = snapshot.docs.map((doc) => doc.data());
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching expenses:', error);
    return { success: false, error };
  }
};
