import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import Cook from '../Images/cook.png'
import Logo from '../Images/logout.png'

export default function Navbar() {

const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/')
  }

return (
    <div className='navbar'>
    <nav className='nav'>
      
        <img className='cook-logo' src={Cook} alt='Logo'/>
        
        
        <ul className='nav-ul'>
            <li className='nav-ul-li'><Link className='nav-ul-li-a' to='/Home'>Home</Link></li>
            <li className='nav-ul-li'><Link className='nav-ul-li-a' to='/Favorite'>Favorite</Link></li>
        </ul>
        <img className='logout-logo' src={Logo} alt='Logo' onClick={handleLogout}/>
    </nav>
    </div>
  )
}
