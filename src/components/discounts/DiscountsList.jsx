import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Discount from './Discount';
import { discountService } from '../../services/discountService';
import { errorNotification } from '../../utils/notifications';
import LottieAnimation from '../../loadingAnimations/animation';

const DiscountsList = ({ filter }) => {
    const [discounts, setDiscounts] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [notificationsOn, setNotificationsOn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (filter !== 'all') {
            discountService.getNotificationStatus()
                .then(res => {
                    setNotificationsOn(res.statusFilter);
                })
                .catch(() => {
                    errorNotification('Could not get your notification status. Please try again later.');
                });
        }
    }, [filter]);

    useEffect(() => {
        setIsLoading(true);

        if (filter === 'all') {
            discountService.getAll()
                .then(res => {
                    setDiscounts(res);
                    setIsLoading(false);
                })
                .catch(() => {
                    errorNotification('Discounts are not available now. Try again later.') ;
                });
        } else if (filter === 'userId') {
            discountService.getByUserId(statusFilter, startDateFilter, endDateFilter)
                .then(res => {
                    setDiscounts(res);
                    setIsLoading(false);
                })
                .catch(() => {
                    errorNotification('Discounts are not available now. Try again later.') ;
                });
        } else if (filter === 'active') {
            discountService.getActive()
                .then(res => {
                    setDiscounts(res);
                    setIsLoading(false);
                })
                .catch(() => {
                    errorNotification('Discounts are not available now. Try again later.') ;
                });
        } else {
            discountService.getWaiting()
                .then(res => {
                    setDiscounts(res);
                    setIsLoading(false);
                })
                .catch(() => {
                    errorNotification('Discounts are not available now. Try again later.') ;
                });
        }
    }, [filter, statusFilter, startDateFilter, endDateFilter]);

    const changeNotificationStatus = (status) => {
        discountService.changeNotificationStatus(status)
            .then(() => {
                setNotificationsOn(status);
            })
            .catch(() => {
                errorNotification('Cannot change your notification status. Please try again.');
            });
    };
    
    return (
        <>
            {isLoading && <LottieAnimation></LottieAnimation>}
            {!isLoading &&
                <section className="flex flex-col items-center">
                    {filter !== "all" && <p className="mt-10" onClick={() => changeNotificationStatus(!notificationsOn)}>Notification Status: <span className="btn">{notificationsOn ? "On" : "Off"}</span></p>}
                    <div className="mt-20 border-t-2 border-x-2 w-11/12 h-10 border-solid border-zinc-500"></div>

                    {filter === 'userId' &&
                        <article className="flex justify-between items-center">
                            <section className="px-10">
                                <span>Status: </span>
                                <select className="btn" onChange={(e) => setStatusFilter(e.target.value)} defaultValue={statusFilter}>
                                    <option value="All">All</option>
                                    <option value="Active">Active</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Waiting">Waiting</option>
                                    <option value="Expired">Expired</option>
                                </select>
                            </section>

                            <section className="px-10">
                                <span>Start Date: </span>
                                <input type="date" name="start_date" id="start_date" defaultValue={startDateFilter} onChange={(e) => setStartDateFilter(e.target.value)} />
                            </section>

                            <section className="px-10">
                                <span>End Date: </span>
                                <input type="date" name="end_date" id="end_date" defaultValue={endDateFilter} onChange={(e) => setEndDateFilter(e.target.value)} />
                            </section>
                        </article>
                    }

                    {discounts.length === 0 
                        ?   <p>No discounts available!</p> 
                        : 
                            <table className="w-10/12">
                                <thead>
                                    <tr>
                                        {filter !== 'userId' && <th className="px-6 text-base text-gray-400">Trader name</th>}
                                        {filter !== 'active' && <th className="px-6 text-base text-gray-400">Discount ID</th>}
                                        <th className="px-6 text-base text-gray-400">Discount percent (%)</th>
                                        <th className="px-6 text-base text-gray-400">Start date</th>
                                        <th className="px-6 text-base text-gray-400">End date</th>
                                        {filter !== 'active' && <th className="px-6 text-base text-gray-400">Status</th>}
                                        {filter === 'waiting' && <th className="px-6 text-base text-gray-400">Change Status</th>}
                                    </tr>
                                </thead>

                                <tbody>
                                    {discounts.map(discount => <Discount key={discount.id} discount={discount} filter={filter}></Discount>)}
                                </tbody>
                            </table>
                    }

                    {filter === 'userId' && <Link to="/discounts/create" className="my-10">+ Add discount</Link>}
                </section>
            }
        </>
    );
}

export default DiscountsList;