import { formatDate } from "../../utils/utils";

const Terminal = ({ terminal }) => {
    return (
        <tr className="table-row">
            <td>{terminal.id}</td>
            <td>{formatDate(terminal.created_at)}</td>
            <td>{formatDate(terminal.modified_at)}</td>
            <td>{terminal.trader}</td>
        </tr>
    );
};

export default Terminal;