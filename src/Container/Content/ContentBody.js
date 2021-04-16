import React from 'react'
import './Content.css'
import home3 from '../../assets/images/home4.jpg'
import TechDetail from './TechDetail'
import TopCategories from './TopCategories'
import Instructor from './Instructor'




export default function ContentBody() {
    return (
        
             <div className='content__body'>  
                <div className='content__body__container'>
                <img className='content__banner' src={home3} />
                <TechDetail/>
                <TopCategories/>
             
                <Instructor />
                
                </div>       
               
            </div>
        
    )
}
