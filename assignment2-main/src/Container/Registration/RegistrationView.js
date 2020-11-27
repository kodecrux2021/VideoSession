import React from 'react'
import './Registration.css'
export default function Registration(props) {
    console.log('props_____________',props)
    console.log('answer_________',(props.position=="codeexpert"))
    return (
       
            <div className="__container">
       
       <div className="_header">
           <h2>Register</h2>
           <p>With</p>
           <div className="header__button">
               <button style={{backgroundColor:'#DB4437'}}>GOOGLE</button>
               <button style={{backgroundColor: "#4267B2"}}>FACEBOOK</button>
           </div>
           <p>Or</p>
       </div>
       <div className="form__container">
           <form >
               <div className="form__group">
                   <label >Name</label>
                   <input type="text" value={props.name} onChange={(e) => props.handelData('name', e.target.value)} className="form__control" id="uname" placeholder="Enter Your Name" name="uname" />

               </div>
               <div className="form__group">
                   <label>Mobile</label>
                   <input type="text" value={props.mobile} onChange={(e) => props.handelData('mobile', e.target.value)} className="form__control" id="uname" placeholder="Enter Mobile Number" name="uname" />

               </div>
               <div className="select__container" >
                           <button className={props.position==="codeexpert"?'select__button__active':'select__button'}  value="codeexpert" onClick={props.onChangeValue}>CODE EXPERT</button>
                           <button className={props.position==="instructor"?'select__button__active':'select__button'} value="instructor" onClick={props.onChangeValue}>INSTRUCTOR</button>
                           <button className={props.position==="freelancer"?'select__button__active':'select__button'} value="freelancer" onClick={props.onChangeValue} >FREELANCER</button>
               </div>
               <div className="form__group">
                   <label for="pwd">Password:</label>
                   <input type="password" value={props.password} onChange={(e) => props.handelData('password', e.target.value)} className="form__control" id="pwd" placeholder="Enter Password" name="pswd" />

                 </div>
                 <div className="form-actions">
                   <button type="submit" onClick={props.onSubmit}>NEXT</button>
                 </div>
           </form>
       </div>
      <div className="_footer">
           Already have an account? <a>Login</a>
      </div>
</div>
       
    )
}
