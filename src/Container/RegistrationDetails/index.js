import React from 'react'
import { Col } from 'react-bootstrap'
import './style.css';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Select from 'react-select';
import { message } from 'antd';
import Navbar from '../../components/Header/Navbar';
import { url } from '../../Server/GlobalUrl'
import { DatePicker, Space } from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


  const experienceData = [
    { id: 2, name: '1 year', value: 1 },
    { id: 2, name: '2 years', value: 2 },
    { id: 4, name: '3 years', value: 3 },
    { id: 2, name: '4 years', value: 4 },
    { id: 2, name: '5 years', value: 5 },
    { id: 4, name: '5+ years', value: 6 },
  ];
  


class Pagetwo extends React.Component {

    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
        ],

        tech_list: [],
        subtech_list:[],
        technology: '',
        sub_technology: '',

        pincode : '',
        state : '',
        city : '',
        total_experience : null,
        relevant_experience : null,
        date_of_birth: null, 

      };

      
   onChange=(date, dateString) => {
    //console.log(date, dateString);
    this.setState({date_of_birth: date})
  }

      componentDidMount() {

        fetch(url + '/api/notification/', {
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
            this.setState({technology_list: result })
          }
      )
        
       // console.log('previous token',localStorage.getItem("token"));
        if (localStorage.getItem("token")){
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
               // console.log('result.access',result.access)
                localStorage.setItem('token',result.access)
                }
            }
            )   
    }


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
              this.setState({tech_list: result })
            }
        )




    }

    handelData  = (identity,data) =>{
       // console.log('identity',identity)
        //console.log('data',data)
        if (identity === 'pincode'){
            this.setState({'pincode' : data})
        }else if(identity === 'state'){
            this.setState({'state' : data})
        }else if(identity === 'city'){
            this.setState({'city' : data})
        }
        else if (identity === 'technology'){
          this.setState({'technology' : data, subtech_list : data.sub_technology})
      }
      else if (identity === 'sub_technology'){
          this.setState({'sub_technology' : data})
      }
      else if (identity === 'total_experience'){
        this.setState({'total_experience' : data})
    }
    else if (identity === 'relevant_experience'){
        this.setState({'relevant_experience' : data})
    }

    }

    onSubmit=async(e)=> {
        e.preventDefault();


        if (this.state.pincode === '' ||  this.state.city === '' || this.state.state === '' ) {
            if (this.state.pincode === ''){
                message.info('Please Fill Pincode');    
            }

            else if(this.state.city === ''){
				message.info('Please Fill City');
            }
            else if(this.state.state === ''){
				message.info('Please Fill State');
            }
        }
        else {
          let tech = []
          let sub_tech = []
  
          tech.push(parseInt(this.state.technology?.id))
          sub_tech.push(parseInt(this.state.sub_technology?.id))
            let data = {
                "pincode" : this.state.pincode,
                "city" : this.state.city,
                "state" : this.state.state,
                "technology": tech,
                "sub_technology": sub_tech,
                "total_experience" : this.state.total_experience?.value,
                "relevant_experience" : this.state.relevant_experience?.value,
                "date_of_birth": this.state.date_of_birth
            }
            
          // console.log('data_______________', data)
            let id = localStorage.getItem('user_id')
           await fetch( url + '/api/customusersecond/' + id + '/' , {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8',
    
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            //console.log("response", response)
            if (response['status'] === 201 || response['status'] === 200) {
                return response.json()
            } else if (response['status'] === 400) {
                    message.info('Something is wrong')
            }
        })
        .then((result) => {
        //  fetch( url + '/api/educator/' + id + '/' , {
        //     method: 'PUT',
        //     headers: {
        //         'Accept': 'application/json, text/plain',
        //         'Content-Type': 'application/json;charset=UTF-8',
    
        //     },
        //     body: JSON.stringify(data)
        // })
        // .then((response) => {
        //     console.log("response", response)
        //     if (response['status'] === 201 || response['status'] === 200) {
        //         return response.json()
        //     } else if (response['status'] === 400) {
        //             console.log('Something is wrong')
        //     }
        // })
        // .then((result) => {
        //     console.log('result', result);
        // })
            //console.log('result', result);
         })

        


            this.props.history.push("/verification");
        }

  
      }

      handleCancel = () => this.setState({ previewVisible: false });

      handlePreview = async file => {
         // console.log('file', file)
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
    
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
          previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
      };
    
      handleChange = ({ fileList }) => this.setState({ fileList });
    

    render() {
      const is_client = localStorage.getItem('is_client')
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        );
        return (

          <>
         <Navbar/>

<div className="registration__page__two">   
                <form className="registration__details__container">
                    <div className="registration__details__img" >
                        {/* <img src={icon} alt="KodeCrux"></img> */}
                        <>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
                    <span style={{color:'grey', fontWeight: '500'}} >Profile Picture </span>
                    </div>  
                    <Col style={{marginTop:"10px"}}>
                        <div class="form__group">
                            <label >Pin Code</label>
                            <input className="form__control"  value={this.state.pincode} onChange={(e) => this.handelData('pincode', e.target.value)} type="text"   placeholder="Enter Your Postal Code" />
                        </div>
                        <div class="form__group">
                            <label >State</label>
                            <input type="text"  value={this.state.state} onChange={(e) => this.handelData('state', e.target.value)} className="form__control"  placeholder="Enter Your State" />
                        </div>
                        <div class="form__group">
                            <label >City</label>
                            <input type="text"  value={this.state.city} onChange={(e) => this.handelData('city', e.target.value)} className="form__control"  placeholder="Enter Your City" />
                        </div>

                        {is_client==="true" ? null :
                       <div className='trainer__details__ctr' >
                       <div class="form__group">
                       <label >Technology</label>
                       <Select
               className="react-selectcomponent"
               classNamePrefix="name-select"
               onChange={(value) => this.handelData('technology',value)}
               getOptionLabel={option =>
                 `${option.name}`
               }
               getOptionValue={option => `${option}`}
               isOptionSelected={option => (
                   (this.state.technology === option.name) ? true : false
                 )}
               options={this.state.tech_list}
               isSearchable={true}
               openMenuOnClick={true}
               placeholder={'Choose Technology'}
             />
              </div>
 
             <div class="form__group">
             <label > Sub Technology</label>
               <Select
               className="react-selectcomponent"
               classNamePrefix="name-select"
               onChange={(value) => this.handelData('sub_technology',value)}
               getOptionLabel={option =>
                 `${option.name}`
               }
               getOptionValue={option => `${option}`}
               isOptionSelected={option => (
                   (this.state.sub_technology === option.name) ? true : false
                 )}
               options={this.state.subtech_list}
               isSearchable={true}
               openMenuOnClick={true}
               placeholder={'Choose Sub Technology'}
             />
             </div>
            
             <div class="form__group">
             <label >Total Experience</label>
             <Select
               className="react-selectcomponent"
               classNamePrefix="name-select"
               onChange={(value) => this.handelData('total_experience',value)}
               getOptionLabel={option =>
                 `${option.name}`
               }
               getOptionValue={option => `${option}`}
               isOptionSelected={option => (
                   (this.state.sub_technology === option.name) ? true : false
                 )}
               options={experienceData}
               isSearchable={true}
               openMenuOnClick={true}
               placeholder={'Years of Experince'}
             />
             </div>

             <div class="form__group">
             <label >Relevant Experience</label>
             <Select
               className="react-selectcomponent"
               classNamePrefix="name-select"
               onChange={(value) => this.handelData('relevant_experience',value)}
               getOptionLabel={option =>
                 `${option.name}`
               }
               getOptionValue={option => `${option}`}
               isOptionSelected={option => (
                   (this.state.sub_technology === option.name) ? true : false
                 )}
               options={experienceData}
               isSearchable={true}
               openMenuOnClick={true}
               placeholder={'Years of Experince'}
             />
             </div> 
                       </div>
                        
                      }


 





                        <div class="form__group">
                 <div style={{display: 'flex', alignItems:'center'}} >
                 <label>Date of Birth</label>
                 <div style={{margin: '0 60px'}} >
                 <DatePicker onChange={this.onChange} size='large' />
                 </div>
                 </div>

              </div>

                    </Col>
                        
                    <Col className="registration__details__footer">
                        <button type="submit" onClick={this.onSubmit}>Done</button>
                        <div >
                            <span >By register I agree To</span>
                            <span><a style={{color:'#30b3f0',cursor:'pointer'}} >Term & Condition</a> and <a style={{color:'#30b3f0',cursor:'pointer'}} >Privacy policy</a></span>
                        </div>
                    </Col>
                    
                    
                </form>
            </div>


          </>

 


               
 
          



);
    }


}

export default Pagetwo