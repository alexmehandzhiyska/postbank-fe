import { useEffect, useState, useRef } from 'react';

import DiscountsList from '../discounts/DiscountsList';
import TradersList from '../traders/TradersList';
import TerminalList from '../terminals/TerminalsList';

const AdminPanel = () => {
    const [currentPanel, setCurrentPanel] = useState('traders');
    const refs = {traders: useRef(null), discounts: useRef(null), terminals: useRef(null), waiting: useRef(null)};

    useEffect(() => {
        Object.entries(refs).forEach(ref => {
            ref[0] === currentPanel ? ref[1].current.classList.add('active') : ref[1].current.classList.remove('active')
        });
    }, [currentPanel]);

    return (
        <section>
            <ul className="mt-14 flex justify-center">
                <li className="traders px-6 text-lg text-gray-400 active" ref={refs.traders} onClick={() => setCurrentPanel('traders')}>Traders</li>
                <li className="discounts px-6 text-lg text-gray-400" ref={refs.discounts} onClick={() => setCurrentPanel('discounts')}>Discounts</li>
                <li className="terminals px-6 text-lg text-gray-400" ref={refs.terminals} onClick={() => setCurrentPanel('terminals')}>POS terminals</li>
                <li className="waiting px-6 text-lg text-gray-400" ref={refs.waiting} onClick={() => setCurrentPanel('waiting')}>Unapproved discounts</li>
            </ul>

            { currentPanel === 'traders' && <TradersList></TradersList> }
            { currentPanel === 'discounts' && <DiscountsList filter="all"></DiscountsList> }
            { currentPanel === 'terminals' && <TerminalList></TerminalList> }
            { currentPanel === 'waiting' && <DiscountsList filter="waiting"></DiscountsList> }
        </section>
    );
};

export default AdminPanel;