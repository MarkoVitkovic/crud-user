import React, { Component } from 'react'
import axios from 'axios';

export default class UserList extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    this.getUsers()
  }

  getUsers = () => {
    axios.get(`/users`)
      .then(res => {
        const users = res.data;
        this.setState({ users: users });
      })
  }

  render() {
    return (
      <div className='container'>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.users && this.state.users.map((item) =>
                <tr key={item.id}>
                  <th scope="row">#{item.id}</th>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td><span><i className="fa-solid fa-pencil"></i></span><span><i className="fa-solid fa-trash-can"></i></span></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}
