import React from "react";
import { Button, Form, Stack } from "react-bootstrap";

export function AddUser() {

    return (
        <>
            <hr />
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
                    <Button variant='primary' value="submit"> Submit </Button>
                    <Button variant='outline-danger' value="return to home"> Return to home </Button>
                </Stack>
            </form>
        </>);
}

export default AddUser;