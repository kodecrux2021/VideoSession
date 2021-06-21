import React, { useEffect, useState } from 'react'
import './Registration.css'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { url } from '../../Server/GlobalUrl';
import { message } from 'antd';
import TextField from '@material-ui/core/TextField';
import {ReactComponent as FacebookLogo} from '../../assets/facebook.svg';
import {ReactComponent as GoogleLogo} from '../../assets/images/googleLogo.svg';
import { Divider } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function Registration(props) {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false)

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
            history.push('/selector')  
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
    // if (localStorage.getItem('token') == null  ){
    //    inStyle = { background: "black"};
    // }
    return (
       
            <div className="__container">
              <div className='registration__details__container' >
                <div className="_header">
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <h1>Register</h1>
                        <p style={{fontSize:16}}>Sign Up to eKodecrux</p>
                    </div>
                    <div className = "header__button">
                        <GoogleLogin 
                          className = 'google'
                          clientId="515126473370-emg4305tflmvetsklioachjblbekk066.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                          buttonText="SIGN UP WITH GOOGLE"
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                          icon= {<GoogleLogo />}
                          // style={inStyle}    
                          />
                        <FacebookLogin
                          cssClass = 'facebook'
                          appId="375577453526335" //APP ID NOT CREATED YET
                          textButton ="SIGN UP WITH FACEBOOK"
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
                </div>
              <div className="form__container">
                  <form >
                      <div style={{display:'flex', gap:12}}>
                        <TextField variant="outlined" className="form__control" label="FIRST NAME" value={props.first_name} onChange={(e) => props.handelData('first_name', e.target.value)} />
                        <TextField variant="outlined" className="form__control" label="LAST NAME" value={props.last_name} onChange={(e) => props.handelData('last_name', e.target.value)} />
                      </div>
                      <TextField style={{marginTop:16}} variant="outlined" className="form__control" label="MOBILE NUMBER" value={props.mobile} onChange={(e) => props.handelData('mobile', e.target.value)} />
                      <TextField style={{marginTop:16}} variant="outlined" className="form__control" label="EMAIL ADDRESS" value={props.email} onChange={(e) => props.handelData('email', e.target.value)} />
                      <TextField autoComplete={"current-password"} type={showPassword ? 'text' : 'password'} style={{marginTop:16, marginBottom:8}} variant='outlined' label='PASSWORD' value={props.password} onChange={(e) => props.handelData('password', e.target.value)} 
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
                      <div className="select__container" >
                        <button className={props.position==="codeexpert"?'select__button__active':'select__button'}  value="codeexpert" onClick={props.onChangeValue}>CODE EXPERT/INSTRUCTOR</button>
                        {/* <button className={props.position==="instructor"?'select__button__active':'select__button'} value="instructor" onClick={props.onChangeValue}>INSTRUCTOR</button> */}
                        {/* <button className={props.position==="freelancer"?'select__button__active':'select__button'} value="freelancer" onClick={props.onChangeValue} >FREELANCER</button> */}
                        <button className={props.position==="customer"?'select__button__active':'select__button'} value="customer" onClick={props.onChangeValue} >CUSTOMER/STUDENT</button>
                      </div>
                      <button
                          type='submit'
                          style={{outline:"none"}}
                          className='login__signInButton'
                          onClick={props.onSubmit}
                      >NEXT</button>
                  </form>
              </div>
              <Divider />
              <div className="registration__view__footer">
                  Already have an account? &nbsp; <a onClick={()=> history.replace('/login')} style={{color:"#3743B1", outline:"none"}} > Login</a>
              </div>
            </div>
       




</div>
       
    );
}

