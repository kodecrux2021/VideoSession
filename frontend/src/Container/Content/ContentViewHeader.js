import React from 'react'
import './Content.css'
import kodecrux from '../../assets/images/reg2.jpeg'
import { IconButton } from '@material-ui/core'
import Select from 'react-select';
import SearchIcon from '@material-ui/icons/Search';
import SelectSearch from 'react-select-search';
import Menu from './Menu'



export default function ContentViewHeader(props) {

   

    return (
        <div className='content'>
            <div className='content__header'>
             
                    <div className='content__header__left'>
                      
                        <img src={kodecrux} style={{height:'90px'}} />
        
                            <div className='left__search__container'>
                            <Menu availableModules={props.availableModules} />
                    
                            </div>
                          
                    </div>
                    <div className='content__header__right'>
                        <div className='right__search__container'>
                        <div style={{width: '55px'}}>
                    
                        <SearchIcon className='search__icon' />
                        
                    </div>
                    <div className='header__searchbar' >
                    <input placeholder='Search for anything' />
                    </div>
                   
                    {/* <Select
                className="react-selectcomponent"
                classNamePrefix="name-select"
                onChange={props.handleSelect}
                getOptionLabel={option =>
                  `${option.first_name} ${option.last_name}`
                }
                getOptionValue={option => `${option}`}
                isOptionSelected={option => (
                    (props.selected.id === option.id) ? true : false
                  )}
                options={props.sampleData}
                isSearchable={true}
                openMenuOnClick={false}
                filterOption={props.customFilter}
                // onInputChange={props.handleInputChange}
                
                noOptionsMessage={() => null}
                placeholder={'Search for anything'}
                autoFocus={true}
  
                // menuIsOpen={props.state.menuOpen}
              /> */}
                        {/* <SelectSearch search={true} options={options} value="" name="" placeholder="Choose Technology" /> */}
                        </div>   
                    </div>
            </div>
        </div>
    )
}
