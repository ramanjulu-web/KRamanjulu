import React, { useState } from 'react';

const Dashboard = () => {
  const [users, setUsers] = useState([{ id: 1, name: 'Ram', des: 'Frontend Developer' }]);
  const [formData, setFormData] = useState({ name: '', des: '' });
  const [edit, setEdit] = useState(null);

  const changeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitEvent = (e) => {
    e.preventDefault();
    if (edit) {
      userUpdate();
    } else {
      const newUser = {
        id: users.length + 1,
        name: formData.name,
        des: formData.des,
      };
      setUsers([...users, newUser]);
      setFormData({ name: '', des: '' });
      setEdit(null);
    }
  };

  const deleteHandler = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
    setFormData({ name: '', des: '' });
    setEdit(null);
  };

  const updateHandler = (user) => {
    setFormData({ name: user.name, des: user.des });
    setEdit(user.id);
  };

  const userUpdate = () => {
    const updatedUsers = users.map((user) =>
      user.id === edit ? { ...user, name: formData.name, des: formData.des } : user
    );
    setUsers(updatedUsers);
    setFormData({ name: '', des: '' });
    setEdit(null);
  };

  return (
    <div className='mt-5'>
     
      <form onSubmit={submitEvent}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={changeHandler}
          placeholder="Enter Name"
          className="mb-3"
        />
        <br />
        <textarea
          type="text"
          name="des"
          value={formData.des}
          onChange={changeHandler}
          placeholder="Enter Description"
        ></textarea>
        <br />
        <button className="btn btn-success" type="submit">
          {edit ? 'Save' : 'Add'}
        </button>
      </form>
      <br />
      <br />
<center>
      <table className="table w-50  ml-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.des}</td>
              <td >
                <button
                  className="btn btn-danger " 
                  onClick={() => deleteHandler(user.id)}
                >
                  Delete
                </button>
           &nbsp;
                <button
                  className="btn btn-success "
                  onClick={() => updateHandler(user)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </center>
    </div>
  );
};

export default Dashboard;
