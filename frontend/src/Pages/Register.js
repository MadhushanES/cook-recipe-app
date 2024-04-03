import React from 'react'
import './Register.css'

export default function Register() {
  return (
    <div>
      <div className='main-container'>
    <div className='container2'>

    <div className='Register-heading'> Register </div>
            

    <div className='Register-container'>
            
        <div className='input-register-container'>
            <label className='label'> Your name * </label>
            <input className='input' type="text" id="inputField" name="inputField"/>
        </div>
            
        <div className='input-register-container'>
            {/* <label className='label'> Password</label> */}
            <input className='input' type="text" id="inputField" name="inputField"/>
        </div>

        <div className='input-register-container'>
            <label className='label'> Email *</label>
            <input className='input' type="text" id="inputField" name="inputField"/>
        </div>
            
        <div className='input-register-container'>
            <label className='label'> Phone number *</label>
            <input className='input' type="text" id="inputField" name="inputField"/>
        </div>

        <div className='input-register-container'>
            <label className='label'> Password </label>
            <input className='input' type="text" id="inputField" name="inputField"/>
        </div>
            
        <div className='input-register-container'>
            <label className='label'> Confirm Password *</label>
            <input className='input' type="text" id="inputField" name="inputField"/>
        </div>

            <button className='submit' type='submit'> Create Account </button>
    </div>

    </div>

    </div>
    </div>
  )
}
