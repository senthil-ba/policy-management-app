import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import authReducer from './store/reducers/authReducer';
import policyReducer from './store/reducers/policyReducer';
import thunk from 'redux-thunk';
import { watchAuth, watchPolicy } from './store/sagas';


const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  policy: policyReducer
});

const sagaMiddlware = createSagaMiddleware();

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(sagaMiddlware, thunk))
);

sagaMiddlware.run(watchAuth);
sagaMiddlware.run(watchPolicy);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
