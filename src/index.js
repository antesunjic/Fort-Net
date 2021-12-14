import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { Provider } from "react-redux";

import productReducer from "./store/reducers/productsReducer";

let composeEnhancers = null;
if (process.env.NODE_ENV === "development") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
  composeEnhancers = compose;
}

const store = createStore(
  productReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
