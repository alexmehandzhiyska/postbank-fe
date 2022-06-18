const Trader = ({ trader }) => {
    console.log(trader);
    return (
        <tr className="table-row">
            <td>{trader.id}</td>
            <td>{trader.user.username}</td>
            <td>{trader.user.email}</td>
            <td>{trader.phone_number}</td>
        </tr>
    );
};

export default Trader;