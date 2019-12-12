/* eslint-disable no-use-before-define */
import jsonpath from 'jsonpath/jsonpath.min';

export const selectStateUsingJsonPath = (selector = '',
                                         state = {},
                                         jsonPath = jsonpath) => selector ? jsonPath.value(state, selector) : state;

export const selectStateUsingRegExp = (selector = '',
                                       state = '',
                                       regexp = new RegExp(selector)) => (regexp.exec(state) || []).slice(1);

export const selectState = (selector = {'$selector': '', '$from': 'response'},
                            state = {'app': {}, 'view': {}, 'response': {}},
                            dependencies = {selectStateUsingJsonPath}) => {
    const {selectStateUsingJsonPath} = dependencies;

    if (typeof selector === 'function') {
        return selector(state);
    }

    if (typeof selector === 'object' && selector !== null) {
        const {
            // $file = '',
            // $function = $file ? require($file) : undefined,
            $selector = '',
            $from = 'response',
            // $state = state[$from] || {},
            $state = state[$from],
            // $selected = $function ? $function($state) : selectStateUsingJsonPath($selector, $state)
            $selected = selectStateUsingJsonPath($selector, $state)
        } = selector;

        // return select ? selected : selector;
        return $selected;
    }

    return selector;
};

export const captureAndSelectState = (captor = {'$regexp': '', '$from': 'response'},
                                      selector = {'$selector': '', '$from': 'response'},
                                      state = {'app': {}, 'view': {}, 'response': {}},
                                      dependencies = {selectStateUsingRegExp, selectState}) => {
    const {selectStateUsingRegExp, selectState} = dependencies;
    const {
        $regexp = '',
        $from = 'response',
        // $state = state[$from] || {},
        $state = state[$from],
        // Shift the ternary into selectStateUsingRegExp?
        $captured = $regexp ? selectStateUsingRegExp($regexp, $state) : $state
    } = captor;

    return selectState(selector, {...state, [$from]: $captured});
};

export const getStyle = (styles = {}, style = '') => styles[style];

export const getState = (states = {}, state = '') => states[state];

export const getView = (views = {}, view = '') => views[view];

export const getAction = (actions = {}, action = '') => actions[action];

export const appStateFromStore = (store = {getState: () => ({})}) => store.getState() || {};

export const actionsFromAppState = ({$actions = {}} = {'$actions': {}}) => $actions;

export const actionFromEvent = ({target: {dataset: {action = ''}}} = {'target': {'dataset': {'action': ''}}}) => action;

export const eventFromAction = ({event = {'target': {'dataset': {'action': ''}}}} = {'event': {'target': {'dataset': {'action': ''}}}}) => event;

export const typeFromAction = ({type = ''} = {'type': ''}) => type;

export const stateFromAction = ({state} = {'state': {'app': {}, 'view': {}, 'response': {}}}) => state;

export const viewsFromAppState = ({$views = {}} = {'$views': {}}) => $views;

export const viewFromAppState = ({$view = []} = {'$view': []}) => $view;

export const viewFromStore = (store = {getState: () => ({'$view': []})},
                              dependencies = {viewFromAppState, appStateFromStore}) => {
    const {viewFromAppState, appStateFromStore} = dependencies;

    return viewFromAppState(appStateFromStore(store));
};

export const stylesFromAppState = ({$styles = {}} = {'$styles': {}}) => $styles;

export const componentsFromAppState = ({$components = {}} = {'$components': {}}) => $components;