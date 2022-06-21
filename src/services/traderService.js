import { get } from '../utils/requester';

const getAll = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = await get('api/employees/traders/', user.token);
    return data;
};

export const traderService = { getAll };