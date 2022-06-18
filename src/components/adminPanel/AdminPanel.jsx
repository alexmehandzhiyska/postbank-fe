import { useState } from "react";
import DiscountsList from "../discounts/DiscountsList";
import TradersList from "../traders/TradersList";
import TerminalList from "../terminals/TerminalsList";

const AdminPanel = () => {
    const [currentPanel, setCurrentPanel] = useState('traders');

    return (
        <section>
            <ul className="mt-14 flex justify-center">
                <li className="px-6 text-lg" onClick={() => setCurrentPanel('traders')}>Traders</li>
                <li className="px-6 text-lg" onClick={() => setCurrentPanel('discounts')}>Discounts</li>
                <li className="px-6 text-lg" onClick={() => setCurrentPanel('terminals')}>POS terminals</li>
                <li className="px-6 text-lg" onClick={() => setCurrentPanel('unapproved-discounts')}>Unapproved discounts</li>
            </ul>

            { currentPanel === 'traders' && <TradersList></TradersList> }
            { currentPanel === 'discounts' && <DiscountsList filter="userId"></DiscountsList> }
            { currentPanel === 'terminals' && <TerminalList></TerminalList> }
        </section>
    );
};

export default AdminPanel;