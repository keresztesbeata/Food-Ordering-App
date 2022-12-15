import {useState} from "react";
import {Button, Form, FormControl, FormGroup, FormLabel, FormSelect} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {register} from "../api/usersApi";
import {FormMessage} from "../components/FormMesage";

export const Register = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "",
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const onInputChange = e => {
        const nextFormState = {
            ...form,
            [e.target.name]: e.target.value,
        };
        setForm(nextFormState);
    };

    const onSubmitForm = e => {
        e.preventDefault();
        register(form)
            .then(user => {
                if (user.role === "ADMIN") {
                    navigate("/add_restaurant");
                } else {
                    navigate("/add_customer_info");
                }
            })
            .catch(error => setErrorMessage({message: error.message, details: error.details, isError: true}));
    };

    return (
        <div className="background-container page-background d-flex justify-content-center align-items-center mt-5">
            <div className="card col-sm-3 border-dark text-left">
                <Form onSubmit={onSubmitForm} className={"card-body"}>
                    <h1>Register</h1>
                    <FormMessage data={errorMessage}/>
                    <FormGroup className={"mb-3"}>
                        <FormLabel>Username</FormLabel>
                        <FormControl type={"text"} name={"username"} onChange={onInputChange} required></FormControl>
                    </FormGroup>
                    <FormGroup className={"mb-3"}>
                        <FormLabel>Password</FormLabel>
                        <FormControl type={"password"} name={"password"} onChange={onInputChange} required></FormControl>
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="2">
                        <FormLabel>Role</FormLabel>
                        <FormSelect name={"role"} placeholder="Select a role" onChange={onInputChange} required>
                            <option value="">-- Choose role --</option>
                            <option value="ADMIN">Admin</option>
                            <option value="CUSTOMER">Customer</option>
                        </FormSelect>
                    </FormGroup>
                    <div className="text-center">
                        <Button type={"submit"}>Register</Button>
                    </div>
                    <center>
                        Already have an account?
                        <Link to={"/login"}>Log in</Link>
                    </center>
                </Form>
            </div>
        </div>
    )
}