import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoggedinContext } from './loggedIn';

import Index from "../routes/index";
import AddTrip from "../routes/addTrip";
import EditTrip from "../routes/editTrip";
import EditUser from "../routes/editUser";
import Login from "../routes/login";
import Register from "../routes/register";
import Navigation from "../routes/Navigation";
import Users from "../routes/users";

export function App() {

    const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('loggedIn') || '');

    useEffect(() => {
        localStorage.setItem('loggedIn', loggedIn);
    }, [loggedIn]);

    return (
        <>
            <LoggedinContext.Provider value={{ loggedIn, setLoggedIn }}>
            <BrowserRouter>
                <Navigation />
                <Container className="my-4">
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/add-trip" element={<AddTrip />} />
                            <Route path="/edit-trip/:id" element={<EditTrip />} />
                            <Route path="/edit-user/:id" element={<EditUser />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </Container>
                </BrowserRouter >
            </LoggedinContext.Provider>

        </>);
}


export default App;

