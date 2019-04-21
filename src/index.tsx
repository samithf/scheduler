import React from "react";
import ReactDOM from "react-dom";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";
// import thunk from "redux-thunk";
import rootSaga from "./sagas";

import App from "./components/App";
import reducers from "./reducers";

import "./scss/app.scss";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  // composeWithDevTools(applyMiddleware(thunk))
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger)) // redux-saga middleware
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

console.log("process.env.VERSION", process.env.VERSION);
console.log("process.env.PLATFORM", process.env.PLATFORM);
console.log("process.env.NODE_ENV", process.env.NODE_ENV);
