import Axios from "axios";
import React, { useLayoutEffect } from "react";
import {url} from './Server/GlobalUrl'
import { Table, message } from 'antd';
import { Checkbox } from 'antd';
import { useHistory } from "react-router-dom";

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
     history.goBack();
    };
    return () =>{
      localStorage.removeItem('pay_id')
    }
  })
  // const [name, setName] = useState("");
  // const [amount, setAmount] = useState("");

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

    const data = await Axios({
      url: `${url}/order/?hire_id=${localStorage.getItem('pay_id')}`,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    console.log(data);
    var options = {
      key_id: process.env.REACT_APP_PUBLIC_KEY, 
      key_secret: process.env.REACT_APP_SECRET_KEY,
      currency: "USD",
      name: "Ekodecrux",
      description: "Test transaction",
      image: "",
      order_id: data.data,
      handler: function (response) {
        handlePaymentSuccess();
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },
      notes: {
        address: "Ekodecrux Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    console.log(options);

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    localStorage.getItem('pay_id')!==null && <div className="container" style={{ marginTop: "10vh" }}>
      <form style={{ marginBottom: "10vh" }}>
        <div style={{textAlign: 'center'}}>
        <h1>Payment Dashboard</h1>
        </div>

        <h3>Payment card addition</h3>

        <Checkbox onChange={onChange}>Reccuring payments for default payment methods</Checkbox>
        <Table dataSource={dataSource} columns={columns} />
        <button onClick={showRazorpay} className="btn btn-primary btn-block" style = {{width: '90px', height: '30px', fontSize: '15px'}}>
       Add Card
      </button>

        {/* <div className="form-group">
          <label htmlFor="name">Product name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div> */}
      </form>
      <button onClick={showRazorpay} className="btn btn-primary btn-block" style = {{width: '125px'}}>
        Pay Now
      </button>
    </div>
  );
}

export default Payment;