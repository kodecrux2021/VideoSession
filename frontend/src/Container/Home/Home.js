import React, { Component } from 'react'

import Carousel from 'react-bootstrap/Carousel'  
import './Home.css'
import codeexp from '../../assets/images/codeexpert.jpeg'
import instruc from '../../assets/images/instructor.jpeg'
import freelan from '../../assets/images/codeexpert.jpeg'
import study from '../../assets/images/study.jpeg'
import home1 from '../../assets/images/home1.jpg'
import home2 from '../../assets/images/home2.jpg'
import home3 from '../../assets/images/home3.jpg'
import home4 from '../../assets/images/home4.jpg'
import home5 from '../../assets/images/home5.jpg'

export default class Home extends Component {
    render() {
        return (
        
        <div className="home_container">
      <Carousel controls={false} interval={10000} indicators={false} pause={false} fade={true}>
  <Carousel.Item >
    <img
      className="d-block w-100"
      src={home1}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item >
    <img
      className="d-block w-100"
      src={home2}
      alt="Second slide"
    />
  
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={home3}
      alt="Third slide"
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={home4}
      alt="Third slide"
    />

  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={home5}
      alt="Third slide"
    />

  </Carousel.Item>
</Carousel>

        <div className="cards__container">
            <div className="_card">
                <img src={codeexp} alt=""/>
                <h3>
                    Code Expert
                </h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                     , when an unknown printer took
                </p>
            </div>

            <div className="_card">
                <img src={instruc} alt=""/>
                <h3>
                   Instructor
                </h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                     , when an unknown printer took
                </p>
            </div>
            <div className="_card">
                <img src={freelan} alt=""/>
                <h3>
                    Freelancer
                </h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                     Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                     , when an unknown printer took
                </p>
            </div>

            </div>

            <div className="button__container">
                
                <div className="button__card">
                    <div className="button__card__img">
                        <img src={study} alt="" />
                    </div>
                    <div className= 'button__card__details'>
                        <h2>Study Room</h2>
                        <p>ndustry's standard dummy text ever since the 1500s
                            , when an unknown printer took</p>
                        <button style={{  backgroundColor:' #5964c9'}} >Study Room</button>
                    </div>
              
                </div>
                <div className="button__card">
                    <div className="button__card__img">
                        <img src={study} alt="" />
                    </div>
                    <div className= 'button__card__details'>
                        <h2>Soluton Room</h2>
                        <p>ndustry's standard dummy text ever since the 1500s
                            , when an unknown printer took</p>
                        <button style={{  backgroundColor:' #76d2fd'}}>Solution Room</button>
                    </div>
                </div>
            </div>
            
        
        <div className="_footer">
            <div className="footer__cards">
                <h3>ABOUT</h3>
                <span><a>About Us</a></span>
                <span><a>Contact Us</a></span>
                <span><a>Product and Services</a></span>
            </div>
            <div className="footer__cards">
                <h3>POLICY</h3>
                <span><a>Refund and return</a></span>
                <span><a>Shipping and Delivery Policy</a></span>
                <span><a>Price and Payment</a></span>
            </div>
            <div className="footer__cards">
                <h3>HELP</h3>
                <span><a>Private Policy</a></span>
                <span><a>Trems and Services</a></span>
                <span><a>Registration name of Business</a></span>
            </div>
        </div>
    </div>
     
        )
    }
}
