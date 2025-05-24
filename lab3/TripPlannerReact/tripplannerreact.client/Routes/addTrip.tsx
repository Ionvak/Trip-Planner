import React from "react";
import { Button, Form, Stack } from "react-bootstrap";

export function AddTrip() {

    return (
        <>

        <form>
            <Stack direction="vertical" gap={3} >
                <Form.Group className="mb-3" controlId='title'>
                    <Form.Label>Trip Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter Trip Title" />
                </Form.Group>
                <Form.Group className="mb-3" controlId='description'>
                    < Form.Label>Trip Description</Form.Label>
                    < Form.Control type="text" placeholder="Enter Trip Description" />
                </Form.Group>
                <Form.Group className="mb-3" controlId='capacity'>
                    < Form.Label>Trip Capacity</Form.Label>
                    < Form.Control type="number" placeholder="Enter Trip Capacity" />
                </Form.Group>
                <Form.Group className="mb-3" controlId='date'>
                    < Form.Label>Trip Date</ Form.Label>
                    < Form.Control type="date" placeholder="Enter Trip Date" />
                    </Form.Group>
                    <Button variant='primary' value="submit"> Submit </Button>
                    <Button variant='outline-danger' value="return to home"> Return to home </Button>  
            </Stack>
        </form>
        </>);
}

export default AddTrip;