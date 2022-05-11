import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState({})

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async () => {
        await axios.get(`user/${id}`).then(({ data }) => {
            const { first_name, last_name, phone, email } = data
            setFirstName(first_name)
            setLastName(last_name)
            setEmail(email)
            setPhone(phone)
        }).catch(({ response: { data } }) => {
            Swal.fire({
                text: data.message,
                icon: "error"
            })
        })
    }

    const editUser = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('first_name', first_name)
        formData.append('last_name', last_name)
        formData.append('phone', phone)
        formData.append('email', email)

        await axios.post(`edit/${id}`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            navigate("/")
        }).catch(({ response }) => {
            if (response.status === 422) {
                setError(response.data.errors)
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error"
                })
            }
        })
    }
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-sm-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Edit User</h4>
                            <hr />
                            <div className="form-wrapper">
                                {
                                    Object.keys(error).length > 0 && (
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="alert alert-danger">
                                                    <ul className="mb-0">
                                                        {
                                                            Object.entries(error).map(([key, value]) => (
                                                                <li key={key}>{value}</li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                <Form onSubmit={editUser}>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="First name">
                                                <Form.Label>First name</Form.Label>
                                                <Form.Control type="text" name="first_name" value={first_name} onChange={(e)=>{setFirstName(e.target.value)}} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Last name">
                                                <Form.Label>Last name</Form.Label>
                                                <Form.Control type="text" name="last_name" value={last_name} onChange={(e)=>{setLastName(e.target.value)}} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Phone">
                                                <Form.Label>Phone</Form.Label>
                                                <Form.Control type="text" name="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="Email">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                                            </Form.Group>
                                        </Col>
                                    </Row>


                                    <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                                        Edit user
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
