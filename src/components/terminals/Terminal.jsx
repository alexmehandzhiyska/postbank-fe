const Terminal = ({ terminal }) => {
    return (
        <tr>
            <td className="font-semibold">{terminal.id}</td>
            <td className="font-semibold">{terminal.trader.id}</td>
            <td className="font-semibold">{terminal.trader.user.username}</td>
            <td className="font-semibold">{terminal.trader.user.email}</td>
            <td className="font-semibold">{terminal.trader.phone_number}</td>
        </tr>
    );
};

export default Terminal;