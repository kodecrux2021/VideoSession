import React from 'react';
import './App.css';
import RegistrationDetailsContainer from './Container/RegistrationDetails/RegsitrationDetailsContainer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import RegistrationContainer from './Container/Registration/RegistrationContainer';
import VerificationContainer from './Container/VerificationPage/VerificationContainer'
import Home from './Container/Home/Home'
import Trainers from './Container/Trainers/Trainers';
import EmployeeRegistrationComponent from './Container/EmployeeRegistration/EmployeeRegistrationComponent';
import ChatComponent from './Container/Chat/ChatComponent';
import Login from './Container/Login/Login';
import ContentComponent from './Container/Content/ContentComponent';
import SimpleReactSelect from './Container/Content/Select'
import HelpForm1 from './Container/Help/HelpForm1';
import HelpForm2 from './Container/Help/HelpForm2';
import HelpForm3 from './Container/Help/HelpForm3';


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/registration" exact component={RegistrationContainer} />
          <Route path="/details" exact component={RegistrationDetailsContainer} />
          <Route path="/verification" exact component={VerificationContainer} />
          <Route path="/trainers" exact component={Trainers} />
          <Route path="/employee-registration" exact component={EmployeeRegistrationComponent} />
          <Route path="/chat" exact component={ChatComponent} />
          <Route path="/login" exact component={Login} />
          <Route path="/content" exact component={ContentComponent} />
          <Route path="/select" exact component={SimpleReactSelect} />
          <Route path="/help/1" exact component={HelpForm1} />
          <Route path="/help/2" exact component={HelpForm2} />
          <Route path="/help/3" exact component={HelpForm3} />

        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
