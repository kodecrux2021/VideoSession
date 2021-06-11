import { Card, Typography } from '@material-ui/core'
import React from 'react'
import Navbar from '../../components/Header/Navbar'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount = () => {

    }

    render() {
        return (
            <>
                <Navbar />
                <div style={{margin:'50px 30px'}}>
                    <Typography variant="h6" style={{fontWeight:'400'}}>PAYMENT DASHBOARD</Typography>
                    <div style={{minHeight:200, boxShadow:'0px 3px 6px rgba(0,0,0,0.16)', borderRadius:10, padding:20}}>
                        <Typography variant="h6" style={{fontWeight:'400'}}>ORDER HISTORY</Typography>
                        <div style={{borderBottomColor:'#C3C3C3', borderBottomStyle:'solid', borderBottomWidth:1, width:30}}></div>
                        
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard