import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./component/login.component";
import SignUp from "./component/signup.component";
import page from "./component/page";


function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>CMS</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>LOGIN</Link>
              </li> 
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>SIGNUP</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/page"}>crm</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
             <Route path="/page" component={page} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;