import { get } from '../utils/requester';

const getAll = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = await get('api/clients/', user.token);
    return data;
};

const getByUserId = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = await get('api/traders/', user.token);
    return data;
};

const getWaiting = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = await get('api/employees/waiting_offers/', user.token);
    console.log(data);
    return data;
}

export const discountService = { getAll, getByUserId, getWaiting };