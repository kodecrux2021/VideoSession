import React, { Component } from 'react'
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
            "username": localStorage.getItem('username'),
            "phone": localStorage.getItem('phone'),
            "is_freelancer": localStorage.getItem('is_freelancer'),
            "is_codeexpert": localStorage.getItem('is_codeexpert'),
            "is_instructor": localStorage.getItem('is_instructor'),
            "city": localStorage.getItem('city'),
            "pincode": localStorage.getItem('pincode'),
            "state": localStorage.getItem('state'),
            "otp": localStorage.getItem('otp'),
            "school": localStorage.getItem('school'),
        }
        console.log('the otp ----------------', this.state.otp)
        localStorage.setItem('otp', this.state.otp)
        console.log('localstorage -----------------------', localStorage)
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
            <RegistrationLayout title="Verification Code" />
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