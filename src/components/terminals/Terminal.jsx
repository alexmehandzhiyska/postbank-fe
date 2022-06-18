import { formatDate } from "../../utils/utils";

const Terminal = ({ terminal }) => {
    return (
        <tr>
            <td>{terminal.id}</td>
            <td>{formatDate(terminal.created_at)}</td>
            <td>{formatDate(terminal.modified_at)}</td>
            <td>{terminal.trader}</td>
        </tr>
    );
};

export default Terminal;