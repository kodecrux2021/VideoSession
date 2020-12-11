import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import kodecrux from '../../assets/images/reg2.jpeg'
import './Login.css'

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const signIn = e => {
        e.preventDefault();
       
    }

    const register = e => {
        e.preventDefault();
     
    }

    return (
        <div className="login">
            
            <div className='login__container'>

            <Link to='/home'>
                <img
                    className="login__logo"
                    src={kodecrux} 
                />
            </Link>
                <h1>Login</h1>
            
            <form>
                <h4>Email</h4>
                <input type='email' 
                className='form__control'
                placeholder='Enter Your Email'
                value={email}
                onChange={event => setEmail(event.target.value)}
                 />

                <h4>Password</h4>
                <input type='password' placeholder='Enter Your Password'

                className='form__control'
                value = {password}
                onChange={e=> setPassword(e.target.value)}
                />

                <button 
                type='submit'
                className='login__signInButton' 
                onClick={signIn}
                >Login</button>
            </form>

            <button
            type='submit'
            onClick={register}
            className='login__registerButton'>Create New Account</button>
            </div>
        </div>
    )
}

export default Login
