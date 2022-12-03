import {Nav} from "react-bootstrap";

const Header = () => {
    return (
        <div>
            <h5 className="gap-3 mb-5 mt-5">Online Food Ordering Platform</h5>
        <Nav defaultActiveKey="/" className="flex-column" to={"/home"}>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>

            <Nav.Link href="/orders">Orders</Nav.Link>
            {/*<Nav.Link onClick={logout}>Logout</Nav.Link>*/}
        </Nav>
        </div>
    )
}

export default Header;