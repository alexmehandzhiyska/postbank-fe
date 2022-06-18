import React from "react";
import './App.css';

import {
    Route,
    Routes,
    BrowserRouter
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Home from './components/home/Home';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/dashboard" element={<Dashboard />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                    </Routes>
                </Layout>
            </div>
        </BrowserRouter>
    );
}

export default App;
