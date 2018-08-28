import React, { Component } from 'react';
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import NavbarFeatures from "./components/NavBar/nav_bar_container";


const App = ({ store }) => (
  <Provider store={store}>
  <HashRouter>
    <div>
      <header>
        <NavbarFeatures />
      </header>
      Hello world!
    </div>
  </HashRouter>
  </Provider>
);

export default App;