import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Spinner } from "react-bootstrap";  
import axios from "axios";
import { LoggedinContext } from "../src/loggedIn";

type trip = {
    id: number;
    ownerID: number;
    title: string;
    description: string;
    capacity: number;
    date: string;
    users: string[];
}

type user = {
    id: number;
    username: string;
    password: string;
    trips: string[];
}

function HandleRegister() {
    // Function to handle the removal of a trip
    // This is a placeholder function and should be implemented based on your requirements
    console.log("Register to trip functionality not implemented yet.");
}

function IsRegistered(trip: trip) {
    console.log(trip)
    // Function to check if the user is the owner of the trip
    // This is a placeholder function and should be implemented based on your requirements
    console.log("Check if user is registered functionality not implemented yet.");
    return true; // Placeholder return value
}

export function Index() {

    const navigate = useNavigate();
    const [data, setData] = useState<trip[]>([]);
    const [users, setUsers] = useState<user[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { loggedIn } = useContext(LoggedinContext);

    useEffect(() => {
        // Make GET request to fetch data
        axios
            .get("https://localhost:54387/api/Trips")
            .then((response) => {
                console.log(response.data);
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });

        axios
            .get("https://localhost:54387/api/Users")
            .then((response) => {
                console.log(response.data);
                setUsers(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    function IsOwner(trip: trip) {
        return users.some(user => user.id === trip.ownerID && user.username === loggedIn);
    }


    function HandleRemove(id: number) {

        axios.delete('https://localhost:54387/api/Trips/' + id )
            .then(() => {
                console.log("Trip removed successfully");
                setData(data.filter(trip => trip.id !== id));
            }).catch((err) => {
                console.error("Error removing trip:", err);
                setError("Error removing trip");
            }
        )
    }

    function IsLoggedIn() {
        return Boolean(loggedIn)
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
            <h1>Trips</h1>
            <Table striped bordered responsive hover size="lg">
                <tr>
                    <th>Trip Title</th>
                    <th>Trip Description</th>
                    <th>Trip Capacity</th>
                    <th>Trip Date</th>
                    <th>Registered Users</th>
                </tr>
                {
                    data.map( (trip) => (
                        <tr>
                            <td> {trip.title} </td>
                            <td> {trip.description} </td>
                            <td> {trip.capacity} </td>
                            <td> {trip.date} </td>
                            <td> { trip.users ?trip.users.toString() : null} </td>
                            <Button variant='outline-secondary' onClick={() => navigate(`/detail/${trip.id}`)}>Details</Button>
                            {IsOwner(trip) ? <Button variant='outline-secondary' onClick={() => navigate(`/edit-trip/${trip.id}`)}>Edit</Button> : null}
                            {IsOwner(trip) ? <Button variant='outline-danger' onClick={() => HandleRemove(trip.id)}>Remove</Button> : null}
                            {IsRegistered(trip) ? null : <Button variant='outline-warning' onClick={() => HandleRegister()}>Register</Button>}
                        </tr>
                    ) 
                )}
            </Table>

            {IsLoggedIn() ? < Button variant="primary" onClick={() => navigate('/add-trip')}>Add Trip</Button > : null}
            {error && <p>{error}</p>}

        </>);
}

export default Index;