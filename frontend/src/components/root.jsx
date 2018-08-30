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
<<<<<<< HEAD
  <div>
    <header>
      <NavbarFeatures />
    </header>
    <Switch>
      <Route exact path="/signin" component={LoginContainer} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/tree" component={Show} />
      <Route exact path="/" component={Splash} />
    </Switch>
    <div className="splash-bottom-bar">
      <div className="splash-bottom-cr">
        <p>2018 ©</p>
      </div>
=======
    <div>
        <header>
            <NavbarFeatures />
        </header>
        <Switch>
            <Route exact path="/login"/>
            <Route exact path="/signup"/>
            <Route exact path='/tree' component={ShowContainer}/>
            <Route exact path="/" component={Splash} />
        </Switch>
>>>>>>> 8c87b5f4f17277ad74c28c254dd84d90c5d87982
    </div>
  </div>
);

export default Root;