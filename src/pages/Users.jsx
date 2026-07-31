import { useEffect, useState } from "react";
import API from "../api/api";
import "../css/User.css";

function Users() {

  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({

    name: "",
    email: "",
    password: "",
    phone: "",
    role: "USER"

  });

  const [editId, setEditId] = useState("");

  useEffect(() => {

    loadUsers();

  }, []);

  const loadUsers = async () => {

    try {

      const response = await API.post("/users/register", form);

      setUsers(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };

  const saveUser = async () => {

    try {

      if (editId === "") {

        await API.post("/users/register", form);

        alert("User Added Successfully");

      } else {

        await API.put("/users/register" + editId, form);

        alert("User Updated Successfully");

      }

      setForm({

        name: user.name,
        email: user.email,
        password: "",
        phone: user.phone || "",
        role: user.role

      });

      setEditId("");

      loadUsers();

    } catch (error) {

      console.log(error);

    }

  };

  const editUser = (user) => {

    setEditId(user.id);

    setForm({

      name: user.name,
      email: user.email,
      password: "",
      phone: user.phone,
      role: user.role

    });

  };

  const deleteUser = async (id) => {

    try {

      await API.delete("/users/" + id);

      loadUsers();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="user-container">

      <h1>User Management</h1>

      <div className="user-form">

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >

          <option value="USER">USER</option>

          <option value="ADMIN">ADMIN</option>

        </select>

        <button onClick={saveUser}>

          {editId === "" ? "Add User" : "Update User"}

        </button>

      </div>

      <table>

        <thead>

          <tr>

            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {

            Array.isArray(users) ? users.map((user) => (

              <tr key={user.id}>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.role}</td>

                <td>

                  <button onClick={() => editUser(user)}>

                    Edit

                  </button>

                  <button onClick={() => deleteUser(user.id)}>

                    Delete

                  </button>

                </td>

              </tr>

            )) : null

          }
        </tbody>

      </table>

    </div>

  );

}

export default Users;