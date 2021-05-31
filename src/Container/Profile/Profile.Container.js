import React, { Component } from "react";
import Select from "react-select";
import { Col } from "react-bootstrap";
import { DatePicker } from "antd";
import moment from "moment";
import { Upload, Modal, Image, Spin, Space } from "antd";
import { message } from "antd";
import {
  UploadOutlined,
  LoadingOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import { url } from "../../Server/GlobalUrl";
import Navbar from "../../components/Header/Navbar";
import "./Profile.css";
import { TextField, Button } from "@material-ui/core";

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
    resume:"",

    client: false,

    setemail_validate: "",
    mobile: "",
    setmobile_validate: "",

    loading: false,
    PageLoading: false,
    Uploading: false,
  };

  UserData = async () => {
    let id = localStorage.getItem("user_id");
    let auth = localStorage.getItem("token");

    try {
      if (id) {
        await fetch(url + "/api/customusersecond/" + id + "/")
          .then((response) => response.json())
          .then((data) => {
            console.log("date", data);
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
              resume: data.resume,
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
                  console.log(data);
                  this.setState({
                    First_Name: data.user.first_name,
                    Last_Name: data.user.last_name,
                    Email: data.user.email,
                    Phone: data.user.phone,
                    relevant_experience: data.user.relevant_experience,
                    client: data.user.is_client,
                  });
                }
              })
          );
      } else {
        return;
      }
    } catch (error) {
      console.log("error");
    }
  };

  componentDidMount() {
    this.UserData();
    this.setState({ PageLoading: true });
    
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
        }).then(()=>{
          // fetch(url + "/update/lastseen/", {
          //   method: "GET",
          //   headers: {
          //     Accept: "application/json",
          //     "Content-Type": "application/json",
          //     Authorization: "Bearer " + localStorage.getItem("token"),
          //   }
          // });
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
      .then((res) => this.UpdateRelevantExp())
      .then((res) => this.setState({ PageLoading: false }));
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
    console.log(this.state.sub_technology);
    if (
      this.state.Email === "" ||
      this.state.position === "" ||
      this.state.setemail_validate !== "" ||
      this.state.setmobile_validate !== "" ||
      this.state.First_Name === "" ||
      this.state.Last_Name === "" ||
      this.state.Date_Of_Birth === null ||
      this.state.pincode === null ||
      this.state.state === null ||
      this.state.city === null
    ) {
      if (this.state.email === "") {
        message.warning("Please Fill Email");
      } else if (this.state.setemail_validate !== "") {
        message.warning(this.state.setemail_validate);
      } else if (this.state.setmobile_validate !== "") {
        message.warning(this.state.setmobile_validate);
      } else if (this.state.pincode === null) {
        message.warning("Please Fill Pincode");
      } else if (this.state.city === null) {
        message.warning("Please Fill City");
      } else if (this.state.state === null) {
        message.warning("Please Fill State");
      } else if (this.state.Date_Of_Birth === null) {
        message.warning("Please Fill Date_Of_Birth");
      } else if (this.state.First_Name === "") {
        message.warning("Please Fill First Name");
      } else if (this.state.Last_Name === "") {
        message.warning("Please Fill Last Name");
      }
    } else if (
      this.state.technology === undefined ||
      this.state.total_experience === undefined ||
      this.state.sub_technology === undefined ||
      this.state.relevant_experience === undefined
    ) {
      if (this.state.technology === undefined) {
        message.warning("Please Fill technology");
      } else if (this.state.sub_technology === "") {
        message.warning("Please Fill sub technology");
      } else if (this.state.total_experience === undefined) {
        message.warning("Please Fill total_experience");
      } else if (this.state.relevant_experience === undefined) {
        message.warning("Please Fill relevant_experience");
      }
 
    } else {
      this.setState({ loading: true });

      let tech = [];
      let sub_tech = [];

      if (!this.state.client) {
        tech.push(parseInt(this.state.technology.id));
        sub_tech.push(parseInt(this.state.sub_technology.id));
      }

      let formData = new FormData();
      let formData2 = new FormData();

      if (!this.state.client) {
        formData.append("technology", [tech]);
        formData.append("sub_technology", [sub_tech]);
        formData.append("total_experience", this.state.total_experience.value);
        formData2.append(
          "relevant_experience",
          this.state.relevant_experience.value
        );
      }

      formData.append("pincode", this.state.pincode);
      formData.append("city", this.state.city);
      formData.append("state", this.state.state);
      formData.append("Email", this.state.Email);
      formData.append("resume", this.state.resume);
      formData.append("date_of_birth", this.state.Date_Of_Birth);

      formData2.append("user.is_client",this.state.client)
      formData2.append("First_Name", this.state.First_Name);
      formData2.append("Last_Name", this.state.Last_Name);
      formData2.append("Email", this.state.Email);
      formData2.append("Phone", this.state.Phone);

      // this.state.fileList.length > 0 &&
      //   formData.append("profile_pic", this.state.fileList[0].originFileObj);

      // let data = {
      //   technology: tech,
      //   sub_technology: sub_tech,

      //   First_Name: this.state.First_Name,
      //   Last_Name: this.state.Last_Name,
      //   Date_Of_Birth: this.state.Date_Of_Birth,
      //   Email: this.state.Email,
      //   Phone: this.state.Phone,
      //   pincode: this.state.pincode,
      //   state: this.state.state,
      //   city: this.state.city,
      //   total_experience: this.state.total_experience.value,
      //   relevant_experience: this.state.relevant_experience.value,
      // };

      let id = localStorage.getItem("educator_id");
      let user_id = localStorage.getItem("user_id");
      let auth = localStorage.getItem("token");

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
            // message.success("Saved");
            // window.location.reload();
            return response.json();
          } else if (response["status"] === 400 || response["status"] === 500) {
            message.error("Something went wrong");
            //console.log("Something is wrong");
          }
        })
        .then((data) =>
        
          fetch(url + "/currentuser/", {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + auth,
            },
            body: formData2,
          })
        .then((response) => {
          console.log("response", response);
          if (response["status"] === 201 || response["status"] === 200) {
            message.success("Saved");
            window.location.reload();
            return response.json();
          } else if (response["status"] === 400 || response["status"] === 500) {
            message.error("Something went wrong");
            //console.log("Something is wrong");
          }
        })
        
        )
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
                message.success("Saved");
                window.location.reload();
                // window.location.reload();
                return response.json();
              } else if (response["status"] === 400) {
                message.error("Something went wrong!");
                // console.log("Something is wrong");
              }
            });
          }
        });

    }
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    // console.log("file", file);
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

  handleResume = (e) => {
    const file = e.target.files[0];
    console.log(file);
    this.setState({
      resume: file,
    });
  };

  HandleImageChange = async ({ fileList }) => {
    this.setState({ fileList });
    this.setState({ Uploading: true });

    let id = localStorage.getItem("educator_id");
    let user_id = localStorage.getItem("user_id");

    let formData = new FormData();
    this.state.fileList.length > 0 &&
      formData.append("profile_pic", this.state.fileList[0].originFileObj);

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
          message.success("Saved");
          window.location.reload();
          return response.json();
        } else if (response["status"] === 400 || response["status"] === 500) {
          message.error("Something went wrong");
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
              message.success("Saved");
              window.location.reload();
              return response.json();
            } else if (response["status"] === 400) {
              message.error("Something went wrong!");
              // console.log("Something is wrong");
            }
          });
        }
      }).then()
    // .then((data) => this.setState({ Uploading: false }));
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
    } else if (identity === "Email") {
      this.setState({ Email: data });
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          data.toLowerCase()
        )
      ) {
        this.setState({ setemail_validate: "" });
      } else {
        this.setState({ setemail_validate: "Please enter a valid email" });
      }
    } else if (identity === "Phone") {
      this.setState({ Phone: data });
      if (/^(\+\d{1,3}[- ]?)?\d{10}$/.test(data)) {
        this.setState({ setmobile_validate: "" });
      } else {
        this.setState({
          setmobile_validate: "Please enter a valid mobile number",
        });
      }
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  formatDate = (date)  => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  onChange = (date, dateString) => {
    if(date === null)
    {
      this.setState({ Date_Of_Birth: null})
    }else{
      this.setState({ Date_Of_Birth: this.formatDate(date) });
    }
    
   
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
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
      loading,
      client,
    } = this.state;

    const props = {
      action: "//jsonplaceholder.typicode.com/posts/",
      listType: "picture",
      previewFile(file) {
        // console.log("Your upload file:", file);
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
        <Button variant='text' style={{backgroundColor:'#3743B1', color:'white', width:96, padding:1, fontSize:12, borderRadius:"0 0 10px 10px", outline:0}}> CHANGE </Button>

        {/* <UploadOutlined /> */}
        {/* <div style={{ marginTop: 8 }}>Upload</div> */}
      </div>
    );

    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    const customStyles = {
      control: (base, state) => ({
        ...base,
        padding: 5,
        borderColor : '#3743B1',
        boxShadow: "none",
        color : '#3743B1',
        // You can also use state.isFocused to conditionally style based on the focus state
      }),
      menuPortal: base => ({ ...base, zIndex: 9999 })
    };
    return (
      <div>
        <Navbar />
        {/* <Link to="/">
          <img className="Profile__logo" src={kodecrux} />
        </Link> */}

        {this.state.PageLoading ? (
          <div className="Spinner_Loading">
            <Spin size="large" />
          </div>
        ) : localStorage.getItem("user_id") ? (
          <div className="Profile">

            <div className="Profile__container">
              <div className="Profile__title">
                <h2 style={{fontSize:16, color:'#3743B1', fontWeight:'normal'}}>PROFILE</h2>
                {/* <h6>Add/edit Information about yourself</h6> */}
              </div>
              <div className="Profile__section">
                <div className="profile__image">
                  {" "}
                  {profile_pic ? (
                    <Image style={{border:2, borderColor:'#3743B1', borderStyle:'dashed'}} width={96} height={98} src={`${profile_pic}`} />
                  ) : (
                    <Image
                      style={{border:2, borderColor:'#3743B1', borderStyle:'dashed'}}
                      width={96}
                      height={98}
                      src="error"
                      fallback="data:image/png;base64,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"
                    >
                    </Image>
                  )}
                  {this.state.Uploading ? (
                    <div style={{ color: "#3743B1", fontSize:10 }}>
                      Uploading <LoadingOutlined />{" "}
                    </div>
                  ) : (
                    <Upload
                      beforeUpload={(file) => {
                        const isJPG =
                          file.type === "image/jpeg" ||
                          file.type === "image/png";
                        if (!isJPG) {
                          message.error("You can only upload JPG or PNG file!");
                          return false;
                        } else {
                          return true;
                        }
                      }}
                      customRequest={dummyRequest}
                      //  action="https://next.json-generator.com/api/json/get/4ytyBoLK8"
                      // listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreview}
                      onChange={(e) => this.HandleImageChange(e)}
                    >
                      {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                  )}
                  {/* <img src={`${profile_pic}`} /> */}
                </div>
                <div className="profile__input_Fields">
                  <form onSubmit={this.onSubmit}>
                    <Col>
                      <div style={{ textAlign: "center", margin: "10px" }}>
                        {/* <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload> */}
                        {/* <Modal
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
                          </Modal> */}
                      </div>

                      <div className="form__group" style={{display:'flex', gap:20}}>
                        <TextField variant="outlined" name="First_Name" className="form__control" label="FIRST NAME" type="text" value={First_Name} onChange={this.handleChange} />
                        <TextField variant="outlined" name="Last_Name" className="form__control" label="LAST NAME" type="text" value={Last_Name} onChange={this.handleChange} />
                      </div>
                      {/* <div className="form__group">
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
                      </div> */}
                      {/* <div class="form__group">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <label>Date of Birth</label>

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
                        </div>
                      </div> */}
                      <div className="form__group">
                        {/* <label>Email</label>
                        <input
                          type="email"
                          className="form__control"
                          id="email"
                          name="Email"
                          placeholder="Your Email Here"
                          onChange={(e) =>
                            this.handleData("Email", e.target.value)
                          }
                          value={Email}
                        /> */}
                        <TextField variant="outlined" className="form__control" label="EMAIL ADDRESS" type="email" value={Email} onChange={(e) =>
                            this.handleData("Email", e.target.value)} />
                      </div>

                      <div className="form__group">
                        {/* <label>Phone no</label>
                        <input
                          type="text"
                          className="form__control"
                          id="Phone"
                          placeholder="Enter Mobile Number"
                          name="Phone"
                          onChange={(e) =>
                            this.handleData("Phone", e.target.value)
                          }
                          value={Phone}
                        /> */}
                        <TextField variant="outlined" className="form__control" label="PHONE NUMBER" type="number" value={Phone} onChange={(e) =>
                            this.handleData("Phone", e.target.value)
                          } />
                      </div>

                      <div class="form__group" style={{display:'flex', gap:20}}>
                        {/* <label>Pin Code</label>
                        <input
                          className="form__control"
                          value={pincode}
                          name="pincode"
                          type="text"
                          placeholder="Enter Your Postal Code"
                          onChange={this.handleChange}
                        /> */}
                        <TextField variant="outlined" name="pincode" className="form__control" label="PIN CODE" type="text" value={pincode} onChange={this.handleChange}
                           />
                        <TextField variant="outlined" name="city" className="form__control" label="CITY" type="text" value={state} onChange={this.handleChange}
                           />
                      </div>
                      <div class="form__group">
                        {/* <label>State</label>
                        <input
                          className="form__control"
                          value={state}
                          name="state"
                          type="text"
                          placeholder="Enter Your state"
                          onChange={this.handleChange}
                        /> */}
                        <TextField variant="outlined" name="state" className="form__control" label="STATE" type="text" value={state} onChange={this.handleChange}
                           />
                      </div>
                      {/* <div class="form__group"> */}
                        {/* <label>City</label>
                        <input
                          className="form__control"
                          value={city}
                          name="city"
                          type="text"
                          placeholder="Enter Your city"
                          onChange={this.handleChange}
                        /> */}
                        
                      {/* </div> */}

                      {client ? (
                        " "
                      ) : (
                        <>
                          <div class="form__group">
                            <label style={{color:'#3743B1'}}>TECHNOLOGY</label>

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
                              styles={customStyles}
                              isSearchable={true}
                              openMenuOnClick={true}
                              placeholder={"CHOOSE TECHNOLOGY"}
                              value={technology}
                              isMulti
                            />
                          </div>

                          <div class="form__group">
                            <label style={{color:'#3743B1'}}>SUB TECHNOLOGY</label>

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
                              styles={customStyles}
                              isSearchable={true}
                              openMenuOnClick={true}
                              placeholder={"CHOOSE SUB TECHNOLOGY"}
                              value={this.state.sub_technology}
                            />
                          </div>

                          <div class="form__group">
                            <label style={{color:'#3743B1'}}>TOTAL EXPERIENCE</label>

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
                              styles={customStyles}
                              options={experienceData}
                              isSearchable={true}
                              openMenuOnClick={true}
                              placeholder={"YEARS OF EXPERIENCE"}
                              value={total_experience}
                            />
                          </div>

                          <div class="form__group">
                            <label style={{color:'#3743B1'}}>RELEVANT EXPERIENCE</label>

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
                              styles={customStyles}
                              options={experienceData}
                              isSearchable={true}
                              openMenuOnClick={true}
                              placeholder={"RELEVANT YEARS OF EXPERIENCE"}
                              value={relevant_experience}
                            />
                          </div>
                          <div class="form__group">
                            <div
                              style={{ display: "flex", flexDirection:'column' }}
                            >
                              <label style={{ marginRight: "3vw", color:'#3743B1' }}>
                                ATTACH RESUME
                              </label>
                              
                                <input
                                  type="file"
                                  // className=""
                                  // className="form__control"
                                  onChange={(e) => this.handleResume(e)}
                                  accept="image/*, .pdf, .doc,.docx"
                                  id="raised-button-file"
                                  hidden
                                />
                                <label htmlFor="raised-button-file">
                                  <Button variant="outlined" className="upload-image" component="span">
                                    SELECT FILE
                                  </Button>
                                </label> 
                            </div>
                          </div>
                        </>
                      )}
                    </Col>
                    <Col className="registration__details__footer">
                    <button type="submit" onClick={this.onSubmit}>
                      {loading ? <Spin indicator={antIcon} /> : "Save"}
                    </button>
                      {/* <button type="submit">
                        {loading ? <Spin indicator={antIcon} /> : "Save"}
                      </button> */}
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
