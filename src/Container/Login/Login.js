import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import kodecrux from '../../assets/images/reg2.jpeg'
import { url } from '../../Server/GlobalUrl';
import './Login.css'
import { message } from 'antd';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import CloseIcon from '@material-ui/icons/Close';
import {ReactComponent as EkodeLogo} from '../../assets/eKodeLogo.svg';
import { Button, ButtonBase, Card, Divider, TextField } from '@material-ui/core';
import {ReactComponent as FacebookLogo} from '../../assets/facebook.svg';
import {ReactComponent as GoogleLogo} from '../../assets/images/googleLogo.svg';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false)
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
                                    if (result) {
                                        localStorage.setItem('user_id', result.user?.id);
                                        localStorage.setItem('user_name', result.user?.first_name);
                                        localStorage.setItem('user_photo', result.user?.profile_pic);
                                        // console.log(localStorage.getItem('user_id'));
                                        message.info('Logged In Succsessfully!!!');
                                        history.push({pathname : '/'})
                                    }
                                }
                            )
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

            <div className='body__ctr'>
                {/* Immortal ui mod */}
                <div style={{position:'absolute', display:'flex', flex:1, width:'100%', alignItems:'flex-end',justifyContent:'flex-end', paddingRight:40}}>
                    <Link to='/'> <CloseIcon style={{fontSize:30, color:'black'}} /> </Link>
                </div>
                {/* ------ */}
                <div style={{marginTop:30, display:'flex', justifyContent:'center'}}>
                    <Card elevation={2} style={{width:100, height:100, display:'flex', justifyContent:'center', alignItems:'center', borderRadius:30,}}>
                        <Link to='/'>
                            <EkodeLogo  />
                        </Link>
                    </Card>
                </div>
                <div className="login">
                    <div className='login__container'>
                        <div style={{display:'flex', flexDirection:'column'}}>
                            <h1>Log In</h1>
                            <p style={{fontSize:16}}>Log in to eKodecrux</p>
                        </div>
                        <div className = "header__button">
                            <GoogleLogin 
                                className = 'google'
                                clientId="515126473370-emg4305tflmvetsklioachjblbekk066.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                                buttonText="LOG IN WITH GOOGLE"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                icon= {<GoogleLogo />}
                            // style={inStyle}    
                                />
                            <FacebookLogin
                                cssClass = 'facebook'
                                appId="375577453526335" //APP ID NOT CREATED YET
                                textButton ="LOG IN WITH FACEBOOK"
                                fields="name,email,picture"
                                callback={responseFacebook}
                                icon= {<div><FacebookLogo /></div>}
                            />
                        </div>
                        <div style={{display:'flex', flex:1, alignItems:'center'}}>
                            <Divider style={{flex:1}} />
                            <div style={{padding:10, color:'#3743B1'}}>OR</div>
                            <Divider style={{flex:1}} />
                        </div>
                 

                        <form>
                            <TextField variant="outlined" className="form__control" type="email" label="EMAIL ADDRESS" value={email} onChange={e => setEmail(e.target.value)} />
                            <TextField autoComplete={"current-password"} type={showPassword ? 'text' : 'password'} style={{marginTop:16, marginBottom:8}} variant='outlined' label='PASSWORD' onChange={e => setPassword(e.target.value)} 
                                InputProps = {{endAdornment:
                                    <InputAdornment variant='filled' position="end" style={{backgroundColor:'#3743B1'}}>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            style={{outline:"none"}}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <Visibility style={{color:'white'}} /> : <VisibilityOff style={{color:'white'}} />}
                                        </IconButton>
                                    </InputAdornment>
                                }}  
                            />
                            <div style={{display:'flex', justifyContent:'flex-end', marginBottom:10}}>
                                <ButtonBase variant="text" style={{ color: '#3743B1', textAlign:'right'}} onClick={() => history.push('forgot-password')} >Forgot Password ? </ButtonBase>
                            </div>
                            
                            <button
                                type='submit'
                                className='login__signInButton'
                                onClick={signIn}
                            >LOG IN</button>
                        </form>
                        <Divider />
                        <div style={{ color: 'grey', }}  >Create New Account <span style={{ color: '#3743B1', cursor: 'pointer' }} onClick={register} >Register</span> </div>
                    </div>

                </div>

            </div>

        </>

    )
}

export default Login