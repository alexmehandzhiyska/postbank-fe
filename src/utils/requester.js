import { baseUrl } from '../constants';

export const get = async (url, token) => {
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

export const post = async (url, bodyData, token) => {
    let headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Token ${token}`;
    }

    const response = await fetch(`${baseUrl}/${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(bodyData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};