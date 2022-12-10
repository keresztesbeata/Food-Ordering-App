import {Nav, NavLink} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {logout} from "../api/usersApi";
import React from "react";
import {isAdmin} from "../api/utils";

export const Header = () => {
    const navigate = useNavigate();

    const onLogOut = () => {
        try {
            logout();
            navigate("/login");
        } catch (err) {
            alert(err.message + err.details);
        }
    }

    return (
        <div>
            <Nav defaultActiveKey="/" to={"/home"} className="flex-row justify-content-center">
                <NavLink href="/home">Home</NavLink>
                {
                    isAdmin() ?
                        <NavLink href="/menu">Menu</NavLink>
                        :
                        <NavLink href="/cart">Cart</NavLink>
                }
                <NavLink href="/orders">Orders</NavLink>
                <NavLink onClick={onLogOut}>Logout</NavLink>
            </Nav>
        </div>
    )
}