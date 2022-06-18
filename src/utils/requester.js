import { baseUrl } from '../constants';

export const get = async (url, token) => {
    console.log(token);
    const response = await fetch(`${baseUrl}/${url}`, {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

export const post = async (url, bodyData) => {
    const response = await fetch(`${baseUrl}/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};