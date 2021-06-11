import React, { useEffect } from 'react'
import './Notifications.css'
import ChatIcon from '@material-ui/icons/Chat';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import WarningIcon from '@material-ui/icons/Warning';
import { Avatar, BottomNavigation, BottomNavigationAction,Typography, Drawer, IconButton,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, notification} from 'antd'
import kodecrux from '../../assets/images/reg2.jpeg'
import { useHistory } from 'react-router-dom';
import { url } from '../../Server/GlobalUrl';
import Chat from '../Chat/ChatComponent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

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
    const [request, setRequest] = React.useState(null)
    const [contract, setContract] = React.useState(null)

    const handleSetRequest = (req, req_id, type) => {
      if (type === "HIRE") {
        props.notifications.map((k, i) => {
          if (k.request === req_id) {
            setRequest(k)

            let id = k.contract
            let auth = localStorage.getItem('token')
            fetch(url + '/api/hire/'+id, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + auth,
                }
            })
                .then((response) => {
                    //console.log("response", response)
                    if (response['status'] === 201 || response['status'] === 200) {
                        return response.json()
                    } else if (response['status'] === 400) {
                        // message.info('Something went wrong!');
                        //console.log('Something is wrong')
                    }else if(response["status"]===401){
                        // message.info('auth token expired');
                        props.history.push('/login')
                    }
                })
                .then((result) => {
                  // console.log('result', result);
                  setContract(result)
                  console.log("contract is", result)
                    this.setState({hire: result})
                    
                }) .catch((e)=>console.log(e));
          }
        })
      }else {
        setRequest(req)
      }
    }
    console.log(props)
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
                                console.log("props message data", props.message)
                                if(user.includes[0].id == localStorage.getItem('user_id') && user.includes.length > 1){
                                  rec = user.includes[1]                                                                    
                                }else{
                                  rec = user.includes[0]
                                }

                                return(
                                  <div key = {user.id} className='chat__card' onClick = {()=>{
                                        setConvoID(user.id)
                                        let ed_rec;
                                        if(user.includes[0].id == localStorage.getItem('user_id') && user.includes.length > 1){
                                          ed_rec = user.includes[1]                                                                    
                                        }else{
                                          ed_rec = user.includes[0]
                                        }
                                        localStorage.setItem('educator_uid', ed_rec.id)
                                        localStorage.setItem('conversation_id', user.id);
                                        // props.chatHandler()
                                    }}>
                                      <div className='chat__card__left' >
                                      <Avatar style={{borderColor:'#3743B1', border:2, borderStyle:'solid', borderRadius : 50}} src={rec.profile_pic!== null ? rec.profile_pic : props.img} className={classes.large}/>
                                          <div className='chat__card__details' >
                                              <Typography style={{fontSize:14}}>{rec.first_name} {rec.last_name}</Typography>
                                              <Typography style={{fontSize:12}}>Last msg</Typography>
                                          </div>
                                      </div>
                                      
                                  </div>
                                )
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
                    <div className='friend__cards' >
                       {
                           props.requests.map((request)=> 
                            { 
                                let data =  request.accepted ? 
                                null :
                                <div className='chat__card' key={request.id} onClick={() => handleSetRequest(request, request.id, request.type)}>
                                  <div className='chat__card__left' >
                                    <Avatar src={request.user?.profile_pic!== null ?`${url}${request.user_profile_pic}`: props.img} className={classes.large}/>
                                      <div className='chat__card__details' >
                                          <span>{request.user_first_name} {request.user_last_name}</span>
                                      </div>
                                  </div>
            
                                            {/* <div className='chat__card__time' >
                                                <div className='friend__card__button' >
                                                    <button  style={{  backgroundColor:' #5964c9'}} onClick={()=> props.acceptReq(request.id)}  >Accept</button>
                                                    <button  style={{  backgroundColor:' #76d2fd'}} onClick={()=> props.rejectReq(request.id)} >Reject</button>
                                                </div>
            
                                            </div> */}
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
                {localStorage.getItem('conversation_id') !== 'null' && localStorage.getItem('conversation_id') ? <Chat /> : null}
            </div> : null}
            {props.selected === "requests" ? 
            <div style={{display:'flex', flex:1, padding:20}} >
                {request && request?.type === "HIRE" ? <div style={{display:'flex', flex:1}} className="request_mobile_card">
              {request ? <Avatar
                src={request?.sent_by_profile_pic}
                className={classes.medium}
              /> : null }
              {/* Request cards here */}
              {request ? <div  style={{flex:1, backgroundColor:'#EEEFFF', height:'fit-content', margin:10, padding:20, borderRadius:20}}>
                <Typography variant="h5">{contract?.project_title}</Typography>
                <Typography variant="subtitle1">{contract?.deliverables}</Typography>
                <div style={{flex:1, display:'flex', flexDirection:'row'}} className="request_mobile_tech_fix">
                  <div style={{flex:1, display:'flex', columnGap:20, alignItems:'center'}}>
                    <Typography variant="body2">Technology:</Typography>
                    <Typography  style={{border:1, borderStyle:'solid', borderColor:'#707070', padding:"5px 20px", borderRadius:50}}>{contract?.request}</Typography>
                  </div>
                  <div className="request_mobile_budget_fix" style={{flex:1, display:'flex', columnGap:20, justifyContent:'center', alignItems:'center'}}>
                    <Typography variant="body2">Budget(INR):</Typography>
                    <Typography variant="h6">{contract?.budget} /-</Typography>
                  </div>
                </div>
                <div style={{flex:1, display:'flex', columnGap:30, paddingTop:5}}>
                  <Typography variant="body2">Deadline:</Typography>
                  <Typography variant="caption">{contract?.deadlines ? (new Date(contract?.deadlines)).toISOString().split('T')[0] : null}</Typography>
                </div>
                
                <Typography variant="body2" style={{marginTop:20}}>Additional Information:</Typography>
                <div style={{padding:20, backgroundColor:'#E5E6FA', borderRadius:20, marginTop:5}}>
                  <Typography>{contract?.additional_information}</Typography>
                </div>
              </div> : null}
              {request ? <div className="request_mobile_button_fix" style={{flex:0.5, display:'flex', flexDirection:'column', gap:20, marginTop:20, alignItems:'center' }}>
                <Button  variant='text' className="request_accept" onClick={()=> {props.acceptReq(request.request); setRequest(null) }} endIcon={<CheckCircleIcon />}> Accept </Button>
                <Button  variant='text' className="request_decline" onClick={()=> {props.rejectReq(request.request); setRequest(null)}} endIcon={<CancelIcon />}> Decline </Button>
              </div> : null}
            </div> : 
            <div style={{display:'flex', flex:1}}>
              {request ? <Avatar
                  src={request?.sent_by_profile_pic}
                  className={classes.medium}
                /> : null }
              {request ? <div style={{flex:1, backgroundColor:'#EEEFFF', height:'fit-content', margin:10, padding:20, borderRadius:20}}>
                <Typography variant="caption">{request.user_first_name} {request.user_last_name} would like to message you.</Typography>
                </div> : null }
                {request ? <div style={{flex:0.5, display:'flex', flexDirection:'column', gap:20, marginTop:20, alignItems:'center' }}>
                <Button  variant='text' className="request_accept" onClick={()=> {props.acceptReq(request.id); setRequest(null) }} endIcon={<CheckCircleIcon />}> Accept </Button>
                <Button  variant='text' className="request_decline" onClick={()=> {props.rejectReq(request.id); setRequest(null)}} endIcon={<CancelIcon />}> Decline </Button>
              </div> : null}
            </div>
            
            }
            </div> : null }
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
