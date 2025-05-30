import { useState, useContext, type FormEvent, useEffect } from "react";
import { Button, Form, Spinner, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { LoggedinContext } from "../src/loggedIn";


type user = {
    id: number;
    username: string;
    password: string;
    trips: string[];
}

export function AddTrip() {

    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [capacity, setCapacity] = useState(0);
    const [date, setDate] = useState(new Date());
    const [responseMessage, setResponseMessage] = useState("");
    const { loggedIn } = useContext(LoggedinContext);
    const [data, setData] = useState<user[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://localhost:54387/api/Users")
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setResponseMessage(err.message);
                setLoading(false);
            });
    }, []);

    function HandleSubmit(event: FormEvent) {
        event.preventDefault();

        if (!date || !title || !capacity) {
            setResponseMessage("The following are required:\n" +
                "Title,\n" +
                "Capacity,\n" +
                "Date\n");
            return;
        }

        //Insert or change code to insert owner into users list

        const owner = data.find((user) => user.username === loggedIn); 

        const newTrip = {
            title: title,
            OwnerID: owner?.id,
            description: description,
            capacity: capacity,
            date: date,
            users: [loggedIn],
        };
            axios
                .post("https://localhost:54387/api/Trips", newTrip)
                .then((response) => {
                    console.log(response.data);
                    navigate('/');
                })
                .catch((err) => {
                    console.log(err);
                });
    };

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
            <h1>Add Trip</h1>
            <form onSubmit={(e) => HandleSubmit(e)}>
            <Stack direction="vertical" gap={3} >
                <Form.Group className="mb-3" controlId='title'>
                    <Form.Label>Trip Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Trip Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId='description'>
                        < Form.Label>Trip Description</Form.Label>
                        < Form.Control type="text" placeholder="Enter Trip Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId='capacity'>
                        < Form.Label>Trip Capacity</Form.Label>
                        < Form.Control type="number" placeholder="Enter Trip Capacity" value={capacity} onChange={(e) => setCapacity(Number(e.target.value))} />
                </Form.Group>
                <Form.Group className="mb-3" controlId='date'>
                        < Form.Label>Trip Date</ Form.Label>
                        < Form.Control type="datetime" placeholder="Enter Trip Date" value={date.toString()} onChange={(e) => setDate(new Date(e.target.value))} />
                    </Form.Group>
                    <Button variant='primary' type='submit'> Submit </Button>
                    <Button variant='outline-danger' onClick={() => navigate('/') }> Return to home </Button>  
            </Stack>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </>);
}

export default AddTrip;