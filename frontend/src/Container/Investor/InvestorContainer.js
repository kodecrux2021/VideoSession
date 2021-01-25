import React, { Component } from 'react'
import Investor from './Investor'
import {url} from '../../Server/GlobalUrl'
import {message} from 'antd';

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
          selected: [],

          investor__name: 'Nauman'
        };
        this.handleSelect = this.handleSelect.bind(this);
      }

      handleSelect(val) {
        console.log(val);
      this.setState({ selected: val });
    }

    componentDidMount(){
      // if (localStorage.getItem("token")){
       
       console.log(auth);
        // let data_refresh = {'refresh': localStorage.getItem('refresh')}

        // fetch(url + '/api/token/refresh/', {
        //     method: 'POST',
        //     headers: {
        //        'Accept': 'application/json',
        //       'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data_refresh)
        // })
        //     .then((response) => {
        //      if (response['status'] === 201 || response['status'] === 200) {
        //         return response.json()
        //     } else if (response['status'] === 401) {
        //         message.info('Something went wrong');  
        //         localStorage.removeItem('refresh')
        //         localStorage.removeItem('access')
        //     }
        //     })
        //     .then((result) => {
        //         if (result){
        //         console.log('result.access',result.access)
        //         localStorage.setItem('token',result.access)
        //         }
        //     }
        //     )   
      

        fetch(url + '/api/hire/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer ' + auth,
            }
        })
            .then((response) => {
              console.log(auth);
                console.log("response", response)
                if (response['status'] === 201 || response['status'] === 200) {
                    return response.json()
                } else if (response['status'] === 400) {
                    console.log('Something is wrong')
                }
            })
            .then((result) => {
                console.log('result', result);
            })
    }

    render() {
        return (
            <div>
                <Investor
                investor__name={this.state.investor__name}
                selected={this.state.selected}
                handleSelect={this.handleSelect}
                sampleData={sampleData}
                />
            </div>
        )
    }
}
