import Axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {url} from './Server/GlobalUrl'
import { Checkbox } from 'antd';
import { Link,Redirect, useHistory } from "react-router-dom";
import Navbar from './components/Header/Navbar'
import { Typography } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import {message } from 'antd';
import { isMobile } from "react-device-detect";

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}


const dataSource = [
    {
      id: '100',
      key: '1',
      card: 'XYZ',
      name: 'Kali Prasad MK',
      expires: '10/2022',
    },
    
  ];
  

const columns = [
    { field: 'project_title', headerName: 'ORDER TITLE', sortable: false, flex: isMobile ? 0.5 : 0.8,},
    { field: 'budget',  sortable: false, headerName: 'AMOUNT(INR)', flex: isMobile ? 0.5 : 0.2},
];

function Payment() {
  const [orderData, setOrderData] = useState([])

  var history = useHistory()
  useLayoutEffect(() =>{
    if(!localStorage.getItem('token') || !localStorage.getItem('refresh')){
      console.log("hello");
      history.goBack();
    };
    // return () =>{
    //   localStorage.removeItem('pay_id')
    // }
  })

  useEffect(() => {
    let auth = localStorage.getItem("token")
    let payId = localStorage.getItem("pay_id")
    if (payId !== null) {
      Axios.get(`${url}/api/hire/${payId}/`, {
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
        let data = []
        data.push(result)
        console.log(data)
        setOrderData(data)
      })
    } else {
      history.push('/')
    }
  }, [])


  const handlePaymentSuccess = () => {
    message.info('Payment was successful!')
    history.push('/home')
    // try {
    //   let bodyData = new FormData();

    //   // we will send the response we've got from razorpay to the backend to validate the payment
    //   bodyData.append("response", JSON.stringify(response));

    //   await Axios({
    //     url: `${url}/razorpay/payment/success/`,
    //     method: "POST",
    //     data: bodyData,
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then(() => {
    //       console.log("Everything is OK!");
    //       message.info('Payment was successful')
    //       this.props.history.push('/home')
    //       // setName("");
    //       // setAmount("");
    //     })
    //     .catch((err) => {
    //       message.info('Something went wrong, payment was unsuccessful')
    //       console.log(err);
    //     });
    // } catch (error) {
    //   console.log(console.error());
    // }
  };

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async () => {
    const res = await loadScript();
    console.log(localStorage.getItem('pay_id'));
    const data = await Axios({
      url: `${url}/order/`,
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      data : {
        hire_id:localStorage.getItem('pay_id')
      }
    }).then((res) => {
      return res
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    console.log(data);
    console.log(process.env.REACT_APP_PUBLIC_KEY);
    var options = {
      "appId": process.env.REACT_APP_PUBLIC_KEY, 
      "order_id": data.data,
      "orderAmount": 100,
      "customerName": "Ekodecrux",
      "customerPhone": "User's phone",
      "customerEmail":"User's email",
      "customerPhone": "8997996877" ,
      "retunrURL": "/",
      "orderCurrency" : "INR",
      "orderNote": "Test transaction"
    };

    
  };
  const handlePayment = async() => {
    const data = await Axios({
      url: `${url}/order/`,
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      data : {
        hire_id:localStorage.getItem('pay_id')
      }
    }).then((res) => {
      return res
    });
    const link=data.data.paymentLink;
    window.location.replace(link);
  }

  return (
    <>
    <Navbar />
    {localStorage.getItem('pay_id')!==null ? 
      
    <div style={isMobile ? {padding:"100px 30px"} : { marginTop: "10vh", padding:"0 40px" }}>
      <div style={{textAlign: 'left'}}>
        <Typography variant="h6">PAYMENT SUMMARY</Typography>
      </div>

      
      {/* <Checkbox onChange={onChange}>Reccuring payments for default payment methods</Checkbox> */}
      <div style={{minHeight:200, boxShadow:'0px 3px 6px rgba(0,0,0,0.16)', borderRadius:10, padding:20, marginTop:20}}>
        <Typography variant="h6" style={{fontWeight:'400'}}>ORDER DETAILS</Typography>
        <div style={{borderBottomColor:'#C3C3C3', borderBottomStyle:'solid', borderBottomWidth:1, width:50, margin:"20px 0"}}></div>
          {/* <Table dataSource={dataSource} columns={columns} /> */}
          <DataGrid rows={orderData} columns={columns} pageSize={5} autoHeight={true}
                                disableExtendRowFullWidth={true} disableMultipleColumnsSorting disableDensitySelector
                                disableColumnSelector disableColumnFilter disableColumnMenu disableColumnReorder disableSelectionOnClick hideFooterPagination hideFooter />
        <div style={{display:'flex', justifyContent:'space-between', marginTop:30}}>
          <button onClick={showRazorpay} className="btn btn-primary btn-block" style = {{width: '90px', fontSize: '15px'}}>
          Add Card
          </button>
          <button onClick={handlePayment} className="btn btn-primary btn-block" style = {{width: '90px', fontSize: '15px', marginTop:0}}>
          Pay Now
          </button>
        </div>
      </div>
    </div>
    
    : null}
    </>
    )
}

export default Payment;