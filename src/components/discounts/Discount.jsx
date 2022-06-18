import { useState } from "react";
import { discountService } from "../../services/discountService";
import { errorNotification } from "../../utils/notifications";

const Discount = ({ discount }) => {
    const [isVoted, setIsVoted] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    const submitVote = (approved) => {
        discountService.submitVote(discount.id, approved)
            .then((res) => {
                console.log(res);
                setIsVoted(true);
                setIsApproved(approved);
            })
            .catch(() => {
                errorNotification('Cannot submit your vote. Please try again later.');
            });
    };
    
    return (
        <tr className="table-row">
            <td>{discount.trader.user.username}</td>
            <td>{discount.discount_percent}</td>
            <td>{discount.start_date}</td>
            <td>{discount.end_date}</td>
            {!isVoted &&
                <td className="flex flex-col">
                    <button onClick={() => submitVote(true)} className="btn approve-btn">Approve</button>
                    <button onClick={() => submitVote(false)} className="btn reject-btn">Reject</button>
                </td>
            }
            {isVoted && isApproved &&
                <td className="flex flex-col">
                    <button className="btn approve-btn" disabled>Approved</button>
                </td>
            }
            {isVoted && !isApproved && 
                <td className="flex flex-col">
                <button className="btn reject-btn disabled" disabled>Rejected</button>
            </td>
            }
        </tr>
    );
};

export default Discount;