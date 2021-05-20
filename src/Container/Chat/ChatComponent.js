import React, { Component } from 'react'
import Chat from './Chat'
import avatar from '../../assets/images/avatar2.jpeg'
import { message, Spin } from 'antd';
import { url } from '../../Server/GlobalUrl';
import Navbar from '../../components/Header/Navbar';
import Timer from './Timer';
// import {DatePicker} from 'antd'
// import moment from 'moment';
// import { CircularProgress } from '@material-ui/core';

//let conversation_id =''


export default class ChatComponent extends Component {
    state = {
        clicked : false,
        reciever: '',
        user: '',
        messages: [],
        message: '',
        conversation: [],
        loading: false,
        meetId: '',
        isModalVisible: false
    }

    dropHandle = () => {
        //console.log(this.state.clicked)
        this.setState({clicked:!this.state.clicked});
    }

    fetchMessages = setInterval(() => {
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
                    // console.log('result.access',result.access)
                    localStorage.setItem('token',result.access)
                    }
                }
                ) 
                .catch((e)=>console.log(e))  
        }

        let auth = localStorage.getItem('token')
        let conversation_id = localStorage.getItem('conversation_id')
        //console.log(conversation_id);
         fetch(url + '/api/message/?conversation='+conversation_id, {
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
              this.setState({messages:result})
        
            }
        )
        .catch((e)=>console.log(e));
    }, 3000)
    

    componentWillUnmount(){
        clearInterval(this.fetchMessages)
    }


componentDidMount() {
    console.log(this.props)
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
            // console.log('result.access',result.access)
            localStorage.setItem('token',result.access)
            }
        }
        ) 
        .catch((e)=>console.log(e))  
}
let auth = localStorage.getItem('token')
let conversation_id = localStorage.getItem('conversation_id')
fetch(url + '/api/conversation/'+conversation_id, {
    method:'GET',
    headers: {
      'Accept': 'application/json',
     'Content-Type': 'application/json',
     'Authorization': 'Bearer ' + auth,
   },
})
.then(response => { if (response['status'] === 201 || response['status'] === 200) {
    return response.json()
} else if (response['status'] === 400) {
        message.info('Something went wrong, please refresh the page')
}})
.then(
    (result) => {
    //   console.log('result',result)
      this.setState({conversation: result})

      let id = result?.includes[0].id ;
      let user_id = localStorage.getItem('user_id')
      if(result.includes[0].id == user_id && result.includes.length > 1){
        id = result.includes[1].id
      }

      
      
      fetch(url + '/api/customuser/'+id+'/', { 
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
        //   console.log('result',result)
          this.setState({reciever: result })
        }
    ).catch((e)=> console.log(e))


    }
)
.catch((e)=> console.log(e))



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
    //   console.log('result',result)
      
      this.setState({user: result.user })

    }
)

  
//this.fetchMessages()

}


handleData = (identity, data) => {
    if(identity==='message'){
        this.setState({message: data})
    }
}

schedule = () =>{
    this.setState({loading: true})
     fetch(  `${url}/teamviewer-meeting/?conversation_id=${localStorage.getItem('conversation_id')}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8',
        },
    })
    .then((response) => {
       // console.log("response", response)
        if (response['status'] === 201 || response['status'] === 200) {
            this.setState({loading: false})
            //message.info('Check your mail to join the session')
            return response.json()
        } else {
                this.setState({loading: false})
                message.info('Something went wrong, please try again later')
        }
    })
    .then((result) => {
        //console.log(JSON.parse(result)); 
        return JSON.parse(result)
    })
    .then((res)=>{
        this.setState({meetId: res.id , isModalVisible: true})
    })
    .catch((e)=>console.log(e))
}

sendMessage = async(e) => {
    e.preventDefault()
    let conversation_id = localStorage.getItem('conversation_id')
    let data = {
        "read_by": [
         this.state.reciever.id
     ],
     "message": this.state.message ,
     "conversation": conversation_id
 
 }
    let auth = localStorage.getItem('token')
    await fetch( url + '/api/message/', {
        method: 'POST',
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
        } else {
            message.info('Something went wrong!')
               // console.log('Something is wrong')
        }
    })
    .catch((e)=>console.log(e))

    //this.fetchMessages()
    this.setState({message:''})

}


handleCancel = () => {
  this.setState({isModalVisible: false})
};

    render() {
        return (
            <>
        
            <div style={{flex:1}} className="wrapper">
                {/* <Navbar/> */}
                <Chat
                loading={this.state.loading}
                clicked={this.state.clicked}
                dropHandle={this.dropHandle}
                reciever_img={this.state.reciever.profile_pic!==null ? `${this.state.reciever?.profile_pic}`:null}
                user_img={this.state.user.profile_pic !== null ?`${this.state.user?.profile_pic}`: null}
                name={`${this.state?.reciever?.first_name} ${this.state?.reciever?.last_name}`}
                reciever_id={this.state.reciever.id}
                lastseen={this.state.reciever.last_seen}
                rate='$20/15 mins'
                chattime='Nov 27, 7:30 PM'
                handleData={this.handleData}
                message={this.state.message}
                messages= {this.state.messages.sort((a,b)=> (a.id > b.id ? 1 : -1))}
                sendMessage={this.sendMessage}
                conversation={this.state.conversation}
                schedule = {this.schedule}
                meetId={this.state.meetId}
                isModalVisible={this.state.isModalVisible}
                handleCancel={this.handleCancel}
                handleOk = {this.handleCancel}
                />
                <Timer/>
            </div>
            </>
            
        )
    }
}
