import React from "react";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import BootStrap from "react-bootstrap";

import AddTrip from "../routes/addTrip";
import RemoveTrip from "../routes/removeTrip";
import EditTrip from "../routes/editTrip";
import DetailTrip from "../routes/detailTrip";
import Login from "../routes/login";
import Register from "../routes/register";
export function Index() {
    
    return (
        <>
            <BrowserRouter>
            <nav>
                <li>
                    <Link to="/login">Login</Link>|
                </li>
                <li>
                    <Link to="/register">Register</Link>|
                </li>
                
                <li>
                    <Link to="/add">Add a trip</Link>|
                </li>
                <li>
                        <Link to="/remove">Remove a trip</Link>
                </li>
            </nav>

                <Routes>
                    <Route path="/add" element={<AddTrip />} />
                    <Route path="/edit/:id" element={<EditTrip />} />
                    <Route path="/remove/:id" element={<RemoveTrip />} />
                    <Route path="/detail/:id" element={<DetailTrip />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>);
}

export default Index;