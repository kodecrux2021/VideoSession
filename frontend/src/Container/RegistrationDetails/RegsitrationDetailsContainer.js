import React, { Component } from 'react'
import RegistrationLayout from '../../components/RegistrationLayout/RegistrationLayout'
import { url } from '../../Server/GlobalUrl'
import Pagetwo from './index'
import { message } from 'antd';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';
import {ReactComponent as EkodeLogo} from '../../assets/eKodeLogo.svg';


export default class RegsitrationDetailsContainer extends Component {

    render() {
        return (
            <div>
                <div style={{position:'absolute', display:'flex', flex:1, width:'100%', alignItems:'flex-end',justifyContent:'flex-end', paddingRight:40}}>
                    <Link to='/'> <CloseIcon style={{fontSize:30, color:'black'}} /> </Link>
                </div>
                <div style={{marginTop:30, display:'flex', justifyContent:'center'}}>
                    <Card elevation={2} style={{width:100, height:100, display:'flex', justifyContent:'center', alignItems:'center', borderRadius:30,}}>
                        <Link to='/'>
                            <EkodeLogo  />
                        </Link>
                    </Card>
                </div>
                <Pagetwo/>
             </div>
            
        )
    }
}
