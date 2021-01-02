import React, { Component } from 'react'
import Chat from './Chat'
import avatar from '../../assets/images/avatar2.jpeg'
import { message } from 'antd';
import { url } from '../../Server/GlobalUrl';
import Navbar from '../../components/Header/Navbar';

let reciever_id =''

export default class ChatComponent extends Component {
    state = {
        clicked : false,
        reciever: '',
        user: '',
        conversation_id: null,
        messages: []
    }

    dropHandle = () => {
        console.log(this.state.clicked)
        this.setState({clicked:!this.state.clicked});
    }

componentDidMount() {

    reciever_id = window.location.href.split("/").pop()

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
            console.log('result.access',result.access)
            localStorage.setItem('token',result.access)
            }
        }
        )   
}
let auth = localStorage.getItem('token')
fetch(url + '/api/customuser/'+reciever_id+'/', {
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
      console.log('result',result)
      this.setState({reciever: result })
    }
)

fetch(url + '/currentuser/', {
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
      console.log('result',result)
      this.setState({user: result })
    }
)

let data = {
    "includes": [this.state.user?.id],
        "archived_by": [reciever_id]
}

fetch(url + '/api/conversation/', {
    method: 'POST',
    headers: {
       'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
    .then((response) => {
     if (response['status'] === 201 || response['status'] === 200) {
        return response.json()
    } else if (response['status'] === 401) {
        message.info('Something went wrong');  
    }
    })
    .then((result) => {
        console.log('result',result)
        if (result){
            this.setState({conversation_id: result.id})
        }
    }
    )   



fetch(url + '/api/message/?conversation='+this.state.conversation_id, {
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
      console.log('result',result)

    }
)


}

    render() {
        return (
            <>

            <div style={{backgroundColor: '#ededed', height: '100vh'}}>
                <Navbar/>
                <Chat
                clicked={this.state.clicked}
                dropHandle={this.dropHandle}
                img={this.state.reciever?.profile_pic}
                user_img={this.state.user?.profile_pic}
                name={`${this.state.reciever?.first_name} ${this.state.reciever?.last_name}`}
                lastseen={this.state.reciever.last_seen}
                rate='$20/15 mins'
                chattime='Nov 27, 7:30 PM'
                />
            </div>
            </>
            
        )
    }
}
