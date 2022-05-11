import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../public/logo.png'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to="/">
                    <img className="style" src={logo} alt="logo" />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span>
                        <i className="fas fa-bars" style={{ color: 'black' }} />
                    </span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link text-uppercase ml-2" to="/"><i className="far fa-user"></i> Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-uppercase ml-2" to="/create-user"><i className="far fa-user"></i> Add new user</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
