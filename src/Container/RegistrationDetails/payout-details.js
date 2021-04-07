import React, { Component } from "react";
import { Col } from "react-bootstrap";
import "./style.css";
import { Upload, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Select from "react-select";
// import icon from "../../assets/images/reg2.jpeg";
import { message } from "antd";
import Navbar from "../../components/Header/Navbar";
import { url } from "../../Server/GlobalUrl";
import { DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { v4 as uuidv4 } from "uuid";
import { Redirect } from "react-router";

class Payoutdetails extends Component {
  state = {
    uuid: "",
    name: "",
    email: "",
    phone: "",
    accountNumber: "",
    IFSC: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    authorised: true,
    accounts: null,
  };

  UserData = async () => {
    let id = localStorage.getItem("user_id");

    let email = localStorage.getItem("email");

    try {
      if (id) {
        await fetch(url + "/api/customusersecond/" + id + "/")
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            this.setState({
              pincode: data.pincode,
              state: data.state,
              city: data.city,
              email: email,
            });
          })
          .then((data) => console.log(this.state));
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    console.log(this.props.history.location.state.prevPath);

    // try {
    //   if (
    //     this.props.history.location.state.prevPath === "/details" ||
    //     this.props.history.location.state.prevPath === "/profile"
    //   ) {
    //     this.setState({ authorised: true });
    //   } else {
    //     return;
    //   }
    // } catch (e) {
    //   console.log("error");
    // }

    const uuid = uuidv4();
    console.log(uuid);

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
        }
      })
      .then((result) => {
        if (result) {
          //console.log("result.access", result.access);
          localStorage.setItem("token", result.access);
        }
      })
      .then((data) => this.UserData())
      .then((data) => this.setState({ uuid: uuid }));
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      phone,
      accountNumber,
      IFSC,
      address,
      city,
      state,
      pincode,
    } = this.state;

    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      accountNumber === "" ||
      IFSC === "" ||
      address === "" ||
      city === "" ||
      state === "" ||
      pincode === ""
    ) {
      if (name === "") {
        message.info("Please Fill Name");
      } else if (email === "") {
        message.info("Please Fill Email");
      } else if (phone === "") {
        message.info("Please Fill Phone");
      } else if (accountNumber === "") {
        message.info("Please Fill Account Number");
      } else if (IFSC === "") {
        message.info("Please Fill IFSC");
      } else if (address === "") {
        message.info("Please Fill Address");
      } else if (city === "") {
        message.info("Please Fill city");
      } else if (state === "") {
        message.info("Please Fill state");
      } else if (pincode === "") {
        message.info("Please Fill pincode");
      }
    } else {
      let data = {
        uuid: this.state.uuid,
        name: name,
        email: email,
        phone: phone,
        accountNumber: accountNumber,
        IFSC: IFSC,
        address: address,
        city: city,
        state: state,
        pincode: pincode,
      };

      fetch("http://e346635b8c21.ngrok.io" + "/api/addToBeneficiary/", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          console.log("response", response);
          if (response["status"] === 201 || response["status"] === 200) {
            return response.json();
          } else if (response["status"] === 400 || response["status"] === 500) {
            message.info("Something went wrong");
            //console.log("Something is wrong");
          }
        })
        .then(async (result) => {
          console.log(result);
        })
        .then((result) => {
          this.props.history.push("/verification");
        });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const is_client = localStorage.getItem("is_client");
    const {
      name,
      email,
      phone,
      accountNumber,
      IFSC,
      address,
      city,
      state,
      pincode,
      authorised,
    } = this.state;
    return (
      <div className="registration__page__three">
        <Navbar />
        <form className="registration__details__container">
          <h1 className="p3-title">Payout Details</h1>
          <Col style={{ marginTop: "10px" }}>
            <div class="form__group">
              <label>A/C Holder Name </label>
              <input
                className="form__control"
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
                placeholder="Enter Your Name"
              />
            </div>
            <div class="form__group">
              <label>Email</label>
              <input
                className="form__control"
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                placeholder="Enter Your Email"
              />
            </div>
            <div class="form__group">
              <label>Phone no</label>
              <input
                className="form__control"
                type="text"
                name="phone"
                value={phone}
                onChange={this.handleChange}
                placeholder="Enter Your Phone no"
              />
            </div>
            <div class="form__group">
              <label>A/c no</label>
              <input
                className="form__control"
                type="text"
                name="accountNumber"
                value={accountNumber}
                onChange={this.handleChange}
                placeholder="Enter Your Postal Account Number"
              />
            </div>
            <div class="form__group">
              <label>IFSC</label>
              <input
                className="form__control"
                type="text"
                name="IFSC"
                value={IFSC}
                onChange={this.handleChange}
                placeholder="Enter Your Postal Account Number"
              />
            </div>
            <div class="form__group">
              <label>Address</label>
              <input
                className="form__control"
                type="text"
                name="address"
                value={address}
                onChange={this.handleChange}
                placeholder="Enter Your Address"
              />
            </div>
            <div class="form__group">
              <label>City</label>
              <input
                className="form__control"
                type="text"
                name="city"
                value={city}
                placeholder="Enter Your city"
              />
            </div>
            <div class="form__group">
              <label>State</label>
              <input
                className="form__control"
                type="text"
                name="state"
                value={state}
                placeholder="Enter Your State"
              />
            </div>
            <div class="form__group">
              <label>Pincode</label>
              <input
                className="form__control"
                type="text"
                name="pincode"
                value={pincode}
                placeholder="Enter Your Pincode"
              />
            </div>
          </Col>
          <Col className="registration__details__footer">
            <button type="submit" onClick={this.onSubmit}>
              Add Bank
            </button>
          </Col>
        </form>
        {authorised ? " " : <Redirect to="/" />}
      </div>
    );
  }
}

export default Payoutdetails;
