import {useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../api/usersApi";
import {FormMessage} from "../components/FormMesage";

export const Login = () => {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    const onInputChange = e => {
        const nextFormState = {
            ...form,
            [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
    };

    const onSubmitForm = e => {
        e.preventDefault();
        login(form.username, form.password)
            .then(() => {
                window.location.href="/home"
            })
            .catch(error => setErrorMessage({message: error.message, details: error.details, isError: true}));
    };

    return (
        <div className="background-container page-background d-flex justify-content-center align-items-center mt-5">
            <div className="card col-sm-3 border-dark text-left">
                <Form onSubmit={onSubmitForm} className={"card-body"}>
                    <h1>Login</h1>
                    <FormMessage data={errorMessage}/>
                    <FormGroup className={"mb-3"}>
                        <FormLabel>Username</FormLabel>
                        <FormControl type={"text"} name={"username"} onChange={onInputChange} required></FormControl>
                    </FormGroup>
                    <FormGroup className={"mb-3"}>
                        <FormLabel>Password</FormLabel>
                        <FormControl type={"password"} name={"password"} onChange={onInputChange} required></FormControl>
                    </FormGroup>
                    <div className="text-center">
                        <Button type={"submit"} variant={"success"}>Login</Button>
                    </div>
                    <center>
                        Don't have an account?
                        <Link to={"/register"}>Register now</Link>
                    </center>
                </Form>
            </div>
        </div>
    )
}