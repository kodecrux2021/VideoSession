import { Button } from '@material-ui/core'
import { message, Typography } from 'antd'
import React from 'react'
import { isMobile } from 'react-device-detect'
import Navbar from '../../components/Header/Navbar'
import { url } from '../../Server/GlobalUrl'

class Selector extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            codeexpert : true
        }
    }

    componentDidMount = () => {

    }

    handleNext = () => {
        let data = {
            is_client : !this.state.codeexpert
        }
        if (!this.state.codeexpert) {
            let auth = localStorage.getItem("token")
            let user_id = localStorage.getItem("user_id");
            fetch(url + "/api/customuser/" + user_id + "/", {
                method: "PUT",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  "Authorization" : "Bearer " + auth
                },
                body: JSON.stringify(data),
              })
                .then((response) => {
                  //console.log("response", response);
                  if (response["status"] === 201 || response["status"] === 200) {
                    message.success("Saved");
                    // window.location.reload();
                    localStorage.setItem('is_client', !this.state.codeexpert);
                    return response.json();
                  } else if (response["status"] === 400 || response["status"] === 500) {
                    message.error("Something went wrong");
                    //console.log("Something is wrong");
                  }
                })
                .then(async (result) => {

                    this.props.history.push("/details");
                })
        }else {
            localStorage.setItem('is_client', !this.state.codeexpert);
            this.props.history.push("/details");
        }   
    }

    render() {
        return (
            <div style={{display:'flex', flexDirection:'column'}}>
                <Navbar />
                <div style={{flex:1, justifyContent:'center', alignItems:'center', display:"flex", minHeight:400}}>
                    <div style={{width: isMobile ? "80%" : '50%', height:300, boxShadow:"0 3px 6px whitesmoke", borderRadius:10}}>
                        <Typography style={{padding:"40px 40px 0 40px", fontSize:18}}>Select Profile Type</Typography>
                        <div className="select__container" style={{padding:40}} >
                            <button className={this.state.codeexpert ?'select__button__active':'select__button'}  value="codeexpert" onClick={() => {
                                this.setState({codeexpert : true})}}>CODE EXPERT/INSTRUCTOR</button>
                            <button className={!this.state.codeexpert ?'select__button__active':'select__button'} value="customer" onClick={() => {
                                 this.setState({codeexpert : false})}} >CUSTOMER/STUDENT</button>
                        </div>
                        <div style={{display:'flex', flex:1, justifyContent:'flex-end', padding:"0 40px"}}>
                            <button style={{outline:"none", maxWidth:200}} onClick={this.handleNext}
                          className='login__signInButton'>NEXT</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Selector