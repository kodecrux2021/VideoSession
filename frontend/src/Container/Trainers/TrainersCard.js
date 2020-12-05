import React from 'react'
import './TrainersCard.css'
import { withStyles } from '@material-ui/core/styles';
import { Star, Dot } from 'react-bootstrap-icons';
import Badge from '@material-ui/core/Badge';
import StarsIcon from '@material-ui/icons/Stars';

const styles = theme => ({
    customBadge: {
      backgroundColor: " rgb(85, 243, 124)",
  
    },
    customBadge2: {
        backgroundColor: " grey",

        
      },
  });


 function TrainersCard(props) {
    const { classes } = props;
    return (
        <div className="trainers__card  __card" >
            <div className="trainers__card__left">
                <img src={props.img} alt="avatar" />
                <div className="d-flex flex-column trainers__card__details "> 
                    <div >
                        <span style={{color: "#5bc0de", marginRight: "20px"}}><strong>{props.name}</strong></span> 
                        {/* {props.online ? <span style={{color:"rgb(85, 243, 124)"}}>
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
                            ></Badge> Offline</span>} */}
                    </div>
                    <div >
                        <span style={{marginRight: "20px"}}><strong>US ${props.rate}</strong> / {props.time} mins</span>
                        <span style={{marginRight: "12px"}}> <Star style={{paddingBottom:"5px"}} /> <strong>{props.rating}</strong> ({props.reviews} reviews) </span>
                        <StarsIcon />
                    </div>
                    <span>{props.details}</span>
                </div>
            </div>
            <div className="trainers__card__right">
            <button type="button" class="btn btn-outline-info">MESSAGE</button>
            <button class="btn btn-info" type="button">HIRE</button>
            </div>
        </div>
    )
}

export default withStyles(styles)(TrainersCard)