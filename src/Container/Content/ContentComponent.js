import React, { Component } from 'react'
import ContentViewHeader from './ContentViewHeader'
import './Content.css'
import ContentBody from './ContentBody'
import { url } from '../../Server/GlobalUrl'



const sampleData = [
    { id: 1, first_name: 'Aron', last_name: 'Paisley', gender: 'male' },
    { id: 2, first_name: 'Nerissa', last_name: 'Millhouse', gender: 'female' },
    { id: 3, first_name: 'Michael', last_name: 'Schank', gender: 'male' },
    { id: 4, first_name: 'Velma', last_name: 'Laiche', gender: 'female' }
  ];

  const availableModules = [
    {
        "name": "web development",
        "sub_technology": [
            {
                "name": "ruby",
                "topic": [
                    {
                        "name": "array",
                        "sub_technology": 4
                    },
                    {
                        "name": "string",
                        "sub_technology": 4
                    }
                ],
                "technology": 1
            },
            {
                "name": "python",
                "topic": [
                    {
                        "name": "string",
                        "sub_technology": 5
                    },
                    {
                        "name": "string",
                        "sub_technology": 5
                    }
                ],
                "technology": 1
            }
        ]
    },
    {
        "name": "game development",
        "sub_technology": []
    }
]

export default class ContentComponent extends Component {

    constructor() {
        super();
        this.state = {
          selected: '',
          input:'',
          categories : [],
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.customFilter = this.customFilter.bind(this);
      }
    
      // set selected value
      handleSelect(val) {
          //console.log(val);
        this.setState({ selected: val });
      }

      handleInputChange=(e)=>{
         // console.log('input cahnge ', e.target.value)
this.setState({input: e.target.value})
      }
    
      //Add your search logic here.
      customFilter(option, searchText) {
        if (
          option.data.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
          option.data.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
          option.data.gender.toLowerCase().includes(searchText.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      }
    
    
      isOptionSelected = (option) => (
        (this.state.selected.id === option.id) ? true : false
      )


      componentDidMount() {
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
                this.setState({categories: result })
              }
          )
      }


    render() {
        return (
            <div>
                <ContentViewHeader
                selected={this.state.selected}
                sampleData={sampleData}
                isOptionSelected={this.isOptionSelected}
                customFilter={this.customFilter}
                handleSelect={this.handleSelect}
                handleInputChange={this.handleInputChange}
                input={this.state.input}
                availableModules={this.state.categories}
                />
                <div className='body__container'>
                <ContentBody />
                </div>
                
            </div>
        )
    }
}
