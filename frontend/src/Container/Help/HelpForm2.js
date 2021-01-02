import React, { Component } from 'react'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'; 
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import { IconButton } from '@material-ui/core';
import Navbar from '../../components/Header/Navbar';

export default class HelpForm2 extends Component {

    state = {
        clicked: false,
        help_text: '',
        selected: '',

    }

    clickedHandler = () => {
        this.setState({clicked: !this.state.clicked})
    }

    onClickHandler = (data) => {
        console.log('data', data)
        this.setState({selected:data})
    }

    textChangeHandler = (data) => {
        this.setState({help_text: data});
    }

    render() {
        return ( 
            <>
            <Navbar/>
            <div className='help__form__container'>
            <div className='HelpForm1'>
                <div className='HelpForm2__header'>
                <p>Tell us about what you need help with</p>
                </div>

                <div className='HelpForm2__body'>
                    <div className={`select__btn ${this.state.selected==='Troubleshooting' && "select__btn__active"}`} onClick={() => this.onClickHandler('Troubleshooting')}  >
                    <ReportProblemOutlinedIcon className='mg__rt' />
                    <span>Troubleshooting</span>
                    </div>
                    <div className={`select__btn ${this.state.selected==='Debugging' && "select__btn__active"}`} onClick={() => this.onClickHandler('Debugging')} >
                    <BugReportOutlinedIcon className='mg__rt' />
                    <span>Debugging</span>
                    </div>
                    <div className={`select__btn ${this.state.selected==='Tutoring' && "select__btn__active"}`} onClick={() => this.onClickHandler('Tutoring')} >
                    <LibraryBooksOutlinedIcon className='mg__rt' />
                    <span>Tutoring</span>
                    </div>
                    <div className={`select__btn ${this.state.selected==='Other' && "select__btn__active"}`} onClick={() => this.onClickHandler('Other')} >
                    <CreateOutlinedIcon className='mg__rt' />
                    <span>Add others</span>
                    </div>
                </div>
                <div className='HelpForm2__footer'>
                    {this.state.selected==='Other' ?
                    
                     <input type="text" value={this.state.help_text} onChange={(e) => this.textChangeHandler(e.target.value)} className="form__control"  placeholder="One sentence summary of your request"  />
                     : null
                      }
               <div className='HelpForm2__textarea'>
               <p>Details of what you need help with *</p>
               <textarea className='employ__reg__textarea' placeholder='Enter Your Text'>
               </textarea>
               </div>
               
           
                <button className='help__next__btn' onClick={()=>this.props.history.push('/help/3')} > Next <NavigateNextOutlinedIcon /> </button>


                </div>
                
                
            
                </div>
            </div>
            </>
       
            
        )
    }
}
