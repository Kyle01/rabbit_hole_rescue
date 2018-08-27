import React from 'react';
import { Route, Switch } from 'react-router-dom';

const App = () => (
    <div>
        <Switch>
            <Route path="/*" component={<div>Home!</div>} />
        </Switch>
    </div>
);

export default App;