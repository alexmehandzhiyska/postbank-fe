import { get, post } from '../utils/requester';

const getAll = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = await get('api/employees/offers/', user.token);
    return data;
};

const getByUserId = async (statusFilter, startDateFilter, endDateFilter) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const url = `api/traders/?status=${statusFilter === 'All' ? '' : statusFilter}&start_date=${startDateFilter}&end_date=${endDateFilter}`;
    const data = await get(url, user.token);
    return data;
};

const getWaiting = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = await get('api/employees/waiting_offers/', user.token);
    return data;
};

const submitVote = async (discountId, isApproved) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const data = await post('api/employees/waiting_offers/', { discount: discountId, state: isApproved  }, user.token);
    return data;
};

export const discountService = { getAll, getByUserId, getWaiting, submitVote };