import React, { useState,useEffect } from 'react';
import './styles/PaymentForm.css';
import { savePayment, checkIfEntryExists } from '../services/paymentService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const years = Array.from({ length: 7 }, (_, i) => new Date().getFullYear() - 5 + i);

const PaymentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_id: '',
    paymentType: 'Monthly',
    month: '',
    year: '',
    amount: 200,
    transactionId: '',
    remarks: '',
    status: 'Pending',
    email: '',
    createdAt: new Date()
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     if ( formData.user_id === '') {
      toast.warn('User Id required, please login first');
       navigate('/login');

      return;
    }
    if(formData.year ==='' && formData.paymentType !=='Arrears'){
     return toast.error('Please select year');
    }
    if(formData.year ==='' && formData.paymentType !=='Monthly'){
     return toast.error('Please select year ' );
    }
    if(formData.paymentType ===''){
     return toast.error('Please select payment type' );
    }
    if(formData.month ==='' && formData.paymentType !=='Arrears'){
     return toast.error('Please select month ' );
    }
    if ( Number(formData.amount) != 200) {
      toast.warn('Amount must be 200');
      return;
    }
   
    try {
      const [dataExists] = await Promise.all([
                              checkIfEntryExists(formData.user_id,formData.month, formData.year)
                          ]);
                          
      console.log("PAYMENT STATE :::",dataExists )

      if(dataExists){
        toast.warning(`You have already paid your monthly contribution for  ${formData.month} ${formData.year}. Thank you   ` )
        return

      }else{
        await savePayment(formData);
      toast.success('✅ Payment saved successfully!');
      setFormData({
        user_id: formData.user_id,
        paymentType: 'Monthly',
        month: months[0],
        year: new Date().getFullYear(),
        amount: 200,
        transactionId: '',
        remarks: '',
        status: 'Pending',
        email: formData.email,
        createdAt: new Date()
      });
        
      }    

      
    } catch (error) {
      toast.error('❌ Error saving payment: ' + error.message);
    }
  };

    useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log("User ::::",user)
      if (user) {
        setFormData((prev) => ({ ...prev, user_id: user.uid }));
        setFormData((prev) => ({ ...prev, email: user.email }));
      } else {
        // Optional: handle logged-out state
        toast.error('User not logged in!');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="payment-form-container">
      <h2>Payment Entry</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <label>
          User ID:
          <input type="text" name="user_id" value={formData.user_id} onChange={handleChange}   readOnly
    disabled required />
        </label>

        <label>
          Payment Type:
          <select name="paymentType" value={formData.paymentType} onChange={handleChange} required>
            <option value="Monthly">Monthly</option>
            <option value="Arrears">Arrears</option>
          </select>
        </label>

        {/* {formData.paymentType === 'Monthly' && (
          <> */}
            <label>
              Month:
              <select name="month" value={formData.month} onChange={handleChange} required>
                {months.map((m, i) => (
                  <option key={i} value={m}>{m}</option>
                ))}
              </select>
            </label>

            <label>
              Year:
              <select name="year" value={formData.year} onChange={handleChange} required>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </label>
         {/*  </>
        )} */}

        <label>
          Amount (Max 200):
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
            max="200"
            min="200"
            disabled
          />
        </label>

        <label>
          Transaction ID:
          <input type="text" name="transactionId" value={formData.transactionId} onChange={handleChange} required />
        </label>

        <label>
          Remarks:
          <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="4" ></textarea>
        </label>

        <button type="submit">Submit</button>
      </form>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default PaymentForm;