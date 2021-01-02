import React from 'react'
import './Registration.css'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { url } from '../../Server/GlobalUrl';

export default function Registration(props) {
  const history = useHistory();
    // console.log('props_____________',props)

    const responseFacebook = async (response) => {
        console.log('respose',response)
         if (response.accessToken) {
          //  localStorage.setItem('token',response.accessToken)
          //  localStorage.setItem('name',response.name)

           let data = {
            "token" : response.accessToken,

        }

           await fetch( url + '/facebookuser/?email='+response.email, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
    
            },
            // body: JSON.stringify(data)
        })
        .then((response) => {
            console.log("response", response)
            if (response['status'] === 201 || response['status'] === 200) {
                return response.json()
            } else if (response['status'] === 400) {
               
            }
        })
        .then((result) => {
            console.log('result', result);
            if(result){
              localStorage.setItem('token',result.token)
            }
            
        })
            
           console.log("success")
           history.replace('/home')
         }
         else if(response.status=='unknown') {
           alert('No user Found')  
         }
    }
    const componentClicked = (data) => {
        console.log('hi',data);
    }
    const responseGoogle = (response) => {
      console.log('google',response);
      if (response.accessToken) {
        localStorage.setItem('token',response.accessToken)
        localStorage.setItem('name',response.name)
        console.log("success")
        history.replace('/home')
      }
      else if(response.status=='unknown') {
        alert('No user Found')  
      }
    }
    // if (localStorage.getItem('token') == null  ){
    //    inStyle = { background: "black"};
    // }
    return (
       
            <div className="__container">
       
              <div className="_header">
                  <h2>Register</h2>
                  <p>With</p>
                  <div className = "header__button">
                      <GoogleLogin 
                      className = 'google'
                      clientId="515126473370-emg4305tflmvetsklioachjblbekk066.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                      buttonText="GOOGLE"
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
                      <div className="form__group">
                          <label >Username</label>
                          <input type="text" value={props.name} onChange={(e) => props.handelData('name', e.target.value)} className="form__control" id="uname" placeholder="Enter Your Username" name="uname" />

                      </div>
                      <div className="form__group">
                          <label>Mobile</label>
                          <input type="text" value={props.mobile} onChange={(e) => props.handelData('mobile', e.target.value)} className="form__control" id="uname" placeholder="Enter Mobile Number" name="uname" />

                      </div>
                      <div className="select__container" >
                                  <button className={props.position==="codeexpert"?'select__button__active':'select__button'}  value="codeexpert" onClick={props.onChangeValue}>CODE EXPERT</button>
                                  <button className={props.position==="instructor"?'select__button__active':'select__button'} value="instructor" onClick={props.onChangeValue}>INSTRUCTOR</button>
                                  <button className={props.position==="freelancer"?'select__button__active':'select__button'} value="freelancer" onClick={props.onChangeValue} >FREELANCER</button>
                                  <button className={props.position==="customer"?'select__button__active':'select__button'} value="customer" onClick={props.onChangeValue} >CUSTOMER</button>
                      </div>
                      <div className="form__group">
                          <label for="pwd">Password:</label>
                          <input type="password" value={props.password} onChange={(e) => props.handelData('password', e.target.value)} className="form__control" id="pwd" placeholder="Enter Password" name="pswd" />

                        </div>
                        <div className="form-actions">
                          <button type="submit" onClick={props.onSubmit}>NEXT</button>
                        </div>
                  </form>
              </div>
      <div className="registration__view__footer">
           Already have an account? <a onClick={()=> history.replace('/login')} >Login</a>
      </div>



</div>
       
    );
}

