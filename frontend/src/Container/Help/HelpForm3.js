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


submitHandler=async(e) => {

  e.preventDefault();

  if(this.state.selected.length !== null && this.state.selected.length > 0){
    message.info('Submitted Successfully!!!');   
    // console.log(this.state.recommended_selected);
    console.log('state', this.state);
    
    let auth = localStorage.getItem('token')

    let tech = []
    let sub_tech = []
    //let topic = []
    console.log(this.state.selected[0].id);
    console.log(this.state.recommended_selected);
    tech.push(parseInt(this.state.selected[0].id))
    sub_tech.push(parseInt(this.state.recommended_selected))
    //topic.push(parseInt(this.state.subtech_list[0].id))
    let data = {
        "technology": tech,
        "sub_technology": sub_tech,
        //"topic": topic,
    }

    console.log('data_______________', data);
    //let auth = localStorage.getItem('token');
    let id = localStorage.getItem('user_id');
  //  await fetch(url + '/api/customusersecond/'+ id + '/', {
  //     method:'PUT',
  //     headers: {
  //        'Accept': 'application/json',
  //      'Content-Type': 'application/json',
  //      'Authorization': 'Bearer ' + auth,
  //    },
  //    body: JSON.stringify(data)
  // })
  // .then(res => res.json())
  //     .then(
  //         (result) => {
  //           console.log('result',result);
  //           this.props.history.push('/trainers/message');
  //         }
  //     )

  this.props.history.push('/trainers/message');
      }


else{
message.info('Please select a technology')
}
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

            {this.state.selected !== null  && this.state.selected.map( t =>(
                t.sub_technology.map( s =>(
                  <button className={this.state.recommended_selected.includes(s.id) && 'button__selected'} key = {s.name} onClick={()=>this.handleRecommendedSelect(s.id)}>
                    {s.name}
                    {!this.state.recommended_selected.includes(s.id) ? <AddOutlinedIcon/> : <RemoveIcon className='remove_svg' />}</button>
                  
                ))
              
              
              )
    )}
{/* 
{
  this.state.technology_list.slice(0,5).map((tech)=> (
    <button className={this.state.recommended_selected.includes(tech.id) && 'button__selected'} onClick={()=>this.handleRecommendedSelect(tech.id)} > {tech.name}  {!this.state.recommended_selected.includes(tech.id) ? <AddOutlinedIcon/> : <RemoveIcon className='remove_svg' />}</button>
  ))
} */}

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
