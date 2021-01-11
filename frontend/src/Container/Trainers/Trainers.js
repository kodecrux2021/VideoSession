import React, { Component } from 'react'
import TrainersCard from './TrainersCard'
import avatar from '../../assets/images/user.png'
import { url } from '../../Server/GlobalUrl'
import { message } from 'antd';
import Navbar from '../../components/Header/Navbar';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

let uri = ''
export default class Trainers extends Component {

    state = {
        trainers: [],
        user: [],
        isModalVisible:false,
        loading: true,
        }


//     setLoading=()=> {
// this.setState({loading: false})
//     }

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
            this.setState({user: result.user})
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
              this.setState({trainers: result, loading: false})
            }
        )
        }
    )



    uri = window.location.href.split("/").pop()

    }

    // messageHandle = (id, reciever_id, conversation_id) => {
    //     message.info('Request Sent');
    //     this.handleCancel();
    // }

    messageHandle = (id, reciever_id, conversation_id) => {

        console.log('data', id, reciever_id, conversation_id)

        if(conversation_id.length > 0) {
            this.props.history.push('/chat/'+ conversation_id)
        }
        else {
    
        let auth = localStorage.getItem('token')
    
        let data = {
            "includes": [reciever_id],
            "archived_by": [this.state.user.id]
        }
    console.log('data',data)
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
                if (result){
                console.log('result',result)


                let data = {
                    "conversation": [result.id]
                }
                
                fetch(url + '/api/educator/'+id+'/', {
                    method: 'PUT',
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
                        if (result){
                        console.log('result',result)
                        this.props.history.push('/chat/'+ result.conversation[0])
                        }
                    }
                    )


                }
            }
            )



        }
}

showModal = () => {
    console.log('show')
  this.setState({isModalVisible: true})
};
handleCancel = () => {
  this.setState({isModalVisible: false})
};




    render() {
        return (
            <>
            <Navbar/>
            {
                    this.state.loading ? 
                    <div style={{width:'100%', height:'100vh', display: 'grid', placeItems:'center'}} >
                    <Spin size='large' />
                    </div>

                    :
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
                    id={trainer.id}
                    reciever_id={trainer.user}
                    conversation_id={trainer.conversation}
                    message={uri ==='message'}
                    messageHandle = {this.messageHandle}
                    showModal={this.showModal}
                    handleCancel={this.handleCancel}
                    isModalVisible={this.state.isModalVisible}
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
