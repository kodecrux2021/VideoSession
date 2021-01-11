import React, { Component } from 'react'
import RegistrationLayout from '../../components/RegistrationLayout/RegistrationLayout'
import { url } from '../../Server/GlobalUrl'
import Pagetwo from './index'
import { message } from 'antd';
import Navbar from '../../components/Header/Navbar';

export default class RegsitrationDetailsContainer extends Component {

 

    render() {
        return (
            <div>
   
            <Navbar/>
            <Pagetwo/>
             </div>
            
        )
    }
}
