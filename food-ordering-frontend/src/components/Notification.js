import {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";

export const NOTIFICATION_TYPES = {
    INFO: 'bg-success',
    ERROR: 'bg-danger',
    WARNING: 'bg-warning'
}

export const Notification = (props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(props.data.show);
    }, [props.data.show]);

    return (
        <Modal onHide={() => setShow(false)} show={show}>
            <Modal.Header closeButton className={props.data.type}>
                <Modal.Title>{props.data.message}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.data.details ?
                    <p>{props.data.details}</p>
                    :
                    <div/>}
            </Modal.Body>

        </Modal>
    )
}