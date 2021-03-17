import React from 'react'
import './Registration.css'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { url } from '../../Server/GlobalUrl';
import { message } from 'antd';
import TextField from '@material-ui/core/TextField';

export default function Registration(props) {
  const history = useHistory();

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
<<<<<<< HEAD
              message.info('Logged in successfully!')
              history.replace('/')
=======
              history.replace('/home')
>>>>>>> e03f85710e8a31068ca6980515d327e30ae86865
          }
          }
      )
            
           //console.log("success")
<<<<<<< HEAD
       
=======
        
>>>>>>> e03f85710e8a31068ca6980515d327e30ae86865
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
    // if (localStorage.getItem('token') == null  ){
    //    inStyle = { background: "black"};
    // }
    return (
       
            <div className="__container">
              <div style={{padding: ' 20px 20px'}} className='registration__details__container' >
              <div className="_header">
                  <h2>Register</h2>
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
              </div>
              <div className="form__container">
                  <form >
                  {/* <TextField
          // required
          id="outlined-required"
          label="Enter Your Email Address"
          variant="outlined"
          color="primary"
          value={props.email}
           onChange={(e) => props.handelData('email', e.target.value)}
        /> */}

                      <div className="form__group">
                      <input type="text" value={props.first_name} className="form__control"  placeholder="Enter Your First Name" onChange={(e) => props.handelData('first_name', e.target.value)}  />
                      </div>
                      <div className="form__group">
                      <input type="text" className="form__control"  placeholder="Enter Your Last Name" value={props.last_name} onChange={(e) => props.handelData('last_name', e.target.value)}  />
                      </div>
                      <div className="form__group">
                          <input type="email" value={props.email} onChange={(e) => props.handelData('email', e.target.value)} className="form__control" id="uname" placeholder="Enter Your Email Address" name="uname" />

                      </div>
  
                      <div className="form__group">
                          <input type="text" value={props.mobile} onChange={(e) => props.handelData('mobile', e.target.value)} className="form__control" id="uname" placeholder="Enter Mobile Number" name="uname" />

                      </div>
                      <div className="select__container" >
                                  <button className={props.position==="codeexpert"?'select__button__active':'select__button'}  value="codeexpert" onClick={props.onChangeValue}>CODE EXPERT</button>
                                  {/* <button className={props.position==="instructor"?'select__button__active':'select__button'} value="instructor" onClick={props.onChangeValue}>INSTRUCTOR</button> */}
                                  {/* <button className={props.position==="freelancer"?'select__button__active':'select__button'} value="freelancer" onClick={props.onChangeValue} >FREELANCER</button> */}
                                  <button className={props.position==="customer"?'select__button__active':'select__button'} value="customer" onClick={props.onChangeValue} >CUSTOMER</button>
                      </div>
                      <div className="form__group">
                          <input type="password" value={props.password} onChange={(e) => props.handelData('password', e.target.value)} className="form__control" id="pwd" placeholder="Enter Password" name="pswd" />

                        </div>
                        <div className="form-actions">
                          <button type="submit" onClick={props.onSubmit}>NEXT</button>
                        </div>
                  </form>
              </div>
      <div className="registration__view__footer">
           Already have an account? &nbsp; <a onClick={()=> history.replace('/login')} > Login</a>
      </div>
              </div>
       




</div>
       
    );
}

