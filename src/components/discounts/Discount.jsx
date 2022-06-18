const Discount = ({ discount }) => {
    return (
        <tr>
            <td>{discount.trader_username}</td>
            <td>{discount.discount_percent}</td>
            <td>{discount.start_date}</td>
            <td>{discount.end_date}</td>
        </tr>
    );
};

export default Discount;