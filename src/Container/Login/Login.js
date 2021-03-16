import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import kodecrux from '../../assets/images/reg2.jpeg'
import { url } from '../../Server/GlobalUrl';
import './Login.css'
import { message } from 'antd';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
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

    const responseFacebook = async (response) => {
        console.log('respose',response)
         if (response.accessToken) {
           let data = {
            "access_token" : response.accessToken,
            "provider" : "facebook"
        }

           await fetch( url + '/facebook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
    
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            //console.log("response", response)
            if (response['status'] === 201 || response['status'] === 200) {
                return response.json()
            } else if (response['status'] === 400) {
               
            }
        })
        .then((result) => {
            //console.log('result', result);
            if(result){
              localStorage.setItem('token',result.access_token)
              localStorage.setItem('refresh',result.refresh_token)
              localStorage.setItem('username',result.username)
            //  history.push('/home')
            }
            
        })


        let auth = localStorage.getItem('token')
        await fetch(url + '/currentuser/', {
          method:'GET',
          headers: {
            'Accept': 'application/json',
           'Content-Type': 'application/json',
           'Authorization': 'Bearer ' + auth,
         },
      })
      .then(res => res.json())
      .then(
          (result) => {
            //console.log('result',result)
            if(result){
              localStorage.setItem('user_id', result.user?.id);
              localStorage.setItem('user_name', result.user?.first_name);
              message.info('Logged in successfully!')
              history.replace('/')
          }
          }
      )
            
           //console.log("success")
       
         }
         else if(response.status=='unknown') {
           alert('No user Found')  
         }
    }



    const responseGoogle = async(response) => {
      console.log('google',response);
      if (response.accessToken) {
let data = {"token": response.accessToken}
        await fetch(url + '/google/', {
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
          } else if (response['status'] === 400) {
             console.log('errorrr')
          }
      })
      .then((result) => {
          //console.log('result', result);
          if(result){
            localStorage.setItem('token',result.access_token)
            localStorage.setItem('refresh',result.refresh_token)
            localStorage.setItem('username',result.username)
            // history.push('/')           
          }
          
      })
      let auth = localStorage.getItem('token')
      await fetch(url + '/currentuser/', {
        method:'GET',
        headers: {
          'Accept': 'application/json',
         'Content-Type': 'application/json',
         'Authorization': 'Bearer ' + auth,
       },
    })
    .then(res => res.json())
    .then(
        (result) => {
          //console.log('result',result)
          if(result){
            localStorage.setItem('user_id', result.user?.id);
            localStorage.setItem('user_name', result.user?.first_name);
            message.info('Logged In Succsessfully!!!');
            history.replace('/')  
        }
        }
    )


        //console.log("success")
        // history.push('/details2')  
      }
      else if(response.status=='unknown') {
        // alert('No user Found')  
        message.info('No user Found!!!');
      }
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
                        <p>With</p>
                        <div className = "header__button">
                      <GoogleLogin 
                      className = 'google'
                      clientId="515126473370-emg4305tflmvetsklioachjblbekk066.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                      buttonText="Google"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      icon= {false}
                      // style={inStyle}    
                        />
                      <FacebookLogin
                      cssClass = 'facebook'
                      appId="375577453526335" //APP ID NOT CREATED YET
                      textButton ="Facebook"
                      fields="name,email,picture"
                      callback={responseFacebook}
                      />
                      {/* <button style={{backgroundColor:'#DB4437'}}>GOOGLE</button>
                      <button style={{backgroundColor: "#4267B2"}}>FACEBOOK</button> */}
                 </div>
                 <p>Or</p>

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
