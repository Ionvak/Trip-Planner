import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Button, Form, Stack } from "react-bootstrap";
import axios from 'axios';
import { LoggedinContext } from "../src/loggedIn";

type user = {
    id: number;
    username: string;
    password: string;
    trips: string[];
}

export function Login() {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState<user[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { setLoggedIn } = useContext(LoggedinContext);

    useEffect(() => {
        axios
            .get("https://localhost:54387/api/Users")
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    function HandleSubmit() {
        if (data.some((user) => username === user.username && password === user.password)) {
            setLoggedIn(username);
            navigate('/'); // Redirect to home page on successful login
        }
        else {
            setError("Invalid username or password");
        }
    }

    if (loading) {
        return (
            <>
                <Spinner animation="border" />
                <div>Loading...</div>
            </>
        )
    }

    return (
        <>
            <hr/>
            <h1>Login</h1>
            <form onSubmit={() => HandleSubmit() }>
                <Stack direction="vertical" gap={3} >
                    <Form.Group className="mb-3" controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='password'>
                        < Form.Label>Password</Form.Label>
                        < Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Button variant='primary' type="submit"> Submit </Button>
                    <Button variant='outline-danger' onClick={ () => navigate('/') } > Return to home </Button>  
                </Stack>
            </form>
            {error && <p>{error}</p>}
        </>);
}

export default Login;