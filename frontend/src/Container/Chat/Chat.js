import React from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Popover from '@material-ui/core/Popover';

import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import NextWeekOutlinedIcon from '@material-ui/icons/NextWeekOutlined';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';

const useStyles = makeStyles((theme) => ({
    // root: {
    //   display: 'flex',
    //   '& > *': {
    //     margin: theme.spacing(1),
    //   },
    // },

    largeIcon: {
        width: 90,
        height: 90,
      },

    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
 
    icon: {
        backgroundColor: '#5bc0de',
        color: 'whitesmoke',
        "&:hover": {
           
            backgroundColor: "rgb(170, 214, 215)"
        },
    },
    msgicon: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        marginRight: '10px',
    }
  }));

export default function Chat(props) {
    const classes = useStyles();
    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={props.img} className={classes.large}/>
                <div className='chat__header__info'>
                    <h4>{props.name}</h4>
                    <span>{props.lastseen}</span>
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
                    <p>Nov 27, 7:36 PM</p>
                </div>
                <div className='message__container'>
                <span><Avatar src={props.img} className={classes.msgicon}/></span>
                <p className='chat__message tri-right left-top'>
                    Hi Prasad</p>
                </div>
                
                <div className={`message__container ${true && "reciever__container"}`}>
                <span><Avatar src={props.img} className={classes.msgicon}/></span>
                <p className={`chat__message ${true && "chat__reciever tri-right right-top"}`}>
               
                    Hi Prasad</p>
                </div>

                    
                

</div>
           
              
                
                   
                   
            </div>
            <div className='chat__footer'>
                <form>
                    <input placeholder='Type a message' type="text" />
                    <button type='submit'>Send a message</button>
                </form>
                <IconButton > <AttachFileIcon className="svg_icons" /> </IconButton>
                <IconButton><PictureAsPdfIcon className="svg_icons" /></IconButton>
                
            </div>
        </div>
    )
}
