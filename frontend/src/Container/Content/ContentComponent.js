import React, { Component } from 'react'
import ContentViewHeader from './ContentViewHeader'
import home4 from '../../assets/images/home4.jpg'
import './Content.css'
import ContentBody from './ContentBody'



const sampleData = [
    { id: 1, first_name: 'Aron', last_name: 'Paisley', gender: 'male' },
    { id: 2, first_name: 'Nerissa', last_name: 'Millhouse', gender: 'female' },
    { id: 3, first_name: 'Michael', last_name: 'Schank', gender: 'male' },
    { id: 4, first_name: 'Velma', last_name: 'Laiche', gender: 'female' }
  ];

  const availableModules = [
	{
		key: 'python',
		color: '#305b2d',
		'icon': 'fa-tree',
		modules: [
			{key: 'django'},
            {key: 'flask'},
            {key: 'django'},
            {key: 'flask'},
            {key: 'django'},
            {key: 'flask'},
            {key: 'django'},
            {key: 'flask'},
            {key: 'django'},
			{key: 'flask'},
        ]
	}, {
		key: 'web development ',
		color: '#066da0',
		'icon': 'fa-bus',
		modules: [
			{key: 'react'},
			{key: 'redux'},
            {key: 'material ui'},
            {key: 'react'},
			{key: 'redux'},
            {key: 'material ui'},
            {key: 'react'},
			{key: 'redux'},
            {key: 'material ui'},
            {key: 'react'},
        ]
	}, {
		key: 'cryptocurrency',
		color: '#772016',
		'icon': 'fa-bitcoin',
		modules: [
			{key: 'blockchain'},
			{key: 'bitcoin'},
            {key: 'ethirium'},
            {key: 'blockchain'},
			{key: 'bitcoin'},
            {key: 'ethirium'},
            {key: 'blockchain'},
			{key: 'bitcoin'},
            {key: 'ethirium'},
            {key: 'blockchain'},
		
        ]
	}, {
		key: 'python',
		color: '#305b2d',
		'icon': 'fa-tree',
		modules: [
			{key: 'django'},
            {key: 'flask'},
            {key: 'django'},
            {key: 'flask'},
            {key: 'django'},
            {key: 'flask'},
            {key: 'django'},
            {key: 'flask'},
            {key: 'django'},
			{key: 'flask'},
        ]
	}, {
		key: 'web development ',
		color: '#066da0',
		'icon': 'fa-bus',
		modules: [
			{key: 'react'},
			{key: 'redux'},
            {key: 'material ui'},
            {key: 'react'},
			{key: 'redux'},
            {key: 'material ui'},
            {key: 'react'},
			{key: 'redux'},
            {key: 'material ui'},
            {key: 'react'},
        ]
	}, {
		key: 'cryptocurrency',
		color: '#772016',
		'icon': 'fa-bitcoin',
		modules: [
			{key: 'blockchain'},
			{key: 'bitcoin'},
            {key: 'ethirium'},
            {key: 'blockchain'},
			{key: 'bitcoin'},
            {key: 'ethirium'},
            {key: 'blockchain'},
			{key: 'bitcoin'},
            {key: 'ethirium'},
            {key: 'blockchain'},
		
        ]
	}, {
		key: 'python',
		color: '#305b2d',
		'icon': 'fa-tree',
		modules: [
			{key: 'django'},
            {key: 'flask'},
            {key: 'django'},
            {key: 'flask'},
            {key: 'django'},
            {key: 'flask'},
            {key: 'django'},
            {key: 'flask'},
            {key: 'django'},
			{key: 'flask'},
        ]
	}, {
		key: 'web development ',
		color: '#066da0',
		'icon': 'fa-bus',
		modules: [
			{key: 'react'},
			{key: 'redux'},
            {key: 'material ui'},
            {key: 'react'},
			{key: 'redux'},
            {key: 'material ui'},
            {key: 'react'},
			{key: 'redux'},
            {key: 'material ui'},
            {key: 'react'},
        ]
	}, {
		key: 'cryptocurrency',
		color: '#772016',
		'icon': 'fa-bitcoin',
		modules: [
			{key: 'blockchain'},
			{key: 'bitcoin'},
            {key: 'ethirium'},
            {key: 'blockchain'},
			{key: 'bitcoin'},
            {key: 'ethirium'},
            {key: 'blockchain'},
			{key: 'bitcoin'},
            {key: 'ethirium'},
            {key: 'blockchain'},
		
        ]
	},  {
		key: 'python',
		color: '#305b2d',
		'icon': 'fa-tree',
		modules: [
			{key: 'django'},
            {key: 'flask'},
            {key: 'django'},
            {key: 'flask'},
            {key: 'django'},
            {key: 'flask'},
            {key: 'django'},
            {key: 'flask'},
            {key: 'django'},
			{key: 'flask'},
        ]
	},
]

export default class ContentComponent extends Component {

    constructor() {
        super();
        this.state = {
          selected: '',
          input:'',
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.customFilter = this.customFilter.bind(this);
      }
    
      // set selected value
      handleSelect(val) {
          console.log(val);
        this.setState({ selected: val });
      }

      handleInputChange=(e)=>{
          console.log('input cahnge ', e.target.value)
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
                availableModules={availableModules}
                />
                <ContentBody />
            </div>
        )
    }
}
