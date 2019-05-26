/**
 * TODO:
 * Allow comparison of anything declared; not just response state.
 * Possibly treat request and response state the same with respect to comparing and dispatching selected state.
 */
/* eslint-disable no-use-before-define,no-unused-vars */
import {action, actions} from '../actions';
import {compare, filterDeclaredResponsesMatchingResponse} from '../comparators';
import {toDeclarativeHttpTransaction} from '../declarators';
import {selectState} from '../selectors';
import {asyncRequest} from '../request';

export const noop = (event) => console.log(event);

export const dispatch = (store = {dispatch: noop}, action = {}) => {
    console.log(action);
    return store.dispatch(action);
};

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
// I think it's done enough to start implementing to_app_state for requests.
export const toDecoratedDeclarative = (declarative = {}, store = {}, dependencies = {
    compare, dispatchDeclaredActionsWithSelectedState
}) => {
    const {compare, dispatchDeclaredActionsWithSelectedState} = dependencies;

    return {
        ...declarative,
        compare: (state) => compare(declarative, state),
        dispatch: (state) => dispatchDeclaredActionsWithSelectedState(declarative, state, store)
    };
};

export const asyncDispatcher = (type = '', store = {getState: noop}, dependencies = {
    mapChildrenToState, dispatch, preventDefault: noop,
    asyncRequest, toDeclarativeHttpTransaction, toDecoratedDeclarative, dispatchResponse
}) => {
    const {
        mapChildrenToState, dispatch, preventDefault,
        asyncRequest, toDeclarativeHttpTransaction, toDecoratedDeclarative, dispatchResponse
    } = dependencies;

    return (event = {preventDefault}) => {
        const {target} = event;
        const {
            value: stateValue = '',
            dataset: {stateType = 'string', request: declaredRequest = '{}'}
        } = target;
        const children = Array.from(target);
        const appState = store.getState();
        const viewState = mapChildrenToState(children, stateType, stateValue);
        const onDeclarative = (declarative) => toDecoratedDeclarative(declarative, store);
        const delegate = {
            onDeclarativeStatus: onDeclarative,
            onDeclarativeHeader: onDeclarative,
            onDeclarativeBody: onDeclarative
        };
        const request = toDeclarativeHttpTransaction(declaredRequest, appState, viewState, delegate);
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
