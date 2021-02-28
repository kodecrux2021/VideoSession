import React, { Component } from 'react'
import TrainersCard from './TrainersCard'
import avatar from '../../assets/images/user.png'
import { url } from '../../Server/GlobalUrl'
import { message } from 'antd';
import Navbar from '../../components/Header/Navbar';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import kodecrux from '../../assets/images/reg2.jpeg'

let uri = ''
export default class Trainers extends Component {

    state = {
        trainers: [],
        user: [],
        isModalVisible: false,
        loading: true,
        rec_id: null
    }


    //     setLoading=()=> {
    // this.setState({loading: false})
    //     }

    componentDidMount() {
        // console.log('previous token', localStorage.getItem("token"))
        if (localStorage.getItem("token")) {
            let data_refresh = { 'refresh': localStorage.getItem('refresh') }

            fetch(url + '/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data_refresh)
            })
                .then((response) => {
                    if (response['status'] === 201 || response['status'] === 200) {
                        return response.json()
                    } else if (response['status'] === 401) {
                        message.info('Something went wrong');
                        localStorage.removeItem('refresh')
                        localStorage.removeItem('access')
                    }
                })
                .then((result) => {
                    if (result) {
                        // console.log('result.access', result.access)
                        localStorage.setItem('token', result.access)
                    }
                }
                )
                .catch(e=>console.log(e))
        }
        let auth = localStorage.getItem('token')

        fetch(url + '/currentuser/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth,
            },
        })
            .then(res => res.json())
            .then(
                (result) => {

                    // console.log('current user result', result.user)
                    this.setState({ user: result.user })
                    let param = ""
                    result.user.technology.map((tech) => (
                        param += "&usertechnology=" + tech
                    ))
                    result.user.sub_technology.map((tech) => (
                        param += "&usersub_technology=" + tech
                    ))
                    let new_param = param.substring(1);

                    // console.log('param', new_param)
                    fetch(url + '/api/educator/?' + new_param, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + auth,
                        },
                    })
                        .then(res => res.json())
                        .then(
                            (result) => {
                                //  console.log('result', result)
                                this.setState({ trainers: result, loading: false })
                            }
                        ).catch(e=>console.log(e))
                }
            )
            .catch(e=>console.log(e))



        uri = window.location.href.split("/").pop()

    }

    // messageHandle = (id, reciever_id, conversation_id) => {
    //     message.info('Request Sent');
    //     this.handleCancel();
    // }

    messageHandle = (id) => {

        // console.log('data', id)

        let data = {
            "sent_by": this.state.user.id,
            "recieved_by": id,
            "accepted": false
        }

        // console.log('data_______________', data);
        let auth = localStorage.getItem('token');
        fetch(url + '/api/request/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + auth,
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                // console.log("response", response)
                if (response['status'] === 201 || response['status'] === 200) {
                    message.info('request has been sent')
                    return response.json()
                } else if (response['status'] === 400) {
                    message.info('Something went wrong!');
                    // console.log('Something is wrong')
                }
            })
            .catch(e=>console.log(e))



        //this.props.history.push('/chat/'+ conversation_id)



        //     let auth = localStorage.getItem('token')

        //     let data = {
        //         "includes": [reciever_id],
        //         "archived_by": [this.state.user.id]
        //     }
        // console.log('data',data)
        //     fetch(url + '/api/conversation/', {
        //         method: 'POST',
        //         headers: {
        //            'Accept': 'application/json',
        //           'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data)
        //     })
        //         .then((response) => {
        //          if (response['status'] === 201 || response['status'] === 200) {
        //             return response.json()
        //         } else if (response['status'] === 401) {
        //             message.info('Something went wrong');  
        //         }
        //         })
        //         .then((result) => {
        //             if (result){
        //             console.log('result',result)


        //             let data = {
        //                 "conversation": [result.id]
        //             }

        //             fetch(url + '/api/educator/'+id+'/', {
        //                 method: 'PUT',
        //                 headers: {
        //                    'Accept': 'application/json',
        //                   'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify(data)
        //             })
        //                 .then((response) => {
        //                  if (response['status'] === 201 || response['status'] === 200) {
        //                     return response.json()
        //                 } else if (response['status'] === 401) {
        //                     message.info('Something went wrong');  
        //                 }
        //                 })
        //                 .then((result) => {
        //                     if (result){
        //                     console.log('result',result)
        //                     this.props.history.push('/chat/'+ result.conversation[0])
        //                     }
        //                 }
        //                 )


        //             }
        //         }
        //         )


        this.handleCancel();

    }

    showModal = (id) => {
        // console.log('show')
        this.setState({rec_id: id})
        this.setState({ isModalVisible: true })
    };
    handleCancel = () => {
        this.setState({ isModalVisible: false })
    };

    hireHandle = () => {
        this.props.history.push('/investor')
    }


    render() {
        return (
            <>                      
                <Navbar />
                {
                    this.state.loading ?
                        <div style={{ width: '100%', height: '100vh', display: 'grid', placeItems: 'center' }} >
                            <Spin size='large' />
                        </div>

                        :
                        <div className='body__ctr'>
                            <img src={kodecrux} style={{ height: '70px', position: 'absolute',left: '0', top: '0', zIndex: '2000' }} onClick = {() =>this.props.history.push('/home')}/>
                            <div className=" d-flex  p-3 flex-column" style={{ alignItems: "center" }}>
                                
                                 {this.state.trainers.map((trainer) => (
                                    
                                    <TrainersCard
                                        key = {trainer.id}
                                        name={`${trainer.user_first_name} ${trainer.user_last_name}`}
                                        img={trainer.profile_pic !== null?`${url}${trainer.profile_pic}`: ''}
                                        img2={avatar}
                                        online={false}
                                        rating={trainer.rating}
                                        details={trainer.designation}
                                        rate={trainer.fees}
                                        lastseen={trainer.last_seen}
                                        time="15"
                                        reviews="150"
                                        id={trainer.id}
                                        reciever_id={trainer.user_id}
                                        conversation_id={trainer.conversation}
                                        message={uri === 'message'}
                                        messageHandle={this.messageHandle}
                                        showModal={this.showModal}
                                        handleCancel={this.handleCancel}
                                        isModalVisible={this.state.isModalVisible}
                                        hireHandle={this.hireHandle}
                                        rec_id={this.state.rec_id}
                                        video={trainer?.bill[0]?.video}
                                        // badge={false}
                                    />
                                ))} 
                            </div>

                        </div>

                }


            </>

        )
    }
}
