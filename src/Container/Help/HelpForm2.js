import React, { Component } from 'react'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'; 
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import Navbar from '../../components/Header/Navbar';
import kodecrux from '../../assets/images/reg2.jpeg'

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
       // console.log('data', data)
        this.setState({selected:data})
    }

    textChangeHandler = (data) => {
        this.setState({help_text: data});
    }

    render() {
        return ( 
            <>
            <img src={kodecrux} style={{ height: '70px', position: 'absolute',marginLeft: '15px', marginTop: '15px' }} onClick = {() =>this.props.history.push('/')}/>
            <Navbar/>
            <div className='help__form__container'>
            <div className='HelpForm1'>
                <div className='HelpForm2__header'>
                <p>Please share summary of your problem, we are happy to help you</p>
                </div>

                {/* <div className='HelpForm2__body'> */}
                    {/* <div className={`select__btn ${this.state.selected==='Troubleshooting' && "select__btn__active"}`} onClick={() => this.onClickHandler('Troubleshooting')}  >
                    <ReportProblemOutlinedIcon className='mg__rt' />
                    <span>Quick Help</span>
                    </div>
                    <div className={`select__btn ${this.state.selected==='Debugging' && "select__btn__active"}`} onClick={() => this.onClickHandler('Debugging')} >
                    <BugReportOutlinedIcon className='mg__rt' />
                    <span>Design review & Consulting </span>
                    </div>
                    <div className={`select__btn ${this.state.selected==='Tutoring' && "select__btn__active"}`} onClick={() => this.onClickHandler('Tutoring')} >
                    <LibraryBooksOutlinedIcon className='mg__rt' />
                    <span>Gig workers & Free lancers </span>
                    </div> */}
                    {/* <div className={`select__btn ${this.state.selected==='Other' && "select__btn__active"}`} onClick={() => this.onClickHandler('Other')} >
                    <CreateOutlinedIcon className='mg__rt' />
                    <span>Add others</span>
                    </div> */}
                {/* </div> */}
                <div className='HelpForm2__footer'>
                    {this.state.selected==='Other' ?
                    
                     <input type="text" value={this.state.help_text} onChange={(e) => this.textChangeHandler(e.target.value)} className="form__control"  placeholder="One sentence summary of your request"  />
                     : null
                      }
               <div className='HelpForm2__textarea'>
               <p>Detailed information to help us to understand better…</p>
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
