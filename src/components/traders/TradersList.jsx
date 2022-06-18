import { useState, useEffect } from 'react';

import Trader from './Trader';
import { traderService } from '../../services/traderService';
import { errorNotification } from '../../utils/notifications';

const TradersList = () => {
    const [traders, setTraders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        traderService.getAll()
            .then(res => {
                console.log(res);
                setTraders(res);
                setIsLoading(false);
            })
            .catch(() => {
                errorNotification('Traders are not available now. Try again later.') ;
            });
    }, []);
    
    return (
        <>
            {!isLoading &&
                <section className="flex flex-col items-center">
                    <h1 className="title">All Traders</h1>
                    {traders.length === 0 
                        ?   <p>No traders available!</p> 
                        : 
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="px-6 text-xl">ID</th>
                                        <th className="px-6 text-xl">Username</th>
                                        <th className="px-6 text-xl">Email</th>
                                        <th className="px-6 text-xl">Created at</th>
                                        <th className="px-6 text-xl">Modified at</th>
                                        <th className="px-6 text-xl">Phone number</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {traders.map(trader => <Trader key={trader.id} trader={trader}></Trader>)}
                                </tbody>
                            </table>
                    }
                </section>
            }

            {isLoading && <p>Loading...</p>}
        </>
    );
}

export default TradersList;