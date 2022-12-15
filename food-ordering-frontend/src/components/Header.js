import {Nav, NavLink} from "react-bootstrap";
import {logout} from "../api/usersApi";
import React from "react";
import {isAdmin} from "../api/utils";

export const Header = () => {

    const onLogOut = () => {
        try {
            logout();
            window.location.href = "/login"
        } catch (err) {
            alert(err.message + err.details);
        }
    }

    return (
        <div>
            <Nav className="flex-row justify-content-center nav-links">
                <NavLink href="/">Home</NavLink>
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