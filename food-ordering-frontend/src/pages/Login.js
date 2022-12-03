import {useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

export const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const onInputChange = e => {
        const nextFormState = {
            ...form,
            [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
    };
    const navigate = useNavigate();
    const onSubmitForm = e => {
        e.preventDefault();
        // validate form
        // on failure
        setErrorMessage("Wrong credentials!");
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
            <h1>Login</h1>
            {renderErrorMessage()}
            <FormGroup>
                <FormLabel>Username</FormLabel>
                <FormControl type={"text"} name={"username"} onChange={onInputChange} required></FormControl>
            </FormGroup>
            <FormGroup>
                <FormLabel>Password</FormLabel>
                <FormControl type={"text"} name={"password"} onChange={onInputChange} required></FormControl>
            </FormGroup>
            <Button type={"submit"}>Login</Button>
            <center>
                Don't have an account?
                <Link to={"/register"}>Register now</Link>
            </center>
        </Form>
    )
}