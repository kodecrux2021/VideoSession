import { Card, Typography } from '@material-ui/core'
import axios from 'axios'
import React from 'react'
import Navbar from '../../components/Header/Navbar'
import {url} from '../../Server/GlobalUrl'
import { DataGrid } from '@material-ui/data-grid';
import {message } from 'antd';
import { isMobile } from "react-device-detect";


const checkKeysUnderObject = (obj, result) => {
    for (let key in obj) {
      if (key) { // push the value to the result array only if key exists
        result.push(key + ": " + obj[key]);
      }
    }
};

const columns = [
    { field: 'project_title', headerName: 'ORDER TITLE', sortable: false, flex:1, valueFormatter: (params) => params.row?.hire?.project_title },
    { field: 'date', headerName: 'DATE', flex:1,  sortable: false, type: "datetime", valueFormatter: (params) => {
        let date_ob = new Date(params.row?.date)
        let date = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();

        // current hours
        let hours = date_ob.getHours();

        // current minutes
        let minutes = date_ob.getMinutes();

        // current seconds
        let seconds = date_ob.getSeconds();

        return date + '-' + month + "-" + year + " " + hours + ":" + minutes + ":" + seconds
    } },
    { field: 'amount',  sortable: false, headerName: 'AMOUNT(INR)', flex:1, },
];

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orders : []
        }
    }

    componentDidMount = () => {
        let auth = localStorage.getItem('token')
        axios.get(`${url}/api/order-history/`, {
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + auth
            }
        }).then((response) => {
            if (response['status'] === 201 || response['status'] === 200) {
                return response.data
            } else if (response['status'] === 401) {
                message.info('Something went wrong');
            }
        }).then((result) => {
            this.setState({orders : result})
        })
    }

    render() {
        return (
            <>
                <Navbar />
                <div style={isMobile ? {margin:"0px 30px", paddingTop:100} : {margin:'50px 30px'}}>
                    <Typography variant="h6" style={{fontWeight:'400'}}>PAYMENT DASHBOARD</Typography>
                    <div style={{minHeight:200, boxShadow:'0px 3px 6px rgba(0,0,0,0.16)', borderRadius:10, padding:20}}>
                        <Typography variant="h6" style={{fontWeight:'400'}}>ORDER HISTORY</Typography>
                        <div style={{borderBottomColor:'#C3C3C3', borderBottomStyle:'solid', borderBottomWidth:1, width:30}}></div>
                        <div style={{ height: 300, width: '100%', marginTop:20 }}>
                            {this.state.orders.length > 0 ? <DataGrid rows={this.state.orders} columns={columns} pageSize={5} autoHeight={true}
                                disableExtendRowFullWidth={true} disableMultipleColumnsSorting disableDensitySelector
                                disableColumnSelector disableColumnFilter disableColumnMenu disableColumnReorder disableSelectionOnClick/> :
                                <Typography>No order placed yet</Typography>
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Dashboard