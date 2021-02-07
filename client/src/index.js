import React, {createElement} from "react";
import ReactDOM from "react-dom";
import {composeWithDevTools} from 'redux-devtools-extension';
import {createBrowserHistory} from "history";
// import app from "./declarative/app.js";
import app from "./declarative/netflux.js";
import {
    App,
    createElementWithCustomDataProps,
    createEventMiddleware,
    createLogMiddleware,
    createRouteMiddleware,
    dispatchRouteToStore,
    storeFromInitialAppState
} from "./imperative/app.js";

const history = createBrowserHistory();
// const history = createMemoryHistory();
const {location = {}} = history;
const store = storeFromInitialAppState(
    app,
    [
        createLogMiddleware(),
        createEventMiddleware(),
        createRouteMiddleware(history)
    ],
    [],
    composeWithDevTools({"trace": false})
);

dispatchRouteToStore(location, store);

React.createElement = createElementWithCustomDataProps({createElement}, store);
ReactDOM.render(<App store={store}/>, document.getElementById("root"));
