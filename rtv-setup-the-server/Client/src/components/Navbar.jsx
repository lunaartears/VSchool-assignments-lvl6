import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar(props) {
    const {logout} = props
    return (
        <div className='navbar'>
            <Link to="/profile">Profile</Link>
            <Link to="/public">Public</Link>
            <button className='logout-btn' onClick={logout}>Log out</button>
        </div>
    )
}
