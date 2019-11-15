import {combineReducers, createStore} from 'redux';
import $states from './states.js';
import $styles from './styles.json';
import $actions from './actions/index.js';
import $components from './components.js';
import $views, {view as $view} from './views/index.js';
import {reducersFromStates} from './imperative/reducers.js';
import {dispatchersForStore} from './imperative/dispatchers.js';

const $reducers = reducersFromStates($states);
const $reducer = combineReducers($reducers);
const $store = createStore($reducer, $states);
const $dispatchers = dispatchersForStore($states, $store, $actions);

export default {
    $states,
    $styles,
    $actions,
    $components,
    $views,
    $view,
    $reducers,
    $reducer,
    $store,
    $dispatchers
};