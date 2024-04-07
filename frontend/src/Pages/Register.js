import React, { useState } from 'react'
import axios from 'axios'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import Im2 from '../Images/cook.png'

export default function Register() {

  
    const navigate = useNavigate()
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [uemail, setUemail] = useState('')
    const [pnumber, setPnumber] = useState('')
    const [upass, setUpass] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleRegister = (e) => {
      e.preventDefault();
      if (upass !== confirmPassword) {
                alert("Passwords don't match. Please check again.");
                return;
              }
      
      axios.post( 'http://localhost:5000/post/Signup', {fname,lname,uemail,pnumber,upass})
      .then(result => {
          console.log(result);
          alert('User Registered')
          console.log(fname,lname,pnumber)
  
          navigate("/");
          
      })
      .catch(err => console.log(err))
      ;
    
  }

  return (
    <div>
      <div className='main-container'>
    <div className='container2'>

        <div className='Reg-container'>

        <img className='cook1' src={Im2} alt='logo'/>

    <div className='Register-heading'> Register </div>
            

    <div className='Register-container'>
            
        <div className='input-register-container'>
            <label className='label'> Your name * </label>
            <input className='input' type="text" value={fname} onChange={(e)=>setFname(e.target.value)}/>
        </div>
            
        <div className='input-register-container'>
            {/* <label className='label'> Password</label> */}
            <input className='input' type="text"  value={lname} onChange={(e)=>setLname(e.target.value)}/>
        </div>

        <div className='input-register-container'>
            <label className='label'> Email *</label>
            <input className='input' type="text" value={uemail} onChange={(e)=>setUemail(e.target.value)}/>
        </div>
            
        <div className='input-register-container'>
            <label className='label'> Phone number *</label>
            <input className='input' type="text" value={pnumber} onChange={(e)=>setPnumber(e.target.value)}/>
        </div>

        <div className='input-register-container'>
            <label className='label'> Password </label>
            <input className='input' type="password" value={upass} onChange={(e)=>setUpass(e.target.value)}/>
        </div>
            
        <div className='input-register-container'>
            <label className='label'> Confirm Password *</label>
            <input className='input' type="Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </div>

            <button className='submit' type='submit' onClick={handleRegister}> Create Account </button>

            
    </div>

            <ul className='ul-acc1'>
                <li className='li-acc2'> Already have an account?</li>
                <li className='li-acc12'><Link className='li-acc12-a' to='/'> Login </Link></li>
            </ul>

    </div>
    </div>
    </div>
    </div>

  )
}
