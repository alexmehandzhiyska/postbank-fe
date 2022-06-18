const Discount = ({ discount }) => {
    return (
        <tr>
            <td>Test</td>
            <td>{discount.discount_percent}</td>
            <td>{discount.start_date}</td>
            <td>{discount.end_date}</td>
        </tr>
    );
};

export default Discount;