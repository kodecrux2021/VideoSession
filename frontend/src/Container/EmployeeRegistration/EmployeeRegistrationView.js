import React from 'react'
import { Col, Row } from 'react-bootstrap'
import './EmployeeRegistration.css'
import SelectSearch from 'react-select-search';
import rocket from '../../assets/images/rocket.png'

export default function EmployeeRegistrationView(props) {

    const options = [
        {name: 'Swedish', value: 'sv'},
        {name: 'English', value: 'en'},
        {name: 'Swedish', value: 'sv'},
        {name: 'English', value: 'en'},
    ];

    const securityQn = [
        {name: 'Favourate Book', value: '1'},
        {name: 'Favourate Movie', value: '2'},
        {name: 'Favourate Song', value: '3'},
    ];

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
                <button className='white__blue'>Login</button>
            </div>
            <div className='employ__reg__container__right'>
                {/* <Row className='d-flex justify-content-end p-3 '>
                    <div className='employ__toggle'>
                    <button onClick={props.toggleHandler} className={(props.togglebtn=='1')?'white__blue':'blue__white'} value='1'>Employee</button>
                    <button onClick={props.toggleHandler} className={(props.togglebtn=='2')?'white__blue':'blue__white'} value='2'>User</button>
                    </div>
                </Row> */}
                
                <h1>Apply as a Employee</h1>
                <form className='p-5' >
                    <Row>
                        <Col>
                        <input type="text" className="form__control"  placeholder="Enter Your FIrst Name"  />
                        </Col>
                     
                        <Col>
                        <input type="text" className="form__control"  placeholder="Enter Your Last Name"  />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                        <input type="email" className="form__control"  placeholder="Enter Your Email"  />
                        </Col>
                        <Col>
                        <input type="text" className="form__control"  placeholder="Enter Your Phone Number"  />
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
                        <SelectSearch search={true} options={options} value="" name="" placeholder="Choose Technology" />
                        </Col>
                        <Col>
                        <SelectSearch search={true} options={options} value="" name="" placeholder="Choose Sub-Technology" />
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                        <SelectSearch search={true} options={options} value="" name="" placeholder="Choose Topic To Learn" />
                        </Col>
                        <Col></Col>
                    </Row>
                    <br/>
                    <Row className='textwrapper'>
<textarea className='employ__reg__textarea' placeholder='Enter Brief Summary'>

</textarea>
                    </Row>
                    
                    <br/>
                    {/* <Row className='p-3'>
                        <input style={{margin: ' 5px 10px'}} value='M' onClick={props.genderHandler} checked={props.gender === 'M'} type="checkbox" placeholder="Enter Your Name"  />
                        <label><strong>Male</strong></label>
                        <input style={{margin: ' 5px 10px'}} value='F' onClick={props.genderHandler} checked={props.gender === 'F'} type="checkbox" placeholder="Enter Your Name"  />
                        <label><strong>Female</strong></label>
                    </Row> */}
                     
                     <div className='employ__reg__footer'>  <button className='blue__white' type="submit" >Register</button></div>
              
                </form>
            </div>

        </div>
        </div>
      
    )
}
