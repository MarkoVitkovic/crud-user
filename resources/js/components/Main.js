import React from 'react'
import UserList from './UserList'
import { Routes, Route } from "react-router-dom"
import Navbar from './Navbar'
import CreateUser from './CreateUser'
import EditUser from './EditUser'

export default function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route exact path='/' element={<UserList/>} />
                <Route path='/create-user' element={<CreateUser/>} />
                <Route path='/edit-user/:id' element={<EditUser />} />
            </Routes>
        </>
    )
}
