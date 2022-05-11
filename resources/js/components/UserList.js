import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'

export default class UserList extends Component {
  constructor() {
    super()
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    this.getUsers()
  }

  getUsers = async () => {
    await axios.get(`/users`)
      .then(res => {
        const users = res.data;
        this.setState({ users: users })
      })
  }

  deleteUser = async (id) => {
    const isConfirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      return result.isConfirmed
    })

    if (!isConfirm) {
      return
    }

    await axios.get(`/delete/${id}`).then(({ data }) => {
      Swal.fire({
        icon: "success",
        text: data.message
      })
      this.getUsers()
    }).catch(({ response: { data } }) => {
      Swal.fire({
        text: data.message,
        icon: "error"
      })
    })
  }

  render() {
    return (
      <div className='container'>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col">#ID</th>
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
                  <td>
                    <span>
                      <Link to={`/edit-user/${item.id}`}>
                            <i style={{'color': 'black'}} className="fa-solid fa-pencil"></i>
                      </Link>
                    </span>
                    <span style={{'padding-left': '20px','cursor': 'pointer'}} onClick={() => this.deleteUser(item.id)}><i className="fa-solid fa-trash-can"></i></span></td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>
    )
  }
}
