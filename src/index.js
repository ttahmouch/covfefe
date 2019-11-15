/**
 * TODO:
 * + Universally support setting string `data-*` attributes whether or not the component was already rendered.
 * + Eventually get everything to be pure XML instead of JSX.
 * + Rename async to request?
 * + Allow defining initial application state using JSON Schema.
 */
import ReactDOM from 'react-dom';
import React, {createElement} from 'react';
import app from './app.js';
import {App, reactMethodWithCustomDataProps} from './imperative/components.js';

React.createElement = reactMethodWithCustomDataProps({createElement}, app);

const element = <App app={app}/>;
const root = document.getElementById('root');

ReactDOM.render(element, root);

console.group('Application Element:');
console.log(element);
console.groupEnd();

// import ReactDOMServer from 'react-dom/server';
// const responseXml = ReactDOMServer.renderToString(
//     React.createElement(
//         'View',
//         {},
//         React.createElement(
//             'FlatList',
//             {
//                 'data-state': 'array',
//                 'data-item': 'view',
//                 'data':{display:'block'}
//             }
//         )
//     )
// );
// console.log(responseXml);
// const parsedXml = new DOMParser().parseFromString(responseXml, 'application/xhtml+xml');
// console.log(parsedXml);