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

const Root = () => (
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
    </div>
);

export default Root;