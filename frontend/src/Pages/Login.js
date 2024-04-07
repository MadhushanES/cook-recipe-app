import React, { useState } from 'react'
import './Login.css'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import Im1 from '../Images/cook.png'

export default function Login() {
    const navigate = useNavigate()
    const [upass, setUpass] = useState('')
    const [uemail, setUemail] = useState('')
    
    const handleLogin = async (e) => {
        e.preventDefault()

        try{
            const response = await axios.post('http://localhost:5000/post/Login', {uemail,upass})
            //console.log(response.data)
            localStorage.setItem('token', response.data.token)
            navigate('/Home')
        }
        catch(error){
            console.error('Error during login: ', error)
        }
    }

  return (
<div className='main-container'>
    <div className='container'>

    <div className='Login-container'>
        
        <img className='cook' src={Im1} alt='logo'/>
      <div className='Login-heading'> Login </div>
            
        <div className='input-login-container'>
            <label className='label'> Email address </label>
            <input className='input' type="email" value={uemail} onChange={(event) => setUemail(event.target.value)}/>
        </div>
            
        <div className='input-login-container'>
            <label className='label'> Password</label>
            <input className='input' type="password" value={upass} onChange={(event) => setUpass(event.target.value)}/>
        </div>

            <button className='submit' type='submit' onClick={handleLogin}> SIGN IN </button>

            <ul className='ul-acc'>
                <li className='li-acc'> Don't have an account?</li>
                <li className='li-acc1'><Link className='li-acc1-a' to='/Register'>Create an account</Link> </li>
            </ul>
    </div>

    </div>

    </div>
  )
}
