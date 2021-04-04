import React, { Component } from "react";
import Select from "react-select";
import { url } from "../../Server/GlobalUrl";
import { DatePicker } from "antd";
import moment from "moment";
import { Col } from "react-bootstrap";
import { Upload, Modal } from "antd";

import { message, Button } from "antd";
import { Alert } from "react-bootstrap";
import EditIcon from "@material-ui/icons/Edit";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";

import Navbar from "../../components/Header/Navbar";

import "./Profile.css";
import { Redirect } from "react-router";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const experienceData = [
  { id: 2, name: "1 year", value: 1 },
  { id: 2, name: "2 years", value: 2 },
  { id: 4, name: "3 years", value: 3 },
  { id: 2, name: "4 years", value: 4 },
  { id: 2, name: "5 years", value: 5 },
  { id: 4, name: "5+ years", value: 6 },
];

class Profile extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],

    tech_list: [],
    subtech_list: [],
    subtech_list1: [],
    technology: "",
    sub_technology: "",

    First_Name: "",
    Last_Name: "",
    Date_Of_Birth: "",
    Email: "",
    Phone: "",
    pincode: "",
    state: "",
    city: "",
    total_experience: null,
    relevant_experience: null,

    alert: false,
    sucess: true,
  };

  UserData = async () => {
    let id = localStorage.getItem("user_id");
    let auth = localStorage.getItem("token");

    await fetch(url + "/api/customusersecond/" + id + "/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          Date_Of_Birth: data.date_of_birth,
          previewImage: data.profile_pic,
          pincode: data.pincode,
          state: data.state,
          city: data.city,
          total_experience: data.total_experience,
          relevant_experience: data.relevant_experience,
          technology: data.technology[0],
          sub_technology: data.sub_technology[0],
        });
      })
      .then((data) =>
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
              this.setState({
                First_Name: data.user.first_name,
                Last_Name: data.user.last_name,
                Email: data.user.email,
                Phone: data.user.phone,
                relevant_experience: data.user.relevant_experience,
              });
            }
          })
      );
  };

  // componentDidUpdate() {
  //   console.log(this.state);
  // }

  componentDidMount() {
    this.UserData();

    // fetch(url + "/api/notification/", {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);
    //     this.setState({ technology_list: result });
    //   });

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
            localStorage.setItem("token", result.access);
          }
        });
    }

    fetch(url + "/api/technology/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({ tech_list: result });
      })
      .then((data) => this.SetSubTech())
      .then((res) => this.UpdateTech())
      .then((res) => this.updateSubtech())
      .then((res) => this.UpdateTotalExp())
      .then((res) => this.UpdateRelevantExp());
  }

  SetSubTech = () =>
    this.state.tech_list.map((value) => {
      if (this.state.technology === value.id) {
        this.setState({
          subtech_list: value.sub_technology,
        });
      }
    });

  updateSubtech = async () => {
    const dataa = await this.state.subtech_list.filter((value) => {
      return this.state.sub_technology === value.id;
    });

    this.setState({ sub_technology: dataa });
  };

  UpdateTech = async () => {
    const dataa = await this.state.tech_list.filter((value) => {
      return this.state.technology === value.id;
    });

    this.setState({ technology: dataa });
  };

  UpdateTotalExp = async () => {
    const dataa = await experienceData.filter((value) => {
      return this.state.total_experience === value.value;
    });

    this.setState({ total_experience: dataa });
  };

  UpdateRelevantExp = async () => {
    setTimeout(() => {
      const dataa = experienceData.filter((value) => {
        return this.state.relevant_experience === value.value;
      });

      this.setState({ relevant_experience: dataa });
    }, 1000);
  };

  onSubmit = async (e) => {
    e.preventDefault();
    let tech = [];
    let sub_tech = [];

    tech.push(parseInt(this.state.technology.id));
    sub_tech.push(parseInt(this.state.sub_technology.id));

    if (
      this.state.pincode === "" ||
      this.state.city === "" ||
      this.state.state === ""
    ) {
      if (this.state.pincode === "") {
        message.info("Please Fill Pincode");
      } else if (this.state.city === "") {
        message.info("Please Fill City");
      } else if (this.state.state === "") {
        message.info("Please Fill State");
      }
    } else {
      console.log(tech, sub_tech);
      let data = {
        technology: tech,
        sub_technology: sub_tech,

        First_Name: this.state.First_Name,
        Last_Name: this.state.Last_Name,
        Date_Of_Birth: this.state.Date_Of_Birth,
        Email: this.state.Email,
        Phone: this.state.Phone,
        pincode: this.state.pincode,
        state: this.state.state,
        city: this.state.city,
        total_experience: this.state.total_experience.value,
        relevant_experience: this.state.relevant_experience.value,
      };

      let id = localStorage.getItem("user_id");
      await fetch(url + "/api/customusersecond/" + id + "/", {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        console.log("response", response);
        if (response["status"] === 201 || response["status"] === 200) {
          message.info("Saved");
          return response.json();
        } else if (response["status"] === 400) {
          message.info("Something is wrong");
        }
      });
    }
  };
  handlePreview = async (file) => {
    // console.log('file', file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  HandleImageChange = ({ fileList }) => this.setState({ fileList });

  handleData = (identity, data) => {
    if (identity === "technology") {
      this.setState({
        technology: data,
        subtech_list: data.sub_technology,
        sub_technology: "",
      });
    } else if (identity === "sub_technology") {
      this.setState({ sub_technology: data });
    } else if (identity === "total_experience") {
      this.setState({ total_experience: data });
    } else if (identity === "relevant_experience") {
      this.setState({ relevant_experience: data });
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  onChange = (date, dateString) => {
    this.setState({ date_of_birth: date });
  };

  render() {
    const is_client = localStorage.getItem("is_client");

    const {
      First_Name,
      Last_Name,
      Email,
      Date_Of_Birth,
      Phone,
      pincode,
      state,
      city,
      total_experience,
      relevant_experience,
      previewImage,
      technology,
      tech_list,
      subtech_list,

      sub_technology,
      fileList,
      previewVisible,
      previewTitle,
    } = this.state;

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div>
        <Navbar />
        <div className="Profile">
          <div className="Profile__container">
            <div className="Profile__title">
              <h2>Profile</h2>
              <h6>Add/edit Information about yourself</h6>
            </div>
            <div className="Profile__section">
              <div className="profile__image">
                {" "}
                <img src={`${previewImage}`} />
              </div>
              <div className="profile__input_Fields">
                <form onSubmit={this.onSubmit}>
                  <Col>
                    <div style={{ textAlign: "center", margin: "10px" }}>
                      <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={this.HandleImageChange}
                        onPreview={this.handlePreview}
                      >
                        <div>
                          <UploadOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                        {/* <Button icon={<UploadOutlined />}>
                          Click to Upload
                        </Button> */}
                      </Upload>
                    </div>

                    <div className="form__group">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form__control"
                        placeholder="First Name"
                        name="First_Name"
                        value={First_Name}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form__group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form__control"
                        placeholder="Last Name"
                        name="Last_Name"
                        defaultValue={Last_Name}
                        // value={Last_Name}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div class="form__group">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <label>Date of Birth</label>
                        {Date_Of_Birth ? (
                          <div style={{ margin: "0 60px" }}>
                            <DatePicker
                              onChange={this.onChange}
                              size="large"
                              format="YYYY-MM-DD"
                              defaultValue={
                                Date_Of_Birth ? moment(Date_Of_Birth) : ""
                              }
                            />
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="form__group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form__control"
                        id="email"
                        name="Email"
                        placeholder="Your Email Here"
                        onChange={this.handleChange}
                        value={Email}
                      />
                    </div>

                    <div className="form__group">
                      <label>Phone no</label>
                      <input
                        type="text"
                        className="form__control"
                        id="Phone"
                        placeholder="Enter Mobile Number"
                        name="Phone"
                        onChange={this.handleChange}
                        value={Phone}
                      />
                    </div>

                    <div class="form__group">
                      <label>Pin Code</label>
                      <input
                        className="form__control"
                        value={pincode}
                        name="pincode"
                        type="text"
                        placeholder="Enter Your Postal Code"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div class="form__group">
                      <label>State</label>
                      <input
                        className="form__control"
                        value={state}
                        name="state"
                        type="text"
                        placeholder="Enter Your state"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div class="form__group">
                      <label>City</label>
                      <input
                        className="form__control"
                        value={city}
                        name="city"
                        type="text"
                        placeholder="Enter Your city"
                        onChange={this.handleChange}
                      />
                    </div>

                    <div class="form__group">
                      <label>Technology</label>
                      {technology ? (
                        <Select
                          className="react-selectcomponent"
                          classNamePrefix="name-select"
                          onChange={(value) =>
                            this.handleData("technology", value)
                          }
                          options={tech_list}
                          getOptionLabel={(option) => `${option.name}`}
                          getOptionValue={(option) => `${option}`}
                          isOptionSelected={(option) =>
                            this.state.technology === option.name ? true : false
                          }
                          isSearchable={true}
                          openMenuOnClick={true}
                          placeholder={"Choose Technology"}
                          value={technology}
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="form__group">
                      <label> Sub Technology</label>
                      {technology ? (
                        <Select
                          className="react-selectcomponent"
                          classNamePrefix="name-select"
                          onChange={(value) =>
                            this.handleData("sub_technology", value)
                          }
                          options={subtech_list}
                          getOptionLabel={(option) => `${option.name}`}
                          getOptionValue={(option) => `${option}`}
                          isOptionSelected={(option) =>
                            this.state.sub_technology === option.name
                              ? true
                              : false
                          }
                          isSearchable={true}
                          openMenuOnClick={true}
                          placeholder={"Choose Sub Technology"}
                          value={this.state.sub_technology}
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="form__group">
                      <label>Total Experience</label>
                      {total_experience ? (
                        <Select
                          className="react-selectcomponent"
                          classNamePrefix="name-select"
                          onChange={(value) =>
                            this.handleData("total_experience", value)
                          }
                          getOptionLabel={(option) => `${option.name}`}
                          getOptionValue={(option) => `${option}`}
                          isOptionSelected={(option) =>
                            this.state.sub_technology === option.name
                              ? true
                              : false
                          }
                          options={experienceData}
                          isSearchable={true}
                          openMenuOnClick={true}
                          placeholder={"Years of Experince"}
                          value={total_experience}
                        />
                      ) : (
                        ""
                      )}
                    </div>

                    <div class="form__group">
                      <label>Relevant Experience</label>
                      {relevant_experience ? (
                        <Select
                          className="react-selectcomponent"
                          classNamePrefix="name-select"
                          onChange={(value) =>
                            this.handleData("relevant_experience", value)
                          }
                          getOptionLabel={(option) => `${option.name}`}
                          getOptionValue={(option) => `${option}`}
                          isOptionSelected={(option) =>
                            this.state.sub_technology === option.name
                              ? true
                              : false
                          }
                          options={experienceData}
                          isSearchable={true}
                          openMenuOnClick={true}
                          placeholder={"Years of Experince"}
                          value={relevant_experience}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </Col>
                  <Col className="registration__details__footer">
                    <button type="submit">Save</button>
                  </Col>
                </form>
              </div>
            </div>
          </div>
        </div>
        {localStorage.getItem("user_id") ? (
          " "
        ) : (
          <Redirect to={`${url} + /login`} />
        )}
      </div>
    );
  }
}

export default Profile;
