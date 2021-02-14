import React from 'react'
import './TrainersCard.css'
import { withStyles } from '@material-ui/core/styles';
import { Star, Dot } from 'react-bootstrap-icons';
import Badge from '@material-ui/core/Badge';
import StarsIcon from '@material-ui/icons/Stars';
import { message, Modal  } from 'antd';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {url} from '../../Server/GlobalUrl'

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
        localStorage.setItem('hire_id', props.reciever_id)
        props.hireHandle();
        // console.log(props.id);
    }

    const LiveHandle = (video) => {
        // console.log(video);
        video !== undefined && window.open(`${url}${video}`)
        // fetch(url + '/api/session/', {
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json, text/plain',
        //         'Content-Type': 'application/json;charset=UTF-8',
        //     },
        // })
        //     .then((response) => {
        //         console.log("response", response)
        //         if (response['status'] === 201 || response['status'] === 200) {
        //             return response.json()
        //         } else if (response['status'] === 400) {
        //             console.log('Something went wrong')
        //         }
        //     })
        //     .then((result) => {
        //         console.log('result', result[0].video);
        //         window.open(result[0].video)
        //     }).catch((e)=>{console.log(e);
        //     message.info(e.message)});
    }

    const { classes } = props;
    const {id} = props;

    let initial = new Date(props.lastseen);
    let final = new Date();
    let seconds = (final.getTime()-initial.getTime())
    // console.log('seconds diffrence',seconds)
 

    const modal = (<Modal title="Select Option" footer={null} visible={props.isModalVisible}  onCancel={props.handleCancel}>
    <div className='reg__modal__button' >
    <button onClick={ ()=>props.messageHandle(props.rec_id) } style={{  backgroundColor:' #5964c9'}} type="primary" size='large' >Send Request</button>
    <button onClick={props.handleCancel} style={{  backgroundColor:' #76d2fd'}} type="primary" size='large' >Cancel</button>
    </div>
   </Modal>)

    return (
       
        <div className="card trainers__card" >
            {modal}
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

            <button type="button" class="btn btn-outline-info" onClick={()=> props.showModal(props.reciever_id)} >MESSAGE</button>
            <button class="btn btn-info" type="button" onClick={hireHandle} >HIRE</button>
            
            </div>
            
            :
            <div className="trainers__card__right">
            <button type="button" class="btn btn-info" onClick={ id => LiveHandle(props?.video) } >LIVE SESSION</button>
            </div>
            }


            
        </div>
    )
}

export default withStyles(styles)(TrainersCard)



