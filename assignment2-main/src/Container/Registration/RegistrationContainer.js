import React, { Component } from 'react';
import RegistrationView from './RegistrationView'

class RegistrationContainer extends Component {
    state = {
        name : '',
        password : '',
        mobile : '',
        position: 'codeexpert',
    }

    handelData  = (identity,data) =>{
        console.log('identity',identity)
        console.log('data',data)
        if (identity === 'name'){
            this.setState({'name' : data})
        }else if(identity === 'password'){
            this.setState({'password' : data})
        }else if(identity === 'mobile'){
            this.setState({'mobile' : data})
        }
    }

    onSubmit=(e)=> {
        e.preventDefault();

        localStorage.setItem('username', this.state.name)
        localStorage.setItem("is_instructor",this.state.is_instructor)
        localStorage.setItem("is_freelancer",this.state.is_freelancer)
        localStorage.setItem("is_codeexpert",this.state.is_codeexpert)
        localStorage.setItem('phone', this.state.mobile)
        localStorage.setItem('password', this.state.password)
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

    this.props.history.push("/details");
    }
    onChangeValue = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        this.setState({'position': event.target.value})
      }

    render() {
        return (<RegistrationView
                onChangeValue={this.onChangeValue}
                handelData={this.handelData}
                onSubmit={this.onSubmit}
                name={this.state.name}
                mobile={this.state.mobile}
                password={this.state.password}
                position={this.state.position}
        	/>)
    }
}

export default RegistrationContainer;