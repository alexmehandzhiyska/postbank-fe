import { get } from '../utils/requester';

const getAll = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = await get('api/employees/terminals/', user.token);
    console.log(data);
    return data;
};

export const terminalService = { getAll };