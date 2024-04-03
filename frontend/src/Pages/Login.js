import React from 'react'
import './Login.css'

export default function Login() {
  return (
<div className='main-container'>
    <div className='container'>

    <div className='Login-container'>
      <div className='Login-heading'> Login </div>
            
        <div className='input-login-container'>
            <label className='label'> Email address </label>
            <input className='input' type="text" id="inputField" name="inputField"/>
        </div>
            
        <div className='input-login-container'>
            <label className='label'> Password</label>
            <input className='input' type="text" id="inputField" name="inputField"/>
        </div>

            <button className='submit' type='submit'> SIGN IN </button>
    </div>

    </div>

    </div>
  )
}
