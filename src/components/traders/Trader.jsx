import { formatDate } from "../../utils/utils";

const Trader = ({ trader }) => {
    return (
        <tr>
            <td>{trader.id}</td>
            <td>{trader.username}</td>
            <td>{trader.email}</td>
            <td>{formatDate(trader.created_at)}</td>
            <td>{formatDate(trader.modified_at)}</td>
            <td>{trader.phone_number}</td>
        </tr>
    );
};

export default Trader;