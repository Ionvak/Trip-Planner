import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Spinner } from "react-bootstrap";
import axios from "axios";

type user = {
    id: number;
    username: string;
    password: string;
    trips: string[];
}

function IsOwner(user: user) {
    console.log(user)
    // Function to check if the user is the owner of the trip
    // This is a placeholder function and should be implemented based on your requirements
    console.log("Check if user is owner functionality not implemented yet.");
    return true; // Placeholder return value
}

function Users() {

    const navigate = useNavigate();
    const [data, setData] = useState<user[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


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

    function HandleRemove(id: number) {
        axios.delete('https://localhost:54387/api/Users/' + id)
            .then(() => {
                console.log("Trip removed successfully");
                setData(data.filter(user => user.id !== id));
            }).catch((err) => {
                console.error("Error removing user:", err);
                setError("Error removing user");
            }
)}


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
          <h1>Users</h1>
          <Table striped bordered responsive hover size="lg">
              <tr>
                  <th>Username</th>
                  <th>Registered Trips</th>
              </tr>
              {
                  data.map((user) => (
                      <tr>
                          <td> {user.username} </td>
                          <td> { user.trips ? user.trips.toString() : null } </td>
                          {IsOwner(user) ? <Button variant='outline-secondary' onClick={() => navigate(`/edit-user/${user.id}`)}>Edit</Button> : null}
                          {IsOwner(user) ? <Button variant='outline-danger' onClick={() => HandleRemove(user.id)}>Remove</Button> : null}
                      </tr>
                  )
                  )}
            </Table>
            {error && <p>{error}</p>}
      </>
  );
}

export default Users;