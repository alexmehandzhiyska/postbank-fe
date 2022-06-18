import { useState, useEffect } from 'react';

import Discount from './Discount';
import { discountService } from '../../services/discountService';
import { errorNotification } from '../../utils/notifications';
import LottieAnimation from '../../loadingAnimations/animation';

const DiscountsList = ({ filter }) => {
    const [discounts, setDiscounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
            discountService.getByUserId()
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

        
    }, [filter]);
    
    return (
        <>
            {isLoading && <LottieAnimation></LottieAnimation>}
            {!isLoading &&
                <section className="flex flex-col items-center">
                    <div className="mt-20 border-t-2 border-x-2 w-11/12 h-10 border-solid border-zinc-500"></div>
                    {discounts.length === 0 
                        ?   <p>No discounts available!</p> 
                        : 
                            <article className="flex justify-center w-11/12">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="px-6 text-base text-gray-400">Discount ID</th>
                                            <th className="px-6 text-base text-gray-400">Discount percent (%)</th>
                                            <th className="px-6 text-base text-gray-400">Start date</th>
                                            <th className="px-6 text-base text-gray-400">End date</th>
                                            <th className="px-6 text-base text-gray-400">Status</th>
                                            {/* <th className="px-6 text-base text-gray-400">Trader name</th> */}
                                            {filter === 'waiting' && <th className="px-6 text-base text-gray-400">Change Status</th>}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {discounts.map(discount => <Discount key={discount.id} discount={discount} filter={filter}></Discount>)}
                                    </tbody>
                                </table>
                            </article>
                    }
                </section>
            }
        </>
    );
}

export default DiscountsList;