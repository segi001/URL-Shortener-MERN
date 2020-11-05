import React from 'react';
import {Route,
        BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';

import Home from './components/home';
import URLRedirect from './components/redirect';

ReactDOM.render(
    <BrowserRouter>
        <Route exact path='/' component={Home} />
        <Route path='/:token' component={URLRedirect} />
    </BrowserRouter>,
    document.getElementById('root')
)