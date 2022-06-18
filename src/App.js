import React from 'react';
import './App.css';

import {
    Route,
    Routes,
    BrowserRouter
} from 'react-router-dom';

import {
    UserRoute,
    GuestRoute,
    ClientRoute,
    TraderRoute,
    EmployeeRoute
  } from './common/GuardedRoute';

import AdminPanel from './components/adminPanel/AdminPanel';
import CreateDiscount from './components/discounts/CreateDiscount';
import DiscountsList from './components/discounts/DiscountsList';
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
                        
                        <Route element={<GuestRoute />}>
                            <Route path="/login" element={<Login />}></Route>
                            <Route path="/register" element={<Register />}></Route>
                        </Route>
                        
                        <Route element={<ClientRoute />}>
                            <Route path="/discounts" element={<DiscountsList filter="active" />}></Route>
                        </Route>
                        
                        <Route element={<TraderRoute />}>
                            <Route path="/discounts/create" element={<CreateDiscount />}></Route>
                            <Route path="/my-discounts" element={<DiscountsList filter="userId" />}></Route>
                        </Route>

                        <Route element={<EmployeeRoute />}>
                            <Route path="/admin" element={<AdminPanel />}></Route>
                        </Route>
                    </Routes>
                </Layout>
            </div>
        </BrowserRouter>
    );
}

export default App;
