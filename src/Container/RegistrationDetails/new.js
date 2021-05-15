import React from "react";
import { Col } from "react-bootstrap";
import "./style.css";
import { Upload, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Select from "react-select";
// import icon from "../../assets/images/reg2.jpeg";
import { message } from "antd";
import Navbar from "../../components/Header/Navbar";
import { url } from "../../Server/GlobalUrl";
import { DatePicker} from "antd";
import { UploadOutlined } from '@ant-design/icons';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import { Card, Checkbox, TextField } from '@material-ui/core';
import {ReactComponent as EkodeLogo} from '../../assets/eKodeLogo.svg';



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

const dummyRequest = ({ file, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);
};

class New extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
    imgUrl: "",
    file: null,

    desig: "",
    fees: 0,
    rating: 0,

    tech_list: [],
    subtech_list: [],
    technology: [],
    sub_technology: [],

    pincode: null,
    state: "",
    city: "",
    total_experience: null,
    relevant_experience: null,
    date_of_birth: "",

    checked: false
  };

  onChange = (date, dateString) => {
    // console.log(date,dateString);
    // this.setState({ date_of_birth: dateString });
    this.handelData('date_of_birth', dateString)
  };

  componentDidMount() {
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
        });
    }

    //let auth = localStorage.getItem("token");

    fetch(url + "/api/technology/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        //console.log("result", result);
        this.setState({ tech_list: result });
      });
  }

  handelData = (identity, data) => {
    // console.log("identity", identity);
    //console.log("data", data);
    if (identity === "pincode") {
      this.setState({ pincode: data });
    } else if (identity === "state") {
      this.setState({ state: data });
    } else if (identity === "city") {
      this.setState({ city: data });
    } else if (identity === "technology") {
      console.log(data)
      this.setState({ technology: data});
      let subTechList = []
      for (let i = 0; i < data?.length; i++) {
        subTechList = [...subTechList , ...data[i]["sub_technology"]]
        
      }
      this.setState({subtech_list : subTechList})
    } else if (identity === "sub_technology") {
      this.setState({ sub_technology: data });
    } else if (identity === "total_experience") {
      this.setState({ total_experience: data });
    } else if (identity === "relevant_experience") {
      this.setState({ relevant_experience: data });
    } else if (identity === "desig") {
      this.setState({ desig: data });
    } else if (identity === "fees") {
      this.setState({ fees: data });
    } else if (identity === "rating") {
      this.setState({ rating: data });
    } else if (identity === "date_of_birth") {
      this.setState({ date_of_birth: data });
    }
    else if (identity === "date_of_birth") {
      this.setState({ date_of_birth: data });
    }
  };

  // (statename ? stateFormat.test(statename) : true) &&

  onSubmit = async (e) => {
    e.preventDefault();
    let designationFormat = /^[A-Za-z ]{1,40}$/;
    
    
    console.log("rexp", this.state.sub_technology === "");
    if (
      this.state.pincode === null ||
      this.state.city === "" ||
      this.state.state === "" ||
      // this.state.date_of_birth === "" ||
      this.state.resume === "" ||
      this.state.desig === "" ||
      (this.state.desig ? !designationFormat.test(this.state.desig) : false) ||
      this.state.fileList.length === 0 ||
      this.state.total_experience === null ||
      this.state.relevant_experience === null ||
      this.state.rating === 0 ||
      this.state.fees === 0 ||
      this.state.technology === "" ||
      this.state.sub_technology === ""
    ) {
      {
        console.log("hello");
      }
      if (this.state.pincode === "") {
        message.info("Please Fill Pincode");
      } else if (this.state.city === "") {
        message.info("Please Fill City");
      } else if (this.state.state === "") {
        message.info("Please Fill State");
      // } else if (this.state.date_of_birth === "") {
      //   message.info("Please Fill Date of birth");
      } else if (this.state.resume === "") {
        message.info("Please upload the resume");
      } else if (this.state.desig === "") {
        message.info("Please fill designation");
      } else if (
        this.state.desig
          ? designationFormat.test(this.state.desig) === false
          : false
      ) {
        message.info("Designation cannot have numeric values");
      } else if (this.state.fileList.length === 0) {
        message.info("Please upload profile picture");
      }  else if (this.state.technology === "") {
        message.info("Please Select Technology");
      } else if (this.state.sub_technology === "") {
        message.info("Please Select Sub Technology");
      } else if (this.state.total_experience === null) {
        message.info("Please Enter Total Experience");
      } else if (this.state.relevant_experience === null) {
        message.info("Please Enter Relevant Experience");
      }
      // else if(this.state.date_of_birth === ""){
      //   message.info("Please Fill Date of birth");

      // }
    } else {
      let tech = [];
      let sub_tech = [];

      tech.push(parseInt(this.state.technology?.id));
      sub_tech.push(parseInt(this.state.sub_technology?.id));
      
      let formData = new FormData();

      formData.append('pincode', this.state.pincode);
      formData.append('city', this.state.city);
      formData.append('state', this.state.state);
      formData.append('technology', [this.state.technology?.id]);
      formData.append('sub_technology',[this.state.sub_technology?.id] );
      formData.append('total_experience', this.state.total_experience?.value);
      formData.append('relevant_experience', this.state.relevant_experience?.value);
      this.state.fileList.length > 0 && formData.append('profile_pic', this.state.fileList[0].originFileObj);
      formData.append('designation', this.state.desig);

      // formData.append('date_of_birth',  this.state.date_of_birth);
      // formData.append('fees', this.state.fees);
      // formData.append('rating', this.state.rating);
      // formData.append('profile_pic', this.state.file)

      let data = {
        pincode: this.state.pincode,
        city: this.state.city,
        state: this.state.state,
        technology: [this.state.technology?.id],
        sub_technology: [this.state.sub_technology?.id],
        total_experience: this.state.total_experience?.value,
        relevant_experience: this.state.relevant_experience?.value,
        date_of_birth: this.state.date_of_birth,
        fees: this.state.fees,
        designation: this.state.desig,
        rating: this.state.rating,
        profile_pic: this.state.file,
      };

      console.log("data_______________", formData);
      // console.log(tech, sub_tech);
      // console.log(this.state.sub_technology?.id);
      let id = localStorage.getItem("educator_id");
      let user_id = localStorage.getItem("user_id");

      
      fetch(`${url}/api/customusersecond/${user_id}/`, {
        method: "PUT",
        headers: {
          Accept: "application/json, text/plain",
          // "Content-Type": `multipart/form-data`,
        },
        body: formData,
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

          let auth = localStorage.getItem("token");
          if (localStorage.getItem("is_client")) {
           await fetch(`${url}/api/educatorcreate/${id}/`, {
              method: "PUT",
              headers: {
                Accept: "application/json, text/plain",
                //"Content-Type": "application/json;charset=UTF-8",
                Authorization: "Bearer" + auth,
              },
              body: formData,
            })
              .then((response) => {
                console.log("response2", response);
                if (response["status"] === 201 || response["status"] === 200) {
                  return response.json();
                } else if (response["status"] === 400) {
                  message.info("Something went wrong!");
                  // console.log("Something is wrong");
                }
              })
              .then((result) => {
                //console.log(result);
                this.props.history.push("/verification");
                // fetch( url + '/api/educator/' , {
                //     method: 'POST',
                //     headers: {
                //         'Accept': 'application/json, text/plain',
                //         'Content-Type': 'application/json;charset=UTF-8',

                //     },
                //     body: JSON.stringify(data)
                // })
                // .then((response) => {
                //     console.log("response", response)
                //     if (response['status'] === 201 || response['status'] === 200) {
                //         return response.json()
                //     } else if (response['status'] === 400) {
                //             console.log('Something is wrong')
                //     }
                // })
                // .then((result) => {
                //     console.log('result', result);
                // })
                //console.log("result", result);
              });
          } else {
            // this.props.history.push("/verification");
          }
        })
        .catch((e) => console.log(e));

      // this.props.history.push("/verification");
    }
    
};

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    //console.log("file", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      // console.log(file.preview);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = async({ fileList }) => {
      //fileList[0].originFileObj.url = URL.createObjectURL(fileList[0].originFileObj);
      //fileList[0].originFileObj.preview = await getBase64(fileList[0].originFileObj)
      this.setState({ fileList });
      // console.log(this.state.fileList) 
      };

      change = async(e)=>{
        e.persist();
        // console.log(e.target.files);
        await this.setState({file: e.target.files[0]})
        // console.log(this.state.file);
}



  render() {
   const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      previewFile(file) {
        console.log('Your upload file:', file);
        // Your process logic. Here we just mock to the same file
        return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
          method: 'POST',
          body: file,
        })
          .then(res => res.json())
          .then(({ thumbnail }) => thumbnail);
      },
    };
    const is_client = localStorage.getItem("is_client");
    //console.log(is_client);
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
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

    const educator =
      !is_client === "true" ? (
        <div className="trainer__details__ctr">
          <div class="form__group">
            <label>Designation</label>
            <input
              type="text"
              value={this.state.desig}
              onChange={(e) => this.handelData("desig", e.target.value)}
              className="form__control"
              placeholder="Designation"
            />
          </div>
          <div class="form__group">
            <label>Fees</label>
            <input
              type="text"
              value={this.state.fees}
              onChange={(e) => this.handelData("fees", e.target.value)}
              className="form__control"
              placeholder="Fees"
            />
          </div>
          <div class="form__group">
            <label>Rating</label>
            <input
              type="text"
              value={this.state.rating}
              onChange={(e) => this.handelData("rating", e.target.value)}
              className="form__control"
              placeholder="Rating"
            />
          </div>
        </div>
      ) : null;
    return (
      <>
        <div style={{position:'absolute', display:'flex', flex:1, width:'100%', alignItems:'flex-end',justifyContent:'flex-end', paddingRight:40}}>
            <Link to='/'> <CloseIcon style={{fontSize:30, color:'black'}} /> </Link>
        </div>
        <div style={{marginTop:30, display:'flex', justifyContent:'center', marginBottom:10}}>
            <Card elevation={2} style={{width:100, height:100, display:'flex', justifyContent:'center', alignItems:'center', borderRadius:30,}}>
                <Link to='/'>
                    <EkodeLogo  />
                </Link>
            </Card>
        </div>

        <div className="registration__page__two">
          <form className="registration__details__container">
            <div className="registration__details__img">
              {/* <img src={icon} alt="KodeCrux"></img> */}
              <>
              
              {/* <input type= 'file' onChange = {(e)=>this.change(e)} /> */}
                <Upload
                beforeUpload = {(file) => {
                  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                      if (!isJPG) {
                          message.error('You can only upload JPG or PNG file!');
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
                  onChange={(e) => this.handleChange(e)}
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
                <span style={{ color: "#3743B1", fontSize:12}}>
                  Profile Picture
                </span>
              </>
            </div>

            <Col style={{ marginTop: "10px" }}>
              <div class="form__group" style={{display:'flex', gap:20}}>
                <TextField variant="outlined" className="form__control" label="PIN CODE" type="number" value={this.state.pincode} onChange={(e) => this.handelData("pincode", e.target.value)} />
                <TextField variant="outlined" className="form__control" label="CITY" type="text" value={this.state.city} onChange={(e) => this.handelData("city", e.target.value)} />
              </div>

              <div class="form__group">
                <TextField variant="outlined" className="form__control" label="STATE" type="text" value={this.state.state} onChange={(e) => this.handelData("state", e.target.value)} />
              </div>
              
              {educator}

              {is_client === "true" ? null : (
                <div className="trainer__details__ctr">
                  <div class="form__group">
                    <label>TECHNOLOGY</label>
                    <Select
                      className="react-selectcomponent"
                      classNamePrefix="select"
                      onChange={(value) => {
                          this.handelData("technology", value)
                        }}
                      getOptionLabel={(option) => `${option.name}`}
                      getOptionValue={(option) => `${option.id}`}
                      isOptionSelected={(option) =>
                        this.state.technology === option.name ? true : false
                      }
                      styles={customStyles}
                      options={this.state.tech_list}
                      isSearchable={true}
                      isMulti
                      openMenuOnClick={true}
                      placeholder={"CHOOSE TECHNOLOGY"}
                    />
                  </div>

                  <div class="form__group">
                    <label>SUB TECHNOLOGY</label>
                    <Select
                      className="react-selectcomponent"
                      classNamePrefix="name-select"
                      onChange={(value) =>
                        this.handelData("sub_technology", value)
                      }
                      getOptionLabel={(option) => `${option.name}`}
                      getOptionValue={(option) => `${option.id}`}
                      isOptionSelected={(option) =>
                        this.state.sub_technology === option.name ? true : false
                      }
                      isMulti
                      styles={customStyles}
                      options={this.state.subtech_list}
                      isSearchable={true}
                      openMenuOnClick={true}
                      placeholder={"CHOOSE SUB TECHNOLOGY"}
                    />
                  </div>

                  <div class="form__group">
                    <label>TOTAL EXPERIENCE</label>
                    <Select
                      className="react-selectcomponent"
                      classNamePrefix="name-select"
                      onChange={(value) =>
                        this.handelData("total_experience", value)
                      }
                      getOptionLabel={(option) => `${option.name}`}
                      getOptionValue={(option) => `${option}`}
                      isOptionSelected={(option) =>
                        this.state.sub_technology === option.name ? true : false
                      }
                      styles={customStyles}
                      options={experienceData}
                      isSearchable={true}
                      openMenuOnClick={true}
                      placeholder={"YEARS OF EXPERIENCE"}
                    />
                  </div>

                  <div class="form__group">
                    <label>RELEVANT EXPERIENCE</label>
                    <Select
                      className="react-selectcomponent"
                      classNamePrefix="name-select"
                      onChange={(value) =>
                        this.handelData("relevant_experience", value)
                      }
                      getOptionLabel={(option) => `${option.name}`}
                      getOptionValue={(option) => `${option}`}
                      isOptionSelected={(option) =>
                        this.state.sub_technology === option.name ? true : false
                      }
                      styles={customStyles}
                      options={experienceData}
                      isSearchable={true}
                      openMenuOnClick={true}
                      placeholder={"YEARS OF RELEVANT EXPERIENCE"}
                    />
                  </div>
                  <div class="form__group">
                    {/* <label>Designation</label>
                    <input
                      type="text"
                      value={this.state.desig}
                      onChange={(e) => this.handelData("desig", e.target.value)}
                      className="form__control"
                      placeholder="Designation"
                    /> */}
                    <TextField variant="outlined" className="form__control"  label="DESIGNATION" type="text" value={this.state.desig} onChange={(e) => this.handelData("desig", e.target.value)} />
                  </div>
                  {/* <div class="form__group">
                    <label>Fees</label>
                    <input
                      type="number"
                      value={this.state.fees}
                      onChange={(e) => this.handelData("fees", e.target.value)}
                      className="form__control"
                      placeholder="Fees"
                    />
                  </div> */}
                  {/* <div class="form__group">
                    <label>Rating</label>
                    <input
                      type="number"
                      value={this.state.rating}
                      onChange={(e) =>
                        this.handelData("rating", e.target.value)
                      }
                      className="form__control"
                      placeholder="Rating"
                    />
                  </div> */}
                </div>
              )}

              {/* <div class="form__group">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label>Date of Birth</label>
                  <div style={{ margin: "0 60px" }}>
                    <DatePicker onChange={this.onChange} format="YYYY-MM-DD"/>
                  </div>
                </div>
              </div> */}
            </Col>
            {/* <div>
              <label>Attach Resume</label>{" "}
            </div>
            <div>
              <input
                type="file"
                className="form__control"
                onChange={(e) => this.handleResume(e)}
                accept="image/*, .pdf, .doc,.docx"
              />
            </div> */}

            <Col className="registration__details__footer">
              <div style={{display:'flex', flexDirection:'row', width:"100%", gap:5}}>
                <Checkbox style={{color:"#3743B1"}} checked={this.state.checked} onChange={() => {this.setState({checked : !this.state.checked})}} />
                <span>By register I agree To</span>
                <span>
                  <a style={{ color: "#3743B1", cursor: "pointer" }}>
                    Term & Condition
                  </a>{" "}
                  and{" "}
                  <a style={{ color: "#3743B1", cursor: "pointer" }}>
                    Privacy policy
                  </a>
                </span>
              </div>
              <button type="submit" disabled={!this.state.checked} style={!this.state.checked ? {backgroundColor:'#BBBBBB', color:'white', border:'none'} : null} onClick={this.onSubmit}>
                DONE
              </button>
            </Col>
          </form>
        </div>
      </>
    );
  }
}

export default New;

