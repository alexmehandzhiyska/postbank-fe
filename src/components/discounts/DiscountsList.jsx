import { useState, useEffect } from 'react';

import Discount from './Discount';
import { discountService } from '../../services/discountService';
import { errorNotification } from '../../utils/notifications';

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
        } else {
            discountService.getByUserId()
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
            {!isLoading &&
                <section className="flex flex-col items-center">
                    <h1 className="title">{filter === 'all' ? "All" : "My"} Discounts</h1>
                    <div className="border-t-2 border-x-2 w-11/12 h-10 border-solid border-zinc-500"></div>
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