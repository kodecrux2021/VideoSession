import React, { Component } from 'react'
// import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'; 
// import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
// import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';
import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import Navbar from '../../components/Header/Navbar';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { message } from 'antd';
import Select from 'react-select';

import { Card, TextField, Typography } from '@material-ui/core';
import { url } from '../../Server/GlobalUrl';
import { Label } from '@material-ui/core';

export default class HelpForm2 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clicked: false,
            help_text: '',
            // selected: '',
            selected: null,
            recommended_selected: [],
            technology_list: [],
            subtech_list: [],
        }
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        fetch(`${url}/api/technology/`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then(res => res.json())
          .then(
            (result) => {
             // console.log('result', result)
              this.setState({ technology_list: result })
            }
          )
    }

    handleSelect(val) {
        console.log(val);
        this.setState({selected: val})
        // this.setState({ selected: val });
    }

    handleRecommendedSelect(val) {
        let selected = [...this.state.recommended_selected]
        const index = selected.findIndex(
          (Item) => Item === val
        );
        if (index >= 0) {
          selected.splice(index, 1);
        }
        else {
          selected.push(val)
        }
  
        this.setState({ recommended_selected: selected });
    }

    submitHandler = async (e) => {
        e.preventDefault();
        if (this.state.selected?.length !== null && this.state.selected?.length > 0) {
            message.info('Submitted Successfully!!!');
            this.props.history.push("/trainers/message");
          // console.log('state', this.state);
    
    
            let tech = []
            let sub_tech = []
            // console.log(this.state.recommended_selected);
            this.state.selected.map((item) => (
                tech.push(parseInt(item.id))
            ))
    
            sub_tech = [...this.state.recommended_selected]
            let data = {
                "technology": tech,
                "sub_technology": sub_tech,
            }
    
          //console.log('data_______________', data);
          let auth = localStorage.getItem('token');
          let id = localStorage.getItem('user_id');
          // fetch(url + '/api/customuserthird/' + id + '/', {
          //   method: 'PUT',
          //   headers: {
          //     'Accept': 'application/json, text/plain',
          //     'Content-Type': 'application/json;charset=UTF-8',
          //     'Authorization': 'Bearer ' + auth,
          //   },
          //   body: JSON.stringify(data)
          // })
          //   .then((response) => {
          //     //console.log("response", response)
          //     if (response['status'] === 201 || response['status'] === 200) {
          //       return response.json()
          //     } else if (response['status'] === 400) {
          //       message.info('Something went wrong!')
          //       //console.log('Something is wrong')
          //     }
          //   })
          //   .then((result) => {
          //    // console.log('result', result);
             
          //   })
    
          
        }
        else {
          message.info('Please select a technology')
        }
      }

    clickedHandler = () => {
        this.setState({clicked: !this.state.clicked})
    }

    // onClickHandler = (data) => {
    //    // console.log('data', data)
    //     this.setState({selected:data})
    // }

    textChangeHandler = (data) => {
        this.setState({help_text: data});
    }

    
    render() {
        const customStyles = {
            control: (base, state) => ({
              ...base,
              padding: 5,
              borderColor : '#3743B1',
              boxShadow: "none",
              color : '#3743B1',
              // You can also use state.isFocused to conditionally style based on the focus state
            }),
            menuPortal: base => ({ ...base, zIndex: 9999 })
          };
        return ( 
            <>
            <Navbar/>
            
            <div className='help__form__container'>
                <Card className='HelpForm2'>
                    <div className='HelpForm2__header'>
                        <p>Please share summary of your problem,<br></br>
                             we are happy to help you</p>
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
                <div className='HelpForm2__body'>
                    {/* {this.state.selected==='Other' ?
                    
                     <input type="text" value={this.state.help_text} onChange={(e) => this.textChangeHandler(e.target.value)} className="form__control"  placeholder="One sentence summary of your request"  />
                     : null
                      } */}
                    <div className='HelpForm2__textarea'>
                        {/* <p>Detailed information to help us to understand better…</p>
                            <textarea className='employ__reg__textarea' placeholder='Enter Your Text'>
                        </textarea> */}
                        
                        <TextField variant="outlined" className="form__control" type="email" label="DETAILED INFORMATION TO HELP US TO UNDERSTAND BETTER..." 
                            multiline
                            rows={3} 
                            value={this.state.help_text} onChange={(e) => this.textChangeHandler(e.target.value)} />
                        
                    </div>
                        <div>
                        {this.state.selected?.length === 0 || this.state.selected === null ? null : <Typography style={{fontSize:12,
                                zIndex:9, marginTop:-10, marginLeft:10,
                                 color:'#3743B1', paddingLeft:20, position:'absolute'}}><p style={{backgroundColor:'white'}}>TECHNOLOGIES YOU NEED HELP WITH</p></Typography>}
                        <Select
                        id="tech-select"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={this.handleSelect}
                        getOptionLabel={option =>
                            `${option.name}`
                        }
                        menuPortalTarget={document.body} 
                        getOptionValue={option => `${option.id}`}
                        name="colors"
                        options={this.state.technology_list}
                        isSearchable={true}
                        isMulti
                        placeholder={'TECHNOLOGIES YOU NEED HELP WITH'}
                        styles={customStyles}
                        />
                        <div style={{padding:20}}>
                            {this.state.selected !== null || this.state.selected?.length > 0 ? <Typography style={{color:'#3743B1', fontSize:14}}>Recommended technologies</Typography> : null}
                            {this.state.selected !== null || this.state.selected?.length > 0 ? 
                            <div style={{border:1, borderStyle:'solid', borderColor:'#3743B1', padding:20, borderRadius:10, display:'flex', flexWrap:'wrap', gap:10}}>
                            {this.state.selected !== null && this.state.selected.map(t => (
                                t.sub_technology.map(s => (
                                    <button className={!this.state.recommended_selected.includes(s.id) ? 'button_unselect' : 'button__selected'} key={s.name} onClick={() => this.handleRecommendedSelect(s.id)}>
                                    {s.name}
                                    {!this.state.recommended_selected.includes(s.id) ? <AddCircleIcon /> : <CancelIcon/>}</button>

                                ))))}
                            </div> : null }
                        </div>
                        </div>
                    <div style={{display:'flex', flex:1, justifyContent :'flex-end', paddingRight:20, outline:'none'}}>
                        <button className='help__next__btn' onClick={this.submitHandler} >SUBMIT</button>
                    </div>
                    
                </div>              
            
            </Card>
        </div>
        </>
       
            
        )
    }
}
