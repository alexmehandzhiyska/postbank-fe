import { useState, useEffect } from 'react';

import Trader from './Trader';
import { traderService } from '../../services/traderService';
import { errorNotification } from '../../utils/notifications';
import LottieAnimation from '../../loadingAnimations/animation';

const TradersList = () => {
    const [traders, setTraders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        traderService.getAll()
            .then(res => {
                setTraders(res);
                setIsLoading(false);
            })
            .catch(() => {
                errorNotification('Traders are not available now. Try again later.') ;
            });
    }, []);
    
    return (
        <>
            {isLoading && <LottieAnimation></LottieAnimation>}
            {!isLoading &&
                <section className="flex flex-col items-center">
                    <h1 className="title">All Traders</h1>
                    <div className="border-t-2 border-x-2 w-11/12 h-10 border-solid border-zinc-500"></div>
                    {traders.length === 0 
                        ?   <p>No traders available!</p> 
                        : 
                            <table className="w-5/6">
                                <thead>
                                    <tr>
                                        <th className="px-6 text-xl">ID</th>
                                        <th className="px-6 text-xl">Username</th>
                                        <th className="px-6 text-xl">Email</th>
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
        </>
    );
}

export default TradersList;