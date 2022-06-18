import { useState } from "react";
import DiscountsList from "../discounts/DiscountsList";

const AdminPanel = () => {
    const [currentPanel, setCurrentPanel] = useState('traders');

    return (
        <section>
            <h1 className="title">Admin panel</h1>

            <ul className="flex justify-center">
                <li className="px-6 text-lg" onClick={() => setCurrentPanel('traders')}>Traders</li>
                <li className="px-6 text-lg" onClick={() => setCurrentPanel('discounts')}>Discounts</li>
                <li className="px-6 text-lg" onClick={() => setCurrentPanel('pos')}>POS terminals</li>
                <li className="px-6 text-lg" onClick={() => setCurrentPanel('unapproved-discounts')}>Unapproved discounts</li>
            </ul>

            {currentPanel === 'traders' && 
                <p>Traders</p>
            }

            {currentPanel === 'discounts' && 
                <DiscountsList></DiscountsList>
            }
        </section>
    );
};

export default AdminPanel;