import Axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {url} from './Server/GlobalUrl'
import { Table, message } from 'antd';
import { Checkbox } from 'antd';
import { Link,Redirect, useHistory } from "react-router-dom";

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}



const dataSource = [
    {
      key: '1',
      card: 'XYZ',
      name: 'Kali Prasad MK',
      expires: '10/2022',
    },
    
  ];
  
  const columns = [
    {
      title: 'Credit Card',
      dataIndex: 'card',
      key: 'card',
    },
    {
      title: 'Name on card',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Expires on',
      dataIndex: 'expires',
      key: 'expires',
    },
    {
        title: 'Edit',
        dataIndex: 'edit',
        key: 'edit'
    }
  ];

function Payment() {

  var history = useHistory()
  useLayoutEffect(() =>{
    if(!localStorage.getItem('token') || !localStorage.getItem('refresh')){
      console.log("hello");
     history.goBack();
    };
    return () =>{
      localStorage.removeItem('pay_id')
    }
  })



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
    localStorage.getItem('pay_id')!==null && <div className="container" style={{ marginTop: "10vh" }}>
      <form style={{ marginBottom: "10vh" }}>
        <div style={{textAlign: 'center'}}>
        <h1>Payment Dashboard</h1>
        </div>

      </form>
      
      <Checkbox onChange={onChange}>Reccuring payments for default payment methods</Checkbox>
        <Table dataSource={dataSource} columns={columns} />
        <button onClick={showRazorpay} className="btn btn-primary btn-block" style = {{width: '90px', height: '30px', fontSize: '15px'}}>
       Add Card
      </button>
      <button onClick={handlePayment} className="btn btn-primary btn-block" style = {{width: '90px', height: '30px', fontSize: '15px'}}>
       Pay Now
      </button>
    </div>
    )
}

export default Payment;