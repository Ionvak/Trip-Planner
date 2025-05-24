import { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export function Register() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    function HandleSubmit(event: Event) {
        event.preventDefault();

        const newUser = {
            username: username,
            password: password,
            trips: [],
        };

        if (!username || !password) {
            setResponseMessage("Username and password are required.");
            return;
        }


        // Make POST request to send data
        axios
            .post("https://localhost:54387/api/Users", newUser)
            .then(() => {
                setResponseMessage("User created successfully!");
            })
            .catch(() => {
                setResponseMessage("Error creating user");
            });
    };

    return (
        <>
            <hr />
            <h1>Register</h1>
            <form onSubmit={(e) => HandleSubmit(e)}>
                <Stack direction="vertical" gap={3} >
                    <Form.Group className="mb-3" controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" value={ username } onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='password'>
                        < Form.Label>Password</Form.Label>
                        < Form.Control type="password" placeholder="Enter Password" value={ password } onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant='primary' type='submit'> Submit </Button>
                    <Button variant='outline-danger' onClick={() => navigate('/') } > Return to home </Button>   
                </Stack>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </>);
}

export default Register;