import React, { Component } from 'react'
import Navbar from '../../components/Header/Navbar'
import Notifications from './Notifications';
import { url } from '../../Server/GlobalUrl';

export default class NotificationsContainer extends Component {
    state={
        selected: 'messages',
    }

    selectHandler = (data) => {
        console.log('data', data)
        this.setState({selected: data})
    }

    componentDidMount(){
        let auth = localStorage.getItem("token")
        fetch(url + '/api/notification/', {
            method:'GET',
            headers: {
              'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
        })
        .then(res => res.json())
        .then(
            (result) => {
              console.log('result',result)
              //this.setState({technology_list: result })
            }
        )
        fetch(url + '/api/request/', {
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
              //this.setState({technology_list: result })
            }
        )
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
