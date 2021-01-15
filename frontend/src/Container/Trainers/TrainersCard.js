import React from 'react'
import './TrainersCard.css'
import { withStyles } from '@material-ui/core/styles';
import { Star, Dot } from 'react-bootstrap-icons';
import Badge from '@material-ui/core/Badge';
import StarsIcon from '@material-ui/icons/Stars';
import { Modal  } from 'antd';
import { Link, useHistory } from 'react-router-dom'

const styles = theme => ({
    customBadge: {
      backgroundColor: " rgb(85, 243, 124)",
  
    },
    customBadge2: {
        backgroundColor: " grey",

        
      },
  });


 function TrainersCard(props) {
    const history = useHistory();



  const hireHandle = () => {
        props.hireHandle();
    }

    const LiveHandle = () => {

    }

    const { classes } = props;
    const {id} = props;

    let initial = new Date(props.lastseen);
    let final = new Date();
    let seconds = (final.getTime()-initial.getTime())
    console.log('seconds diffrence',seconds)
 


    return (
        <div className="card trainers__card" >
            <div className="trainers__card__left">
                <img src={props.img?props.img:props.img2} alt="avatar" />
                <div className="d-flex flex-column trainers__card__details "> 
                    <div >
                        <span style={{color: "#5bc0de", marginRight: "20px"}}><strong>{props.name}</strong></span> 
                        {(seconds <= 60) ? <span style={{color:"rgb(85, 243, 124)"}}>
                          <Badge  classes={{ badge: classes.customBadge }}
                            overlap="circle"
                            badgeContent=""
                            variant="dot"
                            ></Badge> <span>Online</span></span>
                            :<span style={{color:"grey"}}>
                                <Badge  classes={{ badge: classes.customBadge2 }}
                            overlap="circle"
                            badgeContent=""
                            variant="dot"
                            ></Badge> Offline</span>}
                    </div>
                    <div >
                        <span style={{marginRight: "20px"}}><strong>US ${props.rate}</strong></span>
                         {/* / {props.time} mins</span> */}
                        <span style={{marginRight: "12px"}}> <Star style={{paddingBottom:"5px"}} /> <strong>{props.rating}</strong></span>
                         {/* ({props.reviews} reviews) </span> */}
                        {props.badge?<StarsIcon />:null}   
                    </div>
                    <span>{props.details}</span>
                </div>
            </div>
            {
                props.message ? 
<div className="trainers__card__right">
            <button type="button" class="btn btn-outline-info" onClick={ props.showModal } >MESSAGE</button>
            <button class="btn btn-info" type="button" onClick={hireHandle} >HIRE</button>
            </div>
            :
            <div className="trainers__card__right">
            <button type="button" class="btn btn-info" onClick={ id => LiveHandle(id) } >LIVE SESSION</button>
            </div>
            }

<Modal title="Select Option" footer={null} visible={props.isModalVisible}  onCancel={props.handleCancel}>
            <div className='reg__modal__button' >
            <button onClick={ () => props.messageHandle(props.id, props.reciever_id, props.conversation_id) } style={{  backgroundColor:' #5964c9'}} type="primary" size='large' >Send Request</button>
            <button onClick={props.handleCancel} style={{  backgroundColor:' #76d2fd'}} type="primary" size='large' >Cancel</button>
            </div>
           </Modal>
            
        </div>
    )
}

export default withStyles(styles)(TrainersCard)



