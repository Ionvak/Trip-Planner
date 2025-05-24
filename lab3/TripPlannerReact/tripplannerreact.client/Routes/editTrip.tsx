import React from "react";
import { Form, Stack } from "react-bootstrap";

export function EditTrip() {

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
                </Stack>
            </form>
        </>);
}

export default EditTrip;