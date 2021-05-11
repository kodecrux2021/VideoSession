import React, { useState } from "react";
import sanitizeHtml from "sanitize-html";
import vpaRegex from "vpa-regex";
import "./cardDetails.css";
import { Button, Form, Col, Row, Container, Card } from "react-bootstrap";
import { url } from "../../Server/GlobalUrl";
import Navbar from "../../components/Header/Navbar";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

// import { url } from "../../Server/GlobalUrl";
import { Upload, Modal, Image, Spin, Space } from "antd";
import kodecrux from "../../assets/images/reg2.jpeg";

const CardDetails = (props) => {
  const [username, setUsername] = useState("");
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  const [usernameInvalidMessage, setUsernameInvalidMessage] = useState("");

  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [emailInvalidMessage, setEmailInvalidMessage] = useState("");

  const [phone, setPhone] = useState("");
  const [isPhoneInvalid, setIsPhoneInvalid] = useState(false);
  const [phoneInvalidMessage, setPhoneInvalidMessage] = useState("");

  const [bankAccount, setBankAccount] = useState("");
  const [isBankAccountInvalid, setIsBankAccountInvalid] = useState(false);
  const [bankAccountInvalidMessage, setBankAccountInvalidMessage] = useState(
    ""
  );

  const [ifsc, setIfsc] = useState("");
  const [isIfscInvalid, setIfscInvalid] = useState(false);
  const [ifscInvalidMessage, setIfscInvalidMessage] = useState("");

  const [vpa, setVpa] = useState("");
  const [isVpaInvalid, setVpaInvalid] = useState(false);
  const [vpaInvalidMessage, setVpaInvalidMessage] = useState("");

  const [city, setCity] = useState("");
  const [isCityInvalid, setCityInvalid] = useState(false);
  const [cityInvalidMessage, setCityInvalidMessage] = useState("");

  const [statename, setState] = useState("");
  const [isStateInvalid, setStateInvalid] = useState(false);
  const [stateInvalidMessage, setStateInvalidMessage] = useState("");

  const [pincode, setPincode] = useState("");
  const [isPincodeInvalid, setPincodeInvalid] = useState(false);
  const [pincodeInvalidMessage, setPincodeInvalidMessage] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [isCardNumberInvalid, setCardNumberInvalid] = useState(false);
  const [cardNumberInvalidMessage, setCardNumberInvalidMessage] = useState("");

  const [address1, setAddress1] = useState("");
  const [isAddress1Invalid, setAddress1Invalid] = useState(false);
  const [address1InvalidMessage, setAddress1InvalidMessage] = useState("");

  const [address2, setAddress2] = useState("");
  const [isAddress2Invalid, setAddress2Invalid] = useState(false);
  const [address2InvalidMessage, setAddress2InvalidMessage] = useState("");

  // let auth =
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjE5MTYzNzUxLCJqdGkiOiI5ODY2ZDFmMzI5NWE0YjY4YTEzZTQzOTQ3MDc5ZTJmYSIsInVzZXJfaWQiOjMyMn0.H9igpIMD7621jQFqbTPqkmzNWoK5N-j7DX4CnjA771A";
  // let user = localStorage.getItem("user");
  let beneid = localStorage.getItem("user_id");
  let usernam1 = localStorage.getItem("user_name");
  let auth = localStorage.getItem("token");
  console.log(beneid, auth);

  let apiCall = async (data) => {
    const response = await fetch(
      url+"/api/addToBeneficiary/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
        body: JSON.stringify(data),
      }
    );

    // console.log(response)

    // const res = response.json();
    // console.log(res);
  };

  function submitForm() {
    const usernameFormat = /^[a-zA-Z ]*$/;
    const emailformat = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    const bankAccountFormat = /^[a-zA-Z0-9]{9,18}$/;
    const ifscFormat = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    const cityFormat = /^[A-Za-z ]{1,50}$/;
    const stateFormat = /^[A-Za-z ]{1,50}$/;
    const pincodeFormat = /^[0-9]{6}$/;
    const cardNumberFormat = /^[4,5][0-9]{15}$/;
    const addressFormat = /^[a-zA-Z0-9 ]+$/;
    const phoneFormat = /^[0-9]{8,12}$/;
    if (
      username !== "" &&
      username.length > 0 &&
      username.trim() != "" &&
      username.length < 100 &&
      usernameFormat.test(username) &&
      emailformat.test(email) === true &&
      phoneFormat.test(phone) &&
      (bankAccount ? bankAccountFormat.test(bankAccount) : true) &&
      (ifsc ? ifscFormat.test(ifsc) : true) &&
      (pincode ? pincodeFormat.test(pincode) : true) &&
      (city ? cityFormat.test(city) : true) &&
      (statename ? stateFormat.test(statename) : true) &&
      (cardNumber ? cardNumberFormat.test(cardNumber) : true) &&
      address1 !== "" &&
      address1.length > 0 &&
      address1.trim() != "" &&
      address1.length < 150 &&
      addressFormat.test(address1) &&
      (address2 ? addressFormat.test(address2) : true) &&
      (vpa
        ? vpa.match(vpaRegex())
          ? vpa === vpa.match(vpaRegex())[0]
          : true
        : true)
    ) {
      alert("Account details have been submitted");

      const data = {
        user: beneid,
        beneId: beneid,
        name: usernam1,
        email: email,
        phone: phone,
        address: sanitizeHtml(address1),
        vpa: vpa ? vpa : "",
        bankAccount: bankAccount ? bankAccount : "",
        ifsc: ifsc ? ifsc : "",
        cardNo: cardNumber ? cardNumber : "",
        city: city ? city : "",
        state: statename ? statename : "",
        pincode: pincode ? pincode : "",
      };
      console.log(data);
      props.history.push('/')
      apiCall(data);
    } else {
      if (username === "" || username.length < 0) {
        setIsUsernameInvalid(true);
        setUsernameInvalidMessage("Username cannot be empty");
      } else if (username.length > 100) {
        setIsUsernameInvalid(true);
        setUsernameInvalidMessage(
          "Username cannot be greater than length of 100"
        );
      } else if (username && !usernameFormat.test(username)) {
        setIsUsernameInvalid(true);
        setUsernameInvalidMessage(
          "Username cannot have digits or special character"
        );
      }
      if (email === "" || email.length < 0) {
        setIsEmailInvalid(true);
        setEmailInvalidMessage("Email cannot be empty");
      } else if (emailformat.test(email) === false) {
        setIsEmailInvalid(true);
        setEmailInvalidMessage("Email is not in correct format");
      }
      if (phone === "" || phone.length < 0) {
        setIsPhoneInvalid(true);
        setPhoneInvalidMessage("Phone number cannot be empty");
      }else if (phone && phoneFormat.test(phone) === false) {
         setIsPhoneInvalid(true);
         setPhoneInvalidMessage(
            "Phone number cannot have anything excepts numeric values"
         );
      } else if (phone.length < 8 || phone.length > 12) {
        setIsPhoneInvalid(true);
        setPhoneInvalidMessage(
          "Phone number cannot be lesser than 8 and greater than 12"
        );
      } 

      if (bankAccount && bankAccountFormat.test(bankAccount) === false) {
        setIsBankAccountInvalid(true);
        setBankAccountInvalidMessage(
          "Account Number only contains alphanumeric characters"
        );
      }
      if (ifsc && ifscFormat.test(ifsc) === false) {
        setIfscInvalid(true);
        setIfscInvalidMessage(
          "Enter IFSC in proper format (standard IFSC format)"
        );
      }
      if (pincode && pincodeFormat.test(pincode) === false) {
        setPincodeInvalid(true);
        setPincodeInvalidMessage("Enter proper pincode");
      }
    }
    if (city && cityFormat.test(city) === false) {
      setCityInvalid(true);
      setCityInvalidMessage("Enter correct city name");
    }
    if (statename && stateFormat.test(statename) === false) {
      setStateInvalid(true);
      setStateInvalidMessage("Enter correct state");
    }
    if (cardNumber && cardNumberFormat.test(cardNumber) === false) {
      setCardNumberInvalid(true);
      setCardNumberInvalidMessage("Enter correct card number");
    }

    if (address1 === "" || address1.length < 0) {
      setAddress1Invalid(true);
      setAddress1InvalidMessage("Address cannot be empty");
    } else if (address1.length > 150) {
      setAddress1Invalid(true);
      setAddress1InvalidMessage("Address cannot be greater than length of 150");
    } else if (address1 && !addressFormat.test(address1)) {
      setAddress1Invalid(true);
      setAddress1InvalidMessage(
        "Address can have alphabets,numbers and space only"
      );
    }
    if (address2) {
      if (address2 === "" || address2.length < 0) {
        setAddress2Invalid(true);
        setAddress2InvalidMessage("Address cannot be empty");
      } else if (address2.length > 150) {
        setAddress2Invalid(true);
        setAddress2InvalidMessage(
          "Address cannot be greater than length of 150"
        );
      } else if (address2 && !addressFormat.test(address2)) {
        setAddress2Invalid(true);
        setAddress2InvalidMessage(
          "Address can have alphabets,numbers and space only"
        );
      }
    }

    if (vpa) {
      if (vpa.match(vpaRegex())) {
        if (vpa !== vpa.match(vpaRegex())[0]) {
          setVpaInvalid(true);
          setVpaInvalidMessage("Incorrect Vpa");
        }
      } else {
        setVpaInvalid(true);
        setVpaInvalidMessage("Incorrect Vpa");
      }
    }
  }

  function validateWhileFocus(event) {
    const usernameFormat = /^[a-zA-Z ]*$/;
    const emailformat = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    switch (event.target.name) {
      case "Username":
        if (event.target.value !== "" && event.target.value.length > 0) {
          setIsUsernameInvalid(false);
        } else {
          setIsUsernameInvalid(true);
        }
        break;

      case "Email":
        if (event.target.value !== "" && event.target.value.length > 0) {
          setIsEmailInvalid(false);
        } else {
          setIsEmailInvalid(true);
        }
        break;
      case "Phone":
        if (event.target.value !== "" && event.target.value.length > 0) {
          setIsPhoneInvalid(false);
        } else {
          setIsPhoneInvalid(true);
        }
        break;

      case "BankAccount":
        if (event.target.value !== "") {
          setIsBankAccountInvalid(false);
        }
        break;
      case "Ifsc":
        if (event.target.value !== "") {
          setIfscInvalid(false);
        }
        break;

      case "Vpa":
        if (event.target.value !== "") {
          setVpaInvalid(false);
        }
        break;

      case "Pincode":
        if (event.target.value !== "") {
          setPincodeInvalid(false);
        }

      case "City":
        if (event.target.value !== "") {
          setCityInvalid(false);
        }
        break;
      case "State":
        if (event.target.value !== "") {
          setStateInvalid(false);
        }
        break;
      case "CardNumber":
        if (event.target.value !== "") {
          setCardNumberInvalid(false);
        }
        break;

      case "Address1":
        if (event.target.value !== "" && event.target.value.length > 0) {
          setAddress1Invalid(false);
        } else {
          setAddress1Invalid(true);
        }
        break;

      case "Address2":
        if (event.target.value !== "") {
          setAddress2Invalid(false);
        }
        break;
    }
  }

  return (
    <div>
      <Navbar />
      <Link to="/">
        <img className="Profile__logo" src={kodecrux} />
      </Link>

      {localStorage.getItem("user_id") ? (
        <body>
          <div>
            <div>
              <h2 className="heading">Add Bank Details</h2>
              <Container className="container">
                <Card
                  style={{
                    borderBotton: "1px solid black",
                  }}
                  body
                >
                  <Form>
                    <Form.Group controlId="formHorizontalPassword">
                      <Form.Label className="key">Name:</Form.Label>
                      {/* <Col className="input"> */}
                      <Form.Control
                        style={{
                          padding: "30px 0px 30px 0px ",
                        }}
                        name="Username"
                        className="field"
                        value={username}
                        type="text"
                        required
                        placeholder="Enter Username"
                        onChange={(e) => {
                          setUsername(e.target.value);
                          validateWhileFocus(e);
                        }}
                        isInvalid={isUsernameInvalid}
                      />
                      {isUsernameInvalid ? (
                        <label style={{ color: "red" }}>
                          {usernameInvalidMessage}
                        </label>
                      ) : null}
                      {/* </Col> */}
                    </Form.Group>

                    <Form.Group controlId="formHorizontalPassword">
                      <Form.Label className="key">Email:</Form.Label>

                      <Form.Control
                        style={{ padding: "30px 0px 30px 0px " }}
                        name="Email"
                        value={email}
                        type="email"
                        required
                        placeholder="Enter Email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          validateWhileFocus(e);
                        }}
                        isInvalid={isEmailInvalid}
                      />
                      {isEmailInvalid ? (
                        <label style={{ color: "red" }}>
                          {emailInvalidMessage}
                        </label>
                      ) : null}
                    </Form.Group>

                    <Form.Group controlId="formHorizontalPassword">
                      <Form.Label className="key">Phone:</Form.Label>

                      <Form.Control
                        style={{ padding: "30px 0px 30px 0px " }}
                        name="Phone"
                        value={phone}
                        type="text"
                        required
                        placeholder="Enter Phone Number"
                        onChange={(e) => {
                          setPhone(e.target.value);
                          validateWhileFocus(e);
                        }}
                        isInvalid={isPhoneInvalid}
                      />
                      {isPhoneInvalid ? (
                        <label style={{ color: "red" }}>
                          {phoneInvalidMessage}
                        </label>
                      ) : null}
                    </Form.Group>

                    <Form.Group controlId="formHorizontalPassword">
                      <Form.Label className="key">Bank Account:</Form.Label>

                      <Form.Control
                        style={{ padding: "30px 0px 30px 0px " }}
                        name="BankAccount"
                        value={bankAccount}
                        type="text"
                        placeholder="Enter Bank Account"
                        onChange={(e) => {
                          setBankAccount(e.target.value);
                          validateWhileFocus(e);
                        }}
                        isInvalid={isBankAccountInvalid}
                      />
                      {isBankAccountInvalid ? (
                        <label style={{ color: "red" }}>
                          {bankAccountInvalidMessage}
                        </label>
                      ) : null}
                    </Form.Group>

                    <Form.Group controlId="formHorizontalPassword">
                      <Form.Label className="key">IFSC:</Form.Label>

                      <Form.Control
                        style={{ padding: "30px 0px 30px 0px " }}
                        name="Ifsc"
                        value={ifsc}
                        type="text"
                        placeholder="Enter IFSC (standard IFSC format)"
                        onChange={(e) => {
                          setIfsc(e.target.value);
                          validateWhileFocus(e);
                        }}
                        isInvalid={isIfscInvalid}
                      />
                      {isIfscInvalid ? (
                        <label style={{ color: "red" }}>
                          {ifscInvalidMessage}
                        </label>
                      ) : null}
                    </Form.Group>

                    <Form.Group controlId="formHorizontalPassword">
                      <Form.Label className="key">VPA:</Form.Label>

                      <Form.Control
                        style={{ padding: "30px 0px 30px 0px " }}
                        name="Vpa"
                        value={vpa}
                        type="text"
                        placeholder="Enter VPA"
                        onChange={(e) => {
                          setVpa(e.target.value);
                          validateWhileFocus(e);
                        }}
                        isInvalid={isVpaInvalid}
                      />
                      {isVpaInvalid ? (
                        <label style={{ color: "red" }}>
                          {vpaInvalidMessage}
                        </label>
                      ) : null}
                    </Form.Group>

                    <Form.Group controlId="formHorizontalPassword">
                      <Form.Label className="key">Card Number:</Form.Label>

                      <Form.Control
                        style={{ padding: "30px 0px 30px 0px " }}
                        name="CardNumber"
                        value={cardNumber}
                        type="text"
                        placeholder="Enter Card Number"
                        onChange={(e) => {
                          setCardNumber(e.target.value);
                          validateWhileFocus(e);
                        }}
                        isInvalid={isCardNumberInvalid}
                      />
                      {isCardNumberInvalid ? (
                        <label style={{ color: "red" }}>
                          {cardNumberInvalidMessage}
                        </label>
                      ) : null}
                    </Form.Group>

                    <Form.Group controlId="formHorizontalPassword">
                      <Form.Label className="key">Address 1:</Form.Label>

                      <Form.Control
                        style={{ padding: "30px 0px 30px 0px " }}
                        name="Address1"
                        value={address1}
                        type="text"
                        required
                        placeholder="Enter Address 1"
                        onChange={(e) => {
                          setAddress1(e.target.value);
                          validateWhileFocus(e);
                        }}
                        isInvalid={isAddress1Invalid}
                      />
                      {isAddress1Invalid ? (
                        <label style={{ color: "red" }}>
                          {address1InvalidMessage}
                        </label>
                      ) : null}
                    </Form.Group>

                    <Form.Group controlId="formHorizontalPassword">
                      <Form.Label className="key">Address 2:</Form.Label>

                      <Form.Control
                        style={{ padding: "30px 0px 30px 0px " }}
                        name="Address2"
                        value={address2}
                        type="text"
                        placeholder="Enter Address 2"
                        onChange={(e) => {
                          setAddress2(e.target.value);
                          validateWhileFocus(e);
                        }}
                        isInvalid={isAddress2Invalid}
                      />
                      {isAddress2Invalid ? (
                        <label style={{ color: "red" }}>
                          {address2InvalidMessage}
                        </label>
                      ) : null}
                    </Form.Group>

                    <Form.Group controlId="formHorizontalPassword">
                      <Form.Label className="key">City:</Form.Label>

                      <Form.Control
                        style={{ padding: "30px 0px 30px 0px " }}
                        name="City"
                        value={city}
                        type="text"
                        placeholder="Enter City"
                        onChange={(e) => {
                          setCity(e.target.value);
                          validateWhileFocus(e);
                        }}
                        isInvalid={isCityInvalid}
                      />
                      {isCityInvalid ? (
                        <label style={{ color: "red" }}>
                          {cityInvalidMessage}
                        </label>
                      ) : null}
                    </Form.Group>

                    <Form.Group controlId="formHorizontalPassword">
                      <Form.Label className="key">State:</Form.Label>

                      <Form.Control
                        style={{ padding: "30px 0px 30px 0px " }}
                        name="State"
                        value={statename}
                        type="text"
                        placeholder="Enter State"
                        onChange={(e) => {
                          setState(e.target.value);
                          validateWhileFocus(e);
                        }}
                        isInvalid={isStateInvalid}
                      />
                      {isStateInvalid ? (
                        <label style={{ color: "red" }}>
                          {stateInvalidMessage}
                        </label>
                      ) : null}
                    </Form.Group>

                    <Form.Group controlId="formHorizontalPassword">
                      <Form.Label className="key">Pincode:</Form.Label>

                      <Form.Control
                        style={{ padding: "30px 0px 30px 0px " }}
                        name="Pincode"
                        value={pincode}
                        type="Number"
                        placeholder="Enter Pincode"
                        onChange={(e) => {
                          setPincode(e.target.value);
                          validateWhileFocus(e);
                        }}
                        isInvalid={isPincodeInvalid}
                      />
                      {isPincodeInvalid ? (
                        <label style={{ color: "red" }}>
                          {pincodeInvalidMessage}
                        </label>
                      ) : null}
                    </Form.Group>

                    <div className="Submitbtn">
                      <Button
                        size="lg"
                        variant="outline-info"
                        onClick={(e) => {
                          submitForm(e);
                        }}
                      >
                        Submit
                      </Button>{" "}
                    </div>
                  </Form>
                </Card>
              </Container>
            </div>
           
          </div>
        </body>
      ) : (
        <Redirect to="/login" />
      )}
      {/* <Bot/> */}
    </div>
  );
};

export default CardDetails;
