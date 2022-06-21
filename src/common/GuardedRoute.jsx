import { Navigate, Outlet } from 'react-router-dom';
import { getUserStatus } from '../utils/utils';

const UserRoute = () => {
    const user = getUserStatus();
    return user ? <Outlet /> : <Navigate to="/login" />
}

const GuestRoute = () => {
    const user = getUserStatus();
    return user ? <Navigate to="/" /> : <Outlet />
}

const ClientRoute = () => {
    const user = getUserStatus();
    const role = user ? user.type : null;

    return role === 'CLIENT' ? <Outlet /> : <Navigate to="/" />
};

const TraderRoute = () => {
    const user = getUserStatus();
    const role = user ? user.type : null;

    return role === 'TRADER' ? <Outlet /> : <Navigate to="/" />
};

const EmployeeRoute = () => {
    const user = getUserStatus();
    const role = user ? user.type : null;

    return role === 'BANK_EMPLOYEE' ? <Outlet /> : <Navigate to="/" />
};

export { UserRoute, GuestRoute, ClientRoute, TraderRoute, EmployeeRoute };