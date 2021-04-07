import Axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { url } from "./Server/GlobalUrl";
import { Table, message } from "antd";
import { Checkbox } from "antd";
import { Redirect, useHistory } from "react-router-dom";
import PaymentSucess from "./Container/PaymentSucessFull/Payment.Sucess";
import Navbar from "./components/Header/Navbar";

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

const dataSource = [
  {
    key: "1",
    card: "XYZ",
    name: "Kali Prasad MK",
    expires: "10/2022",
  },
];

const columns = [
  {
    title: "Credit Card",
    dataIndex: "card",
    key: "card",
  },
  {
    title: "Name on card",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Expires on",
    dataIndex: "expires",
    key: "expires",
  },
  {
    title: "Edit",
    dataIndex: "edit",
    key: "edit",
  },
];

function Payment() {
  var history = useHistory();
  useLayoutEffect(() => {
    if (!localStorage.getItem("token") || !localStorage.getItem("refresh")) {
      history.goBack();
    }
  });
  const [Sucess, setSucess] = useState(null);
  const [OrderID, setOrderID] = useState("");
  let auth = localStorage.getItem("token");

  // const handlePaymentSuccess = () => {
  //   message.info("Payment was successful!");
  //   history.push("/paymentsucess");

  //   setSucess(true);
  //   // try {
  //   //   let bodyData = new FormData();

  //   //   // we will send the response we've got from razorpay to the backend to validate the payment
  //   //   bodyData.append("response", JSON.stringify(response));

  //   //   await Axios({
  //   //     url: `${url}/razorpay/payment/success/`,
  //   //     method: "POST",
  //   //     data: bodyData,
  //   //     headers: {
  //   //       Accept: "application/json",
  //   //       "Content-Type": "application/json",
  //   //     },
  //   //   })
  //   //     .then(() => {
  //   //       console.log("Everything is OK!");
  //   //       message.info('Payment was successful')
  //   //       this.props.history.push('/home')
  //   //       // setName("");
  //   //       // setAmount("");
  //   //     })
  //   //     .catch((err) => {
  //   //       message.info('Something went wrong, payment was unsuccessful')
  //   //       console.log(err);
  //   //     });
  //   // } catch (error) {
  //   //   console.log(console.error());
  //   // }
  // };

  // const loadScript = () => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   document.body.appendChild(script);
  // };

  // const showRazorpay = async (e) => {
  //   e.preventDefault();
  //   const resp = await loadScript();

  //   const data = await Axios({
  //     url: `${url}/order/?hire_id=${localStorage.getItem("pay_id")}`,
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   }).then((res) => {
  //     return res;
  //   });

  //   // in data we will receive an object from the backend with the information about the payment
  //   //that has been made by the user

  //   console.log("data", data);

  //   var options = {
  //     key_id: process.env.REACT_APP_PUBLIC_KEY,
  //     key_secret: process.env.REACT_APP_SECRET_KEY,
  //     currency: "USD",
  //     name: "Ekodecrux",
  //     description: "Test transaction",
  //     image: "",
  //     order_id: data.data,
  //     handler: function (response) {
  //       console.log('response' , response)
  //       handlePaymentSuccess();
  //     },
  //     prefill: {
  //       name: "User's name",
  //       email: "User's email",
  //       contact: "User's phone",
  //     },
  //     notes: {
  //       address: "Ekodecrux Corporate Office",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };

  //   console.log(options);

  //   var rzp1 = new window.Razorpay(options);
  //   rzp1.open();
  // };

  const [Card, setCard] = useState(null);
  const details = {
    appId: "60110871b19dcf536eba63ff401106",

    secretKey: "68f496d0a73be831c7a34cca3907425d00009c6f",

    phone: "1237894560",
  };
  // const CardData = () => {
  //   fetch("https://test.cashfree.com/api/v1/vault/cards/getCards", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: details,
  //   })
  //     .then((res) => res.json)
  //     .then((data) => console.log(data));
  // };

  // useEffect(() => {
  //   CardData();
  // }, []);

  const [educator, seteducator] = useState("");
  const [hireID, sethireID] = useState("");
  const [time, settime] = useState("");
  const [customerName, setcustomerName] = useState("");
  const [customerPhone, setcustomerPhone] = useState("");
  const [customerEmail, setcustomerEmail] = useState("");

  useEffect(() => {
    let id = localStorage.getItem("user_id");

    if (localStorage.getItem("token")) {
      if (id) {
        fetch("http://e346635b8c21.ngrok.io" + "/api/notification/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        })
          .then((response) => {
            if (response["status"] === 201 || response["status"] === 200) {
              return response.json();
            } else if (response["status"] === 401) {
              message.info("Please login again, auth token expired");
              <Redirect to="/login" />;
            }
          })
          .then((result) => {
            console.log("lool", result);
            sethireID(result[0].contract);
            setcustomerName(result[0].user);

            console.log("notification result", result[0]);
          })
          .then((data) => {
            fetch(url + "/currentuser/", {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + auth,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                if (data) {
                  setcustomerPhone(data.user.phone);
                  setcustomerEmail(data.user.email);
                }
              });
          })

          .catch((e) => message.info("Something went wrong"));
      }
    } else {
      return <Redirect to="/login" />;
    }
  }, []);

  const onPayNow = async (e) => {
    e.preventDefault();
    console.log(auth);
    console.log(hireID, customerEmail, customerName, customerPhone);
    const userData = {
      hire_id: hireID,
      customerEmail: customerEmail,
      customerName: customerName,
      customerPhone: customerPhone,
    };

    if (localStorage.getItem("token")) {
      let data_refresh = { refresh: localStorage.getItem("refresh") };

      fetch(url + "/api/token/refresh/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data_refresh),
      })
        .then((response) => {
          if (response["status"] === 201 || response["status"] === 200) {
            return response.json();
          } else if (response["status"] === 401) {
            message.info("Something went wrong");
            localStorage.removeItem("refresh");
            localStorage.removeItem("access");
          }
        })
        .then((result) => {
          if (result) {
            //console.log("result.access", result.access);
            localStorage.setItem("token", result.access);
          }
        })
        .then((data) => {
          let auth1 = localStorage.getItem("token");
          console.log("auth1", auth1);
          fetch("http://e346635b8c21.ngrok.io/order/?hire_id=" + hireID, {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain",
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth1,
            },
            body: JSON.stringify(userData),
          })
            .then((res) => res.json())
            .then((data) => console.log(data));
        });
    }
  };

  return (
    localStorage.getItem("pay_id") !== null && (
      <div className="container" style={{ marginTop: "10vh" }}>
        <Navbar />
        {Sucess ? (
          <PaymentSucess orderid={OrderID} />
        ) : (
          <>
            <form style={{ marginBottom: "10vh" }}>
              <div style={{ textAlign: "center" }}>
                <h1>Payment Dashboard</h1>
              </div>

              <h3>Select Card</h3>

              <Table dataSource={dataSource} columns={columns} />
              {/* <button
                className="btn btn-primary btn-block"
                style={{ width: "90px", height: "30px", fontSize: "15px" }}
              >
                Add Card
              </button> */}
            </form>
            <button
              onClick={onPayNow}
              className="btn btn-primary btn-block"
              style={{ width: "125px" }}
            >
              Pay Now
            </button>
          </>
        )}
      </div>
    )
  );
}

export default Payment;
