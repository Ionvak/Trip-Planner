import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LoggedinContext } from '../src/loggedIn';

function Navigation() {

    const navigate = useNavigate();
    const { loggedIn } = useContext(LoggedinContext);

  return (
      <nav>
          <Navbar expand='lg'>
              <Navbar.Brand onClick={() => navigate("/")}>Trip Planner</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                      <Nav.Link onClick={() => navigate("/users")}>Users</Nav.Link>
                      <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
                      <Nav.Link onClick={() => navigate("/register")}>Register</Nav.Link>
                      <p>{loggedIn ? "Logged in as user: " + loggedIn : "Not currently logged in"}</p>
                  </Nav>
              </Navbar.Collapse>
          </Navbar>
      </nav>
  );
}

export default Navigation;