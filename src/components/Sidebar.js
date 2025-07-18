import React, { useState, useEffect } from 'react';
import { Nav, Button, Offcanvas } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Detect mobile screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 350);
      if (window.innerWidth >= 350) {
        setShowOffcanvas(false); // close offcanvas if resizing up
      }
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // If mobile, sidebar is hidden by default and shown as Offcanvas
  if (isMobile) {
    return (
      <>
        {/* Hamburger button fixed top-left */}
        <Button
          variant="primary"
          onClick={() => setShowOffcanvas(true)}
          className="position-fixed top-2 start-2 zindex-tooltip"
          style={{ zIndex: 1051 }} // above navbar
        >
          <i className="bi bi-list fs-4"></i>
        </Button>

        <Offcanvas
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          backdrop={true}
          scroll={false}
          responsive="md"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            <Nav className="flex-column mt-4">
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/home"
                  onClick={() => setShowOffcanvas(false)}
                  className={`px-1 py-2 ${location.pathname === '/add-user' ? 'active' : ''}`}
                >
                  <i className="bi bi-house"></i>
                  {!collapsed && <span className="ms-1">Home</span>}
                </Nav.Link>

              </Nav.Item>
              <Nav.Item>

                <Nav.Link
                  as={Link}
                  to="/view-users"
                  onClick={() => setShowOffcanvas(false)}
                  className={`px-1 py-2 ${location.pathname === '/view-users' ? 'active' : ''}`}
                >
                  <i className="bi bi-people"></i>
                  {!collapsed && <span className="ms-1">Members</span>}
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/payment"
                  onClick={() => setShowOffcanvas(false)}
                  className={`px-1 py-2 ${location.pathname === '/payment' ? 'active' : ''}`}
                >
                  <i className="bi bi-credit-card"></i>
                  {!collapsed && <span className="ms-1">Pay</span>}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/payments-pending"
                  onClick={() => setShowOffcanvas(false)}
                  className={`px-1 py-2 ${location.pathname === '/payments-pending' ? 'active' : ''}`}
                >
                  <i className="bi bi-bell"></i>
                  {!collapsed && <span className="ms-1">Unverified </span>}
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/expenses"
                  onClick={() => setShowOffcanvas(false)}
                  className={`px-1 py-2 ${location.pathname === '/expenses' ? 'active' : ''}`}
                >
                  <i className="bi bi-plus"></i>
                  {!collapsed && <span className="ms-1">Add Expense</span>}
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/expenses-view"
                  onClick={() => setShowOffcanvas(false)}
                  className={`px-1 py-2 ${location.pathname === '/expenses-view' ? 'active' : ''}`}
                >
                  <i className="bi bi-receipt"></i>
                  {!collapsed && <span className="ms-1">Expenses View</span>}
                </Nav.Link>
              </Nav.Item>



              {/* <Nav.Item>            
            <Nav.Link
              as={Link}
              to="/payment-history/:userId"
              className={`px-1 py-2 ${location.pathname === '/payment-history/:userId' ? 'active' : ''}`}
            >
              <i className="bi bi-people"></i>
              {!collapsed && <span className="ms-1">Payment History</span>}
            </Nav.Link>
          </Nav.Item> */}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

  // Desktop sidebar (collapsed toggle as before)
  return (
    <div
      className="bg-light d-flex flex-column justify-content-between border-end"
      style={{ width: collapsed ? '52px' : '165px', minHeight: '100vh', transition: 'width 0.3s ease' }}
    >
      <div>
        <div className="flex justify-start">
          <Button
            variant="outline"
            onClick={() => setCollapsed(!collapsed)}
            className="w-50 mt-1"
          >
            <i className={`bi ${collapsed ? 'bi-arrow-bar-right' : 'bi-arrow-bar-left'}`}></i>
            {!collapsed && <span className="ms-3"></span>}
          </Button>
        </div>



        <Nav className="flex-column mt-4">
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/home"
              className={`px-1 py-2 ${location.pathname === '/add-user' ? 'active' : ''}`}
            >
              <i className="bi bi-house"></i>
              {!collapsed && <span className="ms-1">Home</span>}
            </Nav.Link>

          </Nav.Item>
          <Nav.Item>

            <Nav.Link
              as={Link}
              to="/view-users"
              className={`px-1 py-2 ${location.pathname === '/view-users' ? 'active' : ''}`}
            >
              <i className="bi bi-people"></i>
              {!collapsed && <span className="ms-1">Members</span>}
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/payment"
              className={`px-1 py-2 ${location.pathname === '/payment' ? 'active' : ''}`}
            >
              <i className="bi bi-credit-card"></i>
              {!collapsed && <span className="ms-1">Pay</span>}
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/payments-pending"
              className={`px-1 py-2 ${location.pathname === '/payments-pending' ? 'active' : ''}`}
            >
              <i className="bi bi-bell"></i>
              {!collapsed && <span className="ms-1">Unverified</span>}
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/expenses"
              className={`px-1 py-2 ${location.pathname === '/expenses' ? 'active' : ''}`}
            >
              <i className="bi bi-plus"></i>
              {!collapsed && <span className="ms-1">Add Expense</span>}
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/expenses-view"
              className={`px-1 py-2 ${location.pathname === '/expenses-view' ? 'active' : ''}`}
            >
              <i className="bi bi-receipt"></i>
              {!collapsed && <span className="ms-1">Expenses View</span>}
            </Nav.Link>
          </Nav.Item>



          {/* <Nav.Item>            
            <Nav.Link
              as={Link}
              to="/payment-history/:userId"
              className={`px-1 py-2 ${location.pathname === '/payment-history/:userId' ? 'active' : ''}`}
            >
              <i className="bi bi-people"></i>
              {!collapsed && <span className="ms-1">Payment History</span>}
            </Nav.Link>
          </Nav.Item> */}
        </Nav>
      </div>

      {!collapsed && (
        <div className="text-center p-3 small text-muted border-top">
          <span>© 2025</span>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
