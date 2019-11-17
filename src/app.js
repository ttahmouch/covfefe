import {combineReducers, createStore} from 'redux';
import states from './states/index.js';
import $styles from './styles/index.js';
import $actions from './actions/index.js';
import $components from './components/index.js';
import $views, {view as $view} from './views/index.js';
import {reducersFromStates} from './imperative/reducers.js';
import {dispatchersForStore} from './imperative/dispatchers.js';

// Namespace the non-states to allow them to spread flat on the state object and have reducers per item?
// Consider shifting state down instead of spreading it on the root level.
// Almost everything should probably live in the store state to allow for dynamic updates.
const $states = {
    ...states,
    $styles,
    $actions,
    $components,
    $views,
};
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

console.group('Application State:');
console.log($states);
console.groupEnd();

console.group('Application Imperative:');
console.log({
    $reducers,
    $reducer,
    $store,
    $dispatchers
});
console.groupEnd();