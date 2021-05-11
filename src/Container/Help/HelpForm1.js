import React, { Component } from 'react'
import './Help.css'
import Navbar from '../../components/Header/Navbar';
import kodecrux from '../../assets/images/reg2.jpeg';

import {ReactComponent as InstantSvg} from '../../assets/instant.svg'
import {ReactComponent as ConsultSvg} from '../../assets/consulting.svg'
import {ReactComponent as GigSvg} from '../../assets/gig-worker.svg'

export default class HelpForm1 extends Component {


    handelData  = (identity) =>{
        //console.log('identity',identity)
        if (identity === 'livehelp'){
            this.props.history.push('/help/2')
        }
        else if (identity === 'freelancejob'){
            this.props.history.push('/help/2')
        }
        else if (identity === 'codereviewed'){
            this.props.history.push('/help/2')
    }


    }

    render() {
        return (
            
            <>
            {/* <img src={kodecrux} style={{ height: '70px', position: 'absolute',marginLeft: '15px', marginTop: '15px'}} onClick = {() =>this.props.history.push('/')}/> */}
            <Navbar/>
            <div className='body__ctr'>
            <div className='help__form__container'>
             <div className='HelpForm1'>
                <div className='HelpForm1__header'>
                    <p>Please choose appropriate service from below . Our esteemed code experts will be available at your service.</p>
                </div>
                <div className='HelpForm1__body'>
                    <div className='HelpForm1__card' onClick={() => this.handelData('livehelp')} >
                        <InstantSvg />
                        <p>Instant class room</p>
                        <span>Online interactive session for IT grads</span>
                    </div>
                    <div className='HelpForm1__card' onClick={() => this.handelData('freelancejob')} >
                        <ConsultSvg />
                        <p>Quick help with Consulting</p>
                        <span>Troubleshooting and expert consulting</span>
                    </div>
                    <div className='HelpForm1__card' onClick={() => this.handelData('codereviewed')} >
                        <GigSvg />
                        <p>Gig workers / Freelancers</p>
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
