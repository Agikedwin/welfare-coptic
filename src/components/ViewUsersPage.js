// src/components/ViewUsersPage.js
import React, { useEffect, useState } from "react";
import { Card, Table, Container, Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, saveUserArrears,getCurrentUser } from '../services/UserService';

function ViewUsersPage() {
  const navigate = useNavigate();
  const [currentlyLogged, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [outstandingArrears, setOutstandingArrears] = useState('');
  const [status, setStatus] = useState('Pending');
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {

     const loadUser = async () => {
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
    loadUser();
    
    
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setAllUsers(users);
    };
    fetchUsers();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setOutstandingArrears('');
    setStatus('Pending');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSaveArrears = async () => {
    if (!selectedUser) return;
    await saveUserArrears({
      user_id: selectedUser.uid,
      outstanding_arrears: Number(outstandingArrears),
      //status,
      email: selectedUser.email,
      created_at: new Date(),
    });
    handleCloseModal();
  };

  const handleViewClick = (userId) => {
    navigate(`/payment-history/${userId}`);
  };

  return (
    <Container fluid className="py-4" style={{ minHeight: '100vh' }}>
      <Card className="shadow-sm rounded-4">
        <Card.Header className="bg-primary text-white fw-bold fs-6">
          
          <div className="mb-1 d-flex justify-content-end">
            <input
              type="text"
              className="form-control w-20"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
          </div>
        </Card.Header>
        <Card.Body>
          <Table responsive hover bordered className="align-middle mb-0">
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.filter((user) =>
                  user.full_name?.toLowerCase().includes(searchTerm)
                ).map((user, idx) => (
                <tr key={user.uid}>
                  <td>{idx + 1}</td>
                  <td>{user.full_name}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`badge bg-${user.user_role === 'Admin' ? 'danger' : user.user_role === 'Editor' ? 'warning text-dark' : 'secondary'}`}>
                      {user.user_role}
                    </span>
                  </td>
                  
                  <td className="text-center">
                    {(currentlyLogged.uid ==="30GeuuY6PcZJIKUCD94DhXWhSXs1") ?  (
                     <>
                      <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => openModal(user)}
                    >
                      Update
                    </Button>     
                    
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleViewClick(user.uid)}
                    >
                      View
                    </Button>
                     </>
                      
                  ):
                  (
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleViewClick(user.uid)}
                    >
                      View
                    </Button>
                  )
                  }
                    
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* ✅ Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Update User Arrears</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" value={selectedUser?.uid} disabled readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Outstanding Arrears (Ksh)</Form.Label>
              <Form.Control
                type="number"
                value={outstandingArrears}
                min={0}
                onChange={(e) => setOutstandingArrears(e.target.value)}
                placeholder="Enter amount"
              />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Verified">Verified</option>
              </Form.Select>
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="success" onClick={handleSaveArrears}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ViewUsersPage;
