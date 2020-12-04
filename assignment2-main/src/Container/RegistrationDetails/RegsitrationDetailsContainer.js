import React, { Component } from 'react'
import RegistrationLayout from '../../components/RegistrationLayout/RegistrationLayout'
import Pagetwo from './index'
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

    onSubmit=(e)=> {
        e.preventDefault();
        
       console.log('data_______________', this.state)

        localStorage.setItem('pincode', this.state.pincode)
        localStorage.setItem("school",this.state.school)
        localStorage.setItem("city",this.state.city)
        localStorage.setItem("state",this.state.state)

        this.props.history.push("/verification");
    }
 

    render() {
        return (
            <div>
                   <RegistrationLayout />
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
