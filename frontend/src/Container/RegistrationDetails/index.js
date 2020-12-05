import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import './style.css';
import icon from '../../assets/images/reg2.jpeg'

const Pagetwo = (props) => {
    return (
        <Container >
            <Row>
               
                <Col className="registration__page__two" style={{padding:"5px"}}>   
                    <form className="registration__details__container">
                        <Col className="registration__details__img" >
                            <img src={icon} alt="KodeCrux"></img>
                        </Col>  
                        <Col style={{marginTop:"20px"}}>
                            <div class="form__group">
                                <label >Pin Code</label>
                                <input className="form__control"  value={props.pincode} onChange={(e) => props.handelData('pincode', e.target.value)} type="text"   placeholder="Enter your pin code" />
                            </div>
                            <div class="form__group">
                                <label >State</label>
                                <input type="text"  value={props.state} onChange={(e) => props.handelData('state', e.target.value)} className="form__control"  placeholder="Enter your state" />
                            </div>
                            <div class="form__group">
                                <label >City</label>
                                <input type="text"  value={props.city} onChange={(e) => props.handelData('city', e.target.value)} className="form__control"  placeholder="Enter your city" />
                            </div>

                            <div class="form__group">
                                <label >School</label>
                                <input type="text"  value={props.school} onChange={(e) => props.handelData('school', e.target.value)} className="form__control"  placeholder="Enter your school" />
                            </div>
                        </Col>
                            
                        <Col className="registration__details__footer">
                            <button type="submit" onClick={props.onSubmit}>Done</button><br />
                            <div >
                                <span >By register I agree To</span>
                                <span><a style={{color:'#30b3f0',cursor:'pointer'}} >Term & Condition</a> and <a style={{color:'#30b3f0',cursor:'pointer'}} >Privacy policy</a></span>
                            </div>
                        </Col>
                        
                        
                    </form>
                </Col>
              
            </Row>
            <Row></Row>
        </Container>
    )
}

export default Pagetwo