import { useState, useEffect } from 'react';

import Discount from './Discount';
import { discountService } from '../../services/discountService';
import { errorNotification } from '../../utils/notifications';

const DiscountsList = () => {
    const [discounts, setDiscounts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        discountService.getAll()
            .then(res => {
                setDiscounts(res);
                setIsLoading(false);
            })
            .catch(() => {
                errorNotification('Discounts are not available. Try again later.') ;
            });
    }, []);
    
    return (
        <>
            {!isLoading &&
                <section className="flex flex-col items-center">
                    <h1 className="title">All Discounts</h1>
                    {discounts.length === 0 
                        ?   <p>No discounts available!</p> 
                        : 
                            <table className="w-2/3">
                                <thead>
                                    <tr>
                                        <th className="px-6 text-xl">Trader name</th>
                                        <th className="px-6 text-xl">Discount percent (%)</th>
                                        <th className="px-6 text-xl">Start date</th>
                                        <th className="px-6 text-xl">End date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {discounts.map(discount => <Discount key={discount.id} discount={discount}></Discount>)}
                                </tbody>
                            </table>
                    }
                </section>
            }

            {isLoading && <p>Loading...</p>}
        </>
    );
}

export default DiscountsList;