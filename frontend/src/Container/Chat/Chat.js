import React, {useState} from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Popover from '@material-ui/core/Popover';

import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import { Drawer } from 'antd';
import MenuIcon from '@material-ui/icons/Menu';
import NextWeekOutlinedIcon from '@material-ui/icons/NextWeekOutlined';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import { Link, useHistory } from 'react-router-dom';
import dateFormat from 'dateformat';

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

export default function Chat(props) {
    const history = useHistory();
    const classes = useStyles();

    const today = Date.now();
    console.log(today)
    console.log(dateFormat(props.lastseen, "mmmm dS, yyyy"));


    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
      };
    
      const onClose = () => {
        setVisible(false);
      };

      const logout = () => {
        localStorage.clear();
        history.push('/login')
    }

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={props.reciever_img} className={classes.large}/>
                <div className='chat__header__info'>
                    <h4>{props.name}</h4>
                    <span>{dateFormat(props.lastseen, "mmmm dS, h:MM TT")} </span>
                </div>
                <div className='chat__header__right'>
                    <IconButton className={classes.icon} onClick={props.dropHandle}>
                        <ExpandLessIcon />
                    </IconButton>

                </div>
            </div>
            <div className='chat__body'>

        <Popover
        open={props.clicked}
        onClose={props.dropHandle}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 110, left: 5000 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
 
        <div className='pop__over'>
        <div className='pop__over__left'>
        <div className='pop__over__buttons'>
            <IconButton>
            <VideocamOutlinedIcon />
            </IconButton>
        <span>Join session room</span>
        </div>
        <div className='pop__over__buttons'>
            <IconButton>
            <CalendarTodayOutlinedIcon />
            </IconButton> 
        <span>Schedule session</span>
        </div>
        {/* <div className='pop__over__buttons'>
            <IconButton>
            <NextWeekOutlinedIcon />
            </IconButton>
        
        <span>Hire for freelance job</span>
        </div>
        <div className='pop__over__buttons'>
            <IconButton>
            <PageviewOutlinedIcon />
            </IconButton>
        
        <span>Hire for code review</span>
        </div>
        <div className='pop__over__buttons'>
            <IconButton>
            <MonetizationOnOutlinedIcon />
            </IconButton>
        <span>Send direct payment</span>
        </div> */}
        </div>
        <span className='pop__over__rate'>{props.rate}</span>
        </div>
      </Popover>
           
<div className='chat__msg__container'>
                <div className='chat__date'>
                    <p>{dateFormat(props.conversation.last_message_datetime, "mmmm dS, yyyy")}</p>
                </div>
                {/*
                 <div className='message__container'>
                <span><Avatar src={props.img} className={classes.msgicon}/></span>
                <p className='chat__message tri-right left-top'>
                    <img className='msg__img' src={props.img} alt='img' />
                    <p>Here is my pic</p>
                    </p>
                </div>
                
                <div className={`message__container ${true && "reciever__container"}`}>
                <span><Avatar src={props.user_img} className={classes.msgicon}/></span>
                <p className={`chat__message ${true && "chat__reciever tri-right right-top"}`}>
               
                    Hi Prasad</p>
                </div>
                 */}
                 {
                     props.messages.map((message)=>(
                        <div className={`message__container ${(props.reciever_id===message.sent_by) && "reciever__container"}`}>
                        <span><Avatar src={props.user_img} className={classes.msgicon}/></span>
                        <p className={`chat__message tri-right ${(props.reciever_id===message.sent_by) ? "chat__reciever  right-top" :"left-top"}`}>
                       
                            {message.message}</p>
                        </div> 
                     ))
                 }

                    
                

</div>
           
              
                
                   
                   
            </div>
            <div className='chat__footer'>
                <form>
                    <input placeholder='Type a message' value={props.message} onChange={(e)=>props.handleData('message', e.target.value)} type="text" />
                    <button type='submit' onClick={(e)=>props.sendMessage(e)} >Send a message</button>
                </form>
                <IconButton > <AttachFileIcon className="svg_icons" /> </IconButton>
                <IconButton><PictureAsPdfIcon className="svg_icons" /></IconButton>
                
            </div>

            <Drawer
        title="Navigation"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Link to='/home' ><p><strong>HOME</strong></p></Link>
        <Link to='/trainers' ><p><strong>TEACHERS</strong></p></Link>
        <Link to='/courses' ><p><strong>COURSES</strong></p></Link>
        <Link to='/chat' ><p><strong>CHAT</strong></p></Link>
        <Link to='/course-registration' ><p><strong>COURSE REGISTRATION</strong></p></Link>
        <Link to='/help/1' ><p><strong>HELP SECTION</strong></p></Link> 
        {
        (localStorage.token)?
        <Link><p onClick={logout} ><strong>LOG OUT</strong></p></Link>
        :
        <Link to='/login'><p><strong>LOG IN</strong></p></Link>    
         }
         {
        (localStorage.token)?
        null
        :
        <Link to='/registration'><p><strong>SIGN UP</strong></p></Link>   
         }
        
      </Drawer>
        </div>
    )
}
