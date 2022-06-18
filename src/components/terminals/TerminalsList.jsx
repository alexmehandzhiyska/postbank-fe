import { useState, useEffect } from 'react';

import Terminal from './Terminal';
import { terminalService } from '../../services/terminalService';
import { errorNotification } from '../../utils/notifications';

const TerminalsList = () => {
    const [terminals, setTerminals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        terminalService.getAll()
            .then(res => {
                setTerminals(res);
                setIsLoading(false);
            })
            .catch(() => {
                errorNotification('POS terminals are not available now. Try again later.') ;
            });
    }, []);
    
    return (
        <>
            {!isLoading &&
                <section className="flex flex-col items-center">
                    <h1 className="title">All Terminals</h1>
                    {terminals.length === 0 
                        ?   <p>No terminals available!</p> 
                        : 
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="px-6 text-xl">ID</th>
                                        <th className="px-6 text-xl">Created at</th>
                                        <th className="px-6 text-xl">Modified at</th>
                                        <th className="px-6 text-xl">Trader ID</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {terminals.map(terminal => <Terminal key={terminal.id} terminal={terminal}></Terminal>)}
                                </tbody>
                            </table>
                    }
                </section>
            }

            {isLoading && <p>Loading...</p>}
        </>
    );
}

export default TerminalsList;