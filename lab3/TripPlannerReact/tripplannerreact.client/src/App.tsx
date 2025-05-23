//import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import React from "react";
import AddTrip from "../routes/addTrip";
import RemoveTrip from "../routes/removeTrip";
import EditTrip from "../routes/editTrip";
import DetailTrip from "../routes/detailTrip";
import Login from "../routes/login";
import Register from "../routes/register";
import Index from "../routes/index";



export function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index/>} />
                    <Route path="/add" element={<AddTrip/>} />
                    <Route path="/edit/:id" element={<EditTrip/>} />
                    <Route path="/delete/:id" element={<RemoveTrip/>} />
                    <Route path="/detail/:id" element={<DetailTrip/>} />
                    <Route path="/login/:id" element={<Login />}/>
                    <Route path="/register/:id" element={<Register/>} />
                </Routes>
            </BrowserRouter>
        </>);
}

export default App;

