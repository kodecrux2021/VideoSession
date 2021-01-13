import React, { Component } from 'react'
import Select from 'react-select';
import './Help.css'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveIcon from '@material-ui/icons/Remove';
import { message } from 'antd';
import { url } from '../../Server/GlobalUrl';
import Navbar from '../../components/Header/Navbar';




export default class HelpForm3 extends Component {

    constructor() {
        super();
        this.state = {
          selected: [],
          recommended_selected: [],
          technology_list: [],
          subtech_list:[],
        };
        this.handleSelect = this.handleSelect.bind(this);
      }

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
            console.log('result',result)
            this.setState({technology_list: result })
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
        console.log('selected', selected)
        const index = selected.findIndex(
          (Item) => Item === val
        );
        if (index >= 0) {
          selected.splice(index, 1);
        }
        else {
          selected.push(val)
        }
        
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
                options={this.state.technology_list}
                isSearchable={true}        
                isMulti
                placeholder={'Search for anything'}
               
              />

         
                  </div>
              

            <span>Recommended technologies</span>
            <div className='HelpForm3__btn__ctr' >

{
  this.state.technology_list.slice(0,5).map((tech)=> (
    <button className={this.state.recommended_selected.includes(tech.id) && 'button__selected'} onClick={()=>this.handleRecommendedSelect(tech.id)} > {tech.name}  {!this.state.recommended_selected.includes(tech.id) ? <AddOutlinedIcon/> : <RemoveIcon className='remove_svg' />}</button>
  ))
}

                    {/* <button className={true && 'button__selected'} > JavaScript  {false && <AddOutlinedIcon/>}</button> */}
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
