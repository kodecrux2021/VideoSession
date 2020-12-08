import React, { Component } from 'react'
import Chat from './Chat'
import avatar from '../../assets/images/avatar2.jpeg'

export default class ChatComponent extends Component {
    state = {
        clicked : false,
        
    }

    dropHandle = () => {
        console.log(this.state.clicked)
        this.setState({clicked:!this.state.clicked});
    }

    render() {
        return (
            <div style={{backgroundColor: '#ededed', height: '100vh'}}>
                <Chat
                clicked={this.state.clicked}
                dropHandle={this.dropHandle}
                img={avatar}
                name='Azeez Raheem'
                lastseen='Nov 27, 3:07 PM (UTC+1:00)'
                rate='$20/15 mins'
                chattime='Nov 27, 7:30 PM'
                />
            </div>
        )
    }
}
