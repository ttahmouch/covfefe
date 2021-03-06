import React, {createElement} from "react";
import ReactDOM from "react-dom";
import {composeWithDevTools} from "redux-devtools-extension";
import {createBrowserHistory} from "history";
// import state from "./declarative/08-05-20-app.js";
import state from "./netflux.js";
// import state from "./netflux.json";
import {
    App,
    createElementWithCustomDataProps,
    createEventMiddleware,
    createLogMiddleware,
    createRouteMiddleware,
    storeFromConfiguration
} from "./app.js";

// const history = createMemoryHistory();
const history = createBrowserHistory();
const {"location": route = {}} = history;
const middleware = [createLogMiddleware(), createEventMiddleware(), createRouteMiddleware(history)];
const composer = composeWithDevTools({"trace": false, "maxAge": 1000});
const store = storeFromConfiguration({state, middleware, composer, route});
const view = {};

React.createElement = createElementWithCustomDataProps({createElement}, store, view);
ReactDOM.render(<App store={store} view={view}/>, document.getElementById("root"));
