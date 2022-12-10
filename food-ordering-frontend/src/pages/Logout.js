import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {logout} from "../api/usersApi";
import {Button, Modal} from "react-bootstrap";

export const Logout = () => {
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        message: "",
        details: "",
        hasError: false
    });

    try {
        logout();
        setInfo({message: "You have successfully logged out!", details: "You can log back in here!", hasError: false});
    } catch (error) {
        setInfo({message: error.message, details: error.details, hasError: true});
    }

    return (
        <div className="background-container bg-image d-flex justify-content-center align-items-center">
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>{info.message}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {info.details}
                    :
                    {
                        info.hasError ?
                            <div/>
                            :
                            <Button onClick={() => navigate("/login")} variant={"success"}>Login</Button>
                    }
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
};