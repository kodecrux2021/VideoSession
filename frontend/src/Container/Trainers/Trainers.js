import React, { Component } from 'react'
import TrainersCard from './TrainersCard'
import avatar from '../../assets/images/avatar.png'

export default class Trainers extends Component {
    render() {
        return (
            <div className=" d-flex  p-3 flex-column" style={{alignItems:"center"}}>
                <TrainersCard 
                name = "William Olojede"
                img = {avatar}
                online={false}
                rating="5.0"
                details="Software Engineer | Problem Solver"
                rate="15"
                time="15"
                reviews="150"
                badge={false}
                />

<TrainersCard 
                name = "William Olojede"
                img = {avatar}
                online={false}
                rating="5.0"
                details="Software Engineer | Problem Solver"
                rate="15"
                time="15"
                reviews="150"
                badge={false}
                />

<TrainersCard 
                name = "William Olojede"
                img = {avatar}
                online={true}
                rating="5.0"
                details="Software Engineer | Problem Solver"
                rate="15"
                time="15"
                reviews="150"
                badge={true}
                />

<TrainersCard 
                name = "William Olojede"
                img = {avatar}
                online={false}
                rating="5.0"
                details="Software Engineer | Problem Solver"
                rate="15"
                time="15"
                reviews="150"
                badge={true}
                />

              
                
            </div>
        )
    }
}
