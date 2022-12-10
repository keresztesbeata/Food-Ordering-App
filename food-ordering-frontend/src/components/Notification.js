import {useEffect, useState} from "react";
import {Toast} from "react-bootstrap";

export const NOTIFICATION_TYPES = {
    INFO: 'success',
    ERROR: 'danger',
    WARNING: 'warning'
}

export const Notification = (props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.data.show);
    }, [props.data.show]);

    return (
        <Toast onClose={() => setShow(false)} show={show}
               bg={props.data.type} className={"mb-3 mt-3"}>
            <Toast.Header closeButton className={"me-auto"}>{props.data.message}</Toast.Header>
            {props.data.details ?
                <Toast.Body>
                    <p>{props.data.details}</p>
                </Toast.Body>
                :
                <div/>}
        </Toast>
    )
}