import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Stack } from "react-bootstrap";

function HandleSubmit() {
    // Function to handle the submission of the login form
    // This is a placeholder function and should be implemented based on your requirements
    console.log("Login functionality not implemented yet.");
}

export function Login() {

    const navigate = useNavigate();

    return (
        <>
            <hr/>
            <h1>Login</h1>
            <form>
                <Stack direction="vertical" gap={3} >
                    <Form.Group className="mb-3" controlId='username'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId='password'>
                        < Form.Label>Password</Form.Label>
                        < Form.Control type="password" placeholder="Enter Password" />
                    </Form.Group>
                    <Button variant='primary' onClick={ () => HandleSubmit() } type="submit"> Submit </Button>
                    <Button variant='outline-danger' onClick={ () => navigate('/') } > Return to home </Button>  
                </Stack>
            </form>
        </>);
}

export default Login;