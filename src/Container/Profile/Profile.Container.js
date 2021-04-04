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
import kodecrux from "../../assets/images/reg2.jpeg";
import { Link } from "react-router-dom";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

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

    profile_pic: "",

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

    if (id) {
      await fetch(url + "/api/customusersecond/" + id + "/")
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            Date_Of_Birth: data.date_of_birth,
            profile_pic: data.profile_pic,
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
    } else {
      return;
    }
  };

  componentDidMount() {
    this.UserData();

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

    this.setState({ sub_technology: dataa[0] });
  };

  UpdateTech = async () => {
    const dataa = await this.state.tech_list.filter((value) => {
      return this.state.technology === value.id;
    });

    this.setState({ technology: dataa[0] });
  };

  UpdateTotalExp = async () => {
    const dataa = await experienceData.filter((value) => {
      return this.state.total_experience === value.value;
    });

    this.setState({ total_experience: dataa[0] });
  };

  UpdateRelevantExp = async () => {
    setTimeout(() => {
      const dataa = experienceData.filter((value) => {
        return this.state.relevant_experience === value.value;
      });

      this.setState({ relevant_experience: dataa[0] });
    }, 1000);
  };

  onSubmit = async (e) => {
    e.preventDefault();

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
      let tech = [];
      let sub_tech = [];

      tech.push(parseInt(this.state.technology.id));
      sub_tech.push(parseInt(this.state.sub_technology.id));
      console.log(
        "tech",
        "sub_tech",
        this.state.total_experience?.value,
        this.state.relevant_experience.value
      );
      let formData = new FormData();

      formData.append("pincode", this.state.pincode);
      formData.append("city", this.state.city);
      formData.append("state", this.state.state);
      formData.append("technology", [tech]);
      formData.append("sub_technology", [sub_tech]);
      formData.append("total_experience", this.state.total_experience.value);
      formData.append(
        "relevant_experience",
        this.state.relevant_experience.value
      );
      formData.append("date_of_birth", this.state.Date_Of_Birth);
      formData.append("First_Name", this.state.First_Name);
      formData.append("Last_Name", this.state.Last_Name);
      formData.append("Email", this.state.Email);
      formData.append("Phone", this.state.Phone);
      formData.append("Email", this.state.Email);
      this.state.fileList.length > 0 &&
        formData.append("profile_pic", this.state.fileList[0].originFileObj);

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

      let id = localStorage.getItem("educator_id");
      let user_id = localStorage.getItem("user_id");

      fetch(url + "/api/customusersecond/" + user_id + "/", {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          // "Content-Type": `multipart/form-data`,
        },
        body: formData,
      })
        .then((response) => {
          //console.log("response", response);
          if (response["status"] === 201 || response["status"] === 200) {
            message.info("Saved");
            window.location.reload();
            return response.json();
          } else if (response["status"] === 400 || response["status"] === 500) {
            message.info("Something went wrong");
            //console.log("Something is wrong");
          }
        })
        .then(async (result) => {
          //console.log(result);

          let auth = localStorage.getItem("token");
          if (localStorage.getItem("is_client")) {
            await fetch(url + "/api/educatorcreate/" + id + "/", {
              method: "PUT",
              headers: {
                Accept: "application/json, text/plain",
                //"Content-Type": "application/json;charset=UTF-8",
                Authorization: "Bearer" + auth,
              },
              body: formData,
            }).then((response) => {
              // console.log("response", response);
              if (response["status"] === 201 || response["status"] === 200) {
                message.info("Saved");
                window.location.reload();
                return response.json();
              } else if (response["status"] === 400) {
                message.info("Something went wrong!");
                // console.log("Something is wrong");
              }
            });
          }
        });
    }
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    console.log("file", file);
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

  HandleImageChange = async ({ fileList }) => {
    this.setState({ fileList }, () => console.log(fileList.response));
  };

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

  componentDidUpdate() {
    console.log(this.state);
  }

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
      profile_pic,
      sub_technology,
      fileList,
      previewVisible,
      previewTitle,
    } = this.state;

    const props = {
      action: "//jsonplaceholder.typicode.com/posts/",
      listType: "picture",
      previewFile(file) {
        console.log("Your upload file:", file);
        // Your process logic. Here we just mock to the same file
        return fetch("https://next.json-generator.com/api/json/get/4ytyBoLK8", {
          method: "POST",
          body: file,
        })
          .then((res) => res.json())
          .then(({ thumbnail }) => thumbnail);
      },
    };

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <div>
        <Navbar />
        <Link to="/">
          <img className="Profile__logo" src={kodecrux} />
        </Link>
        {localStorage.getItem("user_id") ? (
          <div className="Profile">
            <div className="Profile__container">
              <div className="Profile__title">
                <h2>Profile</h2>
                <h6>Add/edit Information about yourself</h6>
              </div>
              <div className="Profile__section">
                <div className="profile__image">
                  {" "}
                  <img src={`${profile_pic}`} />
                </div>
                <div className="profile__input_Fields">
                  <form onSubmit={this.onSubmit}>
                    <Col>
                      <div style={{ textAlign: "center", margin: "10px" }}>
                        <Upload
                          beforeUpload={(file) => {
                            const isJPG =
                              file.type === "image/jpeg" ||
                              file.type === "image/png";
                            if (!isJPG) {
                              message.error(
                                "You can only upload JPG or PNG file!"
                              );
                              return false;
                            } else {
                              return true;
                            }
                          }}
                          customRequest={dummyRequest}
                          //  action="https://next.json-generator.com/api/json/get/4ytyBoLK8"
                          listType="picture-card"
                          fileList={fileList}
                          onPreview={this.handlePreview}
                          onChange={(e) => this.HandleImageChange(e)}
                        >
                          {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        {/* <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload> */}
                        <Modal
                          visible={previewVisible}
                          title={previewTitle}
                          footer={null}
                          onCancel={this.handleCancel}
                        >
                          <img
                            alt="example"
                            style={{ width: "100%" }}
                            src={previewImage}
                          />
                        </Modal>
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
                              this.state.technology === option.name
                                ? true
                                : false
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
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    );
  }
}

export default Profile;
