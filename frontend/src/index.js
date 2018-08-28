import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import * as APIUtil from './util/session_api_util';
//Components
import configureStore from './store/store';
import App from './App.js';
import registerServiceWorker from './registerServiceWorker';

document.addEventListener('DOMContentLoaded', () => {
    let store = configureStore();
    // Check for token
    if (localStorage.jwtToken) {
        // Set auth token header auth
        APIUtil.setAuthToken(localStorage.jwtToken);
        // Decode token and get user info and exp
        const decoded = jwt_decode(localStorage.jwtToken);
        // Set user and isAuthenticated
        store.dispatch(APIUtil.setCurrentUser(decoded));

        // Check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            // Logout user
            store.dispatch(APIUtil.logoutUser());
            // Redirect to login
            window.location.href = '/login';
        }
    }
    const root = document.getElementById('root');
    ReactDOM.render(<App store={store} />, root);
    registerServiceWorker();
});