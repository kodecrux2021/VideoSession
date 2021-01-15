import React, { Component } from 'react';
import RegistrationLayout from '../../components/RegistrationLayout/RegistrationLayout';
import RegistrationView from './RegistrationView'
import 'antd/dist/antd.css';
import { message } from 'antd';
import { url } from '../../Server/GlobalUrl';
import Navbar from '../../components/Header/Navbar';


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
        console.log('identity',identity)
        console.log('data',data)
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
                "last_name": this.state.last_name
            }

            let data2 = {
                "user_username" : this.state.email,
                "password" : this.state.password,
                "phone" : this.state.mobile,
                // "is_instructor" : this.state.position==='codeexpert',
                // "is_freelancer" : this.state.position==='instructor',
                // "is_codeexpert": this.state.position==='freelancer',
                // "is_client": this.state.position==='customer',
                "user_first_name": this.state.first_name,
                "user_last_name": this.state.last_name,
                
            }
            console.log('data', data)


            await fetch( url + '/api/customuser/' , {
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
                        console.log('A user with that username already exists.')
                        message.info('A user with that username already exists!!!');
                }
            })
            .then((result) => {
                console.log('result', result);
                 if(result){
                    if(this.state.position!=='customer'){
                        fetch( url + '/api/educator/' , {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json, text/plain',
                                'Content-Type': 'application/json;charset=UTF-8',
                    
                            },
                            body: JSON.stringify(data2)
                        })
                        .then((response) => {
                            console.log("response", response)
                            if (response['status'] === 201 || response['status'] === 200) {
                                return response.json()
                            } else if (response['status'] === 400) {
                                    console.log('A user with that username already exists.')
                                    message.info('A user with that username already exists!!!');
                            }
                        })
                    }
                    localStorage.setItem('user_id', result?.id);
                    localStorage.setItem('is_client', result?.is_client);
                    this.props.history.push("/details2");
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
                <Navbar/>
                <div className='body__ctr'>
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