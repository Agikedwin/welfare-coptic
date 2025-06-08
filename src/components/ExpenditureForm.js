import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Toast, ToastContainer } from 'react-bootstrap';
import { addExpenditure } from '../services/ExpenditureService';

const ExpenditureForm = () => {
  const [formData, setFormData] = useState({
    expenditure_id: '',
    user_id: '',
    amount: '',
    expense_type: '',
    member_name: '',
    description: '',
    date: '',
    createdAt: new Date()
  });

  const [toast, setToast] = useState({
    show: false,
    message: '',
    variant: 'success'
  });

  const expenseTypes = [
    'Childbirth',
    'Wedding',
    'Bereavement',
    'Hospitalization',
    'Farewell Party'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addExpenditure(formData);

    if (result.success) {
      setToast({
        show: true,
        message: `Expenditure saved successfully! ID: ${result.id}`,
        variant: 'success'
      });

      setFormData({
        expenditure_id: '',
        user_id: '',
        amount: '',
        expense_type: '',
        member_name: '',
        description: '',
        date: '',
        createdAt: new Date()
      });
    } else {
      setToast({
        show: true,
        message: 'Failed to save expenditure.',
        variant: 'danger'
      });
    }
  };

  return (
    <Container className="my-5">
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast
          show={toast.show}
          bg={toast.variant}
          onClose={() => setToast({ ...toast, show: false })}
          delay={4000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Expenditure</strong>
            <small>Now</small>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Card className="shadow-lg border-0">
        <Card.Header className=" text-black text-center">
          <h4>Expenditure </h4>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="expenditure_id">
                  <Form.Label>Expenditure ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="expenditure_id"
                    placeholder="Enter expenditure ID"
                    value={formData.expenditure_id}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="user_id">
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="user_id"
                    placeholder="Enter user ID"
                    value={formData.user_id}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="amount">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="expense_type">
                  <Form.Label>Expense Type</Form.Label>
                  <Form.Select
                    name="expense_type"
                    value={formData.expense_type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select expense type</option>
                    {expenseTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="member_name">
                  <Form.Label>Member Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="member_name"
                    placeholder="Enter member name"
                    value={formData.member_name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit" size="lg">
                Submit Expenditure
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ExpenditureForm;
