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

const Root = () => (
    <div>
        <header>
            <NavbarFeatures />
        </header>
        <Switch>
            <Route exact path="/login"/>
            <Route exact path="/signup"/>
        </Switch>
    </div>
);

export default Root;