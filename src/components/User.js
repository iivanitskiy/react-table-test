import React from 'react';
import './User.css';

export function User({user})  {

  return(
    <React.Fragment>
        <div className="user">
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>id: </strong> {user.id}</li>
            <li className="list-group-item"><strong>First Name: </strong> {user.firstName}</li>
            <li className="list-group-item"><strong>Last Name: </strong> {user.lastName}</li>
            <li className="list-group-item"><strong>Email: </strong> {user.email}</li>
            <li className="list-group-item"><strong>Phone: </strong> {user.phone}</li>
            <li className="list-group-item"><strong>Address: </strong> {user.address && Object.values(user.address).join(', ')}</li>
            <li className="list-group-item"><strong>Description: </strong> {user.description}</li>
          </ul>
        </div>
    </React.Fragment>
  )
}
