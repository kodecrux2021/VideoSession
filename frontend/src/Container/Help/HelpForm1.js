import React, { Component } from 'react'
import './Help.css'
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import NextWeekOutlinedIcon from '@material-ui/icons/NextWeekOutlined';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import Navbar from '../../components/Header/Navbar';
import kodecrux from '../../assets/images/reg2.jpeg';
import design from '../../assets/images/design.png';
import gig from '../../assets/images/gig.png';
import quickhelp from '../../assets/images/quickhelp.png'

export default class HelpForm1 extends Component {



    handelData  = (identity) =>{
        console.log('identity',identity)
        if (identity === 'livehelp'){
            this.props.history.push('/help/2')
        }
    else if (identity === 'freelancejob'){
           
    }
    else if (identity === 'codereviewed'){
       
    }


    }

    render() {
        return (
            <>
            <img src={kodecrux} style={{ height: '70px', position: 'absolute',marginLeft: '15px', marginTop: '15px'}} onClick = {() =>this.props.history.push('/home')}/>
            <Navbar/>
            <div className='body__ctr'>
            <div className='help__form__container'>
             <div className='HelpForm1'>
                <div className='HelpForm1__header'>
                    <p>Please choose appropriate service from below . Our esteemed code experts will be available at your service.</p>
                </div>
                <div className='HelpForm1__body'>
                    <div className='HelpForm1__card' onClick={() => this.handelData('livehelp')} >
                    <img src ={quickhelp} className='help_svg_icons' />
                    <p><strong>Quick help</strong></p>
                    <span>Online interactive sessions for quick remedy of your issue </span>
                    </div>
                    <div className='HelpForm1__card' onClick={() => this.handelData('freelancejob')} >
                    <img src = {design} className='help_svg_icons' />
                    <p><strong>Design review & Consulting </strong></p>
                    <span>We take care of review needs </span>
                    </div>
                    <div className='HelpForm1__card' onClick={() => this.handelData('codereviewed')} >
                    <img src = {gig} className='help_svg_icons' />
                    <p><strong>Gig workers / Freelancers </strong></p>
                    <span>We are here to serve your short term project needs</span>
                    </div>
                </div>
            </div>
            </div>
            </div>
            
            </>
           
          
        )
    }
}
