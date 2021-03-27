import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Timer.css'

const Timer = () => {
    let [currentSec, setCurrentSec] = useState(0);
    let [currentMin, setCurrentMin] = useState(0);
    let [currentHr, setCurrentHr] = useState(0);
    let [playing, setPlaying] = useState(false)
    // console.log('sdfgh', !playing.toString());
    let watch = useRef(null);

    const start = ()=>{
        if(!playing){
            
            setPlaying(true)
             watch.current = setInterval(() => {
                
                setCurrentSec(prevCurrentSec => prevCurrentSec+1)
                
                if(currentSec >= 60 ){
                    setCurrentSec(0)
                    setCurrentMin(prevCurrentMin => prevCurrentMin+1)
                }
                if(currentMin >= 60){
                    setCurrentMin(0)
                    setCurrentHr(prevCurrentHr => prevCurrentHr+1)
                }
                 console.log(currentHr, currentMin, currentSec)
            }, 1000)
        }
    } 

    // const pace = () =>{
    //     // setCurrentSec(currentSec+1)
    //     setCurrentSec(currentSec+1); 
    //     if(currentSec >= 60 ){
    //         setCurrentMin(currentMin+1)
    //     }
    //     if(currentMin >= 60){
    //         setCurrentHr(currentHr+1)
    //     }
    //     console.log(currentHr, currentMin, currentSec);
    // }

    const pause = () =>{
        clearInterval(watch.current)
        setPlaying(false)
    }

    const end = () =>{
        setCurrentHr(0)
        setCurrentMin(0)
        setCurrentSec(0)
        setPlaying(false)
        clearInterval(watch.current)
    }

    const format = (val) =>{
        if(val.toString().length < 2){
            return '0'+val
        }
        return val
    }
    return(
        <div className="timeWrapper">
            <h1>Session Timer</h1>
            <div className = "time">
                <div className = "time-content">
                    <span>{format(currentHr)}:{format(currentMin)}:{format(currentSec)}</span>
                </div>
                <div className = "controls">
                     {playing ?<button onClick = {pause}>Pause</button> : <button onClick = {start}>START</button>}
                    <button onClick = {end}>END</button>
                </div>
            </div>
        </div>
    )
}

export default Timer