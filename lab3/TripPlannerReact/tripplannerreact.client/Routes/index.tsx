import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Spinner } from "react-bootstrap";  
import axios from "axios";

type trip = {
    id: number;
    ownerId: number;
    title: string;
    description: string;
    capacity: number;
    date: string;
    users: string[];
}

function HandleRemove() {
    // Function to handle the removal of a trip
    // This is a placeholder function and should be implemented based on your requirements
    console.log("Remove trip functionality not implemented yet.");
}

function HandleRegister() {
    // Function to handle the removal of a trip
    // This is a placeholder function and should be implemented based on your requirements
    console.log("Register to trip functionality not implemented yet.");
}

function IsOwner(trip:trip) {
    console.log(trip)
    // Function to check if the user is the owner of the trip
    // This is a placeholder function and should be implemented based on your requirements
    console.log("Check if user is owner functionality not implemented yet.");
    return true; // Placeholder return value
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


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
    }, []);

    if (loading) {
        return (
            <>
                <Spinner animation="border" />
                <div>Loading...</div>
            </>
        )}
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <hr/>
            <h1>Trips</h1>
            <Table striped bordered responsive hover size="lg">
                <tr>
                    <th></th>
                    <th>Trip Title</th>
                    <th>Trip Description</th>
                    <th>Trip Capacity</th>
                    <th>Trip Date</th>
                    <th>Trip Owner</th>
                    <th>Registered Users</th>
                </tr>
                {
                    data.map( (trip) => (
                        <tr>
                            <td> {trip.title} </td>
                            <td> {trip.description} </td>
                            <td> {trip.capacity} </td>
                            <td> {trip.date} </td>
                            <td>{ }</td>
                            <td> { trip.users ?trip.users.toString() : null} </td>
                            <Button variant='outline-secondary' onClick={() => navigate(`/detail/${trip.id}`)}>Details</Button>
                            {IsOwner(trip) ? <Button variant='outline-secondary' onClick={() => navigate(`/edit-trip/${trip.id}`)}>Edit</Button> : null}
                            {IsOwner(trip) ? <Button variant='outline-danger' onClick={() => HandleRemove()}>Remove</Button> : null}
                            {IsRegistered(trip) ? <Button variant='outline-warning' onClick={() => HandleRegister()}>Register</Button> : null}
                        </tr>
                    ) 
                )}
            </Table>

            <Button variant="primary" onClick={() => navigate('/add-trip')}>Add Trip</Button>
        </>);
}

export default Index;