import React from 'react';
import { Provider } from 'react-redux';
import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
} from 'react-router-dom';

import NavbarFeatures from "./NavBar/nav_bar_container";
import ShowContainer from './show/show_container';
import Splash from './splash/splash';
import SignUp from './signup/sign_up';
import LoginContainer from './login/login_container';

const Root = () => (
  <div>
    <header>
      <NavbarFeatures />
    </header>
    <Switch>
      <Route exact path="/signin" component={LoginContainer} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/history" component={ShowContainer} />
      <Route exact path="/" component={Splash} />
    </Switch>
    <div className="splash-bottom-bar">
      <div className="splash-bottom-cr">
        <p>2018 ©</p>
      </div>
    </div>
  </div>
);

export default Root;