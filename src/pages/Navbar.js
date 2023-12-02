import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Navbar.css'
import { useNavigate } from "react-router-dom"


export default function Navbar() {
    const navigate = useNavigate();


    return (
        <div className='header'>
            <div className='container'>
                <h1 className='logo' onClick={() => navigate("/")}>
                    <img alt="logo" width='50' height='50' src='/favicon.png'></img>
                </h1>
                <ul className='nav-menu'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/edit">Create new</Link>
                    </li>
                </ul>
                <div className='btn-group'>
                    <button className='btn'>Treasure</button>
                </div>
            </div>
        </div>
    )
}