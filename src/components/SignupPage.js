import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


import { auth } from '../firebase';
import { signInAndInitializeUser, signUpCreateUserWithEmailAndPassword } from '../services/UserService'; 

function SignupPage() {

    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullname] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(email)
    console.log(password)
    try {
      if(password !==confirmPwd){
        toast.warning(`Passwords do not match, please type again  ` )
        return
      }
      await signUpCreateUserWithEmailAndPassword(email, password,fullName,phoneNumber,confirmPwd);
      toast.success('✅ Sign up successfull');
      navigate('/'); // redirect after signup
    } catch (err) {
      toast.warning(err.message )
      setError(err.message);
    }
  };

  const onChaneSignUp = (e) =>{
    console.log(e.target.value)
    setEmail(e.target.value)
    setPassword(e.target.value)
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          <Form onSubmit={handleSignup}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
              type="text"
               placeholder="Enter full name" 
              required 
              onChange={(e) => setFullname(e.target.value)}
             
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
              type="email"
               placeholder="Enter email"
                required 
                 onChange={(e) => setEmail(e.target.value)}
                
                />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
              type="text"
               placeholder="Enter Current Number"
                required 
                 onChange={(e) => setPhoneNumber(e.target.value)}
                
                />
            </Form.Group>

            {/* <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
               type="password" 
               placeholder="Password" 
               required 
                onChange={(e) => setPassword(e.target.value)}
               />
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
               type="password" 
               placeholder="Password" 
               required 
                onChange={(e) => setConfirmPwd(e.target.value)}
               />
            </Form.Group> */}

            <Button variant="success" type="submit" className="w-100 mb-2">
              Sign Up
            </Button>

            <Button variant="outline-secondary" className="w-100" onClick={() => navigate('/')}>
              Back to Login
            </Button>
          </Form>
          <ToastContainer position="top-right" autoClose={4000} />
        </Card.Body>
      </Card>
    </div>
  );
}

export default SignupPage;
