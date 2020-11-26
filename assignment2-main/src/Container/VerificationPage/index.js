import React from 'react'
import { Container,Row,Col,Navbar } from 'react-bootstrap'
import Header from '../../components/Header';
import Pagetwo from '../Pagetwo';
import './style.css';

const VerifyPage = () => {
    return (
        <>
            <Header />
            <Container className="containers">
                <Row></Row>
                <Row>
                    <Col md="1"></Col>
                    <Col style={{padding:"5px"}}>   
                        <form className="forms" onSubmit="/next">
                            <Col>
                                <img src="img.jpeg" alt="no img"></img>
                            </Col>
                            <Col>
                                <div class="form-group"  style={{marginTop:'20px'}}>
                                    <div className="sentf">Please type the verication code sent</div><br />
                                    <span className="sents">to your mobile number</span>
                                </div>
                                <div class="form-group" style={{marginBottom:'50px'}}>
                                    <input type="email" 
                                        style={{marginLeft:"150px",border:"transparent",color:"tomato", fontSize:"18px"}} 
                                        class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter One Time password" />
                                </div>
                            </Col>
                            <Col>
                                <div className="actc">Didn't Receive OTP? <strong style={{color:'tomato'}} >Resend Code</strong></div>
                            </Col>
                            <Col>
                                <button type="submit" class="btndesign">Verify</button><br />
                            </Col>
                            
                        </form>
                    </Col>
                    <Col md="2"></Col>
                </Row>
                <Row></Row>
            </Container>
        </>
    )
}

export default VerifyPage