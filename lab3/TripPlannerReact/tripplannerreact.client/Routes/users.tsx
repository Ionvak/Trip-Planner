import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Spinner } from "react-bootstrap";
import axios from "axios";


function HandleRemove() {
    // Function to handle the removal of a user
    // This is a placeholder function and should be implemented based on your requirements
    console.log("Remove user functionality not implemented yet.");
}

function Users() {

    const navigate = useNavigate();

    type user = {
        id: number;
        username: string;
        password: string;
        trips: string[];
    }

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
                          <Button variant='outline-secondary' onClick={() => navigate(`/edit/${user.id}`)}>Edit</Button>
                          <Button variant='outline-danger' onClick={() => HandleRemove()}>Remove</Button>
                          <td> {user.username} </td>
                          {user.trips ? <td> {user.trips.toString()} </td> : null}
                      </tr>
                  )
                  )}

              <Button variant="primary" onClick={ () => navigate('/add')}>Add User</Button>
          </Table>
      </>
  );
}

export default Users;