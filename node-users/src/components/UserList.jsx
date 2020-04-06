import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    bio: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(users);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleChanges = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addUser = () => {
    axios
      .post("http://localhost:5000/api/users", newUser)
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  //   const editUser = () => {};

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
          <button onClick={() => deleteUser(user.id)}>Delete User</button>
          {/* <button>Edit User</button> */}
        </div>
      ))}
      <div>
        <form>
          <label>
            Name:
            <input
              onChange={handleChanges}
              name="name"
              placeholder="Name"
              value={newUser.name}
            />
          </label>
          <label>
            Bio:
            <input
              onChange={handleChanges}
              name="bio"
              placeholder="Bio"
              value={newUser.bio}
            />
          </label>
          <button onClick={addUser}>Add User</button>
        </form>
      </div>
    </div>
  );
};

export default UserList;
