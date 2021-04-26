import React, { useState } from "react";
import sanitizeHtml from "sanitize-html";
import vpaRegex from "vpa-regex";
import "./cardDetails.css";
import { Button, Form, Col, Row, Container } from "react-bootstrap";
import { url } from '../../'

const CardDetails = () => {
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
  let auth = localStorage.getItem("token")
  console.log(beneid,auth)

  let apiCall = async (data) => {
    const response = await fetch(
      "https://kodecrux-django.herokuapp.com/api/addToBeneficiary/",
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
    if (
      username !== "" &&
      username.length > 0 &&
      username.trim() != "" &&
      username.length < 100 &&
      usernameFormat.test(username) &&
      emailformat.test(email) === true &&
      phone.length > 8 &&
      phone.length < 12 &&
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
      alert("success");

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
      {console.log(auth)}
      <h1 className="heading">Add card details</h1>

      <Container className="container">
        <Form>
          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label className="key">Name:</Form.Label>
            <Col>
              <Form.Control
                name="Username"
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
                <label style={{ color: "red" }}>{usernameInvalidMessage}</label>
              ) : null}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label className="key">Email:</Form.Label>
            <Col>
              <Form.Control
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
                <label style={{ color: "red" }}>{emailInvalidMessage}</label>
              ) : null}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label className="key">Phone:</Form.Label>
            <Col>
              <Form.Control
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
                <label style={{ color: "red" }}>{phoneInvalidMessage}</label>
              ) : null}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label className="key">Bank Account:</Form.Label>
            <Col>
              <Form.Control
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
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label className="key">IFSC:</Form.Label>
            <Col>
              <Form.Control
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
                <label style={{ color: "red" }}>{ifscInvalidMessage}</label>
              ) : null}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label className="key">VPA:</Form.Label>
            <Col>
              <Form.Control
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
                <label style={{ color: "red" }}>{vpaInvalidMessage}</label>
              ) : null}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label className="key">Card Number:</Form.Label>
            <Col>
              <Form.Control
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
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label className="key">Address 1:</Form.Label>
            <Col>
              <Form.Control
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
                <label style={{ color: "red" }}>{address1InvalidMessage}</label>
              ) : null}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label className="key">Address 2:</Form.Label>
            <Col>
              <Form.Control
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
                <label style={{ color: "red" }}>{address2InvalidMessage}</label>
              ) : null}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label className="key">City:</Form.Label>
            <Col>
              <Form.Control
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
                <label style={{ color: "red" }}>{cityInvalidMessage}</label>
              ) : null}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label className="key">State:</Form.Label>
            <Col>
              <Form.Control
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
                <label style={{ color: "red" }}>{stateInvalidMessage}</label>
              ) : null}
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalPassword">
            <Form.Label className="key">Pincode:</Form.Label>
            <Col>
              <Form.Control
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
                <label style={{ color: "red" }}>{pincodeInvalidMessage}</label>
              ) : null}
            </Col>
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
      </Container>
    </div>
  );
};

export default CardDetails;
