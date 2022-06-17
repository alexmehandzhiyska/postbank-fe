import { post } from '../utils/requester';

const register = async (userData) => {
    const data = await post('api/auth/register/', userData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
};

const login = async (userData) => {
    const data = await post('api/auth/login/', userData);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
};

const sendRecoveryEmail = async (userData) => {
    const data = await post('api/password_reset/', { email: userData.email });
    return data;
};

const validateToken = async (userData) => {
    const data = await post('api/password_reset/validate_token/', { token: userData.token });
    return data;
};

const changePassword = async (userData) => {
    const data = await post('api/password_reset/confirm/', { password: userData.password, token: userData.token });
    localStorage.setItem('user', JSON.stringify(data));
    return data;
}

export const authService = { register, login, sendRecoveryEmail, validateToken, changePassword };