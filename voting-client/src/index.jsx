import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';

import reducer from './reducer';
import { setState } from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import App from './components/App';
import { VotingContainer } from './components/Voting';
import { ResultsContainer } from './components/Results';


const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
  store.dispatch(setState(state))
);

/*
* Returns a createStore function that incorporates the
* middleware
*
* By passing the socket to the top level of the middleware
* we give it access to the active connection
*/
const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);

const store = createStoreWithMiddleware(reducer);

const routes = {
  component: App,
  childRoutes: [
    { path: '/', component: VotingContainer },
    { path: 'results', component: ResultsContainer }
  ]
};

render(
  <Provider store={store}>
    <Router routes={routes} />
  </Provider>,
  document.getElementById('app')
);

/*
* Below is the JSX version of the above code, they do the same thing
* and is a matter of preference of using the JSX syntax or just a
* plain old javascript object to config the router.
*
* for more info see the awesome react-router docs @:
* https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
*
* NOTE: as of 2016/01/23 npm i react-router still uses v0.13.*
* which is broken for react v0.14.* so make sure to run
* npm i --save react-router@latest or face the consequences!
*/
// const routes = <Route component={App}>
//   <Route path="/results" component={Results} />
//   <Route path="/" component={Voting} />
// </Route>;
//
// render(<Router>{routes}</Router>, document.getElementById('app'));
