import React, { Component } from 'react'
import Navbar from '../../components/Header/Navbar'
import Notifications from './Notifications'

export default class NotificationsContainer extends Component {
    state={
        selected: 'messages',
    }

    selectHandler = (data) => {
        console.log('data', data)
        this.setState({selected: data})
    }

    render() {
        return (
            <div>
                <Navbar/>
                <Notifications
                selected = {this.state.selected}
                selectHandler = {this.selectHandler}
                />
            </div>
        )
    }
}
