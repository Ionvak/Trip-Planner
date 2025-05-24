//import { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import Index from "../routes/index";
import AddTrip from "../routes/addTrip";
import EditTrip from "../routes/editTrip";
import DetailTrip from "../routes/detailTrip";
import Login from "../routes/login";
import Register from "../routes/register";
import Navigation from "../routes/Navigation";
import Users from "../routes/users";

export function App() {

    return (
        <>
            <BrowserRouter>
                <Navigation />

                <Container className="my-4">
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/add" element={<AddTrip />} />
                        <Route path="/edit/:id" element={<EditTrip />} />
                        <Route path="/detail/:id" element={<DetailTrip />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Container>
            </BrowserRouter >

        </>);
}

export default App;

