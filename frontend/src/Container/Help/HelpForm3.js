import React, { Component } from 'react'
import Select from 'react-select';
import './Help.css'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';


const sampleData = [
    { id: 1, first_name: 'Blockchain' },
    { id: 2, first_name: 'Ruby' },
    { id: 3, first_name: 'Express' },
    { id: 4, first_name: 'Django' }
  ];


export default class HelpForm3 extends Component {

    constructor() {
        super();
        this.state = {
          selected: [],
          recommended_selected: [],
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.customFilter = this.customFilter.bind(this);
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


submitHandler=() => {
    
}

    render() {
        return (
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
                // defaultValue={[sampleData[2], sampleData[3]]}
                onChange={this.handleSelect}
                getOptionLabel={option =>
                  `${option.first_name}`
                }
                getOptionValue={option => `${option.first_name}`}
                name="colors"
                options={sampleData}
                isSearchable={true}
                // filterOption={this.customFilter}         
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
        )
    }
}
