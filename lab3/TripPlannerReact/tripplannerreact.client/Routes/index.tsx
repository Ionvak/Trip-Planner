import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export function Index() {

    const navigate = useNavigate();

    return (
        <>
            <nav>
                <Navbar expand='lg'>
                    <Navbar.Brand onClick={() => navigate("/")}>Trip Planner</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                                <Nav.Link onClick={() => navigate("/add")}>Add Trip</Nav.Link>
                                <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
                                <Nav.Link onClick={() => navigate("/register")}>Register</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                </Navbar>    
            </nav>
        </>);
}

export default Index;