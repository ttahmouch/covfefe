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

// export const getEmptyObject = () => ({});

export const getStyle = (styles = {}, style = '') => styles[style];

// export const getDispatcher = (dispatchers = {}, action = '') => dispatchers[action];

export const getState = (states = {}, state = '') => states[state];

export const getView = (views = {}, view = '') => views[view];

// export const getRequest = (requests = {}, request = '') => requests[request];