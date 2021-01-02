import React, { Component } from 'react'
import TrainersCard from './TrainersCard'
import avatar from '../../assets/images/user.png'
import { url } from '../../Server/GlobalUrl'
import { message } from 'antd';
import Navbar from '../../components/Header/Navbar';


let uri = ''
export default class Trainers extends Component {

    state = {
        trainers: [],
        }

    componentDidMount() {
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
          fetch(url + '/api/educator/?user__technology='+result.user?.technology[0]+'&user__sub_technology='+result.user?.sub_technology[0]+'&user__topic='+result.user?.topic[0], { 
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
              this.setState({trainers: result })
            }
        )
        }
    )



    uri = window.location.href.split("/").pop()




    }
    render() {
        return (
            <>
            <Navbar/>
            <div className='body__ctr'>
                <div className=" d-flex  p-3 flex-column" style={{alignItems:"center"}}>
                {this.state.trainers.map((trainer) => (
                <TrainersCard 
                name = {`${trainer.user_first_name} ${trainer.user_last_name}`}
                img = {trainer.profile_pic}
                img2 = {avatar}
                online={false}
                rating={trainer.rating}
                details={trainer.designation}
                rate={trainer.fees}
                lastseen = {trainer.last_seen}
                time="15"
                reviews="150"
                id={trainer.user}
                message={uri ==='message'}
                // badge={false}
                />
                ))}

               
            </div>
            </div>

            </>
            
        )
    }
}
