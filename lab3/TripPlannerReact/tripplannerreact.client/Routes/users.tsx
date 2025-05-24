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

function HandleRemove() {
    // Function to handle the removal of a user
    // This is a placeholder function and should be implemented based on your requirements
    console.log("Remove user functionality not implemented yet.");
}

function IsOwner(user: user) {
    console.log(user)
    // Function to check if the user is the owner of the trip
    // This is a placeholder function and should be implemented based on your requirements
    console.log("Check if user is owner functionality not implemented yet.");
    return false; // Placeholder return value
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


    if (loading) {
        return (
            <>
                <Spinner animation="border" />
                <div>Loading...</div>
            </>
        )
    }
    if (error) return <div>Error: {error}</div>;

    return (
      <>
          <hr/>
          <h1>Users</h1>
          <Table striped bordered responsive hover size="lg">
              <tr>
                  <th></th>
                  <th>Username</th>
                  <th>Registered Trips</th>
              </tr>
              {
                  data.map((user) => (
                      <tr>
                          {IsOwner(user) ? <Button variant='outline-secondary' onClick={() => navigate(`/edit-user/${user.id}`)}>Edit</Button> : null}
                          {IsOwner(user) ? <Button variant='outline-danger' onClick={() => HandleRemove()}>Remove</Button> : null}
                          <td> {user.username} </td>
                          {user.trips ? <td> {user.trips.toString()} </td> : null}
                      </tr>
                  )
                  )}

              <Button variant="primary" onClick={ () => navigate('/add-user')}>Add User</Button>
          </Table>
      </>
  );
}

export default Users;