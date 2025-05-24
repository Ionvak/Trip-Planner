//import { useEffect, useState } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Index from "../routes/index";
import AddTrip from "../routes/addTrip";
import RemoveTrip from "../routes/removeTrip";
import EditTrip from "../routes/editTrip";
import DetailTrip from "../routes/detailTrip";
import Login from "../routes/login";
import Register from "../routes/register";


export function App() {

    return (
        <>
            <BrowserRouter>
                <Container className="my-4">
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/add" element={<AddTrip />} />
                        <Route path="/edit/:id" element={<EditTrip />} />
                        <Route path="/remove/:id" element={<RemoveTrip />} />
                        <Route path="/detail/:id" element={<DetailTrip />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Container>
            </BrowserRouter >

        </>);
}

export default App;

