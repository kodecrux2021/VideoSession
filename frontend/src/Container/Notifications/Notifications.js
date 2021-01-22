import React from 'react'
import './Notifications.css'
import ChatIcon from '@material-ui/icons/Chat';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import WarningIcon from '@material-ui/icons/Warning';
import { Avatar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

let user_id = localStorage.getItem('user_id');
let rec = null;

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
    const classes = useStyles();
    return (
        <div className='notifications' >
            <div className='notifications__header' >
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
                            
                            props.message.map((user) =>{

                                if(user.includes[0].id == user_id){
                                    rec = user.includes[1]
                                    console.log(rec);
                                }else{
                                    rec = user.includes[0]
                                }

                                return(
                                   
                                <div className='chat__card' onClick = {()=>{
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
                           props.requests.map((request)=> 
                            {

                                let data =  request.accepted ? 
                                null :
                                <div className='chat__card' >
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
                                    <div className='chat__card' >
                                    <Avatar src={props.img} className={classes.large}/>
                                            <div className='troubleshoot__details' >
                                                <span>{notification.user} has accepted your request</span>
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
        </div>
    )
}
