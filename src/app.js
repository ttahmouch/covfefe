import {combineReducers, createStore} from 'redux';
import $states from './states';
import $styles from './styles';
import $actions from './actions';
import $components from './components';
import $views from './views';
import $view from './view';
import {reducersFromStates} from './imperative/reducers';
import {dispatchersForStore} from './imperative/dispatchers';

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