import {Nav} from "react-bootstrap";

export const Header = () => {
    return (
        <Nav defaultActiveKey="/" to={"/home"} className="flex-row justify-content-center">
            <Nav.Link href="/menu">Menu</Nav.Link>
            <Nav.Link href="/orders">Orders</Nav.Link>
            {/*<Nav.Link onClick={logout}>Logout</Nav.Link>*/}
        </Nav>
    )
}