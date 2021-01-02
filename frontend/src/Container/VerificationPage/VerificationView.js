import React, {useEffect} from 'react'
import './Verification.css'
import OtpInput from 'react-otp-input';
import icon from '../../assets/images/reg4.jpeg'
import { useHistory } from 'react-router-dom'

export default function VerificationView(props) {
    const history = useHistory();


    return (
    <div className="verification__view">
        <div className="verification__container">
            <div className="verification__header">
            <img src={icon} alt="no img"></img>
            </div>
            <div className="verification__body">
                <p>Please type the verification code sent to your mobile number</p>
                <div>
        
                <OtpInput
                    value={props.otp}
                    onChange={props.onChange}
                    numInputs={6}
                    separator={<span>-</span>}
                    containerStyle=""
                    inputStyle="otp__box"
                />
                </div>
                <h5>Didn't Recieve OTP? <span style={{fontWeight:"bold",color:" #30b3f0"}}>Resend Code</span></h5>
                <button onClick={props.onSubmit}>VERIFY</button>
            </div>
        </div>
    </div>
        
    )
}
