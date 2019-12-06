import ReactDOM from 'react-dom';
import React from 'react';
import app from './app/index.js';
import {App} from './imperative/components.js';

const element = <App app={app}/>;
const root = document.getElementById('root');

ReactDOM.render(element, root);

console.group('Application Element:');
console.log(element);
console.groupEnd();