import React, {useState} from 'react'
import './Investor.css'
import { Avatar, IconButton } from '@material-ui/core';
import avatar from '../../assets/images/avatar2.jpeg'
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';

const useStyles = makeStyles((theme) => ({
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  }));



export default function Investor(props) {
    const classes = useStyles();

    function onChange(date, dateString) {
        console.log(date, dateString);
      }

    return (
        <div className='investor' > 
        <div style={{maxWidth: '900px'}} >
        <div className='investor__head'>
                <div className='investor__head__title'>
                <Avatar src={avatar} className={classes.large} />
                <span className='invester__heading' >Create a freelance job for {props.investor__name}</span>
                </div>
                <div className='investor__head__detail'>
                 Congratulations on finding a mentor for your project! To make sure
                 that you and {props.investor__name} are on the same page, please discuss project 
                 deliverables and deadline with then fill in the information below to create the freelance job.
                </div>
            </div>
            <div className='investor__body'>
            <div className='investor__card'>
                <div style={{display: 'flex'}} >
                <div className='round__icon' >
                    1
                </div>
               <p className='invester__heading' >Which request is the mentor helping you with ?</p>
                </div>
                <span className='investor__head__detail' >This request you choose will be closed and no longer shown to mentors.</span>
               
                <div style={{width: '70%', margin:'5px 0'}} >
                <Select

                className="basic-multi-select"
                classNamePrefix="select"
                onChange={props.handleSelect}
                getOptionLabel={option =>
                  `${option.name}`
                }
                getOptionValue={option => `${option.id}`}
                name="colors"
                options={props.sampleData}
                isSearchable={true}        
                placeholder={'Search for anything'}
              />
                </div>

            </div>

            <div className='investor__card'>
                <div style={{display: 'flex'}} >
                <div className='round__icon' >
                    2
                </div>
               <p className='invester__heading' >Project details</p>
                </div>
                <span className='investor__head__detail' >Project title *</span>
               
                <input style={{backgroundColor:'whitesmoke'}} type="text" className="form__control"  placeholder="Enter Project Title"  />
                   <div style={{marginTop:'25px'}} ></div>
                <span  className='investor__head__detail' >Deliverables *</span>
               
               <input style={{backgroundColor:'whitesmoke'}} type="text" className="form__control"  placeholder="Enter Deliverables"  />
            </div>

            <div className='investor__card'>
                <div style={{display: 'flex'}} >
                <div className='round__icon' >
                    3
                </div>
               <p className='invester__heading' >Budget and deadline</p>
                </div>

                <span className='investor__head__detail' >Budget* (USD) </span>
                <div style={{display:'flex', alignItems:'center', color:'gray'}} >
                <AttachMoneyIcon/>
                <div style={{width: '40%', margin:'5px 20px 5px 0px'}} >
                <input style={{backgroundColor:'whitesmoke'}} type="text" className="form__control"  placeholder="Enter Budget"  />
                </div>
                <span className='investor__head__detail' > Maximum USD $2000 </span>
                <div style={{marginLeft:'5px'}} >
                <HelpOutlineIcon/>
                </div>
                
                </div>
                
                <div style={{marginTop:'25px'}} ></div>
                <span  className='investor__head__detail' >Deadlines*</span>
                <div  style={{display:'flex', alignItems:'center', color:'gray'}} >
                <span className='investor__head__detail' > Before the end of  </span>
                <div style={{margin: '5px 20px'}} >
                <DatePicker onChange={onChange} size='large' />
                </div>
                <HelpOutlineIcon/>
                </div>

               
            </div>

            <div className='investor__card'>
                <div style={{display: 'flex'}} >
                <div className='round__icon' >
                    4
                </div>
               <p className='invester__heading' >Additional information</p>
                </div>
                <span className='investor__head__detail' >Project backgroud, links, and addtional terms </span>
                
                <textarea style={{backgroundColor:'whitesmoke'}} className="employ__reg__textarea"  placeholder='Enter Information' >
                </textarea>
      
               

            </div>

            <span className='investor__head__detail' > * The details of the freelance job will be final after it's been created. Please make sure all the information above is correct. </span>

            </div>
        </div>
        
        </div>
    )
}
