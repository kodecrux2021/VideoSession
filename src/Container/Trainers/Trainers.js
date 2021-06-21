import React, { Component } from "react";
import TrainersCard from "./TrainersCard";
import avatar from "../../assets/images/user.png";
import { url } from "../../Server/GlobalUrl";
import { message } from "antd";
import Navbar from "../../components/Header/Navbar";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import kodecrux from "../../assets/images/reg2.jpeg";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Select from 'react-select';
import ReactPolling from "react-polling";
import { Typography } from "@material-ui/core";
import { isMobile } from "react-device-detect";

let uri = "";
export default class Trainers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trainers: [],
            user: [],
            isModalVisible: false,
            loading: true,
            rec_id: null,
            new_param: localStorage.getItem("parameter").substring(1),
            selected: [],
            recommended_selected: [],
            defaultTech : [],
            technology_list: [],
            subtech_list: [],
        }
        this.handleSelect = this.handleSelect.bind(this)
    }
//   state = {
    
//     // pollingurl: url+" /api/educator/" + localStorage.getItem("parameter"),
//   };

  //     setLoading=()=> {
  // this.setState({loading: false})
  //     }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

handleSelect(val) {
    console.log(val);
    this.setState({selected: val})
    // this.setState({ selected: val });
}

handleSubmit = () => {
    console.log(this.state)
}

handleRecommendedSelect(val) {
    let selected = [...this.state.recommended_selected]
    const index = selected.findIndex(
        (Item) => Item === val
    );
    if (index >= 0) {
        selected.splice(index, 1);
    }
    else {
        selected.push(val)
    }

    this.setState({ recommended_selected: selected });
}

componentDidMount() {
    // console.log('previous token', localStorage.getItem("token"))
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
            // console.log('result.access', result.access)
            localStorage.setItem("token", result.access);
          }
        })
        .catch((e) => console.log(e));
    }
    let searchData = JSON.parse(localStorage.getItem('searchData'))
    console.log(typeof(searchData.technology))
    this.setState({selected : searchData.technology, recommended_selected : searchData.sub_technology})
    console.log(searchData)
    fetch(`${url}/api/technology/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
           console.log('result', result)
            this.setState({ technology_list: result })
            let selected_Techs = []
            result.forEach((k,i) => {
                searchData.technology.forEach((v,i_n) => {
                    if (k.id === v) {
                        selected_Techs.push(k)
                    }
                })
            })
            this.setState({defaultTech : selected_Techs, selected : selected_Techs})

          }
        )
    
    let auth = localStorage.getItem("token");

    fetch(url + "/currentuser/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("current user result", result.user);
        this.setState({ user: result.user });
        fetch(url + "/api/educator/?" + this.state.new_param, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            console.log("result1", result);
            this.setState({ trainers: result, loading: false });
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));

    uri = window.location.href.split("/").pop();
  }

  // messageHandle = (id, reciever_id, conversation_id) => {
  //     message.info('Request Sent');
  //     this.handleCancel();
  // }

  messageHandle = (id) => {
    // console.log('data', id)

    let data = {
      sent_by: this.state.user.id,
      recieved_by: id,
      accepted: null,
    };

    // console.log('data_______________', data);
    let auth = localStorage.getItem("token");
    fetch(url + "/api/request/", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + auth,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // console.log("response", response)
        if (response["status"] === 201 || response["status"] === 200) {
          message.info("request has been sent");
          return response.json();
        } else if (response["status"] === 400) {
          message.info("Something went wrong!");
          // console.log('Something is wrong')
        }
      })
      .catch((e) => console.log(e));

    //this.props.history.push('/chat/'+ conversation_id)

    //     let auth = localStorage.getItem('token')

    //     let data = {
    //         "includes": [reciever_id],
    //         "archived_by": [this.state.user.id]
    //     }
    // console.log('data',data)
    //     fetch(url + '/api/conversation/', {
    //         method: 'POST',
    //         headers: {
    //            'Accept': 'application/json',
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data)
    //     })
    //         .then((response) => {
    //          if (response['status'] === 201 || response['status'] === 200) {
    //             return response.json()
    //         } else if (response['status'] === 401) {
    //             message.info('Something went wrong');
    //         }
    //         })
    //         .then((result) => {
    //             if (result){
    //             console.log('result',result)

    //             let data = {
    //                 "conversation": [result.id]
    //             }

    //             fetch(url + '/api/educator/'+id+'/', {
    //                 method: 'PUT',
    //                 headers: {
    //                    'Accept': 'application/json',
    //                   'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(data)
    //             })
    //                 .then((response) => {
    //                  if (response['status'] === 201 || response['status'] === 200) {
    //                     return response.json()
    //                 } else if (response['status'] === 401) {
    //                     message.info('Something went wrong');
    //                 }
    //                 })
    //                 .then((result) => {
    //                     if (result){
    //                     console.log('result',result)
    //                     this.props.history.push('/chat/'+ result.conversation[0])
    //                     }
    //                 }
    //                 )

    //             }
    //         }
    //         )

    this.handleCancel();
  };

  showModal = (id) => {
    // console.log('show')
    this.setState({ rec_id: id });
    this.setState({ isModalVisible: true });
  };
  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  handleReset = () => {
      this.setState({selected : [], recommended_selected: [], defaultTech : []})
  }
  hireHandle = () => {
    //     let auth = localStorage.getItem("token");
    //     let user_id=localStorage.getItem("user_id");
    //     let hire_id=localStorage.getItem("hire_id");
    //   console.log(user_id,localStorage.getItem("id"))
    // let data = {
    //   user_id: localStorage.getItem("user_id"),
    //   hire_id: localStorage.getItem("hire_id"),
    // };

    // fetch(`${url}/api/check_hire/${user_id}/${hire_id}`, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json, text/plain",
    //     "Content-Type": "application/json;charset=UTF-8",
    //     Authorization: "Bearer " + auth,
    //   }
    // }).then((response) => {
    //     // console.log("response", response)
    //     if (response["status"] === 201 || response["status"] === 200) {
    //       console.log("GOT RESPONSE");
    //       let res = response.json();
    //       console.log(res);
    //     } else if (response["status"] === 400) {
    //       message.info("Something went wrong!");
    //       // console.log('Something is wrong')
    //     }
    //   })
    //   .catch((e) => console.log(e));

    this.props.history.push("/investor");
  };

  submitHandler = async (e) => {
    e.preventDefault();
    if (this.state.selected.length !== null && this.state.selected.length > 0) {

      localStorage.setItem("sub_techs", this.state.recommended_selected);
      let param = "";

      param += "&usersub_technology=[";
      param += localStorage.getItem("sub_techs");
      let new_param1 = param;
      new_param1 += "]";
      localStorage.setItem("parameter", new_param1);
    //   console.log(localStorage.getItem("parameter"));
        // message.info("Submitted Successfully!!!");
    //   this.props.history.push("/trainers/message");
      // console.log('state', this.state);
      let tech = []
      let sub_tech = []
      console.log(this.state.recommended_selected);
      this.state.selected.map((item) => (
        tech.push(parseInt(item.id))
      ))

      sub_tech = [...this.state.recommended_selected]
      let data = {
        "technology": tech,
        "sub_technology": sub_tech,
      }
      localStorage.setItem('searchData', JSON.stringify(data))
      window.location.reload()
      
    }


    else {
      message.info('Please select a technology')
    }
  }

  render() {
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
      console.log("url is", this.state.new_param)
    return (
      // {}
      <ReactPolling
        url={url + "/api/educator/?" + this.state.new_param}
        interval={3000} // in milliseconds(ms)
        retryCount={30} // this is optional
        onSuccess={(result) => {
          console.log("result1", result);
          this.setState({ trainers: result, loading: false });
          return true;
        }}
        onFailure={() => {
          console.log("pa", this.state.new_param);
          console.log("url", url + "/api/educator/" + this.state.new_param);
          console.log("handle failure");
        }} // this is optional
        method={"GET"}
        headers={{
          "Accept": "application/json",
          "Content-Type": "text/plain",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        }}
        //   body={JSON.stringify(data)} // data to send in a post call. Should be stringified always
        render={({ startPolling, stopPolling, isPolling }) => {
          if (isPolling) {
            return (
              <div>
                  <Navbar />
                  {this.state.loading ? (
                    <div
                      style={{
                        width: "100%",
                        height: "100vh",
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <Spin size="large" />
                    </div>
                  ) : (
                    <div className="body__ctr1">
                        <div className="advance_Card" style={isMobile ? {marginTop:80, display:'flex', justifyContent:'center'} : {}}>
                        <div className="advance_search_card">
                            <Typography style={{fontSize:22, fontWeight:400}}>Advance Search</Typography>
                            <div style={{marginTop:20}}>
                                {this.state.selected?.length === 0 || this.state.selected === null ? null : <Typography style={{fontSize:12,
                                        zIndex:9, marginTop:-10, marginLeft:10,
                                        color:'#3743B1', position:'absolute'}}><p style={{backgroundColor:'white'}}>TECHNOLOGIES</p></Typography>}
                                <Select
                                    id="tech-select"
                                    // className="basic-multi-select"
                                    classNamePrefix="select"
                                    onChange={this.handleSelect}
                                    getOptionLabel={option =>
                                        `${option.name}`
                                    }
                                    defaultValue={this.state.defaultTech}
                                    menuPortalTarget={document.body} 
                                    getOptionValue={option => `${option.id}`}
                                    name="colors"
                                    options={this.state.technology_list}
                                    isSearchable={true}
                                    isMulti
                                    placeholder={'TECHNOLOGIES'}
                                    styles={customStyles}
                                    />
                                <div style={{marginTop:10}}>
                                    {this.state.selected !== null || this.state.selected?.length > 0 ? <Typography style={{color:'#3743B1', fontSize:14}}>Recommended technologies</Typography> : null}
                                    
                                    <div style={{border:1, borderStyle:'solid', borderColor:'#3743B1', padding:20, borderRadius:10, display:'flex', flexWrap:'wrap', gap:10}}>
                                    {this.state.selected !== null && this.state?.selected.map(t => (
                                        t.sub_technology.map(s => (
                                            <button className={!this.state.recommended_selected.includes(s.id) ? 'button_unselect' : 'button__selected'} key={s.name} onClick={() => this.handleRecommendedSelect(s.id)}>
                                            {s.name}
                                            {!this.state.recommended_selected.includes(s.id) ? <AddCircleIcon /> : <CancelIcon/>}</button>

                                        ))))}
                                    </div>
                                </div>
                                <div style={{display:'flex', flex:1, justifyContent :'flex-end', outline:'none'}}>
                                    <button className='help__next__btn' style={{maxWidth:'100%'}} onClick={this.submitHandler} >SUBMIT</button>
                                </div>
                                <div style={{display:'flex', flex:1, justifyContent :'flex-end', outline:'none'}}>
                                    <button className='help_reset_btn' style={{maxWidth:'100%'}} onClick={this.handleReset} >RESET</button>
                                </div>
                            </div>
                        </div>
                      </div>

                      <div
                        className=" d-flex  p-3"
                        style={{ alignItems: "center", flexWrap:'wrap', gap:30, flex:1, justifyContent:'center' }}
                      >
                        {Array.isArray(this.state.trainers) && this.state.trainers.map((trainer) => (
                          
                          <TrainersCard
                            key={trainer.id}
                            name={`${trainer.user_first_name} ${trainer.user_last_name}`}
                            img={
                              trainer.profile_pic !== null
                                ? `${trainer.profile_pic}`
                                : ""
                            }
                            img2={avatar}
                            online={false}
                            isOnline={trainer.is_online}
                            ratingNumber = {trainer.no_of_ratings}
                            rating={trainer.rating.stars__avg}                      //<=========================== Changed Here
                            details={trainer.designation}
                            rate={trainer.fees}
                            lastseen={trainer.last_seen}
                            technology={trainer.user_technology}
                            time="15"
                            reviews="150"
                            id={trainer.id}
                            reciever_id={trainer.user_id}
                            conversation_id={trainer.conversation}
                            message={uri === "message"}
                            messageHandle={this.messageHandle}
                            showModal={this.showModal}
                            handleCancel={this.handleCancel}
                            isModalVisible={this.state.isModalVisible}
                            hireHandle={this.hireHandle}
                            rec_id={this.state.rec_id}
                            video={trainer?.bill[0]?.video}
                            // badge={false}
                          />
                        ))}
                      </div>
                    </div>
                    
                  )}
              </div>
            );
          } else {
            return <div>Polling stopped</div>;
          }
        }}
      />
    );
  }
}