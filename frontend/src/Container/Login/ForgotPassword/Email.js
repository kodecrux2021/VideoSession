import React, { useState } from 'react'
import './ForgotPassword.css'
import kodecrux from '../../../assets/images/reg2.jpeg'
import { Link, useHistory } from 'react-router-dom'
import { message } from 'antd';
import Navbar from '../../../components/Header/Navbar';
import { Modal } from 'antd';
import OtpInput from 'react-otp-input';
import { url } from '../../../Server/GlobalUrl';
import { TextField } from '@material-ui/core';


export default function Email() {

    const [email, setEmail] = useState('');
    const [emailValidate, setEmailValidate] = useState('');
    const [otp, setOtp] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const history = useHistory();

    const handelData = (data) => {

        console.log('data', data)
        setEmail(data);
        if (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.toLowerCase())) {
            setEmailValidate('')
        }
        else {
            setEmailValidate('Please enter a valid email')
        }
    }

    

    const submitHandler = async (e) => {
        e.preventDefault();
        if (email === '' || emailValidate !== '') {
            if (email === '') {
                message.info('Please Fill Email');
            }
            else if(emailValidate !== ''){
                message.info(emailValidate);
            }

        }
        else {
                
                fetch(url + `/password-email/?email=${email}`,{
                  method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then((response) =>
                {console.log("response", response)
                              if (response['status'] === 201 || response['status'] === 200) {
                                  return response.json()
                              } else if (response['status'] === 400) {
                                      console.log('Something is wrong')
                                      message.info('Something went wrong, try again later')
                              }}
                              )
                    .then((result)=>{
                        showModal()
                        console.log(result)
                        localStorage.setItem('verif', result[0].verification_code)})    
            

            //             fetch(url + 'password-email-verification/?email=' + email, {
            //     method: 'POST',
            //     headers: {
            //        'Accept': 'application/json',
            //       'Content-Type': 'application/json',
            //     },

            // })
            //     .then((response) => {
            //      if (response['status'] === 201 || response['status'] === 200) {
            //         return response.json()
            //     } else if (response['status'] === 401) {
            //         message.info('Something went wrong');  
            //     }
            //     })
            //     .then((result) => {
            //         if (result){
            //         console.log('result',result)

            //         }
            //     }
            //     )

            
        }
    }

    const OtpSubmit = async (e) => {
        e.preventDefault();
        if (otp === '') {
            message.info('Please Fill OTP');
        }
        else if (otp !== localStorage.getItem('verif')){
            message.info('Entered OTP is incorrect')
        }
        else {
            history.push('/reset')
        }
    }

    const showModal = () => {
        console.log('show')
        setModalVisible(true)

    };
    const handleCancel = () => {
        setModalVisible(false)
    };

    const onChangeHandler = (value) => {
        setOtp(value)
    };

    return (
        <>
            <Navbar />
            <div className='body__ctr'>
                <div className="login">

                    <div className='login__container'>

                        <Link to='/home'>
                            <img
                                style={{ width: '200px' }}
                                src={kodecrux}
                            />
                        </Link>
                        <p />
                        <h3>Email Address</h3>
                        <p />
                        <form>
                            {/* <input type='email' 
                className='form__control'
                placeholder='Enter Your Email Address'
                value={email}
                onChange={event => setEmail(event.target.value)}
                 /> */}
                            <TextField
                                id="outlined-required"
                                label="Enter Your Email Address"
                                variant="outlined"
                                color="primary"
                                value={email}
                                onChange={e => handelData(e.target.value)}
                            />

                            <br />
                            <p></p>
                            <button
                                type='submit'
                                className='login__signInButton'
                                onClick={submitHandler}
                            >Submit</button>
                        </form>

                        <Modal title="Enter the OTP sent to your Email" footer={null} visible={isModalVisible} onCancel={handleCancel}>
                            <div className='otp__ctr' >
                                <OtpInput
                                    value={otp}
                                    onChange={onChangeHandler}
                                    numInputs={6}
                                    separator={<span>-</span>}
                                    containerStyle=""
                                    inputStyle="otp__box"
                                />
                            </div>
                            <div className='reg__modal__button' >
                                <button onClick={OtpSubmit} style={{ backgroundColor: ' #5964c9' }} type="primary" size='large' >Submit</button>
                            </div>
                        </Modal>


                    </div>

                </div>

            </div>

        </>
    )
}
