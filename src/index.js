import React, {createElement} from "react";
import ReactDOM from "react-dom";

import app from "./declarative/app.js";
import {App, createElementWithCustomDataProps, storeFromInitialAppState} from "./imperative/app.js";

const store = storeFromInitialAppState(app);

React.createElement = createElementWithCustomDataProps({createElement}, store);

// console.time("Application Render");
ReactDOM.render((<App store={store}/>), document.getElementById("root"));
// console.timeEnd("Application Render");
