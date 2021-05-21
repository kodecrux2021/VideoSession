import React from 'react'
import './TrainersCard.css'
import { withStyles } from '@material-ui/core/styles';
import { Star, Dot } from 'react-bootstrap-icons';
import Badge from '@material-ui/core/Badge';
import StarsIcon from '@material-ui/icons/Stars';
import { message, Modal  } from 'antd';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {url} from '../../Server/GlobalUrl'
import { Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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
        video !== undefined && window.open(`${video}`)
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
    let initial = new Date(props.last_seen);
    let final = new Date()
  
    const i = initial.getTime();
    const f = final.getTime();
    const diff = f - i;

    const seconds = Math.floor((diff / 1000) );
                

 

    const modal = (<Modal title="Select Option" footer={null} visible={props.isModalVisible}  onCancel={props.handleCancel}>
    <div className='reg__modal__button' >
    <button onClick={ ()=>props.messageHandle(props.rec_id) } style={{  backgroundColor:' #5964c9'}} type="primary" size='large' >Send Request</button>
    <button onClick={props.handleCancel} style={{  backgroundColor:' #76d2fd'}} type="primary" size='large' >Cancel</button>
    </div>
   </Modal>)

    return (

      <div className="card trainers__card">
        {modal}
        <div className="trainers__card__top">
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <img className="profile_img" src={props.img ? props.img : props.img2} alt="avatar" />
            <button
                type="button"
                class="btn btn-outline-info btn_Chat"
                onClick={() => props.showModal(props.reciever_id)}
              >
                <Typography style={{fontSize:10, color:'inherit'}}>CHAT</Typography>
                {props.isOnline ? (
                <span style={{ color: "rgb(85, 243, 124)" }}>
                  <Badge
                    classes={{ badge: classes.customBadge }}
                    overlap="circle"
                    badgeContent=""
                    variant="dot"
                  ></Badge>{" "}
                  {/* <span>Online</span> */}
                </span>
              ) : (
                <span style={{ color: "grey" }}>
                  <Badge
                    classes={{ badge: classes.customBadge2 }}
                    overlap="circle"
                    badgeContent=""
                    variant="dot"
                  ></Badge>{" "}
                  {/* Offline */}
                </span>
              )}
            </button>
          </div>
          
          <div className="d-flex flex-column trainers__card__details ">
            <div className="d-flex flex-column"> 
                <Typography style={{ color: "#424242", fontSize:16, fontWeight:500, marginTop:17 }}>{props.name}</Typography>
                <Typography style={{ color: "#898989", fontSize:12, fontWeight:'normal', }}>{props.details}</Typography>      
            </div>
            
            <div style={{display:'flex', flex:1, flexDirection:'column'}}>
              {/* / {props.time} mins</span> */}
              <div style={{display:'flex', marginTop:5, alignItems:'center'}}>
                {/* {" "}

                <Star style={{ paddingBottom: "5px" }} />{" "} */}
                <Rating name="read-only" precision={0.5} emptyIcon={<StarBorderIcon fontSize="inherit" />} value={props.rating} readOnly />
                {/* {console.log(props)} */}
                {/* <strong></strong> */}
                <Typography style={{fontSize:12}}>{props.rating ? parseFloat(props.rating).toFixed(1) : 0} ({props.ratingNumber} Reviews)</Typography>                                          
                                                                                    {/* <===================== Changed here rating*/}
                
              </div>
              <div style={{display:'flex', flexWrap:'wrap'}}>
              {props.technology.map((k, i) => 
                <div style={{ margin:5}}>
                <Typography style={{fontSize:14, padding:5, border:1, borderStyle:'solid', borderColor:'#3743B1', borderRadius:20}} key={k.name} >{k.name}</Typography></div>
              )}
              </div>
              {props.badge ? <StarsIcon /> : null}
              <Typography style={{fontSize:16, fontWeight:'bold' }}>
                ₹{props.rate}
              </Typography>
              <Typography style={{fontSize:10}}>
                INR/hour
              </Typography>
            </div>
            
          </div>
        </div>
        {props.message ? (
          <div className="trainers__card__bottom">
            
            <button class="btn btn-info" type="button" onClick={hireHandle}>
              HIRE
            </button>
          </div>
        ) : (
          props.video && (
            <div className="trainers__card__right">
              <button
                type="button"
                class="btn btn-info"
                onClick={(id) => LiveHandle(props?.video)}
              >
                RECORDED SESSION
              </button>
            </div>
          )
        )}
      </div>
    );
}

export default withStyles(styles)(TrainersCard)



