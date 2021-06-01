import React, {useState} from 'react'
import './Investor.css'
import { Avatar, Input, TextField  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import {Modal } from 'antd';
import { isMobile } from 'react-device-detect';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  }));



export default function Investor(props) {
    const classes = useStyles();
    const [isModalVisible, setVisible] = useState(false);


   

    const hire = () =>{
        setVisible(true);
        //console.log(isModalVisible);
    }  

    const send = () =>{
        setVisible(false);
        props.onSubmit()
    }

    const cancel = () =>{
        setVisible(false)
    }

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
        <div className='investor' style={isMobile ? {padding:0} : {}}> 
            <div style={{maxWidth: '1000px', marginTop: '30px'}} className="investor_Card" >
            <div className='investor__head'>
                    <div className='investor__head__title'>
                    <Avatar src={props.pic} className={classes.large} />
                    <span className='invester__heading' style={{fontSize:24}} >Create a freelance job for {props?.investor__name}</span>
                    </div>
                    <div className='investor__head__detail'>
                    Congratulations on finding a mentor for your project! To make sure
                    that you and {props?.investor__name} are on the same page, please discuss project 
                    deliverables and deadline , then fill in the information below to create the freelance job.
                    </div>
                </div>
                <div className='investor__body'>
                <div className='investor__card'>
                    <div style={{display: 'flex'}} >
                    <div>
                        <div className='round__icon' >
                            1
                        </div>
                    </div>
                <p className='invester__heading' >Which request is the mentor helping you with ?</p>
                    </div>
                    {/* <span className='investor__head__detail' >This request you choose will be closed and no longer shown to mentors.</span> */}
                
                    {/* <div style={{ margin:'5px 0'}} > */}
                    <Select

                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={props.handleSelect}
                    getOptionLabel={option =>
                    `${option.name}`
                    }
                    styles={customStyles}
                    getOptionValue={option => `${option.id}`}
                    name="colors"
                    options={props.sampleData}
                    isSearchable={true}        
                    placeholder={'TECHNOLOGY'}
                />
                    {/* </div> */}

                </div>

                <div className='investor__card'>
                    <div style={{display: 'flex', alignItems:'baseline'}} >
                        <div>
                            <div className='round__icon' >
                                2
                            </div>
                        </div>
                        <p className='invester__heading' >Project details</p>
                    </div>
                    {/* <span className='investor__head__detail' ></span> */}
                    
                    <TextField variant='outlined'  type="text" className="form__control"  label="PROJECT TITLE*" onChange={(e) => props.handleChange('title',e.target.value)} />
                    <div style={{marginTop:'25px'}} ></div>
                    {/* <span  className='investor__head__detail' ></span> */}
                
                <TextField variant='outlined'  type="text" className="form__control"  label="DELIVERABLES *"  onChange={(e) => props.handleChange('deliverables',e.target.value)}/>
                </div>

                <div className='investor__card'>
                    <div style={{display: 'flex', alignItems:'baseline'}} >
                    <div>
                        <div className='round__icon' >
                            3
                        </div>
                    </div>
                <p className='invester__heading' >Budget and deadline</p>
                    </div>

                    {/* <span className='investor__head__detail' >Budget* (INR) </span> */}
                    <div className = 'budget' >
                    {/* <AttachMoneyIcon/> */}

                    <div style={{ margin:'5px 20px 5px 0px'}} >
                    <TextField variant='outlined' type="text" className="form__control"  label="BUDGET* (INR)" onChange={(e) => props.handleChange('budget',e.target.value)}  />
                    </div>
                    {/* <span className='investor__head__detail' > Maximum  INR 2000 </span> */}
                    <div style={{marginLeft:'5px'}} >
                    <HelpOutlineIcon/>
                    </div>
                    
                    </div>
                    
                    <div style={{marginTop:'25px'}} ></div>
                    <span  className='investor__head__detail' style={{color:'#3743B1'}} >Deadlines*</span>
                    <div  style={{display:'flex', alignItems:'center'}} >
                    <span className='investor__head__detail' style={{color:'#3743B1'}} > Before the end of  </span>
                    <div style={{margin: '5px 20px'}} >
                    <DatePicker style={{borderColor:'#3743B1', borderRadius:5}} onChange={props.onChange} size='large' />
                    </div>
                    <HelpOutlineIcon/>
                    </div>

                
                </div>

                <div className='investor__card'>
                    <div style={{display: 'flex', alignItems:'baseline'}} >
                    <div>
                        <div className='round__icon' >
                            4
                        </div>
                    </div>
                <p className='invester__heading' >Additional information</p>
                    </div>
                    {/* <span className='investor__head__detail' >Project background, links, and addtional terms </span> */}
                    
                    <TextField variant='outlined' multiline rows={4}  className="employ__reg__textarea"  label='PROJECT BACKGROUND, LINKS, AND ADDITIONAL TERMS ' onChange={(e) => props.handleChange('info',e.target.value)}>
                    </TextField>
        
                

                </div>

                <span className='investor__head__detail' style={{fontSize:12, color:'#3742B1'}} > * The details of the freelance job will be final after it has been created. Please make sure all the information above is correct. </span>

                </div>
                <div className="form-actions">
                <button className="hire_btn" onClick = {() => hire()}>HIRE</button>
                            </div>
                            <Modal title="Are you sure you want to hire?" visible={isModalVisible}  footer={null} >
                <div className='reg__modal__button' >
                <button onClick={ () => send() } className="send_req" >Send Request</button>
                <button onClick={()=>cancel()} className="cancel_btn" >Cancel</button>
                </div>
            </Modal>
            </div>
        
        </div>
    )
}
// onCancel={props.handleCancel}