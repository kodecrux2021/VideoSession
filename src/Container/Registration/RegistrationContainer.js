import React, { Component,  } from 'react';
import RegistrationLayout from '../../components/RegistrationLayout/RegistrationLayout';
import RegistrationView from './RegistrationView'
import 'antd/dist/antd.css';
import { message } from 'antd';
import { url } from '../../Server/GlobalUrl';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';
import {ReactComponent as EkodeLogo} from '../../assets/eKodeLogo.svg';
import axios from 'axios';


class RegistrationContainer extends Component {
   

    state = {
        email : '',
        setemail_validate: '',
        password : '', 
        setpassword_validate: '',
        mobile : '',
        setmobile_validate: '',
        position: 'codeexpert',

        first_name: '',
        last_name: '',

    }


    handelData  = (identity,data) =>{
        if (identity === 'first_name'){
            this.setState({'first_name' : data})
        }
        else if (identity === 'last_name'){
            this.setState({'last_name' : data})
        }
        else if (identity === 'email'){
            this.setState({'email' : data})
            if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.toLowerCase())) {
                this.setState({ setemail_validate: '' })
              }
              else {
                this.setState({ setemail_validate: 'Please enter a valid email' })
              }
            
        }
        else if (identity === 'password') {
            this.setState({ password: data })
            
            if (data.length <= 7) {
              this.setState({ setpassword_validate: 'Password must contain at least 8 characters, including UPPER/lowercase' })
            }
            else if (!/(?=.*[A-Z])/.test(data)) {
              this.setState({ setpassword_validate: 'Password must contain at least 8 characters, including UPPER/lowercase' })
            }
            else if (!/(?=.*[a-z])/.test(data)) {
              this.setState({ setpassword_validate: 'Password must contain at least 8 characters, including UPPER/lowercase' })
            }
            else if (!/(?=.*[0-9])/.test(data)) {
              this.setState({ setpassword_validate: 'Contain at least one number' })
            }
      
            else {
              this.setState({ setpassword_validate: '' })
            }
            console.log('data', data)
          }
        else if(identity === 'mobile'){
            this.setState({'mobile' : data})
            if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(data)) {
                this.setState({ setmobile_validate: '' })
              }
              else {
                this.setState({ setmobile_validate: 'Please enter a valid mobile number' })
              }
        }
    }



    showCustomModal = () => {
        // this.setState({ modal_show: true })
        console.log('auth resposne', this.state.authResponse)
    }

    onSubmit=async(e)=> {
        e.preventDefault();
       
        if (this.state.email === '' || this.state.password === '' || this.state.mobile === '' || this.state.position === '' || this.state.setemail_validate !== '' || this.state.setmobile_validate !== '' || this.state.setpassword_validate !== '' ){
            if (this.state.first_name === ''){
                message.info('Please Fill First Name');    
            }
            else if (this.state.last_name === ''){
                message.info('Please Fill last Name');    
            }
            else if (this.state.email === ''){
                message.info('Please Fill Email');    
            }
            else if(this.state.mobile === ''){
                message.info('Please Fill Mobile Number');
            }
            else if(this.state.password === ''){
				message.info('Please Fill Password');
            }
            else if(this.state.setemail_validate !== ''){
                message.info(this.state.setemail_validate);
            }
            else if(this.state.setmobile_validate !== ''){
                message.info(this.state.setmobile_validate);
            }
            else if(this.state.setpassword_validate !== ''){
                message.info(this.state.setpassword_validate);
            }
            
        }
        else {
            let data = {
                "username" : this.state.email,
                "password" : this.state.password,
                "phone" : this.state.mobile,
                "is_instructor" : this.state.position==='codeexpert',
                "is_freelancer" : this.state.position==='instructor',
                "is_codeexpert": this.state.position==='freelancer',
                "is_client": this.state.position==='customer',
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                "email": this.state.email
            }

            let formData = new FormData()
            formData.append('username', this.state.email)
            formData.append('paasword', this.state.password)
            formData.append('phone', this.state.mobile)
            formData.append('is_instructor', this.state.position==='codeexpert')
            formData.append("is_freelancer", this.state.position==='instructor')
            formData.append("is_codeexpert", this.state.position==='freelancer')
            formData.append("is_client", this.state.position==='customer')
            formData.append("first_name", this.state.first_name)
            formData.append("last_name", this.state.last_name)
            formData.append("email", this.state.email)


            let data2 = null;
           
            console.log('data', data, data2)

            let auth = localStorage.getItem('token');
            console.log(auth)
            
            // axios.post(`${url}/api/customuser/`, formData, {
            //     headers: {
            //       "Accept": "application/json",
            //       'Content-type': "multipart/form-data",
            //       'Authorization': 'Bearer ' + localStorage.getItem('token')
            //     }
            // })

            await fetch( url + '/api/customuser/' , {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer' + auth
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                console.log("response", response)
                if (response['status'] === 201 || response['status'] === 200) {
                    return response.json()
                } else if (response['status'] === 400) {
                        console.log('A user with that username already exists.')
                        message.info('A user with that email already exists!!!');
                }
            })
            .then(async (result) => {
                console.log('result', result);
                localStorage.setItem('email', this.state.email)
                 data2 = {
                    "password" : this.state.password,  
                    "user": result?.id,  
            // "user_username": this.state.email,
            // "user_email": "",
            // "user_first_name": this.state.first_name,
            // "user_last_name": this.state.last_name,
            // "user_phone": this.state.mobile,
                    "fees": null,
                    "rating": null,
                    "designation": null,
                    "profile_pic": null,
                    "user_email": this.state.email              
                }
                const u_data = { 'username': this.state.email, 'password': this.state.password }
                await fetch(`${url}/api/token/`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json, text/plain',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                    body:  JSON.stringify(u_data)
                }).then((response) => {
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
                }).then((u_result) => {
                    // console.log('access', result)
                    if (u_result) {

                        if (u_result.access) {
                            localStorage.setItem('token', u_result.access)
                            // console.log('result.access', result.access)
                        }
                        if (u_result.refresh) {
                            localStorage.setItem('refresh', u_result.refresh)
                            // console.log('result.refresh', result.refresh)
                        }

                        let auth = u_result.access
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
                                    }
                                }
                            )
                    }
                })
                 if(result){
                    if(this.state.position!=='customer'){
                        fetch( url + '/api/educatorcreate/' , {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            },
                            body: JSON.stringify(data2)
                        })
                        .then((response) => {
                            console.log("response", response)
                            if (response['status'] === 201 || response['status'] === 200) {
                                return response.json()
                            } else if (response['status'] === 400) {
                                    // console.log('A user with that email already exists.')
                                    message.info('A user with that email already exists!!!');
                            }
                        })
                        .then((result) =>{
                            localStorage.setItem('educator_id', result?.id)
                            console.log('result', result)})
                            //  this.props.history.push("/details");
                    }
                    localStorage.setItem('user_id', result?.id);
                    localStorage.setItem('is_client', result?.is_client);
                    console.log(localStorage.getItem("is_client"));
                    this.props.history.push("/details");
                }
                
            })   
        }
    }
    onChangeValue = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        this.setState({'position': event.target.value})
      }

    render() {
        return (
            <div> 
                <div className='body__ctr'>
                    <div style={{position:'absolute', display:'flex', flex:1, width:'100%', alignItems:'flex-end',justifyContent:'flex-end', paddingRight:40}}>
                        <Link to='/'> <CloseIcon style={{fontSize:30, color:'black'}} /> </Link>
                    </div>
                    <div style={{marginTop:30, display:'flex', justifyContent:'center'}}>
                        <Card elevation={2} style={{width:100, height:100, display:'flex', justifyContent:'center', alignItems:'center', borderRadius:30,}}>
                            <Link to='/'>
                                <EkodeLogo  />
                            </Link>
                        </Card>
                    </div>
                    <RegistrationView
                        onChangeValue={this.onChangeValue}
                        handelData={this.handelData}
                        onSubmit={this.onSubmit}
                        email={this.state.email}
                        mobile={this.state.mobile}
                        password={this.state.password}
                        position={this.state.position}
                        first_name={this.state.first_name}
                        last_name={this.state.last_name}
                    />
                </div> 
            </div>

            );
    }
}

export default RegistrationContainer;