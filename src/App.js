import React from 'react';
import './App.css';

import {
    Route,
    Routes,
    BrowserRouter
} from 'react-router-dom';

import AdminPanel from './components/adminPanel/AdminPanel';
import DiscountsList from './components/discounts/DiscountsList';
import CreateDiscount from './components/discounts/CreateDiscount';
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
                        <Route path="/discounts" element={<DiscountsList filter="active" />}></Route>
                        <Route path="/discounts/create" element={<CreateDiscount />}></Route>
                        <Route path="/my-discounts" element={<DiscountsList filter="userId" />}></Route>
                        <Route path="/admin" element={<AdminPanel />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/register" element={<Register />}></Route>
                    </Routes>
                </Layout>
            </div>
        </BrowserRouter>
    );
}

export default App;
