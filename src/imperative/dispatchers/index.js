/**
 * TODO:
 * Allow comparison of anything declared; not just response state.
 * Possibly treat request and response state the same with respect to comparing and dispatching selected state.
 */
/* eslint-disable no-use-before-define,no-unused-vars */
import {action, actions} from '../actions';
import {compare, filterDeclaredResponsesMatchingResponse} from '../comparators';
import {toDeclarativeRequest} from '../declarators';
import {interpolateTemplate} from '../interpolators';
import {asyncRequest} from '../request';
import {selectState, captureAndSelectState} from '../selectors';

export const noop = (event) => console.log(event);

export const dispatch = (store = {dispatch: noop}, action = {}) => {
    console.log(action);
    return store.dispatch(action);
};

// store, state, actions
// Support $with in place of $select?
export const dispatchDeclaredActionsWithSelectedState = (actions = [],
                                                         state = {},
                                                         store = {},
                                                         dependencies = {dispatch, captureAndSelectState, action}) => {
    const {dispatch, captureAndSelectState, action} = dependencies;

    return actions.forEach(({
                                $action = '',
                                $state = '',
                                // $capture,
                                // $select,
                                $capture = {},
                                $select = {},
                                '$type': type = action($action, $state),
                                '$value': value = captureAndSelectState($capture, $select, state)
                            }) => dispatch(store, {type, value}));
};

export const dispatchDeclarative = (declarative = {'$actions': [], '$regexp': ''},
                                    state = {},
                                    store = {},
                                    dependencies = {dispatchDeclaredActionsWithSelectedState}) => {
    const {dispatchDeclaredActionsWithSelectedState} = dependencies;
    const {'$actions': actions = [], $regexp = ''} = declarative;

    return dispatchDeclaredActionsWithSelectedState(actions.map((action) => ({'$capture': {$regexp}, ...action})), state, store);
};

export const dispatchRequest = (store = {},
                                state = {},
                                action = {type: '', request: {'$actions': []}},
                                dependencies = {dispatch, dispatchDeclarative}) => {
    const {dispatch, dispatchDeclarative} = dependencies;
    const {type = '', request = {'$actions': []}} = action;

    // Should this happen before this method is called? It feels like a lot of setup just to dispatch the action from
    // this method.
    dispatch(store, {type, request});
    return dispatchDeclarative(request, state, store);
};

export const dispatchHeaders = (state = {},
                                declaredHeaders = {},
                                headers = {},
                                dependencies = {noop}) => {
    const {noop} = dependencies;
    const declaredHeaderNames = Object.keys(declaredHeaders);
    const toDeclaredHeader = (header = '') => ({header, ...declaredHeaders[header]});
    const dispatchHeader = ({header, dispatch = noop}) => dispatch({...state, response: headers[header]});

    return declaredHeaderNames.map(toDeclaredHeader).forEach(dispatchHeader);
};

export const dispatchDeclaredResponsesWithResponseState = (state = {},
                                                           declaredResponses = [],
                                                           {status, headers, body} = {status: 0, headers: {}, body: {}},
                                                           dependencies = {dispatchHeaders, noop}) => {
    const {dispatchHeaders, noop} = dependencies;

    return declaredResponses.forEach(({
                                          '$status': {dispatch: dispatchStatus = noop},
                                          '$headers': declaredHeaders = {},
                                          '$body': {dispatch: dispatchBody = noop}
                                      }) => {
        dispatchStatus({...state, response: status});
        dispatchHeaders(state, declaredHeaders, headers);
        dispatchBody({...state, response: body});
    });
};

export const dispatchResponse = (store = {},
                                 state = {},
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
            // Make these composable.
            const declaredResponsesMatchingResponse = filterDeclaredResponsesMatchingResponse(declaredResponses, response);

            dispatchDeclaredResponsesWithResponseState(state, declaredResponsesMatchingResponse, response);
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
    compare, dispatchDeclarative, interpolateTemplate, selectState
}) => {
    const {compare, dispatchDeclarative, interpolateTemplate, selectState} = dependencies;

    return {
        ...declarative,
        compare: (state) => compare(declarative, state),
        dispatch: (state) => dispatchDeclarative(declarative, state, store),
        // Distinguish these between request and response context.
        interpolate: (state) => interpolateTemplate(declarative, state),
        select: (state) => selectState(declarative, state)
    };
};

export const toOnDeclarativeDelegate = (store = {},
                                        state = {app: {}, view: {}},
                                        dependencies = {toDecoratedDeclarative}) => {
    // const {app = {}, view = {}} = state;
    const {toDecoratedDeclarative} = dependencies;

    return {
        onDeclarativeStatus: (declarative) => toDecoratedDeclarative(declarative, store),
        onDeclarativeHeader: (declarative) => toDecoratedDeclarative(declarative, store),
        onDeclarativeBody: (declarative) => toDecoratedDeclarative(declarative, store),
        // These should probably not be done because interpolating the state of the selectors and interpolators should
        // happen dynamically as late as possible, i.e., immediately before a request or after a response when
        // dispatching actions.
        // This will make context of the selection and interpolation far more relevant now because before they just
        // happened as a part of the JSON revival indiscriminately. Moving it to after the revival would mean that we
        // have to be aware of where the selection and interpolation is taking place, e.g., method, uri, headers, body,
        // username, password, actions, etc.
        onDeclarativeAppStateSelector: (declarative) => toDecoratedDeclarative(declarative, store).select(state),
        onDeclarativeViewStateSelector: (declarative) => toDecoratedDeclarative(declarative, store).select(state),
        onDeclarativeUriTemplateInterpolator: (declarative) => toDecoratedDeclarative(declarative, store).interpolate(declarative),
        onDeclarativeJsTemplateInterpolator: (declarative) => toDecoratedDeclarative(declarative, store).interpolate(declarative)
    };
};

export const asyncDispatcher = (type = '',
                                store = {getState: noop},
                                requests = {},
                                dependencies = {
                                    mapChildrenToState,
                                    preventDefault: noop,
                                    asyncRequest,
                                    toDeclarativeRequest,
                                    toOnDeclarativeDelegate,
                                    dispatchRequest,
                                    dispatchResponse
                                }) => {
    const {
        mapChildrenToState, preventDefault, asyncRequest, toDeclarativeRequest,
        toOnDeclarativeDelegate, dispatchRequest, dispatchResponse
    } = dependencies;

    return (event = {preventDefault}) => {
        const {target} = event;
        const {value: stateValue = '', dataset} = target;
        // const {stateType = 'string', request: declaredRequest = '{}'} = dataset;
        const {stateType = 'string', actionRequest = ''} = dataset;
        const declaredRequest = requests[actionRequest] || {};
        const children = Array.from(target);
        const app = store.getState();
        const view = mapChildrenToState(children, stateType, stateValue);
        const state = {app, view};
        const delegate = toOnDeclarativeDelegate(store, state);
        const request = toDeclarativeRequest(declaredRequest, delegate);
        const action = {type, request};
        const onResponse = (request, event, response) => {
            const action = {type, request, event, response};

            console.group('Dispatch Actions on Response:');

            dispatchResponse(store, state, action);

            return console.groupEnd();
        };

        event.preventDefault();

        console.group('Async Dispatch:');
        console.log(declaredRequest);
        console.log(request);
        console.groupEnd();
        console.group('Dispatch Actions on Request:');

        dispatchRequest(store, state, action);

        console.groupEnd();

        // Shift the need to interpolate or select state for the request and response to callbacks of the request client.
        // This will shift the state management to as late as possible. Perhaps allow `{app:()=>store.getState()}` to
        // allow late binding of app state.
        return asyncRequest(request, onResponse);
    };
};

export const reduceDispatchers = (dispatchers = {},
                                  state = '',
                                  store = {},
                                  requests = {},
                                  dependencies = {actions, syncDispatcher, asyncDispatcher}) => {
    const {actions, syncDispatcher, asyncDispatcher} = dependencies;
    const {create, read, update, remove, async_create, async_read, async_update, async_remove} = actions(state);

    return {
        ...dispatchers,
        [create]: syncDispatcher(create, store),
        [read]: syncDispatcher(read, store),
        [update]: syncDispatcher(update, store),
        [remove]: syncDispatcher(remove, store),
        [async_create]: asyncDispatcher(async_create, store, requests),
        [async_read]: asyncDispatcher(async_read, store, requests),
        [async_update]: asyncDispatcher(async_update, store, requests),
        [async_remove]: asyncDispatcher(async_remove, store, requests)
    };
};

// Dispatchers probably need to be regenerated whenever state is changed especially added.
export const dispatchers = (state = {},
                            store = {},
                            requests = {},
                            dependencies = {reduceDispatchers}) => {
    const {reduceDispatchers} = dependencies;

    return Object
        .keys(state)
        .reduce((dispatchers, state) => reduceDispatchers(dispatchers, state, store, requests), {});
};