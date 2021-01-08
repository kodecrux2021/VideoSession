import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './EmployeeRegistration.css'
import rocket from '../../assets/images/rocket.png'
import Select from 'react-select';
import { Modal  } from 'antd';
import { useHistory } from 'react-router-dom';

export default function EmployeeRegistrationView(props) {
    const history = useHistory();


    return (
        <div className='employ__reg__wrapper'>
  <div className='employ__reg__container'>
            <div className='employ__reg__container__left'>
                <img src={rocket} />
                <div className='container__left__details'>
                    <h1>Welcome</h1>
                    <br/>
                    <p><strong>You are 20 seconds away from joining a wonderful community. Please Register and join.</strong></p>
                </div>
                {/* <button className='white__blue' onClick={props.showModal} >Login</button> */}
            </div>
            <div className='employ__reg__container__right'>
                {/* <Row className='d-flex justify-content-end p-3 '>
                    <div className='employ__toggle'>
                    <button onClick={props.toggleHandler} className={(props.togglebtn=='1')?'white__blue':'blue__white'} value='1'>Employee</button>
                    <button onClick={props.toggleHandler} className={(props.togglebtn=='2')?'white__blue':'blue__white'} value='2'>User</button>
                    </div>
                </Row> */}
                
                <h1>Register for a course</h1>
                <form className='p-3' >
                    <Row>
                        <Col>
                        <input type="text" value={props.first_name} className="form__control"  placeholder="Enter Your First Name" onChange={(e) => props.handelData('first_name', e.target.value)}  />
                        </Col>
                     
                        <Col>
                        <input type="text" className="form__control"  placeholder="Enter Your Last Name" value={props.last_name} onChange={(e) => props.handelData('last_name', e.target.value)}  />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                        <input type="email" className="form__control"  placeholder="Enter Your Email" value={props.email} onChange={(e) => props.handelData('email', e.target.value)}  />
                        </Col>
                        <Col>
                        <input type="text" className="form__control"  placeholder="Enter Your Phone Number" value={props.phone_no} onChange={(e) => props.handelData('phone_no', e.target.value)}  />
                        </Col>
                    </Row>
                    {/* <br/>
                    <Row>
                        <Col>
                        <input type="password" className="form__control"  placeholder="Enter Your password"  />
                        </Col>
                        <Col>
                        <input type="password" className="form__control"  placeholder="Confirm Your password"  />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                
                        <SelectSearch search={true} options={securityQn} value="" name="" placeholder="Select Security Question" />
                        </Col>
                        <Col>
                        <input type="text" className="form__control"  placeholder="Enter Your Security Answer"  />
                        </Col>
                    </Row> */}
                    <br/>
                    <Row>
                        <Col>
                        <Select
                className="react-selectcomponent"
                classNamePrefix="name-select"
                onChange={(value) => props.handelData('technology',value)}
                getOptionLabel={option =>
                  `${option.name}`
                }
                getOptionValue={option => `${option}`}
                isOptionSelected={option => (
                    (props.technology === option.name) ? true : false
                  )}
                options={props.tech_list}
                isSearchable={true}
                openMenuOnClick={true}
                placeholder={'Choose Technology'}
              />
                        </Col>
                        <Col>
                        <Select
                className="react-selectcomponent"
                classNamePrefix="name-select"
                onChange={(value) => props.handelData('sub_technology',value)}
                getOptionLabel={option =>
                  `${option.name}`
                }
                getOptionValue={option => `${option}`}
                isOptionSelected={option => (
                    (props.sub_technology === option.name) ? true : false
                  )}
                options={props.subtech_list}
                isSearchable={true}
                openMenuOnClick={true}
                placeholder={'Choose Sub Technology'}
              />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                        <Select
                className="react-selectcomponent"
                classNamePrefix="name-select"
                onChange={(value) => props.handelData('topic',value)}
                getOptionLabel={option =>
                  `${option.name}`
                }
                getOptionValue={option => `${option}`}
                isOptionSelected={option => (
                    (props.topic === option.name) ? true : false
                  )}
                options={props.topic_list}
                isSearchable={true}
                openMenuOnClick={true}
                placeholder={'Choose Technology'}
              />
                        </Col>
                        <Col></Col>
                    </Row>
                    <br/>
                    <Row className='textwrapper'>
<textarea className='employ__reg__textarea' placeholder='Enter Brief Summary' value={props.summary} onChange={(e) => props.handelData('summary', e.target.value)}  >

</textarea>
                    </Row>
                    
                    <br/>
                    {/* <Row className='p-3'>
                        <input style={{margin: ' 5px 10px'}} value='M' onClick={props.genderHandler} checked={props.gender === 'M'} type="checkbox" placeholder="Enter Your Name"  />
                        <label><strong>Male</strong></label>
                        <input style={{margin: ' 5px 10px'}} value='F' onClick={props.genderHandler} checked={props.gender === 'F'} type="checkbox" placeholder="Enter Your Name"  />
                        <label><strong>Female</strong></label>
                    </Row> */}
                     
                     <div className='employ__reg__footer'>  <button className='blue__white' type="submit" onClick={props.handleSubmit} >Register</button></div>
              
                </form>
            </div>

        </div>
        <Modal title="Select Option" footer={null} visible={props.isModalVisible}  onCancel={props.handleCancel}>
            <div className='reg__modal__button' >
            <button onClick={()=>history.push('/trainers/message')} style={{  backgroundColor:' #5964c9'}} type="primary" size='large' >Reference Link</button>
            <button onClick={()=>history.push('/trainers/live')} style={{  backgroundColor:' #76d2fd'}} type="primary" size='large' >Live Session</button>
            </div>


      </Modal>
        </div>
      
    )
}
