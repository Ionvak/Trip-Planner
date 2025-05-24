import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Spinner } from "react-bootstrap";  
import axios from "axios";

function HandleRemove() {
    // Function to handle the removal of a trip
    // This is a placeholder function and should be implemented based on your requirements
    console.log("Remove trip functionality not implemented yet.");
}

export function Index() {

    const navigate = useNavigate();

    type trip = {
        id: number;
        ownerId: number;
        title: string;
        description: string;
        capacity: number;
        date: string;
        users: string[];
    }

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
                            <Button variant='outline-secondary' onClick={() => navigate(`/detail/${trip.id}`)}>Details</Button>
                            <Button variant='outline-secondary' onClick={() => navigate(`/edit/${trip.id}`)}>Edit</Button>
                            <Button variant='outline-danger' onClick={ () => HandleRemove() }>Remove</Button>
                            <td> {trip.title} </td>
                            <td> {trip.description} </td>
                            <td> {trip.capacity} </td>
                            <td> {trip.date} </td>
                            { trip.users ? <td> {trip.users.toString()} </td> : null}
                        </tr>
                    ) 
                )}
            </Table>

            <Button variant="primary" onClick={() => navigate('/add')}>Add Trip</Button>
        </>);
}

export default Index;