import React, { Component } from 'react'
import EmployeeRegistrationView from './EmployeeRegistrationView'

export default class EmployeeRegistrationComponent extends Component {
    state = {
        togglebtn: '1',
        gender: '',
    }
    
toggleHandler = (e) => {
this.setState({togglebtn: e.target.value});
}
genderHandler = (e) => {
this.setState({gender: e.target.value});
}

    render() {
        return (
            <div>
                <EmployeeRegistrationView
                toggleHandler={this.toggleHandler}
                togglebtn={this.state.togglebtn}
                gender={this.state.gender}
                genderHandler={this.genderHandler}
                />
            </div>
        )
    }
}
