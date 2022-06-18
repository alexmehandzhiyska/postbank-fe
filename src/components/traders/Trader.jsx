const Trader = ({ trader }) => {
    return (
        <tr>
            <td className="font-semibold">{trader.id}</td>
            <td className="font-semibold">{trader.user.username}</td>
            <td className="font-semibold">{trader.user.email}</td>
            <td className="font-semibold">{trader.phone_number}</td>
        </tr>
    );
};

export default Trader;