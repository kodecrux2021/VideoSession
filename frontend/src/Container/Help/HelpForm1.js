import React, { Component } from 'react'
import './Help.css'

import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import NextWeekOutlinedIcon from '@material-ui/icons/NextWeekOutlined';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';


export default class HelpForm1 extends Component {
    render() {
        return (
            <div className='help__form__container'>
             <div className='HelpForm1'>
                <div className='HelpForm1__header'>
                    <p>What type of help you need ?</p>
                </div>
                <div className='HelpForm1__body'>
                    <div className='HelpForm1__card'>
                    <VideocamOutlinedIcon className='help_svg_icons' />
                    <p><strong>Get Live Help</strong></p>
                    <span>Start a live 1:1 session for one-off or long-term  mentorship</span>
                    </div>
                    <div className='HelpForm1__card'>
                    <NextWeekOutlinedIcon className='help_svg_icons' />
                    <p><strong>Post a freelance job</strong></p>
                    <span>Hire a mentor to complete a freelance job</span>
                    </div>
                    <div className='HelpForm1__card'>
                    <PageviewOutlinedIcon className='help_svg_icons' />
                    <p><strong>Get Code Reviewed</strong></p>
                    <span>Hire a developer to review your code</span>
                    </div>
                </div>
            </div>
            </div>
          
        )
    }
}
