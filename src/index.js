/**
 * TODO:
 * + Universally support setting string `data-*` attributes whether or not the component was already rendered.
 * + Eventually get everything to be pure XML instead of JSX.
 * + Rename async to request?
 */
import ReactDOM from 'react-dom';
import React from 'react';
import {RootView} from './declarative/components';
import states from './declarative/state';
import styles from './declarative/style';
import requests from './declarative/async';
import {reducers} from './imperative/reducers';
import {dispatchers} from './imperative/dispatchers';
import {App} from './imperative/components';

const children = <RootView/>;

ReactDOM.render(
    <App states={states}
         styles={styles}
         requests={requests}
         reducers={reducers}
         dispatchers={dispatchers}
         children={children}/>,
    document.getElementById('root')
);