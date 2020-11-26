import React from 'react';
import './App.css';
import Pagetwo from './Container/Pagetwo';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import VerifyPage from './Container/VerificationPage';
import Registration from './Container/Registration/RegistrationView'
import RegistrationContainer from './Container/Registration/RegistrationContainer';

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
         
          <Route path="/registration" exact component={RegistrationContainer} />
          <Route path="/next" component={Pagetwo} />
          <Route path="/verify" component={VerifyPage} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
