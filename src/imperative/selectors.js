/* eslint-disable no-use-before-define */
import jsonpath from 'jsonpath/jsonpath.min';

export const selectStateUsingJsonPath = (selector = '',
                                         state = {},
                                         jsonPath = jsonpath) => selector ? jsonPath.value(state, selector) : state;

export const selectStateUsingRegExp = (selector = '',
                                       state = '',
                                       regexp = new RegExp(selector)) => (regexp.exec(state) || []).slice(1);

/**
 * Remember to solve the issue of name collision of renaming $schema_comparison to $schema.
 * $compare: {$regexp,$schema,$literal}
 */
export const selectState = (selector = {'$selector': '', '$from': 'response'},
                            state = {'app': {}, 'view': {}, 'response': {}},
                            dependencies = {selectStateUsingJsonPath}) => {
    const {selectStateUsingJsonPath} = dependencies;

    if (typeof selector === 'function') {
        // I completely fucking forgot that functions are being parsed from a JSON string meaning that's why they won't
        // be called. They won't exist. Functional selectors may have to be replaced with a filename or be serialized
        // and evaluated which sounds horrible, e.g., {$file_path, $json_path}
        // I may also be able to deserialize the entire request object at the proper time before dispatching an async
        // action as opposed to serializing the function or requiring it from a separate file.
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

export const getEmptyObject = () => ({});

export const getStyle = (styles = {}, style = '') => styles[style];

export const getDispatcher = (dispatchers = {}, action = '') => dispatchers[action];

export const getState = (states = {}, state = '') => states[state];

export const getView = (views = {}, view = '') => views[view];

export const getRequest = (requests = {}, request = '') => requests[request];