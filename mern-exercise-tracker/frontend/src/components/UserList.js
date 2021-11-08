import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => console.log("User Deleted!"))
      .catch((err) => console.log(err));

    const newUsers = users.filter((user) => user._id !== id);
    setUsers(newUsers);
  };

  const clearUsers = () => {
    users.map((user) => {
      return axios
        .delete(`http://localhost:5000/users/${user._id}`)
        .then((res) => console.log(res.data));
    });
    setUsers([]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th className="col-md-10 col-sm-9 col-9" scope="col">
              Username
            </th>
            <th className="col-md-2 col-sm-3 col-3" scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const { _id, username } = user;
            return (
              <tr key={_id}>
                <td>{username}</td>
                <td>
                  <Link to={`/user/${_id}`}>edit</Link> |{" "}
                  <Link to="/users" onClick={() => deleteUser(_id)}>
                    delete
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-grid col-3 mx-auto">
        {users.length > 0 ? (
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={clearUsers}
          >
            Clear All
          </button>
        ) : null}
      </div>
    </>
  );
}

export default UserList;
