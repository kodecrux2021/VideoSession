import axios from 'axios'
import React from 'react'
import {url} from '../../Server/GlobalUrl'
import {Divider, message } from 'antd';
import { Card, TextField, Checkbox, Typography, FormControlLabel, withStyles, Button } from '@material-ui/core';
import Avatar from 'antd/lib/avatar/avatar';
import {ReactComponent as AvatarSvg} from '../../assets/avatar.svg';
import Rating from '@material-ui/lab/Rating';
import './review.css'


const VilotCheckbox = withStyles({
    root: {
      color: '#3743B1',
      '&$checked': {
        color: '#3743B1',
      },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


class Review extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            rating : 0,
            educator_data : {},
            review : "",
            favorite : false
        }
    }

    componentDidMount = () => {
        let educator_id = localStorage.getItem('educator_id');
        let auth = localStorage.getItem('token')
        axios.get(`${url}/api/customuser/${educator_id}`, {
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + auth
            }
        }).then((response) => {
            if (response['status'] === 201 || response['status'] === 200) {
                return response.data
            } else if (response['status'] === 401) {
                message.info('Something went wrong');  
            }
        }).then((result) =>{
            this.setState({educator_data : result})
            console.log("educator data", result);
        })
    }

    handleSubmit = () => {
        let educator_id = localStorage.getItem('educator_id');
        let auth = localStorage.getItem('token')
        let formData = {};
        formData['educator_id'] = educator_id;
        formData['stars'] = this.state.rating;
        formData['comment'] = this.state.review;
        // axios.post(`${url}/educator/rate/`, formData, {
        //     headers : {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization' : 'Bearer ' + auth
        //     }
        // }).then((response) => {
        //     if (response['status'] === 201 || response['status'] === 200) {
        //         console.log(response)
        //     } else if (response['status'] === 401) {
        //         message.info('Something went wrong');  
        //     }
        // }).then(() => {
        //     if (this.state.favorite) {
        //         // axios.
        //     }
            
        // })
        this.props.close()
    }

    render() {
        return (
            <div style={{display:'flex', flex:1, justifyContent:'center', alignItems:'center', padding:20}}>
                <Card elevation={3} style={{flex:1, maxWidth:500, minHeight:400, display:'flex', padding:20, alignItems:'center', flexDirection:'column'}}>
                    <Typography style={{fontSize:22, color:'#3743B1', fontFamily:'Segoe UI'}}>REVIEW</Typography>
                    <Divider style={{margin:0}} />
                    {this.state.educator_data?.profile_pic ? <Avatar src={this.state.educator_data.profile_pic} style={{marginTop:10, width:60, height:60}} /> : <AvatarSvg style={{width:60, height:60, margin:20}}/>}
                    <Typography style={{fontSize:25, fontWeight:'400'}}>{`${this.state.educator_data.first_name} ${this.state.educator_data.last_name}`}</Typography>
                    <Typography style={{fontWeight:"lighter", fontSize:15, marginTop:20}}>please share review for the service</Typography>
                    <Rating
                        name="feedback"
                        value={this.state.rating}
                        style={{marginTop:10}}
                        precision={1}
                        onChange={(event, newValue) => {
                            this.setState({rating: newValue});
                        }}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        label="Leave a review"
                        style={{maxWidth:400, marginTop:15}}
                        multiline
                        rows={3}
                        variant="outlined"
                    />
                    <div style={{display:'flex'}}>
                        <FormControlLabel
                            style={{color:'#3743B1'}}
                            control={
                            <VilotCheckbox
                                checked={this.state.favorite}
                                onChange={() => this.setState({favorite : !this.state.favorite})}
                                name="add_to_favorite"
                            />
                            }
                            label="Add to Favorite"
                        />
                    </div>
                    <Button onClick={this.handleSubmit} className='submit_btn'>SUBMIT</Button>
                </Card>
            </div>
        )
    }
}

export default Review