import React from 'react'
import './Content.css'
import ReactPlayer from 'react-player'

export default function Instructor() {
    return (
        <div>
                 <div className='instructor'>
            <div className='instructor__warpper'>
            <div className='instructor__left'>
                <img src='https://s.udemycdn.com/home/non-student-cta/udlite-lohp-promo-teacher.jpg' alt='instructor' />
            </div>
            <div className='instructor__right'>
                <div className='instructor__detail'>
                    <span>Become an instructor</span>
                    <p>Top instructors from around the world 
                        teach millions of students on Udemy.
                         We provide the tools and skills to teach what you love.</p>
                    <button>Start teaching today</button>
                </div>
            </div>
            </div>
        </div>
    
        <div className='instructor'>
            <div className='instructor__warpper'>
            <div className='instructor__left__video'>
            <ReactPlayer
            width='300px'
            height='240px'
             url='https://youtu.be/QFIhEmOd6No'
             controls
            //  config={{ youtube: { playerVars: { disablekb: 1 } } }}
             />
            </div>
            <div className='instructor__right__video'>
                <div className='instructor__detail__video'>
                    <span>Transform your life through education</span>
                    <p>Mohamad Alaloush launched a new career in software development by taking courses on Udemy. What will you be able to do?</p>
            
                </div>
            </div>
            </div>
            
        </div>
        </div>
   
    )
}
