import React, { useState, useEffect } from 'react';
import './UserForm.css';

export function UserForm ({addUser}) {
  const [newUser, setNewUser] = useState({id: '', firstName: '', lastName: '', email: '', phone: ''});
  const [enable, setEnable] = useState(true);

  const reset = () => setNewUser({id: '', firstName: '', lastName: '', email: '', phone: ''});

  const update = e => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };
  
  useEffect(() => {
    if (newUser.id.length, newUser.firstName.length, newUser.lastName.length, newUser.email.length, newUser.phone.length  > 0) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [newUser]);

  const submit = e => {
    e.preventDefault();
    addUser(newUser);
    reset();
  };

  return (
  <React.Fragment>
      <form className="form" onSubmit={submit}>
        <div className="inputs-container">
        <input
          required
          type="number"
          className="form-control"
          placeholder="id"
          name="id"
          value={newUser.id}
          onChange={update}
          />
        <input
          required
          type="text"
          className="form-control"
          placeholder="First Name"
          name="firstName"
          value={newUser.firstName}
          onChange={update}
        />
        <input
          required
          type="text"
          className="form-control"
          placeholder="Last Name"
          name="lastName"
          value={newUser.lastName}
          onChange={update}
        />
        <input
          required
          type="email"
          className="form-control"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={update}
        />
        <input
          required
          type="tel"
          className="form-control"
          placeholder="Phone"
          name="phone"
          value={newUser.phone}
          onChange={update}
        />
        </div>
        <button className="btn btn-success" disabled={enable}>Добавить в таблицу</button>
      </form>
  </React.Fragment>
  );
};
