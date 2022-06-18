import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { getUserStatus } from "../../utils/utils";

const Header = () => {
    const [user, setUser] = useState(getUserStatus());
    const { state } = useLocation();

    useEffect(() => {
        setUser(getUserStatus());
    }, [state]);

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    const userNav = (
        <ul className="flex justify-evenly w-3/5">
            <Link to="/">Home</Link>
            <Link to="/discounts">Discounts</Link>
            <Link to="/my-discounts">My Discounts</Link>
            <Link to="/admin">Admin Panel</Link>
            <li onClick={logout}>Log out</li>
        </ul>
    );

    const guestNav = (
        <ul className="flex justify-evenly w-1/3">
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </ul>
    );

    return (
        <header className="min-w-full h-16 flex flex-col justify-center bg-slate-400">
            <nav className="px-20 flex text-lg justify-between items-center">
            <Link to="/"><img src="./postbank-logo.png" alt="logo" className="w-44" /></Link>
               
                {user ? userNav : guestNav}
            </nav>
        </header>
    );  
};

export default Header;