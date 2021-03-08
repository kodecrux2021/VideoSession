import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import kodecrux from '../../assets/images/reg2.jpeg'
import { url } from '../../Server/GlobalUrl';
import './Login.css'
import { message } from 'antd';
import Navbar from '../../components/Header/Navbar';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailValidate, setEmailValidate] = useState('');



    const signIn = async (e) => {
        e.preventDefault();
        // localStorage.clear();
        if (email === '' || password === '' || emailValidate !== '') {
            if (email === '') {
                message.info('Please Fill Email');
            }
            else if (password === '') {
                message.info('Please Fill Password');
            }
            else {
                message.info(emailValidate);
            }
        }
        else {
            const data = { 'username': email, 'password': password }
            // console.log('data', data)

            await fetch(url + '/api/token/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(data)
            })
                .then((response) => {
                    console.log("response", response)
                    if (response['status'] === 201 || response['status'] === 200) {
                        return response.json()
                    } else if (response['status'] === 401) {
                        if (response['statusText'] === 'Unauthorized') {
                            // console.log('username or password you have provided is Incorrect')
                            message.info('Username or password you have provided is incorrect!!!');
                        }
                        else {
                            // console.log('No active account found with the given credentials')
                            message.info('No active account found with the given credentials!!!');

                        }
                    }
                })
                .then((result) => {
                    // console.log('access', result)
                    if (result) {

                        if (result.access) {
                            localStorage.setItem('token', result.access)
                            // console.log('result.access', result.access)
                        }
                        if (result.refresh) {
                            localStorage.setItem('refresh', result.refresh)
                            // console.log('result.refresh', result.refresh)
                        }

                        let auth = localStorage.getItem('token')
                        fetch(url + '/currentuser/', {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + auth,
                            },
                        })
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    // console.log('result', result)
                                    if (result) {
                                        localStorage.setItem('user_id', result.user?.id);
                                        localStorage.setItem('user_name', result.user?.first_name);
                                        // console.log(localStorage.getItem('user_id'));
                                    }
                                }
                            )



                        message.info('Logged In Succsessfully!!!');
                        history.push('/')
                    }
                })
        }


    }

    const register = e => {
        e.preventDefault();
        history.push('/registration')
    }





    return (
        <>
            <Navbar />
            <div className='body__ctr'>
                <div className="login">

                    <div className='login__container'>

                        <Link to='/'>
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
                                placeholder='Enter Your Email Address'
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />

                            <h4>Password</h4>
                            <input type='password' placeholder='Enter Your Password'

                                className='form__control'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
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
                        <div style={{ color: 'grey', fontWeight: '500' }}  >Forgot Password ? <span style={{ color: '#17a2b8', cursor: 'pointer' }} onClick={() => history.push('forgot-password')} >Click Here</span> </div>
                    </div>

                </div>

            </div>

        </>

    )
}

export default Login
