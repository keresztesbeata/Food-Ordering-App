import {useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel, FormText} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

export const Register = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        address: {
            city: "",
            street: "",
            nr: 0
        }
    });
    const onInputChange = e => {
        const nextFormState = {
            ...form,
            [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
    };
    const onAddressChange = e => {
        const value = e.target.value;
        const name = e.target.name;
        const nextFormState = {
            ...form,
            address: {
                [name]: name === "nr" ? parseInt(value) : value
            }
        };
        setForm(nextFormState);
    };
    const navigate = useNavigate();
    const onSubmitForm = e => {
        e.preventDefault();
        // validate form
        // on failure
        setErrorMessage("Invalid data!");
        // on success
        navigate("/");
    };

    const [errorMessage, setErrorMessage] = useState(null);
    const renderErrorMessage = () => {
        if (errorMessage !== null) {
            return <div className="error">{errorMessage}</div>;
        }
        return <div/>
    }

    return (
        <Form onSubmit={onSubmitForm}>
            <h1>Register</h1>
            {renderErrorMessage()}
            <FormGroup>
                <FormLabel>Username</FormLabel>
                <FormControl type={"text"} name={"username"} onChange={onInputChange} required></FormControl>
            </FormGroup>
            <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl type={"text"} name={"password"} onChange={onInputChange} required></FormControl>
            </FormGroup>
            <FormGroup>
                <FormLabel>Firstname</FormLabel>
                <FormControl type={"text"} name={"firstname"} onChange={onInputChange} required></FormControl>
            </FormGroup>
            <FormGroup>
                <FormLabel>Lastname</FormLabel>
                <FormControl type={"text"} name={"lastname"} onChange={onInputChange} required></FormControl>
            </FormGroup>
            <FormText>Address</FormText>
            <FormGroup>
                <FormLabel>City</FormLabel>
                <FormControl type={"text"} name={"city"} onChange={onAddressChange} required></FormControl>
            </FormGroup>
            <FormGroup>
                <FormLabel>Street</FormLabel>
                <FormControl type={"text"} name={"street"} onChange={onAddressChange} required></FormControl>
            </FormGroup>
            <FormGroup>
                <FormLabel>Nr</FormLabel>
                <FormControl type={"text"} name={"nr"} onChange={onAddressChange} required></FormControl>
            </FormGroup>
            <Button type={"submit"}>Register</Button>
            <center>
                Already have an account?
                <Link to={"/login"}>Log in</Link>
            </center>
        </Form>
    )
}