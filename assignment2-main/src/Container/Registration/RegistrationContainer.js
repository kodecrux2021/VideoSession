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
        console.log('values___________', this.state);
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
                name={this.name}
                mobile={this.mobile}
                password={this.password}
                position={this.state.position}
        	/>)
    }
}

export default RegistrationContainer;