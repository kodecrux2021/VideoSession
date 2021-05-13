import React from 'react'
import './Content.css'
import avatar from '../../assets/images/avatar2.jpeg'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ReactStars from "react-rating-stars-component";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Card } from '@material-ui/core';


const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    return (
        <div
        onClick={()=>onClick()}
          style={{
            textAlign: "center",
            position: "absolute",
            margin:10,
            left:'0',
            top: '120px',
            color:"blue",
            backgroundColor:'#fff',
            width: '30px',
            height: '30px',
            borderRadius: '100px',
            boxShadow:' 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)',
            display:'grid',
            placeItems:'center',
            cursor:'pointer',
          }}
          
        >
            <ChevronLeftIcon style={{fontSize:15}} className='chevron__arrow'/>
        </div>
      )
};

  const CustomRightArrow = ({ onClick, ...rest }) => {
    return (
      <div
      onClick={()=>onClick()}
        style={{
          textAlign: "center",
          position: "absolute",
          margin:10,
          right:'0',
          top: '120px',
          color:"blue",
          backgroundColor:'#fff',
          width: '30px',
          height: '30px',
          borderRadius: '100px',
          boxShadow:' 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)',
          display:'grid',
          placeItems:'center',
          cursor:'pointer',
        }}
        
      >
          <ChevronRightIcon style={{fontSize:15}} className='chevron__arrow' />
      </div>
    )
  };

export default function TechDetail(props) {
    return (
        <div className='techdetail'>
            <div className='techdetail__select__container'>
                <button className={true?'techdetail__select__button__active':'techdetail__select__button__notactive'} >Python</button>
                <button className={false?'techdetail__select__button__active':'techdetail__select__button__notactive'} >Excel</button>
                <button className={false?'techdetail__select__button__active':'techdetail__select__button__notactive'}>Web Devolopment</button>
            </div>
            <div className='techdetail__description'>
                <div className='techdetail__description__left'>
                    <h3 style={{color:'white', fontSize:28, fontWeight:'bold'}}>Expand your carrer opprtunities with python</h3>
                    <p style={{fontSize:15, paddingLeft:55}}>Python is a truly wonderful language. When somebody comes up with a good idea it takes about 1 minute and five lines to
                        program something that almost does what you want. Then it takes only an hour to extend the script to 300 lines, after which
                        it still does almost what you want.</p>
                    
                </div>
                <div className='techdetail__description__right'>
                    <img style={{width:146, height:146}} src={avatar} alt="pythonimg" />
                </div>
            </div>
            <div style={{margin:10, marginTop:20}}>Explore Python <ChevronRightIcon/></div>

            <div className='techdetail__cards'>   
                <Carousel
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
                swipeable={true}
                draggable={true}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                autoPlay={false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType='desktop'
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                >
                <div className='techdetail__card'>
                    <img src='https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?jPbjZH3aSsBauYmrGIMM8zjqiOgBGXcP-IYI8J7WplnWvbBgkynF8ul-TL72-eGftOtomEQuZP3AQxEo26UG2SwNat0BPsfmbat4kPzwOnX3Xozx2Jt5qBYiC2ud' alt='techdetailcard' />
                    <h4 style={{textAlign:'left', width:"100%", fontSize:18, fontWeight:500 }}>Python Bootcamp</h4>
                    <span style={{fontSize:14, fontWeight:'normal',color:'gray', width:'100%'}}>Jose Poetilla</span>
                    <div className='techdetail__rating'>
                        <ReactStars
                            count={5}
                            value={2.5}
                            size={24}
                            activeColor="#ffd700"
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                        />
                        <span style={{fontSize:12, fontWeight:'normal', color:'black',}}>2.5 (332,508 Reviews)</span>
                        {/* <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} ></span> */}
                    </div>
                    <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                        <span style={{fontSize:16, fontWeight:500, width:'100%'}} >$100</span>
                        {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    </div>
                </div>

                <div className='techdetail__card'>
                    <img src='https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?jPbjZH3aSsBauYmrGIMM8zjqiOgBGXcP-IYI8J7WplnWvbBgkynF8ul-TL72-eGftOtomEQuZP3AQxEo26UG2SwNat0BPsfmbat4kPzwOnX3Xozx2Jt5qBYiC2ud' alt='techdetailcard' />
                    <h4 style={{textAlign:'left', width:"100%", fontSize:18, fontWeight:500 }}>Python Bootcamp</h4>
                    <span style={{fontSize:14, fontWeight:'normal',color:'gray', width:'100%'}}>Jose Poetilla</span>
                    <div className='techdetail__rating'>
                        <ReactStars
                            count={5}
                            value={2.5}
                            size={24}
                            activeColor="#ffd700"
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                        />
                        <span style={{fontSize:12, fontWeight:'normal', color:'black',}}>2.5 (332,508 Reviews)</span>
                        {/* <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} ></span> */}
                    </div>
                    <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                        <span style={{fontSize:16, fontWeight:500, width:'100%'}} >$100</span>
                        {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    </div>
                </div>

                <div className='techdetail__card'>
                    <img src='https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?jPbjZH3aSsBauYmrGIMM8zjqiOgBGXcP-IYI8J7WplnWvbBgkynF8ul-TL72-eGftOtomEQuZP3AQxEo26UG2SwNat0BPsfmbat4kPzwOnX3Xozx2Jt5qBYiC2ud' alt='techdetailcard' />
                    <h4 style={{textAlign:'left', width:"100%", fontSize:18, fontWeight:500 }}>Python Bootcamp</h4>
                    <span style={{fontSize:14, fontWeight:'normal',color:'gray', width:'100%'}}>Jose Poetilla</span>
                    <div className='techdetail__rating'>
                        <ReactStars
                            count={5}
                            value={2.5}
                            size={24}
                            activeColor="#ffd700"
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                        />
                        <span style={{fontSize:12, fontWeight:'normal', color:'black',}}>2.5 (332,508 Reviews)</span>
                        {/* <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} ></span> */}
                    </div>
                    <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                        <span style={{fontSize:16, fontWeight:500, width:'100%'}} >$100</span>
                        {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    </div>
                </div>

                <div className='techdetail__card'>
                    <img src='https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?jPbjZH3aSsBauYmrGIMM8zjqiOgBGXcP-IYI8J7WplnWvbBgkynF8ul-TL72-eGftOtomEQuZP3AQxEo26UG2SwNat0BPsfmbat4kPzwOnX3Xozx2Jt5qBYiC2ud' alt='techdetailcard' />
                    <h4 style={{textAlign:'left', width:"100%", fontSize:18, fontWeight:500 }}>Python Bootcamp</h4>
                    <span style={{fontSize:14, fontWeight:'normal',color:'gray', width:'100%'}}>Jose Poetilla</span>
                    <div className='techdetail__rating'>
                        <ReactStars
                            count={5}
                            value={2.5}
                            size={24}
                            activeColor="#ffd700"
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                        />
                        <span style={{fontSize:12, fontWeight:'normal', color:'black',}}>2.5 (332,508 Reviews)</span>
                        {/* <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} ></span> */}
                    </div>
                    <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                        <span style={{fontSize:16, fontWeight:500, width:'100%'}} >$100</span>
                        {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    </div>
                </div>

                <div className='techdetail__card'>
                    <img src='https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?jPbjZH3aSsBauYmrGIMM8zjqiOgBGXcP-IYI8J7WplnWvbBgkynF8ul-TL72-eGftOtomEQuZP3AQxEo26UG2SwNat0BPsfmbat4kPzwOnX3Xozx2Jt5qBYiC2ud' alt='techdetailcard' />
                    <h4 style={{textAlign:'left', width:"100%", fontSize:18, fontWeight:500 }}>Python Bootcamp</h4>
                    <span style={{fontSize:14, fontWeight:'normal',color:'gray', width:'100%'}}>Jose Poetilla</span>
                    <div className='techdetail__rating'>
                        <ReactStars
                            count={5}
                            value={2.5}
                            size={24}
                            activeColor="#ffd700"
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                        />
                        <span style={{fontSize:12, fontWeight:'normal', color:'black',}}>2.5 (332,508 Reviews)</span>
                        {/* <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} ></span> */}
                    </div>
                    <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                        <span style={{fontSize:16, fontWeight:500, width:'100%'}} >$100</span>
                        {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    </div>
                </div>

                <div className='techdetail__card'>
                    <img src='https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?jPbjZH3aSsBauYmrGIMM8zjqiOgBGXcP-IYI8J7WplnWvbBgkynF8ul-TL72-eGftOtomEQuZP3AQxEo26UG2SwNat0BPsfmbat4kPzwOnX3Xozx2Jt5qBYiC2ud' alt='techdetailcard' />
                    <h4 style={{textAlign:'left', width:"100%", fontSize:18, fontWeight:500 }}>Python Bootcamp</h4>
                    <span style={{fontSize:14, fontWeight:'normal',color:'gray', width:'100%'}}>Jose Poetilla</span>
                    <div className='techdetail__rating'>
                        <ReactStars
                            count={5}
                            value={2.5}
                            size={24}
                            activeColor="#ffd700"
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                        />
                        <span style={{fontSize:12, fontWeight:'normal', color:'black',}}>2.5 (332,508 Reviews)</span>
                        {/* <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} ></span> */}
                    </div>
                    <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                        <span style={{fontSize:16, fontWeight:500, width:'100%'}} >$100</span>
                        {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    </div>
                </div>

                <div className='techdetail__card'>
                    <img src='https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?jPbjZH3aSsBauYmrGIMM8zjqiOgBGXcP-IYI8J7WplnWvbBgkynF8ul-TL72-eGftOtomEQuZP3AQxEo26UG2SwNat0BPsfmbat4kPzwOnX3Xozx2Jt5qBYiC2ud' alt='techdetailcard' />
                    <h4 style={{textAlign:'left', width:"100%", fontSize:18, fontWeight:500 }}>Python Bootcamp</h4>
                    <span style={{fontSize:14, fontWeight:'normal',color:'gray', width:'100%'}}>Jose Poetilla</span>
                    <div className='techdetail__rating'>
                        <ReactStars
                            count={5}
                            value={2.5}
                            size={24}
                            activeColor="#ffd700"
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                        />
                        <span style={{fontSize:12, fontWeight:'normal', color:'black',}}>2.5 (332,508 Reviews)</span>
                        {/* <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} ></span> */}
                    </div>
                    <div style={{width:'100%', display:'flex', justifyContent:'space-between'}}>
                        <span style={{fontSize:16, fontWeight:500, width:'100%'}} >$100</span>
                        {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    </div>
                </div>
              
                </Carousel>
                


            </div>
        </div>
    )
}
