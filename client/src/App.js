import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdministrationPage from './Admin';
import UserPage from './user';
import HomePage from './home';



function App() {

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Routes>
                    <Route path="/home" element={<HomePage />}/>
                    <Route path="/admin" element={<AdministrationPage />}/>
                    <Route path="/user" element={<UserPage />}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
