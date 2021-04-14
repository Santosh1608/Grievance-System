import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import authReducer from "./reducers/auth";
import compliantReducer from "./reducers/compliant";
import developerReducer from "./reducers/developer";
import customerReducer from "./reducers/customer";
import modelReducer from "./reducers/model";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import axios from "axios";
//setting axios interceptors
//setting axios defaults
axios.defaults.baseURL = "http://localhost:8000";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  compliant: compliantReducer,
  customer: customerReducer,
  developer: developerReducer,
  model: modelReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
