import { post } from '../utils/requester';

const register = async (userData) => {
    const data = await post('api/auth/register/', { username: userData.username, email: userData.email, password: userData.password });
    localStorage.setItem('user', JSON.stringify(data));
    return data;
}

const login = async (userData) => {
    const data = await post('api/auth/login/', userData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
}

export const authService = { register, login };