import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function AddUserPage() {
  return (
    <Container>
      <h2 className="my-4">Add User</h2>
      <Form>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add User
        </Button>
      </Form>
    </Container>
  );
}

export default AddUserPage;
