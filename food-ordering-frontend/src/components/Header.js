import {Nav} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {logout} from "../api/usersApi";
import React, {useState} from "react";
import {Notification, NOTIFICATION_TYPES} from "./Notification";

export const Header = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const onLogOut = () => {
        try {
            logout();
            navigate("/login");
        } catch (err) {
            setError({message: err.message, details: err.details, show: true, type: NOTIFICATION_TYPES.ERROR});
        }
    }

    return (
        <div>
            <Nav defaultActiveKey="/" to={"/home"} className="flex-row justify-content-center">
                <Nav.Link href="/home">Foods</Nav.Link>
                <Nav.Link href="/cart">Cart</Nav.Link>
                <Nav.Link href="/orders">Orders</Nav.Link>
                <Nav.Link onClick={onLogOut}>Logout</Nav.Link>
            </Nav>
            {error != null ?
                <Notification data={error}/>
                :
                <div/>
            }
        </div>
    )
}