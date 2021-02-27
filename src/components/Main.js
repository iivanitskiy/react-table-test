import React, {useState, useEffect, useContext} from 'react';
import './Main.css';
import {Api} from '../api/Api';
import {User} from './User';
import {UserForm} from './UserForm';

export function Main() { 
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState({fieldName: null, reverse: false});
  const [sortedUsers, setSortedUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setСurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(false);
  const [addUserForm, setAddUserForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const sortUsers = () => {
    let allUsers = [...users]
    if(search.length > 0) {
      allUsers = allUsers.filter(user => {

        return [user.id, user.firstName, user.lastName, user.email, user.phone].join(' ').toLowerCase().includes(search.toLowerCase());
      });
    }
    if (sortBy.fieldName !== null) {
      allUsers.sort((a, b) => {
        if (a[sortBy.fieldName] > b[sortBy.fieldName]) {
          return 1;
        }
        if (a[sortBy.fieldName] < b[sortBy.fieldName]) {
          return -1;
        }
        return 0;
      });
      if (sortBy.reverse) {
        allUsers.reverse()
      }    
    }
    setSortedUsers(allUsers)
  }

  const loadUsers = (type) => {
    return () => {
      setLoading(true);
      setUsers([]);
      setSelectedUser(null);
      Api(type).then(function(res) {
        setLoading(false);
        setUsers(res);
      }).catch(function(error) {
        console.log(error);
      })
    }
  }

  useEffect(() => {
    sortUsers()
  }, [sortBy, users, search]);

  const updateSortBy = (fieldName) => {
    if (sortBy.fieldName === fieldName) {
      setSortBy({fieldName: fieldName, reverse: !sortBy.reverse})
    } else {
      setSortBy({fieldName: fieldName, reverse: false})
    }
  }

  const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  const pageSize = 50;

  const totalPages = (array, page_size) => {
    return Math.ceil(array.length / page_size)
  }

  const nextPage = () => {
    setСurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    setСurrentPage(currentPage - 1)
  }

  const firstPage = () => {
    setСurrentPage(1)
  }

  const lastPage = () => {
    setСurrentPage(totalPages(sortedUsers, pageSize))
  }

  const selectUser = (user) => {
    return () => setSelectedUser(user)
  }

  const addUser = (user) => {
    setUsers([user, ...users])
  }

  const addToggle = () => {
    setAddUserForm(prev => !prev)
  }

  return(
    <React.Fragment>
      {loading && <i className="circle-preloader"></i>}
      <div className="buttons">
        <div className="btn-group" role="group" aria-label="Basic outlined example">
          <button type="button" className="btn btn-outline-primary" onClick={loadUsers('short')}>32 Пользователя</button>
          <button type="button" className="btn btn-outline-primary" onClick={loadUsers('long')}>1000 Пользователей</button>
        </div>
      </div>
      {users.length > 0 && <div className="input-container">
        <input 
          className="form-control"
          type="text"
          placeholder="Поиск"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button className="btn btn-primary" onClick={addToggle} style={{marginLeft: 10}}>Добавить</button>
      </div>}
      {addUserForm && <UserForm  addUser={addUser} />}
        <table className="table table-hover">
          {users.length > 0 && <thead>
            <tr>
              <th className="table-name" onClick={() => updateSortBy('id')}>
                ID &nbsp;
                {sortBy.fieldName === "id" && (sortBy.reverse ? "▲" : "▼")}
              </th>
              <th className="table-name" onClick={() => updateSortBy('firstName')}>
                First Name &nbsp;
                {sortBy.fieldName === "firstName" && (sortBy.reverse ? "▲" : "▼")}
              </th>
              <th className="table-name" onClick={() => updateSortBy('lastName')}>
                Last Name &nbsp;
                {sortBy.fieldName === "lastName" && (sortBy.reverse ? "▲" : "▼")}
              </th>
              <th className="table-name" onClick={() => updateSortBy('email')}>
                Email &nbsp;
                {sortBy.fieldName === "email" && (sortBy.reverse ? "▲" : "▼")}
              </th>
              <th className="table-name" onClick={() => updateSortBy('phone')}>
                Phone &nbsp;
                {sortBy.fieldName === "phone" && (sortBy.reverse ? "▲" : "▼")}
              </th>
            </tr>          
          </thead>}
          <tbody>
            {paginate(sortedUsers, pageSize, currentPage).map(user => (
              <tr key={user.id + user.phone} onClick={selectUser(user)}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages(sortedUsers, pageSize) > 1 && 
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item" onClick={prevPage}>{currentPage > 1 && <a class="page-link">&lt;</a>}</li>
            <li className="page-item" onClick={firstPage}>{currentPage !== 1 && <a class="page-link">1</a>}</li>
            <li className="page-item active"><a class="page-link">{currentPage}</a></li>
            <li className="page-item" onClick={lastPage}>{currentPage !== totalPages(sortedUsers, pageSize) && <a class="page-link">{totalPages(sortedUsers, pageSize)}</a>}</li>
            <li className="page-item" onClick={nextPage}>{currentPage < totalPages(sortedUsers, pageSize) && <a class="page-link">&gt;</a>}</li>
          </ul>
        </nav>
        }
        {selectedUser && <User user={selectedUser} /> }
    </React.Fragment>
  )
}
