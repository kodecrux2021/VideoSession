import React, { useEffect } from 'react'
import './Notifications.css'
import ChatIcon from '@material-ui/icons/Chat';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import WarningIcon from '@material-ui/icons/Warning';
import { Avatar, BottomNavigation, BottomNavigationAction,Typography, Drawer, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button, notification} from 'antd'
import kodecrux from '../../assets/images/reg2.jpeg'
import { useHistory } from 'react-router-dom';
import { url } from '../../Server/GlobalUrl';
import Chat from '../Chat/ChatComponent'

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
    const [value, setValue] = React.useState(0);
    const [convoID, setConvoID] = React.useState(null)

    return (
        <div className='notifications' style={{display:'flex', flex:1, flexDirection:'column'}} >
            
            <div style={{flex:1, display:'flex',}}>
            <div className='notifications__body' style={props.selected === "troubleshoot" ? {maxWidth:'none', flex:1, height:'100%'} : {flex:1, height:'100%'}} >
                {
                    props.selected === 'messages' ?

                    <div className='notifications__body__chat' >
                        {/* <h2>Messages</h2> */}
                        <div className='chat__cards' >
                        {
                            
                           props.message.length > 0 && props.message.map((user) =>{

                                if(user.includes[0].id == user_id && user.includes.length > 1){
                                    
                                        rec = user.includes[1]
                                        // console.log(rec);
                                    
                                   
                                }else{
                                    rec = user.includes[0]
                                }

                                return(
                                   
                                <div key = {user.id}className='chat__card' onClick = {()=>{
                                      setConvoID(user.id)
                                      localStorage.setItem('conversation_id', user.id);
                                      // props.chatHandler()
                                  }}>
                                    <div className='chat__card__left' >
                                    <Avatar style={{borderColor:'#3743B1', border:2, borderStyle:'solid', borderRadius : 50}} src={rec.profile_pic!== null ? rec.profile_pic : props.img} className={classes.large}/>
                                        <div className='chat__card__details' >
                                            <Typography style={{fontSize:14}}>{rec.first_name} {rec.last_name}</Typography>
                                            <Typography style={{fontSize:12}}>Last msg</Typography>
                                            {/* {console.log(rec)} */}
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
                            { console.log(request)

                                let data =  request.accepted ? 
                                null :
                                <div className='chat__card' key={request.id}>
                                <div className='chat__card__left' >
                                <Avatar src={request.user?.profile_pic!== null ?`${url}${request.user_profile_pic}`: props.img} className={classes.large}/>
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
                    {/* <h2>Notifications</h2> */}
                    <div className='chat__cards' >
                        {
                            props.notifications.map((notification)=> {

                                return (
                                  <div
                                    className="chat__card"
                                    key={notification.id}
                                  >
                                    <Avatar
                                      src={notification?.sent_by_profile_pic}
                                      className={classes.large}
                                    />
                                    {props.hire !== null ? (
                                      <Modal
                                        title="Hiring Application"
                                        visible={props.isModalVisible}
                                        onCancel={props.handleCancel}
                                        footer={[
                                          <Button
                                            onClick={() =>
                                              props.acceptHire(props.hire.id)
                                            }
                                          >
                                            Accept
                                          </Button>,
                                          <Button
                                            type="primary"
                                            onClick={() =>
                                              props.declineHire(props.hire.id)
                                            }
                                          >
                                            Reject
                                          </Button>,
                                        ]}
                                      >
                                        {props.hire !== null ? (
                                          <div>
                                            {" "}
                                            <p>
                                              <e>Project Title</e>:{" "}
                                              {props.hire.project_title}
                                            </p>
                                            <p>
                                              <e>Topic</e>: {props.hire.request}
                                            </p>
                                            <p>
                                              <e>Budget</e>: $
                                              {props.hire.budget}
                                            </p>
                                            <p>
                                              <e>Deliverables</e>:{" "}
                                              {props.hire.deliverables}
                                            </p>
                                            <p>
                                              <e>Additional Information</e>:{" "}
                                              {
                                                props.hire
                                                  .additional_information
                                              }
                                            </p>
                                            <p>
                                              <e>Deadline</e>:{" "}
                                              {props.hire.deadlines}
                                            </p>
                                          </div>
                                        ) : null}
                                      </Modal>
                                    ) : null}
                                    {console.log(notification)}
                                    <div className="troubleshoot__details">
                                      {notification.type === "HIRE" ? (
                                        notification.user ===
                                        notification.recieved_by_first_name.concat(
                                          " " +
                                            notification.recieved_by_last_name
                                        ) ? (
                                          <span>
                                            {notification.hiring_status ===
                                              "INSTRUCTOR_ACCEPTED" && (
                                              <p>
                                                You accepted{" "}
                                                {
                                                  notification.sent_by_first_name
                                                }{" "}
                                                's request
                                              </p>
                                            )}
                                            {notification.hiring_status !==
                                              "INSTRUCTOR_ACCEPTED" && (
                                              <p>
                                                {
                                                  notification.sent_by_first_name
                                                }{" "}
                                                {notification.sent_by_last_name}{" "}
                                                wants to hire you
                                              </p>
                                            )}

                                            <div className="friend__card__button">
                                              {notification.hiring_status !==
                                                "INSTRUCTOR_ACCEPTED" && (
                                                <button
                                                  style={{
                                                    backgroundColor: " #5964c9",
                                                  }}
                                                  onClick={() =>
                                                    props.show(
                                                      notification.contract
                                                    )
                                                  }
                                                >
                                                  Show
                                                </button>
                                              )}
                                            </div>
                                          </span>
                                        ) : (
                                          <span>
                                            {notification.sent_by_first_name}{" "}
                                            {notification.sent_by_last_name} has
                                            accepted your request to hire
                                            <div className="friend__card__button">
                                              <button
                                                style={{
                                                  backgroundColor: " #5964c9",
                                                }}
                                                onClick={() =>
                                                  props.pay(
                                                    notification.contract
                                                  )
                                                }
                                              >
                                                Pay Now
                                              </button>
                                            </div>
                                          </span>
                                        )
                                      ) : (
                                        <span>
                                          {notification.sent_by_first_name}{" "}
                                          {notification.sent_by_last_name} has
                                          accepted your request
                                        </span>
                                      )}
                                    </div>
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
            {props.selected === "messages" ? <div style={{display:'flex', flex:1, maxHeight:'80vh'}}>
                {localStorage.getItem('conversation_id') !== 'null' ? <Chat /> : null}
            </div> : null}
            </div>
            <BottomNavigation showLabels 
            onChange={(event, newValue) => {
              setValue(newValue);
              if (newValue === 0) {
                props.selectHandler('messages')
              } else if (newValue === 1) {
                props.selectHandler('requests')
              } else {
                props.selectHandler('troubleshoot')
              }
            }}
            style={{display:'flex', outline:'none', zIndex:200}} value={value}>
                <BottomNavigationAction label="Message" icon={<ChatIcon />} />
                <BottomNavigationAction label="Requests" icon={<PeopleAltIcon />} />
                <BottomNavigationAction label="Notification" icon={<WarningIcon />} />
            {/* <div className='notifications__header' >
                <span className={`${props.selected==='messages' && "span__active"}`} onClick={()=>props.selectHandler('messages')}  >
                    <ChatIcon className={`Notifications__header__icon ${props.selected==='messages' && "icon__active" } `}/>
                </span>
                <span className={`${props.selected==='requests' && "span__active"}`} onClick={()=>props.selectHandler('requests')} >
                    <PeopleAltIcon className={`Notifications__header__icon ${props.selected==='requests' && "icon__active" } `}/>   
                </span>
                <span className={`${props.selected==='troubleshoot' && "span__active"}`} onClick={()=>props.selectHandler('troubleshoot')} >
                    <WarningIcon className={`Notifications__header__icon ${props.selected==='troubleshoot' && "icon__active" } `}/>
                </span>      
            </div> */}
            </BottomNavigation>
        </div>
    )
}
