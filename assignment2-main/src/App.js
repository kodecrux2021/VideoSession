import React from 'react';
import './App.css';
import RegistrationDetailsContainer from './Container/RegistrationDetails/RegsitrationDetailsContainer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import RegistrationContainer from './Container/Registration/RegistrationContainer';
import VerificationContainer from './Container/VerificationPage/VerificationContainer'
import Home from './Container/Home/Home'
function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/registration" exact component={RegistrationContainer} />
          <Route path="/details" component={RegistrationDetailsContainer} />
          <Route path="/verification" component={VerificationContainer} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
