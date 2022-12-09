import {Nav} from "react-bootstrap";

export const Header = () => {
    return (
        <Nav defaultActiveKey="/" to={"/home"} className="flex-row justify-content-center">
            <Nav.Link href="/home">Foods</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Nav.Link href="/orders">Orders</Nav.Link>
            {/*<Nav.Link onClick={logout}>Logout</Nav.Link>*/}
        </Nav>
    )
}