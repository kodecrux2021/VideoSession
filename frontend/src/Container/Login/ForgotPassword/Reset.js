import React, { useState } from 'react'
import kodecrux from '../../../assets/images/reg2.jpeg'
import { Link, useHistory } from 'react-router-dom'
import { message } from 'antd';
import Navbar from '../../../components/Header/Navbar';
import { url } from '../../../Server/GlobalUrl';
import { TextField } from '@material-ui/core';

export default function Reset() {
    const history = useHistory();
    const [password, setPassword] = useState('');
    const [passwordValidate, setPasswordValidate] = useState('');

    const handelData  = (data) => {
        setPassword(data);
        if (data.length <= 7) {
            setPasswordValidate('Password must contain at least 8 characters, including UPPER/lowercase')
          }
          else if (!/(?=.*[A-Z])/.test(data)) {
            setPasswordValidate('Password must contain at least 8 characters, including UPPER/lowercase')
          }
          else if (!/(?=.*[a-z])/.test(data)) {
            setPasswordValidate('Password must contain at least 8 characters, including UPPER/lowercase')
          }
          else if (!/(?=.*[0-9])/.test(data)) {
            setPasswordValidate('Contain at least one number')
          }
          else {
            setPasswordValidate('')
          }
          console.log('data', data)
    }


    const submitHandler = (e) => {
        e.preventDefault();
        if (password === '' || passwordValidate!==''){
            if (password === '') {
                message.info('Please Fill Password'); 
            }
            else  {
                message.info(passwordValidate);
            }
              
        }
        else {

            let data = {
                "password": password
            }
                    fetch(url + `/api/forgotpassword/${localStorage.getItem('verif')}/`, {
                    method: 'PUT',
                    headers: {
                       'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                    .then((response) => {
                     if (response['status'] === 201 || response['status'] === 200) {
                        return response.json()
                    } else if (response['status'] === 401) {
                        message.info('Something went wrong');  
                    }
                    })
                    .then((result) => {
                        if (result){
                        //console.log('result',result)
                        message.info('Password Reset Successful! Please login.'); 
                        history.push('/login')
                        }
                    }
                    )

               
        }
    }



    return (
        <>
        <Navbar/>
        <div className='body__ctr'>
              <div className="login">
            
            <div className='login__container'>

            <Link to='/home'>
                <img
                    style={{width:'200px'}}
                    src={kodecrux} 
                />
            </Link>
            <p/>
                <h3>Set New Password</h3>
            <p/>
            <form>
                {/* <input type='password' placeholder='Enter Your New Password'

                className='form__control'
                value = {password}
                onChange={e=> handelData(e.target.value)}
                /> */}
        <TextField
          id="outlined-required"
          label="Enter Your New Password"
          variant="outlined"
          color="primary"
          value={password}
           onChange={e=> handelData(e.target.value)}
        />

<p/>
                <button 
                type='submit'
                className='login__signInButton' 
                onClick={(e)=>submitHandler(e)}
                >Submit</button>
            </form>

            </div>
            
        </div>
       
        </div>
        
        </>
    )
}
