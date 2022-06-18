const Terminal = ({ terminal }) => {
    return (
        <tr className="table-row">
            <td>{terminal.id}</td>
            <td>{terminal.trader.id}</td>
            <td>{terminal.trader.user.username}</td>
            <td>{terminal.trader.user.email}</td>
            <td>{terminal.trader.phone_number}</td>
        </tr>
    );
};

export default Terminal;