import React, { Component } from 'react'
import RegistrationLayout from '../../components/RegistrationLayout/RegistrationLayout'
import { url } from '../../Server/GlobalUrl'
import Pagetwo from './index'
import { message } from 'antd';
import Navbar from '../../components/Header/Navbar';

export default class RegsitrationDetailsContainer extends Component {

    state = {
        pincode : '',
        state : '',
        city : '',
        school : '',
    }

    handelData  = (identity,data) =>{
        console.log('identity',identity)
        console.log('data',data)
        if (identity === 'pincode'){
            this.setState({'pincode' : data})
        }else if(identity === 'state'){
            this.setState({'state' : data})
        }else if(identity === 'city'){
            this.setState({'city' : data})
        }
        else if(identity === 'school'){
            this.setState({'school' : data})
        }
    }

    onSubmit=async(e)=> {
        e.preventDefault();


        if (this.state.pincode === '' || this.state.school === '' || this.state.city === '' || this.state.state === '' ) {
            if (this.state.pincode === ''){
                message.info('Please Fill Pincode');    
            }
            else if(this.state.school === ''){
                message.info('Please Fill School');
            }
            else if(this.state.city === ''){
				message.info('Please Fill City');
            }
            else if(this.state.state === ''){
				message.info('Please Fill State');
            }
        }
        else {
            let data = {
                "pincode" : this.state.pincode,
                "school" : this.state.school,
                "city" : this.state.city,
                "state" : this.state.state,
            }
            
           console.log('data_______________', data)
            let id = localStorage.getItem('user_id')
           await fetch( url + '/api/customusersecond/' + id + '/' , {
            method: 'PUT',
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
                    console.log('Something is wrong')
            }
        })
        .then((result) => {
            console.log('result', result);
        })

            this.props.history.push("/verification");
        }

  
    }
 

    render() {
        return (
            <div>
            {/* <RegistrationLayout /> */}
            <Navbar/>
            <Pagetwo
            pincode={this.state.pincode}
            school={this.state.school}
            state={this.state.state}
            city={this.state.city}
            handelData={this.handelData}
            onSubmit ={this.onSubmit}
            />
             </div>
            
        )
    }
}
