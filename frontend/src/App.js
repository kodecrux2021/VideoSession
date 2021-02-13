import React, { useEffect, useState } from 'react';
import './App.css';
import RegistrationDetailsContainer from './Container/RegistrationDetails/RegsitrationDetailsContainer';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import RegistrationContainer from './Container/Registration/RegistrationContainer';
import VerificationContainer from './Container/VerificationPage/VerificationContainer'
import Home from './Container/Home/Home'
import Trainers from './Container/Trainers/Trainers';
import EmployeeRegistrationComponent from './Container/EmployeeRegistration/EmployeeRegistrationComponent';
import ChatComponent from './Container/Chat/ChatComponent';
import Login from './Container/Login/Login';
import ContentComponent from './Container/Content/ContentComponent';
import HelpForm1 from './Container/Help/HelpForm1';
import HelpForm2 from './Container/Help/HelpForm2';
import HelpForm3 from './Container/Help/HelpForm3';
import InvestorContainer from './Container/Investor/InvestorContainer';
import NotificationsContainer from './Container/Notifications/NotificationsContainer';
import Email from './Container/Login/ForgotPassword/Email';
import Reset from './Container/Login/ForgotPassword/Reset';
import Pagetwo from './Container/RegistrationDetails';
import New from './Container/RegistrationDetails/new';
import Payment from './payment'



function App() {

  let [isAuthenticated, setAuth] = useState(false)

  useEffect(() =>{
   if(localStorage.getItem('token')){
     setAuth(true)
     console.log(isAuthenticated);
   }else{
     setAuth(false)
     console.log(isAuthenticated);
   }
  })


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/registration" exact component={RegistrationContainer} />
          <Route path="/forgot-password" exact component={Email} />
          <Route path="/reset" exact component={Reset} />
          <Route path="/login" exact component={Login} />
          {/* <Route path="/details" exact component={RegistrationDetailsContainer} /> */}
          {/* <Route path="/details" exact component={Pagetwo} /> */}
          {localStorage.getItem('token') && (
            <>
            <Route path="/home" exact component={Home} />
          <Route path="/details" exact component={New} />
          <Route path="/verification" exact component={VerificationContainer} />
          <Route path="/trainers"  component={Trainers} />
          <Route path="/course-registration" exact component={EmployeeRegistrationComponent} />
          <Route path="/chat"  component={ChatComponent} />
          <Route path="/courses" exact component={ContentComponent} />
          <Route path="/help/1" exact component={HelpForm1} />
          <Route path="/help/2" exact component={HelpForm2} />
          <Route path="/help/3" exact component={HelpForm3} />
          <Route path="/investor" exact component={InvestorContainer} />
          <Route path="/notifications" component={NotificationsContainer} /> 
           <Route path="/payment" exact component={Payment} />
        </>)}
        <Route render={() => <Redirect to = '/login'/> }/>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
