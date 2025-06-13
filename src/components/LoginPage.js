// src/components/LoginPage.js
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { signInAndInitializeUser } from '../services/UserService';
import { ToastContainer, toast } from 'react-toastify';


function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      console.log("AT LOGIN ::::",email,password)
      await signInAndInitializeUser( email, password).then(result =>{
        console.log('The result ::: ', result.error)
        if(result.error){
           toast.warning('Invalid credentials. Please try again.' )
           return
        }
        navigate('/home'); // redirect after login

      });
      
    } catch (err) {
      //setError('Invalid credentials. Please try again.');
      console.log('LOGIN ERRRO')
     
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
               type="email"
                placeholder="Enter email"
                 required 
                 onChange={(e) => setEmail(e.target.value)}
                 />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password" 
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
               required />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-2">
              Login
            </Button>

            <Button variant="outline-secondary" className="w-100" onClick={() => navigate('/signup')}>
              Sign Up
            </Button>
          </Form>

          <ToastContainer position="top-right" autoClose={4000} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default LoginPage;
