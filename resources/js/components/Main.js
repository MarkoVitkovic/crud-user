import React from 'react'
import UserList from './UserList'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<UserList/>} />
            </Routes>
        </Router>
    )
}
