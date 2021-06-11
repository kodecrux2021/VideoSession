import axios from 'axios'
import React from 'react'
import {url} from '../../Server/GlobalUrl'
import { message } from 'antd';
import Navbar from '../../components/Header/Navbar';
import TrainersCard from "../Trainers/TrainersCard";
import avatar from "../../assets/images/user.png";

let uri = window.location.href.split("/").pop();

class Favorite extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fav_data : [],
            rec_id: null,
            isModalVisible: false,
        }
    }

    componentDidMount = () => {
        this.getFavData()
        this.getDataInterval = setInterval(this.getFavData, 20000)
        
    }

    componentWillUnmount = () => {
        clearInterval(this.getDataInterval)
    }

    getFavData = () => {
        let auth = localStorage.getItem('token')
        axios.get(`${url}/educator/favourite/list/`, {
            headers : {
                'Authorization' : 'Bearer ' + auth
            }
        }).then((response) => {
            console.log(response)
            if (response['status'] === 201 || response['status'] === 200) {
                return response.data
            } else if (response['status'] === 401) {
                message.info('Something went wrong');  
            }
        }).then((result) => {
            this.setState({fav_data : result})
        })
    }

    messageHandle = (id) => {
        let data = {
          sent_by: localStorage.getItem('user_id'),
          recieved_by: id,
          accepted: null,
        };

        let auth = localStorage.getItem("token");
        axios.post(`${url}/api/request/`, data,  {
          headers: {
            Accept: "application/json, text/plain",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer " + auth,
          },
        })
          .then((response) => {
            if (response["status"] === 201 || response["status"] === 200) {
              message.info("request has been sent");
              return response.json();
            } else if (response["status"] === 400) {
              message.info("Something went wrong!");
            }
          })
          .catch((e) => console.log(e));    
        this.handleCancel();
    };

    showModal = (id) => {
        this.setState({ rec_id: id });
        this.setState({ isModalVisible: true });
    };

    handleCancel = () => {
        this.setState({ isModalVisible: false });
    };

    hireHandle = () => {
        this.props.history.push("/investor");
    };


    render() {
        return (
            <>
                <Navbar />
                <div style={{ flexWrap:'wrap', gap:30, flex:1, display:'flex', marginTop:20, padding:40}}>
                    {this.state.fav_data.map((educator) => {
                        return(
                    
                        <TrainersCard
                            key={educator.id}
                            name={`${educator.user_first_name} ${educator.user_last_name}`}
                            img={
                                educator.profile_pic !== null
                                ? `${educator.profile_pic}`
                                : ""
                            }
                            img2={avatar}
                            online={false}
                            isOnline={educator.is_online}
                            ratingNumber = {educator.no_of_ratings}
                            rating={educator.rating.stars__avg}
                            details={educator.designation}
                            rate={educator.fees}
                            lastseen={educator.last_seen}
                            technology={educator.user_technology}
                            time="15"
                            reviews="150"
                            id={educator.id}
                            reciever_id={educator.user_id}
                            conversation_id={educator.conversation}
                            message={true}
                            messageHandle={this.messageHandle}
                            showModal={this.showModal}
                            handleCancel={this.handleCancel}
                            isModalVisible={this.state.isModalVisible}
                            hireHandle={this.hireHandle}
                            rec_id={this.state.rec_id}
                            video={educator?.bill[0]?.video}
                            // badge={false}
                            />
                        )
                    }
                    )}
                </div>
            </>
        )
    }
}

export default Favorite