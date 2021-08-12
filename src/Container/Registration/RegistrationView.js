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
import { LinkedIn } from 'react-linkedin-login-oauth2';
import {ReactComponent as LinkdinSvg } from '../../assets/linkedin.svg'
import OtpInput from 'react-otp-input';
import firebase from "firebase/app";
import "firebase/auth";
import app from '../firebase/firebaseApp'


let recaptchaVerifier = null;

export default function Registration(props) {
  const history = useHistory();
  
  const [showPassword, setShowPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(null)
  const [otpSending, setOtpSending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [confirmObj, setConfirmObj] = useState(null)
    useEffect(()=>{
      firebase.auth().languageCode = 'en';
      recaptchaVerifier = new firebase.auth.RecaptchaVerifier("captcha_cont", {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          
        }
      });
      
    },[])

    const onSubmit = ()=>{
      setOtpSending(true);
      app.auth().signInWithPhoneNumber(props.mobile, recaptchaVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).\
            setConfirmObj(confirmationResult)
            setOtpSent(true)
            setOtpSending(false);
            // ...
          }).catch((error) => {
            // Error; SMS not sent
            // ...
            setOtpSent(false)
            setOtpSending(false);
            message.info('Invalid Phone Number (Please use country code e.g +91xxxxxxxx)');
          });
    }
    console.log("otpSent: ", otpSent)
    const verifyOTP = ()=>{
      setIsVerifying(true);
      confirmObj.confirm(otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
        
        props.onSubmit(setOtpSent)
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      }).finally(e=>{
        setIsVerifying(false)
      });
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
    
    const responseLinkdin =() => {

    }

    return (
       
            <div className="__container">
              <div className='registration__details__container' >
                <div className="_header">
                    <div style={{display:'flex', flexDirection:'column'}}>
                        <h1>Register</h1>
                        <p style={{fontSize:16}}>Sign Up to eKodecrux</p>
                    </div>
                    {(!otpSent)?<><div className = "header__button">
                        
                        <GoogleLogin 
                          className = 'google flex1'
                          clientId="515126473370-emg4305tflmvetsklioachjblbekk066.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                          buttonText="SIGN UP WITH GOOGLE"
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                          icon= {<GoogleLogo />}
                          // style={inStyle}    
                          />
                        {/* <FacebookLogin
                          cssClass = 'facebook'
                          appId="375577453526335" //APP ID NOT CREATED YET
                          textButton ="SIGN UP WITH FACEBOOK"
                          fields="name,email,picture"
                          callback={responseFacebook}
                          icon= {<div><FacebookLogo /></div>}
                          /> */}
                        <LinkedIn
                            className = 'google flex1'
                            clientId="78hfx4m366u3t2"
                            onFailure={responseLinkdin}
                            onSuccess={responseLinkdin}
                            scope="r_emailaddress r_liteprofile"
                            redirectUri="https://localhost:3000/linkedin"
                        >
                            <div style={{display:'flex', gap:20, padding:10}}>
                                <LinkdinSvg />
                                <div>SIGN UP WITH LINKEDIN</div>
                            </div>
                        </LinkedIn>

                  </div>
                  <div style={{display:'flex', flex:1, alignItems:'center'}}>
                      <Divider style={{flex:1}} />
                      <div style={{padding:10, color:'#3743B1'}}>OR</div>
                      <Divider style={{flex:1}} />
                  </div></>:null}
                </div>
              <div className="form__container">
                  {(!otpSent)?<form>
                      <div style={{display:'flex', gap:12}}>
                        <TextField variant="outlined" className="form__control" label="FIRST NAME" value={props.first_name} onChange={(e) => props.handelData('first_name', e.target.value)} />
                        <TextField variant="outlined" className="form__control" label="LAST NAME" value={props.last_name} onChange={(e) => props.handelData('last_name', e.target.value)} />
                      </div>
                      <TextField id="mobile_reg" style={{marginTop:16}} variant="outlined" className="form__control" label="MOBILE NUMBER" value={props.mobile} onChange={(e) => props.handelData('mobile', e.target.value)} />
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
                         id="submit_reg"
                          type='button'
                          style={{outline:"none"}}
                          className='login__signInButton'
                          onClick={()=>{

                            onSubmit()
                          }}
                      >{(!otpSending)?"NEXT":"Processing..."}</button>
                      
                  </form>:
                  <div className="verification__body">
                      <p>Please type the verification code sent to your phone</p>
                      <div>
                            <OtpInput
                              value={otp}
                              onChange={(e)=>{setOtp(e)}}
                              numInputs={6}
                              separator={<span>-</span>}
                              containerStyle=""
                              inputStyle="otp__box"
                            />
                      </div>
                      <h5>Didn't Recieve OTP? <span style={{fontWeight:"bold",color:" #30b3f0", cursor: "pointer"}} onClick={onSubmit}>Resend Code</span></h5>
                    <button onClick={verifyOTP}>{(!isVerifying)?"NEXT":"Registering..."}</button>
                </div>
                }
                  <div id="captcha_cont"></div>
              </div>

              <Divider />
              <div className="registration__view__footer">
                  Already have an account? &nbsp; <a onClick={()=> history.replace('/login')} style={{color:"#3743B1", outline:"none"}} > Login</a>
              </div>
            </div>
       




</div>
       
    );
}

