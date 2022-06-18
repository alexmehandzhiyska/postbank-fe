import { useState } from "react";
import { discountService } from "../../services/discountService";
import { errorNotification } from "../../utils/notifications";

const Discount = ({ discount, filter }) => {
    const [isVoted, setIsVoted] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    const submitVote = (approved) => {
        discountService.submitVote(discount.id, approved)
            .then(() => {
                setIsVoted(true);
                setIsApproved(approved);
            })
            .catch(() => {
                errorNotification('Cannot submit your vote. Please try again later.');
            });
    };
    
    return (
        <tr>
            <td className="font-semibold">{discount.id}</td>
            <td className="font-semibold">{discount.discount_percent}</td>
            <td className="font-semibold">{discount.start_date}</td>
            <td className="font-semibold">{discount.end_date}</td>
            <td className="font-semibold">{discount.status}</td>
            {/* <td className="font-semibold">{discount.trader.user.username}</td> */}
            {!isVoted && filter === 'waiting' &&
                <td className="flex justify-center">
                    <button onClick={() => submitVote(true)} className="btn approve-btn">Approve</button>
                    <button onClick={() => submitVote(false)} className="btn reject-btn">Reject</button>
                </td>
            }
            {isVoted && isApproved && filter === 'waiting' &&
                <td className="flex justify-center">
                    <button className="btn approve-btn" disabled>Approved</button>
                </td>
            }
            {isVoted && !isApproved && filter === 'waiting' &&
                <td className="flex justify-center">
                <button className="btn reject-btn disabled" disabled>Rejected</button>
            </td>
            }
        </tr>
    );
};

export default Discount;