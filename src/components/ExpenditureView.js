import React, { useEffect, useState } from 'react';
import { Table, Card, Spinner, Alert } from 'react-bootstrap';
import { getAllExpenditures } from '../services/ExpenditureService';

const ExpenditureView = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      const result = await getAllExpenditures();
      if (result.success) {
        setExpenses(result.data);
      } else {
        setError('Failed to fetch expenses');
      }
      setLoading(false);
    };
    fetchExpenses();
  }, []);

  return (
    <Card className="shadow-sm mt-4">
      <Card.Header className="text-black">
        <h5 className="mb-0">Expenditure Records</h5>
      </Card.Header>
      <Card.Body className="p-0">
        {loading ? (
          <div className="p-4 text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="m-3">{error}</Alert>
        ) : expenses.length === 0 ? (
          <Alert variant="info" className="m-3">No expenditures found.</Alert>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover variant="light" className="mb-0">
              <thead className="table-primary text-center">
                <tr>
                  <th>#</th>
                  <th>User ID</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Member</th>
                  <th>Description</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td>{expense.user_id}</td>
                    <td>Ksh. {parseFloat(expense.amount).toFixed(2)}</td>
                    <td>{expense.expense_type}</td>
                    <td>{expense.member_name}</td>
                    <td>{expense.description}</td>
                    <td>{expense.date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ExpenditureView;
