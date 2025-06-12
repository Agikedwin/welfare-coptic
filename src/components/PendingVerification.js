import React, { useEffect, useState } from 'react';
import {
    fetchPayments, fetchPaymentsPending, updatePaymentStatus,
} from '../services/paymentService';
import './styles/PaymentTable.css'; // Custom styles
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // Bootstrap modal
import { getCurrentUser } from '../services/UserService';

const PendingVerification = () => {
    const [currentlyLogged, setUser] = useState(null);
    const [payments, setPayments] = useState([]);
    const [totals, setTotals] = useState({ Monthly: 0, Arrears: 0 });
    const [loading, setLoading] = useState(true);
    const { userId } = useParams();
    const [arrears, setArrears] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    const handleOpenModal = (payment) => {
        setSelectedPayment(payment);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPayment(null);
    };

    const handleStatusUpdate = async () => {
        if (!selectedPayment) return;

        await updatePaymentStatus(selectedPayment.id, 'Verified');
        const updatedPayments = await fetchPayments(userId);
        setPayments(updatedPayments);
        handleCloseModal();
    };

    useEffect(() => {
        console.log("AT the new table")

             const loadUserLogged = async () => {
                  try {
                    const currentUser = await getCurrentUser();
                    if (currentUser) {
                      setUser(currentUser);
                      console.log('Logged in user:', currentUser);
                    } else {
                      console.warn('No user is logged in');
                    }
                  } catch (error) {
                    console.error('Error fetching user:', error);
                  }
                };

            const loadData = async () => {
                try {
                    const [paymentsData] = await Promise.all([
                        fetchPaymentsPending(),
                        
                    ]);
                    setPayments(paymentsData);
                    
                } catch (error) {
                    console.error('Error loading data:', error);
                } finally {
                    setLoading(false);
                }
            };
            loadUserLogged()
            loadData();
            console.log(payments)
        
    }, []);

    return (
        <div className="payment-table-container container-fluid py-2">
            <h3 className="table-title mb-1">📄 Payments Unverified</h3>

            {loading ? (
                <div className="text-center text-muted fs-5">Loading payments...</div>
            ) : (
                <>
                <div className="mb-3 d-flex justify-content-end">
                    <input
                        type="text"
                        className="form-control w-50"
                        placeholder="Search by email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                    />
                    </div>
                    <div className="table-responsive shadow-sm rounded bg-white p-3">
                        <table className="table table-bordered table-hover table-striped align-middle mb-0">
                            <thead className="table-custom-head">
                                <tr>
                                    <th>User</th>
                                    <th>Transaction ID</th>
                                    <th>Amount</th>
                                    <th>Payment Type</th>
                                    <th>Month</th>
                                    <th>Year</th>                                    
                                    <th>Remarks</th>
                                    <th>Verified/Pending</th>
                                    <th>Date</th>
                                    {currentlyLogged.uid == '30GeuuY6PcZJIKUCD94DhXWhSXs1'? ( <th>Action</th>) : ''}
                                    
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {payments.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="text-center text-muted py-4">No records found.</td>
                                    </tr>
                                ) : (
                                    payments.filter((payment) =>
                                        payment.email?.toLowerCase().includes(searchTerm)
                                    )
                                    .map((payment) => {

                                        const rawDate = payment.createdAt?.toDate?.(); // convert Firestore Timestamp to JS Date
                                        const formattedDate = rawDate
                                            ? rawDate.toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',

                                            })
                                            : '-';


                                        return (
                                            <tr key={payment.id}>
                                                <td>{payment.email}</td>

                                                <td>{payment.transactionId}</td>

                                                <td>Ksh {payment.amount}</td>
                                                <td>{payment.paymentType}</td>
                                                <td>{payment.month || '-'}</td>
                                                <td>{payment.year || '-'}</td>
                                                <td>{payment.remarks}</td>
                                                <td>
                                                    <span
                                                        className={`badge ${payment.status === 'Verified'
                                                            ? 'bg-success'
                                                            : 'bg-warning text-dark'
                                                            }`}
                                                    >
                                                        {payment.status}
                                                    </span>
                                                </td>
                                                <td>{formattedDate}</td>
                                                <td>
                                                {payment.status !== 'Verified' && currentlyLogged.uid === '30GeuuY6PcZJIKUCD94DhXWhSXs1' && (
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => handleOpenModal(payment)}
                                                    >
                                                        Verify
                                                    </button>
                                                )}
                                            </td>
                                                
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                   
                </>
            )}

            {/* ✅ Modal for Status Update */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Verify Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to mark this payment as <strong>Verified</strong>?</p>
                    <ul className="list-unstyled small">
                        <li><strong>Transaction ID:</strong> {selectedPayment?.transactionId}</li>
                        <li><strong>Amount:</strong> Ksh {selectedPayment?.amount}</li>
                        <li><strong>Current Status:</strong> {selectedPayment?.status}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="success" onClick={handleStatusUpdate}>Verify</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PendingVerification;
