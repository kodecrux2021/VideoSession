import React, { Component } from 'react'
import Investor from './Investor'
import {url} from '../../Server/GlobalUrl'
import {message} from 'antd';
import Navbar from '../../components/Header/Navbar';
import kodecrux from '../../assets/images/reg2.jpeg'

const sampleData = [
    { id: 1, name: 'Blockchain' },
    { id: 2, name: 'Ruby' },
    { id: 3, name: 'Express' },
    { id: 4, name: 'Django' }
  ];

  let auth = localStorage.getItem('token')
export default class InvestorContainer extends Component {

    constructor() {
        super();
        this.state = {
          // selected: [],
          title: '',
          deliverables: '',
          budget: null,
          budget_validate: '',
          info: '',
          deadline: '',
          req: '',
          pic: '',

          investor__name: '',

        };
        this.handleSelect = this.handleSelect.bind(this);
      }

      handleSelect(val) {
        console.log(val);
      this.setState({ req: val.name });
    }

    onSubmit = async() =>{
      if(this.state.req === ''){
        message.info('Please select request')
      }
      else if(this.state.title === ''){
        message.info('Please fill the title')
      }
      else if(this.state.deliverables === ''){
        message.info('Please fill deliverables')
      }
      else if(this.state.budget === ''){
        message.info('Please fill budget')
      }
      else if(this.state.deadline === ''){
        message.info('Please select deadline')
      }
      else if(this.state.budget_validate !== ''){
        message.info(this.state.budget_validate)
      }
      else{
        
        let data = {
          "request": this.state.req,
          "project_title": this.state.title,
          "deliverables": this.state.deliverables,
          "budget": this.state.budget,
          "deadlines": this.state.deadline,
          "additional_information": this.state.info,
          "sent_by": localStorage.getItem('user_id'),
          "recieved_by": localStorage.getItem('hire_id')
        }
        console.log(data);
        await fetch(url + '/api/hire/', {
          method: 'POST',
          headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json;charset=UTF-8',
              'Authorization': 'Bearer ' + auth,
          },
          body: JSON.stringify(data)
      })
          .then((response) => {
            //console.log(auth);
              //console.log("response", response)
              if (response['status'] === 201 || response['status'] === 200) {
                  return response.json()
              } else if (response['status'] === 400) {
                message.info('Something went wrong!')
                 // console.log('Something is wrong')
              }
          })
          .then((result) => {
              console.log('result', result);
              message.info('Request has been sent!')
              this.props.history.push('/home')
          })
      }
    }

     onChange = (date, dateString) => {
      console.log(date, dateString);
      this.setState({deadline: date})
    }

    handleChange = (identity, value) =>{
      if(identity == 'title'){
        this.setState({'title': value})
      }else if(identity == 'deliverables'){
        this.setState({'deliverables': value})
      }else if(identity == 'budget'){
        this.setState({'budget': value})
        if(isNaN(value)){
          //console.log(isNaN(value));
          this.setState({budget_validate:'Please enter a valid budget'})
        }else{
          this.setState({budget_validate:''})
        }
      }else if(identity == 'info'){
        this.setState({'info': value})
        console.log(this.state.info);
      }
      
    }

    componentDidMount(){
      if (localStorage.getItem("hire_id")){
       
       console.log(auth);
       auth = localStorage.getItem('token')
       let hire_id = localStorage.getItem('hire_id')

       fetch(url+ '/api/customuser/'+hire_id,{
         method: 'GET',
         
          headers: {
                   'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
        
       })
       .then((response) =>{
        if (response['status'] === 201 || response['status'] === 200) {
                  return response.json()
              } else if (response['status'] === 401) {
                  message.info('Something went wrong');  
                  localStorage.removeItem('refresh')
                  localStorage.removeItem('access')
              }
       })
       .then((result) =>{
         this.setState({investor__name: result.first_name, pic: result.profile_pic})
         console.log(result);
       })
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
    else{
      this.props.history.push('/home')
    }}
    

    render() {
        return (
            <div>
              <img src={kodecrux} style={{ height: '70px', position: 'absolute',marginLeft: '20px', top: '0' }} onClick = {() =>this.props.history.push('/home')}/>
              <Navbar/>
                <Investor
                investor__name={this.state.investor__name}
                selected={this.state.selected}
                handleSelect={this.handleSelect}
                sampleData={sampleData}
                onChange = {this.onChange}
                handleChange={this.handleChange}
                onSubmit={this.onSubmit}
                pic={this.state.pic}
                />
            </div>
        )
    }
}
