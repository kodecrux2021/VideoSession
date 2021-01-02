import React, { Component } from 'react'
import Navbar from '../../components/Header/Navbar'
import RegistrationLayout from '../../components/RegistrationLayout/RegistrationLayout'
import VerificationView from './VerificationView'
class VerificationContainer extends Component {
    state = {
        otp: "",
    }


    onChangeValue = otp => {
        console.log("state", this.state.otp)
        this.setState({otp})
    }

    onSubmit=(e)=> 
    {
        e.preventDefault();
        let data={
    
        }
        console.log('the otp ----------------', this.state.otp)

        this.props.history.push('/home');


    //     fetch(("http://7e4a4d386d0f.ngrok.io/api/user/"),
    //     {
    //      method: 'POST',
    //      headers: {
    //       'Accept': 'application/json',
    //      'Content-Type': 'application/json',
    //               },
    //      body: JSON.stringify(data),
    //      mode: 'no-cors'
    //    })
    //    .then(res => res.json()) 
    //    .then((response) => {
    //      console.log('response___________________', response)
    //    })
    //    .catch(error => {
    //      console.log('error__________', error)
    //    })

    
    }
    render() {

        return (
            <div>
            {/* <RegistrationLayout title="Verification Code" /> */}
            <Navbar />
                <VerificationView 
                otp={this.state.otp}
                onChange={this.onChangeValue}
                onSubmit={this.onSubmit}
  
                />
 </div>       
        )
    }
}

export default VerificationContainer;