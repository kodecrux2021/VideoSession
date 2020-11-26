import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import './style.css';

const Pagetwo = () => {
    return (
        <Container className="containers">
            <Row>
                <Col md="1"></Col>
                <Col style={{padding:"5px"}}>   
                    <form className="forms">
                        <Col style={{marginTop:"10px"}}>
                            <img style ={{marginLeft:"110px",width:"150px", height:"150px"}} src="kodecrux.jpeg" alt="KodeCrux"></img>
                        </Col>  
                        <Col style={{marginTop:"20px"}}>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Pin Code</label>
                                <input  type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your pin code" />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">State</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your state" />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">City</label>
                                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter your city" />
                            </div>

                            <div class="form-group">
                                <label for="exampleInputPassword1">School</label>
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Enter your school" />
                            </div>
                        </Col>
                            
                        <Col style={{marginTop:"40px"}}>
                            <button type="submit" class="btndesignk">Done</button><br />
                            <div className="actc">
                                <span style={{marginLeft:"50px"}}>By register I agree To</span><br/>
                                <span><strong style={{color:'tomato'}} >Term & Condition</strong> and <strong style={{color:'tomato'}} >Privacy policy</strong></span>
                            </div>
                        </Col>
                        
                        
                    </form>
                </Col>
                <Col md="2"></Col>
            </Row>
            <Row></Row>
        </Container>
    )
}

export default Pagetwo