import React from 'react'
import './Content.css'
import avatar from '../../assets/images/avatar2.jpeg'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ReactStars from "react-rating-stars-component";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


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
            left:'0',
            top: '80px',
            color:"blue",
            backgroundColor:'#fff',
            width: '70px',
            height: '70px',
            borderRadius: '100px',
            boxShadow:' 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)',
            display:'grid',
            placeItems:'center',
            cursor:'pointer',
          }}
          
        >
            <ChevronLeftIcon className='chevron__arrow'/>
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
          right:'0',
          top: '80px',
          color:"blue",
          backgroundColor:'#fff',
          width: '70px',
          height: '70px',
          borderRadius: '100px',
          boxShadow:' 0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)',
          display:'grid',
          placeItems:'center',
          cursor:'pointer',
        }}
        
      >
          <ChevronRightIcon className='chevron__arrow' />
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
                    <h3>Expand your carrer opprtunities with python</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer</p>
                    <span>Explore Python <ChevronRightIcon/></span>
                </div>
                <div className='techdetail__description__right'>
                    <img src={avatar} alt="pythonimg" />
                </div>
            </div>
            <div className='techdetail__cards'>   
                <Carousel
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
                swipeable={false}
                draggable={false}
                showDots={false}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
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
                    <h4>Python Bootcamp</h4>
                    <span style={{fontSize:'18px',color:'gray'}}>jose Poetilla</span>
                    <span className='techdetail__rating'>
                        <span style={{fontSize:'20px', fontWeight:'bold', color:'#be5a0e', marginRight:'5px'}}>2.5</span>
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
                    <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} >(332,508)</span>
                    </span>
                    
                    <span style={{fontSize:'22px', fontWeight:'bold'}} >$100</span>
                    {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    
                </div>

                <div className='techdetail__card'>
                    <img src='https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?jPbjZH3aSsBauYmrGIMM8zjqiOgBGXcP-IYI8J7WplnWvbBgkynF8ul-TL72-eGftOtomEQuZP3AQxEo26UG2SwNat0BPsfmbat4kPzwOnX3Xozx2Jt5qBYiC2ud' alt='techdetailcard' />
                    <h4>Python Bootcamp 2</h4>
                    <span style={{fontSize:'18px',color:'gray'}}>jose Poetilla</span>
                    <span className='techdetail__rating'>
                        <span style={{fontSize:'20px', fontWeight:'bold', color:'#be5a0e', marginRight:'5px'}}>2.5</span>
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
                    <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} >(332,508)</span>
                    </span>
                    
                    <span style={{fontSize:'22px', fontWeight:'bold'}} >$100</span>
                    {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    
                </div>

                <div className='techdetail__card'>
                    <img src='https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?jPbjZH3aSsBauYmrGIMM8zjqiOgBGXcP-IYI8J7WplnWvbBgkynF8ul-TL72-eGftOtomEQuZP3AQxEo26UG2SwNat0BPsfmbat4kPzwOnX3Xozx2Jt5qBYiC2ud' alt='techdetailcard' />
                    <h4>Python Bootcamp 3</h4>
                    <span style={{fontSize:'18px',color:'gray'}}>jose Poetilla</span>
                    <span className='techdetail__rating'>
                        <span style={{fontSize:'20px', fontWeight:'bold', color:'#be5a0e', marginRight:'5px'}}>2.5</span>
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
                    <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} >(332,508)</span>
                    </span>
                    
                    <span style={{fontSize:'22px', fontWeight:'bold'}} >$100</span>
                    {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    
                </div>

                <div className='techdetail__card'>
                    <img src='https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?jPbjZH3aSsBauYmrGIMM8zjqiOgBGXcP-IYI8J7WplnWvbBgkynF8ul-TL72-eGftOtomEQuZP3AQxEo26UG2SwNat0BPsfmbat4kPzwOnX3Xozx2Jt5qBYiC2ud' alt='techdetailcard' />
                    <h4>Python Bootcamp 4</h4>
                    <span style={{fontSize:'18px',color:'gray'}}>jose Poetilla</span>
                    <span className='techdetail__rating'>
                        <span style={{fontSize:'20px', fontWeight:'bold', color:'#be5a0e', marginRight:'5px'}}>2.5</span>
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
                    <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} >(332,508)</span>
                    </span>
                    
                    <span style={{fontSize:'22px', fontWeight:'bold'}} >$100</span>
                    {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    
                </div>

                <div className='techdetail__card'>
                    <img src='https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?jPbjZH3aSsBauYmrGIMM8zjqiOgBGXcP-IYI8J7WplnWvbBgkynF8ul-TL72-eGftOtomEQuZP3AQxEo26UG2SwNat0BPsfmbat4kPzwOnX3Xozx2Jt5qBYiC2ud' alt='techdetailcard' />
                    <h4>Python Bootcamp 5</h4>
                    <span style={{fontSize:'18px',color:'gray'}}>jose Poetilla</span>
                    <span className='techdetail__rating'>
                        <span style={{fontSize:'20px', fontWeight:'bold', color:'#be5a0e', marginRight:'5px'}}>2.5</span>
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
                    <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} >(332,508)</span>
                    </span>
                    
                    <span style={{fontSize:'22px', fontWeight:'bold'}} >$100</span>
                    {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    
                </div>

                <div className='techdetail__card'>
                    <img src='https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?jPbjZH3aSsBauYmrGIMM8zjqiOgBGXcP-IYI8J7WplnWvbBgkynF8ul-TL72-eGftOtomEQuZP3AQxEo26UG2SwNat0BPsfmbat4kPzwOnX3Xozx2Jt5qBYiC2ud' alt='techdetailcard' />
                    <h4>Python Bootcamp 6</h4>
                    <span style={{fontSize:'18px',color:'gray'}}>jose Poetilla</span>
                    <span className='techdetail__rating'>
                        <span style={{fontSize:'20px', fontWeight:'bold', color:'#be5a0e', marginRight:'5px'}}>2.5</span>
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
                    <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} >(332,508)</span>
                    </span>
                    
                    <span style={{fontSize:'22px', fontWeight:'bold'}} >$100</span>
                    {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    
                </div>

                <div className='techdetail__card'>
                    <img src='https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?jPbjZH3aSsBauYmrGIMM8zjqiOgBGXcP-IYI8J7WplnWvbBgkynF8ul-TL72-eGftOtomEQuZP3AQxEo26UG2SwNat0BPsfmbat4kPzwOnX3Xozx2Jt5qBYiC2ud' alt='techdetailcard' />
                    <h4>Python Bootcamp 7</h4>
                    <span style={{fontSize:'18px',color:'gray'}}>jose Poetilla</span>
                    <span className='techdetail__rating'>
                        <span style={{fontSize:'20px', fontWeight:'bold', color:'#be5a0e', marginRight:'5px'}}>2.5</span>
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
                    <span style={{fontSize:'17px',color:'gray', marginLeft:'5px'}} >(332,508)</span>
                    </span>
                    
                    <span style={{fontSize:'22px', fontWeight:'bold'}} >$100</span>
                    {true? <span className='techdetail__bestseller'>Bestseller</span>:false}
                    
                </div>
              
                </Carousel>;
                


            </div>
        </div>
    )
}
