import GrantProject from "./GrantProject";

function GrantProjectGroup() {
    return (
        <>
            <h1>This is where the grant projects are shown.</h1>
            <ul className="list-group">
                <li className="list-group-item"><GrantProject /></li>
                <li className="list-group-item"><GrantProject /></li>
                <li className="list-group-item"><GrantProject /></li>
                <li className="list-group-item"><GrantProject /></li>
            </ul>
        </>
    )
}

export default GrantProjectGroup;