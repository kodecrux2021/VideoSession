import React, { Component } from 'react';
import RegistrationLayout from '../../components/RegistrationLayout/RegistrationLayout';
import RegistrationView from './RegistrationView'
import 'antd/dist/antd.css';
import { message } from 'antd';
import { url } from '../../Server/GlobalUrl';
import Navbar from '../../components/Header/Navbar';


class RegistrationContainer extends Component {
   

    state = {
        name : '',
        setname_validate: '',
        password : '', 
        setpassword_validate: '',
        mobile : '',
        setmobile_validate: '',
        position: 'codeexpert',

    }


    handelData  = (identity,data) =>{
        console.log('identity',identity)
        console.log('data',data)
        if (identity === 'name'){
            this.setState({'name' : data})
    //   if (/^([a-zA-Z]+[,.]?[ ]?|[a-zA-Z]+['-]?)+$/.test(data)) {
    //     this.setState({ setname_validate: '' })
    //   }
    //   else if (data.length <= 0) {
    //     this.setState({ setname_validate: '' })
    //   }
    //   else {
    //     this.setState({ setname_validate: 'Please enter a valid name' })
    //   }
            
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
       
        if (this.state.name === '' || this.state.password === '' || this.state.mobile === '' || this.state.position === '' || this.state.setname_validate !== '' || this.state.setmobile_validate !== '' || this.state.setpassword_validate !== '' ){
            if (this.state.name === ''){
                message.info('Please Fill Name');    
            }
            else if(this.state.mobile === ''){
                message.info('Please Fill Mobile Number');
            }
            else if(this.state.password === ''){
				message.info('Please Fill Password');
            }
            else if(this.state.setname_validate !== ''){
                message.info(this.state.setname_validate);
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
                "username" : this.state.name,
                "password" : this.state.password,
                "phone" : this.state.mobile,
                "is_instructor" : this.state.position==='codeexpert',
                "is_freelancer" : this.state.position==='instructor',
                "is_codeexpert": this.state.position==='freelancer',
                "is_client": this.state.position==='customer'
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
                    localStorage.setItem('user_id', result?.id);
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
                <Navbar/>
                <div className='body__ctr'>
                                   <RegistrationView
                onChangeValue={this.onChangeValue}
                handelData={this.handelData}
                onSubmit={this.onSubmit}
                name={this.state.name}
                mobile={this.state.mobile}
                password={this.state.password}
                position={this.state.position}
        	/>
                </div>
 
            </div>

            );
    }
}

export default RegistrationContainer;