/**
 * TODO:
 * Allow comparison of anything declared; not just response state.
 * Possibly treat request and response state the same with respect to comparing and dispatching selected state.
 */
/* eslint-disable no-use-before-define,no-unused-vars */
import {action, actions} from '../actions';
import {compare, filterDeclaredResponsesMatchingResponse} from '../comparators';
import {
    toDeclarativeBody, toDeclarativeHeader, toDeclarativeHeaders, toDeclarativeResponse, toDeclarativeResponses,
    toDeclarativeStatus
} from '../declarators';
import {interpolateJsTemplateUsingExpression, interpolateUriTemplate} from '../interpolators';
import {selectState, selectStateUsingJsonPath} from '../selectors';
import {asyncRequest} from '../request';

export const noop = (event) => console.log(event);

export const dispatch = (store = {dispatch: noop}, action = {}) => store.dispatch(action);

export const dispatchDeclaredActionsWithSelectedState = (declaredActions = {
                                                             '$regexp_comparison': undefined,
                                                             '$schema_comparison': undefined,
                                                             '$to_app_state': []
                                                         },
                                                         responseState = undefined,
                                                         store = {},
                                                         dependencies = {dispatch, selectState, action}) => {
    const {dispatch, selectState, action} = dependencies;
    const {
        '$regexp_comparison': regexp = undefined,
        '$schema_comparison': schema = undefined,
        '$to_app_state': appStateActions = []
    } = declaredActions;

    return appStateActions.forEach(({
                                        '$from_response_state': selector = '',
                                        '$selected_response_state': value = selectState(responseState, selector, {
                                            regexp,
                                            schema
                                        }),
                                        '$action': declaredAction = '',
                                        '$state': declaredState = '',
                                        '$type': type = action(declaredAction, declaredState)
                                    }) => dispatch(store, {type, value}));
};

//

export const toComparableDeclarative = (declaredComparable = {}, dependencies = {compare}) => {
    const {compare} = dependencies;

    return {
        ...declaredComparable,
        compare: (state) => compare(declaredComparable, state)
    };
};

export const toDispatchableDeclarative = (declaredComparable = {}, store = {}, dependencies = {
    dispatchDeclaredActionsWithSelectedState
}) => {
    const {dispatchDeclaredActionsWithSelectedState} = dependencies;

    return {
        ...declaredComparable,
        dispatch: (state) => dispatchDeclaredActionsWithSelectedState(declaredComparable, state, store)
    };
};

export const toDecoratedDeclarative = (declarative = {}, store = {}, dependencies = {
    toDispatchableDeclarative, toComparableDeclarative
}) => {
    const {toDispatchableDeclarative, toComparableDeclarative} = dependencies;

    return toDispatchableDeclarative(toComparableDeclarative(declarative), store);
};

export const reviver = (key = '', value = null, store = {}, appState = {}, viewState = {}, dependencies = {
    selectStateUsingJsonPath, interpolateUriTemplate, interpolateJsTemplateUsingExpression,
    toDeclarativeStatus, toDeclarativeHeader, toDeclarativeHeaders, toDeclarativeBody,
    toDeclarativeResponse, toDeclarativeResponses, toDecoratedDeclarative
}) => {
    const {
        selectStateUsingJsonPath, interpolateUriTemplate, interpolateJsTemplateUsingExpression, toDeclarativeStatus,
        toDeclarativeHeader, toDeclarativeBody, toDeclarativeResponses, toDecoratedDeclarative
    } = dependencies;
    const type = value === null ? 'null' : typeof value;

    if (key === '$responses' && Array.isArray(value)) {
        return toDeclarativeResponses(value, {
            ...dependencies,
            toDeclarativeStatus: (declaredStatus) => toDecoratedDeclarative(toDeclarativeStatus(declaredStatus), store),
            toDeclarativeHeader: (declaredHeader) => toDecoratedDeclarative(toDeclarativeHeader(declaredHeader), store),
            toDeclarativeBody: (declaredBody) => toDecoratedDeclarative(toDeclarativeBody(declaredBody), store),
        });
    }

    if (type === 'object') {
        const {
            '$from_app_state': appStateSelector = '',
            '$from_view_state': viewStateSelector = '',
            '$uri_template': uriTemplate = '',
            '$js_template': jsTemplate = ''
        } = value;

        if (appStateSelector) {
            return selectStateUsingJsonPath(appState, appStateSelector);
        }
        if (viewStateSelector) {
            return selectStateUsingJsonPath(viewState, viewStateSelector);
        }
        if (uriTemplate) {
            return interpolateUriTemplate(uriTemplate, value);
        }
        if (jsTemplate) {
            return interpolateJsTemplateUsingExpression(jsTemplate, value);
        }
    }

    return value;
};

//

export const dispatchHeaders = (declaredHeaders = {}, headers = {}, dependencies = {noop}) => {
    const {noop} = dependencies;
    const declaredHeaderNames = Object.keys(declaredHeaders);
    const toDeclaredHeader = (header = '') => ({header, ...declaredHeaders[header]});
    const dispatchHeader = ({header, dispatch = noop}) => dispatch(headers[header]);

    return declaredHeaderNames.map(toDeclaredHeader).forEach(dispatchHeader);
};

export const dispatchDeclaredResponsesWithResponseState = (declaredResponses = [],
                                                           {status, headers, body} = {status: 0, headers: {}, body: {}},
                                                           dependencies = {dispatchHeaders, noop}) => {
    const {dispatchHeaders, noop} = dependencies;

    return declaredResponses.forEach(({
                                          '$status': {dispatch: dispatchStatus = noop},
                                          '$headers': declaredHeaders = {},
                                          '$body': {dispatch: dispatchBody = noop}
                                      }) => {
        dispatchStatus(status);
        dispatchHeaders(declaredHeaders, headers);
        dispatchBody(body);
    });
};

export const dispatchResponse = (store = {},
                                 {
                                     type = '',
                                     request = {'$responses': []},
                                     event = {type: ''},
                                     response = {status: 0, headers: {}, body: {}}
                                 },
                                 dependencies = {
                                     dispatch, filterDeclaredResponsesMatchingResponse,
                                     dispatchDeclaredResponsesWithResponseState
                                 }) => {
    const {dispatch, filterDeclaredResponsesMatchingResponse, dispatchDeclaredResponsesWithResponseState} = dependencies;
    const {'$responses': declaredResponses = []} = request;
    const {type: eventType = ''} = event;

    switch (eventType) {
        case 'load':
            const declaredResponsesMatchingResponse = filterDeclaredResponsesMatchingResponse(declaredResponses, response);

            dispatchDeclaredResponsesWithResponseState(declaredResponsesMatchingResponse, response);
            break;
        case 'loadstart':
        case 'progress':
        case 'error':
        case 'abort':
        case 'timeout':
        case 'loadend':
        default:
            break;
    }

    return dispatch(store, {type, request, event, response});
};

export const mapChildrenToState = (children = [], stateType = 'string', state = '') => {
    switch (stateType) {
        case 'array':
            return children
                .filter(({name}) => name)
                .map(({name, value}) => ({[name]: value}));
        case 'dictionary':
            return children
                .filter(({name}) => name)
                .reduce((map, {name, value}) => ({...map, [name]: [...map[name] || [], value]}), {});
        case 'string':
        default:
            return state;
    }
};

// Move to app?
export const syncDispatcher = (type = '', store = {}, dependencies = {
    mapChildrenToState, dispatch, preventDefault: noop
}) => {
    const {mapChildrenToState, dispatch, preventDefault} = dependencies;

    return (event = {preventDefault}) => {
        const {target} = event;
        const {value: stateValue = '', dataset: {stateType = 'string'}} = target;
        const children = Array.from(target);
        const value = mapChildrenToState(children, stateType, stateValue);
        const action = {type, value};

        event.preventDefault();

        console.log(action);

        return dispatch(store, action);
    };
};

export const asyncDispatcher = (type = '', store = {getState: noop}, dependencies = {
    mapChildrenToState, dispatch, preventDefault: noop, asyncRequest, reviver, dispatchResponse
}) => {
    const {mapChildrenToState, dispatch, preventDefault, asyncRequest, reviver, dispatchResponse} = dependencies;

    return (event = {preventDefault}) => {
        const {target} = event;
        const {
            value: stateValue = '',
            dataset: {stateType = 'string', request: declaredRequest = '{}'}
        } = target;
        const children = Array.from(target);
        const appState = store.getState();
        const viewState = mapChildrenToState(children, stateType, stateValue);
        const request = JSON.parse(declaredRequest, (key, value) => reviver(key, value, store, appState, viewState));
        const onResponse = (request, event, response) => dispatchResponse(store, {type, request, event, response});

        event.preventDefault();
        dispatch(store, {type, request});

        console.log(JSON.stringify(JSON.parse(declaredRequest), null, 4));
        console.log(JSON.stringify(request, null, 4));

        return asyncRequest(request, onResponse);
    };
};

export const reduceDispatchers = (dispatchers = {}, state = '', store = {}, dependencies = {
    actions, syncDispatcher, asyncDispatcher
}) => {
    const {actions, syncDispatcher, asyncDispatcher} = dependencies;
    const {create, read, update, remove, async_create, async_read, async_update, async_remove} = actions(state);

    return {
        ...dispatchers,
        [create]: syncDispatcher(create, store),
        [read]: syncDispatcher(read, store),
        [update]: syncDispatcher(update, store),
        [remove]: syncDispatcher(remove, store),
        [async_create]: asyncDispatcher(async_create, store),
        [async_read]: asyncDispatcher(async_read, store),
        [async_update]: asyncDispatcher(async_update, store),
        [async_remove]: asyncDispatcher(async_remove, store)
    };
};

// Dispatchers probably need to be regenerated whenever state is changed especially added.
export const dispatchers = (state = {}, store = {}, dependencies = {reduceDispatchers}) => {
    const {reduceDispatchers} = dependencies;

    return Object
        .keys(state)
        .reduce((dispatchers, state) => reduceDispatchers(dispatchers, state, store), {});
};
