import React, { Component } from 'react'
import Select from 'react-select';
import './Help.css'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { message } from 'antd';
import { url } from '../../Server/GlobalUrl';
import Navbar from '../../components/Header/Navbar';




export default class HelpForm3 extends Component {

    constructor() {
        super();
        this.state = {
          selected: [],
          recommended_selected: [],
          topic_list: [],
        };
        this.handleSelect = this.handleSelect.bind(this);
      }

      componentDidMount() {

        fetch(url + '/api/topic/', {
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
            this.setState({topic_list: result })
          }
      )

      }
    
      // set selected value
      handleSelect(val) {
          console.log(val);
        this.setState({ selected: val });
      }

      handleRecommendedSelect(val) {
        console.log(val);
        let selected = [...this.state.recommended_selected]
        selected.push(val)
      this.setState({ recommended_selected: selected });
    }


submitHandler=() => {
  message.info('Submitted Successfully!!!');   
  console.log('state', this.state)
    this.props.history.push('/home')
}

    render() {
        return (
          <>
          <Navbar/>
          <div className='help__form__container'>
            <div className='HelpForm1'>
                <div className='HelpForm2__header'>
                <p>Technologies you need help with</p>
                </div>

                <div className='HelpForm_3_body'>
                  <span>Add 2-6 technologies</span>
                  <div className='HelpForm2__select__container' >
                  <Select
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.handleSelect}
                getOptionLabel={option =>
                  `${option.name}`
                }
                getOptionValue={option => `${option.id}`}
                name="colors"
                options={this.state.topic_list}
                isSearchable={true}        
                isMulti
                placeholder={'Search for anything'}
               
              />

         
                  </div>
              

            <span>Recommended technologies</span>
            <div className='HelpForm3__btn__ctr' >
                    <button className={true && 'button__selected'} > JavaScript  {false && <AddOutlinedIcon/>}</button>
                    <button> React JS  <AddOutlinedIcon/></button>
                    <button> Python  <AddOutlinedIcon/></button>
                    <button> C++  <AddOutlinedIcon/></button>
                    <button> React Native <AddOutlinedIcon/></button>
                    <button> Bootstrap  <AddOutlinedIcon/></button>
                    <button className={true && 'button__selected'} > Futter  {false && <AddOutlinedIcon/>}</button>
                    <button> Java  <AddOutlinedIcon/></button>
            </div>


                </div>



                <div className='HelpForm2__footer'>          
                <button className='help__next__btn' style={{marginTop:'50px'}} onClick={this.submitHandler}> Submit </button>
                </div>
            </div>
            </div>
          </>
          
        )
    }
}
