import React, { Component } from 'react'
import Navbar from '../../components/Header/Navbar'
import Notifications from './Notifications';
import { url } from '../../Server/GlobalUrl';
import { message } from 'antd';

let user_id = ''

export default class NotificationsContainer extends Component {
    state={
        selected: 'messages',
        requests: [],
        notifications: [],
        user: '',
        message:[],
        isModalVisible: false,
        hire: []
    }

    handleCancel = () =>{
        this.setState({isModalVisible: false})
    }

    acceptHire = (id) =>{
        let data = {
            hiring_status: "INSTRUCTOR_ACCEPTED"
        }
        console.log(id);
        
        let auth = localStorage.getItem('token')
        fetch(url + '/api/hire/'+id+'/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + auth,
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                console.log("response", response)
                if (response['status'] === 201 || response['status'] === 200) {
                    return response.json()
                } else if (response['status'] === 400) {
                    console.log('Something is wrong')
                }
            })
            .then((result) => {
                console.log('result', result);
                this.setState({isModalVisible: false})
            })    
    }

    declineHire = (id) =>{
        
        let data = {
            'hiring_status': 'NOT_DONE'
        }
        console.log(id);
        let auth = localStorage.getItem('token')
        fetch(url + '/api/hire/'+id+'/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + auth,
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                console.log("response", response)
                if (response['status'] === 201 || response['status'] === 200) {
                    return response.json()
                } else if (response['status'] === 400) {
                    console.log('Something is wrong')
                }
            })
            .then((result) => {
                console.log('result', result);
                this.setState({isModalVisible: false})
            })    
    }

    show = (id) =>{
        let auth = localStorage.getItem('token')
        fetch(url + '/api/hire/'+id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + auth,
            }
        })
            .then((response) => {
                console.log("response", response)
                if (response['status'] === 201 || response['status'] === 200) {
                    return response.json()
                } else if (response['status'] === 400) {
                    console.log('Something is wrong')
                }
            })
            .then((result) => {
                console.log('result', result);
                this.setState({isModalVisible: true, hire: result})
            })    
    }
    
    getMessage = () =>{
        console.log(user_id);
        fetch(url+'/api/conversation/?includes='+user_id,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
             'Content-Type': 'application/json',
            },

        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(user_id);
              console.log('convo',result)

              
              this.setState({message: result})
              //console.log(this.state.message);

            }
        )
    }

    selectHandler = (data) => {
        console.log('data', data)
        this.props.history.push(data)
        this.setState({selected: data})
    }

    getReqList = () => {
        let auth = localStorage.getItem("token")
        fetch(url + '/api/request-read/', {
            method:'GET',
            headers: {
              'Accept': 'application/json',
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + auth,
           },
        })
        .then(res => res.json())
        .then(
            (result) => {
              console.log('request result',result)
              this.setState({requests: result})
             // console.log(this.state.requests);

            }
        )
    }

    getNotifications = (id) => {
        let auth = localStorage.getItem('token');
        fetch(url + '/api/notification/', {
            method:'GET',
            headers: {
              'Accept': 'application/json, text/plain',
             'Content-Type': 'application/json, charset=UTF-8',
             'Authorization': 'Bearer ' + auth,
           },
        })
        .then(res => res.json())
        .then(
            (result) => {
              console.log('notification result',result)
                this.setState({notifications: result})
            }
        )
    }

    getUser = () => {
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

                    console.log('current user result', result.user)
                    this.getNotifications(result.user.id);
                    this.setState({ user: result.user })

                }
            )
    }


    componentDidMount(){
         user_id = localStorage.getItem('user_id')
        const uri = window.location.href.split('/').pop()
        this.setState({selected: uri})
        console.log('previous token',localStorage.getItem("token"))
        if (localStorage.getItem("token")){
        let data_refresh = {'refresh': localStorage.getItem('refresh')}

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
                if (result){
                localStorage.setItem('token',result.access)
                }
            }
            )   
    }


        this.getUser()

        this.getReqList();

        this.getMessage()

    }
    
    acceptReq = (id) => {
        let data = {
            "accepted": true
        }

        console.log('data_______________', data);
        let auth = localStorage.getItem('token') ;
        fetch(url + '/api/request/'+ id + '/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + auth,
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                console.log("response", response)
                if (response['status'] === 201 || response['status'] === 200) {
                    message.info('Request Accepted! Go to messages to chat')
                    this.getReqList()
                    return response.json()
                } else if (response['status'] === 400) {
                    console.log('Something is wrong')
                }
            })
            .then((result) => {
                console.log('result', result);
            })
    }


    rejectReq = (id) => {
        let auth = localStorage.getItem('token') ;
        fetch(url + '/api/request/'+ id + '/', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + auth,
            }
        })
            .then((response) => {
                console.log("response", response)
                if (response['status'] === 201 || response['status'] === 200) {
                    message.info('Request Accepted! Go to messages to chat')
                    this.getReqList()
                    return response.json()
                } else if (response['status'] === 400) {
                    console.log('Something is wrong')
                }
            })
            .then((result) => {
                console.log('result', result);
            })
    }

    chatHandler = () =>{
        this.props.history.push('/chat')
    }


    render() {
        return (
            <div>
                <Navbar/>
                <Notifications
                selected = {this.state.selected}
                selectHandler = {this.selectHandler}
                requests = {this.state.requests}
                acceptReq = {this.acceptReq}
                notifications = {this.state.notifications}
                rejectReq ={this.rejectReq}
                chatHandler = {this.chatHandler}
                message={this.state.message}
                isModalVisible={this.state.isModalVisible}
                show={this.show}
                handleCancel = {this.handleCancel}
                hire={this.state.hire}
                acceptHire={this.acceptHire}
                declineHire={this.declineHire}
                />
            </div>
        )
    }
}