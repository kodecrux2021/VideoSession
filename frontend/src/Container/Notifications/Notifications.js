import React, { useEffect } from 'react'
import './Notifications.css'
import ChatIcon from '@material-ui/icons/Chat';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import WarningIcon from '@material-ui/icons/Warning';
import { Avatar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button, notification} from 'antd'
import kodecrux from '../../assets/images/reg2.jpeg'
import { useHistory } from 'react-router-dom';

let user_id = ''
let rec = '';

const useStyles = makeStyles((theme) => ({
    largeIcon: {
        width: 80,
        height: 80,
      },

    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },

    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
 
    icon: {
        backgroundColor: '#5bc0de',
        color: 'whitesmoke',
        "&:hover": {
           
            backgroundColor: "rgb(170, 214, 215)"
        },
    },
    msgicon: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        marginRight: '10px',
    }
  }));

export default function Notifications(props) {
    useEffect(() =>{
        user_id = localStorage.getItem('user_id');
    },[])
    const history = useHistory();
    const classes = useStyles();
    return (
        <div className='notifications' >
            <div className='notifications__header' >
            <img src={kodecrux} style={{ height: '70px', position: 'absolute',left: '0', top: '0' }} onClick = {() =>history.push('/home')}/>

                <span className={`${props.selected==='messages' && "span__active"}`} onClick={()=>props.selectHandler('messages')}  >
                    <ChatIcon className={`Notifications__header__icon ${props.selected==='messages' && "icon__active" } `}/>
                </span>
                <span className={`${props.selected==='requests' && "span__active"}`} onClick={()=>props.selectHandler('requests')} >
                    <PeopleAltIcon className={`Notifications__header__icon ${props.selected==='requests' && "icon__active" } `}/>   
                </span>
                <span className={`${props.selected==='troubleshoot' && "span__active"}`} onClick={()=>props.selectHandler('troubleshoot')} >
                    <WarningIcon className={`Notifications__header__icon ${props.selected==='troubleshoot' && "icon__active" } `}/>
                </span>      
            </div>
            <div className='notifications__body' >
                {
                    props.selected === 'messages' ?

                    <div className='notifications__body__chat' >
                        <h2>Messages</h2>
                        <div className='chat__cards' >
                        {
                            
                           props.message.length > 0 && props.message.map((user) =>{

                                if(user.includes[0].id == user_id && user.includes.length > 1){
                                    
                                        rec = user.includes[1]
                                        console.log(rec);
                                    
                                   
                                }else{
                                    rec = user.includes[0]
                                }

                                return(
                                   
                                <div key = {user.id}className='chat__card' onClick = {()=>{
                                    console.log(rec.first_name);

                                    localStorage.setItem('conversation_id', user.id);
                                    props.chatHandler()
                                }}>
                            <div className='chat__card__left' >
                            <Avatar src={props.img} className={classes.large}/>
                                <div className='chat__card__details' >
                                    <span>{rec.first_name} {rec.last_name}</span>
                                </div>
                            </div>
                        </div>)
                            })
                        }
                        </div>
                    {/* <div className='chat__cards' >
                        <div className='chat__card' >
                            <div className='chat__card__left' >
                            <Avatar src={props.img} className={classes.large}/>
                                <div className='chat__card__details' >
                                    <span>Maximulian Stark</span>
                                </div>
                            </div>

                                <div className='chat__card__time' >
                                    <span> 3:31 PM </span>
                                </div>
                        </div>
                        <div className='chat__card' >
                            <div className='chat__card__left' >
                            <Avatar src={props.img} className={classes.large}/>
                                <div className='chat__card__details' >
                                    <span>Maximulian Stark</span>
                                </div>
                            </div>

                                <div className='chat__card__time' >
                                    <span> 3:31 PM </span>
                                </div>
                        </div>
                        <div className='chat__card' >
                            <div className='chat__card__left' >
                            <Avatar src={props.img} className={classes.large}/>
                                <div className='chat__card__details' >
                                    <span>Maximulian Stark</span>
                                </div>
                            </div>

                                <div className='chat__card__time' >
                                    <span> 3:31 PM </span>
                                </div>
                        </div>
                        <div className='chat__card' >
                            <div className='chat__card__left' >
                            <Avatar src={props.img} className={classes.large}/>
                                <div className='chat__card__details' >
                                    <span>Maximulian Stark</span>
                                </div>
                            </div>

                                <div className='chat__card__time' >
                                    <span> 3:31 PM </span>
                                </div>
                        </div>
                        <div className='chat__card' >
                            <div className='chat__card__left' >
                            <Avatar src={props.img} className={classes.large}/>
                                <div className='chat__card__details' >
                                    <span>Maximulian Stark</span>
                                </div>
                            </div>

                                <div className='chat__card__time' >
                                    <span> 3:31 PM </span>
                                </div>
                        </div>
                        <div className='chat__card' >
                            <div className='chat__card__left' >
                            <Avatar src={props.img} className={classes.large}/>
                                <div className='chat__card__details' >
                                    <span>Maximulian Stark</span>
                                </div>
                            </div>

                                <div className='chat__card__time' >
                                    <span> 3:31 PM </span>
                                </div>
                        </div>
                        <div className='chat__card' >
                            <div className='chat__card__left' >
                            <Avatar src={props.img} className={classes.large}/>
                                <div className='chat__card__details' >
                                    <span>Maximulian Stark</span>
                                </div>
                            </div>

                                <div className='chat__card__time' >
                                    <span> 3:31 PM </span>
                                </div>
                        </div>
                        <div className='chat__card' >
                            <div className='chat__card__left' >
                            <Avatar src={props.img} className={classes.large}/>
                                <div className='chat__card__details' >
                                    <span>Maximulian Stark</span>
                                </div>
                            </div>

                                <div className='chat__card__time' >
                                    <span> 3:31 PM </span>
                                </div>
                        </div>
                        <div className='chat__card' >
                            <div className='chat__card__left' >
                            <Avatar src={props.img} className={classes.large}/>
                                <div className='chat__card__details' >
                                    <span>Maximulian Stark</span>
                                </div>
                            </div>

                                <div className='chat__card__time' >
                                    <span> 3:31 PM </span>
                                </div>
                        </div>
                        <div className='chat__card' >
                            <div className='chat__card__left' >
                            <Avatar src={props.img} className={classes.large}/>
                                <div className='chat__card__details' >
                                    <span>Maximulian Stark</span>
                                </div>
                            </div>

                                <div className='chat__card__time' >
                                    <span> 3:31 PM </span>
                                </div>
                        </div>       
                    </div>  */}
                </div>
                :
                null
                }

{
                    props.selected === 'requests' ?
                    <div className='notifications__body__chat' >
                    <h2>Requests</h2>
                    <div className='friend__cards' >

                       {
                           props.request!==null && props.requests.map((request)=> 
                            {

                                let data =  request.accepted ? 
                                null :
                                <div className='chat__card' key={request.id}>
                                <div className='chat__card__left' >
                                <Avatar src={request.user_profile_pic} className={classes.large}/>
                                            <div className='chat__card__details' >
                                                <span>{request.user_first_name} {request.user_last_name} sent you a request.</span>
                                            </div>
                                </div>
            
                                            <div className='chat__card__time' >
                                                <div className='friend__card__button' >
                                                    <button  style={{  backgroundColor:' #5964c9'}} onClick={()=> props.acceptReq(request.id)}  >Accept</button>
                                                    <button  style={{  backgroundColor:' #76d2fd'}} onClick={()=> props.rejectReq(request.id)} >Reject</button>
                                                </div>
            
                                            </div>
                                </div>
                                

                                return (
                                    data
                                );

                               

                            }



                           )
                       } 


                    {/* <div className='chat__card' >
                    <div className='chat__card__left' >
                    <Avatar src={props.img} className={classes.large}/>
                                <div className='chat__card__details' >
                                    <span>Tyson Jhonson accepted you request . </span>
                                </div>
                    </div>

                                <div className='chat__card__time' >
                                    <div className='friend__card__button' >
                                        <button  style={{  backgroundColor:' #5964c9'}}  >Message</button>
                                    </div>

                                </div>
                    </div> */}




            </div>
</div>
                :
                null
                }


{
                    props.selected === 'troubleshoot' ?
                    <div className='notifications__body__chat' >
                    <h2>Notifications</h2>
                    <div className='chat__cards' >
                        {
                            props.notifications.map((notification)=> {

                                return (
                                    <div className='chat__card' key={notification.id}>
                                    <Avatar src={notification.user_profile_pic} className={classes.large}/>
                                   {props.hire !== null ? (<Modal title="Hiring Application" visible={props.isModalVisible}  onCancel={props.handleCancel}
                                    footer={[
                                        <Button onClick={() =>props.acceptHire(props.hire.id)}>
                                          Accept
                                        </Button>,
                                        <Button  type="primary" onClick = {() =>props.declineHire(props.hire.id)}>
                                          Reject
                                        </Button>,
                                      ]}>
                                         { props.hire !==null ?

                                         (<div> <p><e>Project Title</e>: {props.hire.project_title}</p>
                                          <p><e>Topic</e>: {props.hire.request}</p>
                                          <p><e>Budget</e>: ${props.hire.budget}</p>
                                          <p><e>Deliverables</e>: {props.hire.deliverables}</p>
                                          <p><e>Additional Information</e>: {props.hire.additional_information}</p>
                                          <p><e>Deadline</e>: {props.hire.deadlines}</p>
                                          </div>) : null
                                        }
                                    </Modal>): null}
                                            <div className='troubleshoot__details' >
                                                {notification.type == 'HIRE'?
                                                <span>{notification.sent_by_first_name} {notification.sent_by_last_name} wants to hire you</span>
                                                :
                                                <span>{notification.user_first_name} {notification.user_last_name} has accepted your request</span>
                                                }
                                                </div>
                                           {notification.type== 'HIRE'?
                                            <div className='friend__card__button' >
                                                 <button  style={{  backgroundColor:' #5964c9'}} onClick = {() =>props.show(notification.contract)}>Show</button>
                                             </div>
                                            :
                                            null
                                    }
                                    </div>
                                );
                            })
                        }


            </div>   
            </div>

                :
                null
                }

           

            </div>
        </div>
    )
}
