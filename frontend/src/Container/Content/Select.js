import React, {Component} from 'react'
import Select from 'react-select';

const sampleData = [
  { id: 1, first_name: 'Aron', last_name: 'Paisley', gender: 'male' },
  { id: 2, first_name: 'Nerissa', last_name: 'Millhouse', gender: 'female' },
  { id: 3, first_name: 'Michael', last_name: 'Schank', gender: 'male' },
  { id: 4, first_name: 'Velma', last_name: 'Laiche', gender: 'female' }
];
class SampleReactSelect extends Component {
  constructor() {
    super();
    this.state = {
      selected: ''
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.customFilter = this.customFilter.bind(this);
  }

  // set selected value
  handleSelect(val) {
    this.setState({ selected: val });
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
    
              <Select
                className="react-selectcomponent"
                classNamePrefix="name-select"
                onChange={this.handleSelect}
                getOptionLabel={option =>
                  `${option.first_name} ${option.last_name}`
                }
                getOptionValue={option => `${option}`}
                isOptionSelected={option => (
                    (this.state.selected.id === option.id) ? true : false
                  )}
                options={sampleData}
                isSearchable={true}
                // openMenuOnClick={false}
                filterOption={this.customFilter}
                onInputChange={this.handleInputChange}
                noOptionsMessage={() => null}
                placeholder={'Enter Name'}
                autoFocus={true}
                // menuIsOpen={this.state.menuOpen}
              />
         

       
    );
  }
}

export default SampleReactSelect;