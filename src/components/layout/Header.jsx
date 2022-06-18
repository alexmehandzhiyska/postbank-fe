import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { getUserStatus } from "../../utils/utils";

const Header = () => {
    const [user, setUser] = useState(getUserStatus());
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setUser(getUserStatus());
    }, [state]);

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
    }

    const userNav = (
        <ul className="flex justify-evenly w-2/5">
            <Link to="/">Home</Link>
            {user?.type === 'CLIENT' && <Link to="/discounts">Discounts</Link>}
            {user?.type === 'TRADER' && <Link to="/my-discounts">My Discounts</Link>}
            {user?.type === 'BANK_EMPLOYEE' && <Link to="/admin">Admin Panel</Link>}
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
            <Link to="/"><img src="../postbank-logo.png" alt="logo" className="w-44" /></Link>
               
                {user ? userNav : guestNav}
            </nav>
        </header>
    );  
};

export default Header;