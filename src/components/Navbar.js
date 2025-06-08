import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles/Navbar.css';  // import custom styles

function NavbarComponent() {
  return (
    <Navbar className="custom-dark-navbar" variant="dark" expand="lg" sticky="top" >
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          <i className="bi bi-speedometer2 me-2"></i>Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/login">
              <i className="bi bi-box-arrow-in-right me-1"></i>Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
