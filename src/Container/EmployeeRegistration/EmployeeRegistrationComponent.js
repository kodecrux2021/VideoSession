import React, { Component } from 'react'
import EmployeeRegistrationView from './EmployeeRegistrationView'
import { message } from 'antd';
import { url } from '../../Server/GlobalUrl';
import Navbar from '../../components/Header/Navbar';


export default class EmployeeRegistrationComponent extends Component {

    constructor() {
        super();
        this.state = {
          input:'',
          categories : [],

        //   first_name: '',
        //   last_name: '',
        //   email: '',
        //   setemail_validate: '',
        //   phone_no: '',
        //   setmobile_validate: '',
          technology: '',
          sub_technology: '',
          topic: '',
          summary: '',

          tech_list: [],
          subtech_list:[],
          topic_list: [],

          isModalVisible:false,

        };
      }

      showModal = () => {
         // console.log('show')
        this.setState({isModalVisible: true})
      };
      handleCancel = () => {
        this.setState({isModalVisible: false})
      };


      componentDidMount() {
       // console.log('previous token',localStorage.getItem("token"))
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
                //console.log('result.access',result.access)
                localStorage.setItem('token',result.access)
                }
            }
            )   
    }

        fetch(url + '/api/technology/', {
            method:'GET',
            headers: {
              'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
        })
        .then(res => res.json())
        .then(
            (result) => {
              //console.log('result',result)
              this.setState({tech_list: result })
            }
        )


    }


    handelData  = (identity,data) => {
        
        
         if (identity === 'technology'){
            this.setState({'technology' : data, subtech_list : data.sub_technology})
        }
        else if (identity === 'sub_technology'){
            this.setState({'sub_technology' : data, topic_list: data.topic})
        }
        else if (identity === 'topic'){
            this.setState({'topic' : data})
        }
        else if (identity === 'summary'){
            this.setState({'summary' : data})
        }
            
        }

        handleSubmit =async(e) =>{
            e.preventDefault();
            if ( this.state.summary === '' || this.state.technology === '' || this.state.sub_technology === '' || this.state.topic === '' ){
                
                if(this.state.technology === ''){
                    message.info('Please Fill Technology');
                }
                else if(this.state.sub_technology === ''){
                    message.info('Please Fill Sub Technology');
                }
                else if(this.state.topic === ''){
                    message.info('Please Fill Topic');
                }
                else if(this.state.summary === ''){
                    message.info('Please Fill Summary');
                }
                
            }
            else {
                let tech = []
                let sub_tech = []
                let topic = []
                tech.push(parseInt(this.state.technology?.id))
                sub_tech.push(parseInt(this.state.sub_technology?.id))
                topic.push(parseInt(this.state.topic?.id))
                let data = {
                    // "first_name": this.state.first_name,
                    // "last_name": this.state.last_name,
                    "technology": tech,
                    "sub_technology": sub_tech,
                    "topic": topic,
                    "last_seen": null,
                    "profile_pic": null,
                   // "email": this.state.email,
                   // "phone": this.state.phone_no,
                    "summary": this.state.summary
                }

                console.log('data_______________', data)
                let auth = localStorage.getItem('token')
                let id = localStorage.getItem('user_id')
               await fetch( url + '/api/customuserthird/' + id + '/' , {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ' + auth,
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
               //console.log("response", response)
                if (response['status'] === 201 || response['status'] === 200) {
                    return response.json()
                } else if (response['status'] === 400) {
                        console.log('Something is wrong')
                }
            })
            .then((result) => {
                // console.log('result', result);
             
                    this.showModal();
    
        
             })

            }
            
        }


    render() {
        return (
            <div>
                <Navbar/>
                <div className='body__ctr'>
                    <EmployeeRegistrationView
                first_name={this.state.first_name}
                last_name={this.state.last_name}
                email={this.state.email}
                phone_no={this.state.phone_no}
                technology={this.state.technology}
                sub_technology={this.state.sub_technology}
                topic={this.state.topic}
                summary={this.state.summary}
                handelData={this.handelData}
                handleSubmit={this.handleSubmit}

                tech_list={this.state.tech_list}
                subtech_list={this.state.subtech_list}
                topic_list={this.state.topic_list}

                showModal={this.showModal}
                isModalVisible={this.state.isModalVisible}
                handleCancel = {this.handleCancel}
                />
                </div>
                
            </div>
        )
    }
}
