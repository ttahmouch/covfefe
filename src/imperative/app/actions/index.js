/* eslint-disable no-use-before-define,no-unused-vars */
import {compare, filterDeclaredResponsesMatchingResponse} from './comparators/index.js';
import {toDeclarativeRequest} from './declarators/index.js';
import {interpolateTemplate} from './interpolators/index.js';
import {asyncRequest} from './http/index.js';
import {
    captureAndSelectState,
    selectState,
    getAction,
    eventFromAction,
    typeFromAction,
    stateFromAction,
    appStateFromStore,
    actionFromEvent,
    actionsFromAppState
} from '../selectors/index.js';

export const dispatchDeclarative = (declarative = {'$actions': [], '$regexp': ''},
                                    state = {'app': {}, 'view': {}, 'response': {}},
                                    store = {dispatch: (action) => action},
                                    dependencies = {captureAndSelectState}) => {
    const {captureAndSelectState} = dependencies;
    const {'$actions': actions = [], $regexp = ''} = declarative;

    return actions
        .map((action) => ({'$capture': {$regexp}, ...action}))
        .forEach(({
                      '$action': type = '',
                      '$capture': $capture = {'$regexp': ''},
                      '$select': $select = {},
                      '$value': value = captureAndSelectState($capture, $select, state)
                  }) => {
            const action = {type, value, state};

            console.group('Application Action:');
            console.log(action);
            console.groupEnd();

            return store.dispatch(action);
        });
};

export const dispatchRequestToStoreWithState = (request = {'$actions': []},
                                                store = {},
                                                state = {'app': {}, 'view': {}, 'response': {}},
                                                dependencies = {
                                                    dispatchDeclarative,
                                                    asyncRequest,
                                                    dispatchResponse
                                                }) => {
    const {
        dispatchDeclarative,
        asyncRequest,
        dispatchResponse
    } = dependencies;

    console.group('Application Request:');
    console.log(request);
    console.group('Application Request Actions:');
    dispatchDeclarative(request, state, store);
    console.groupEnd();
    console.groupEnd();

    return asyncRequest(request, (request, event, response) => {
        console.group(`Application Response Event ${event.type.toUpperCase()}:`);
        console.log(response);
        console.log(event);
        console.group('Application Response Actions:');
        dispatchResponse(store, state, {request, event, response});
        console.groupEnd();
        console.groupEnd();
    });
};

export const dispatchHeaders = (state = {'app': {}, 'view': {}, 'response': {}},
                                declaredHeaders = {},
                                headers = {},
                                dependencies = {dispatch: (state) => state}) => {
    const {dispatch} = dependencies;
    const declaredHeaderNames = Object.keys(declaredHeaders);
    const toDeclaredHeader = (header = '') => ({header, ...declaredHeaders[header]});
    const dispatchHeader = ({header, dispatch = dispatch}) => dispatch({...state, response: headers[header]});

    return declaredHeaderNames.map(toDeclaredHeader).forEach(dispatchHeader);
};

export const dispatchDeclaredResponsesWithResponseState = (state = {'app': {}, 'view': {}, 'response': {}},
                                                           declaredResponses = [],
                                                           {status, headers, body} = {status: 0, headers: {}, body: {}},
                                                           dependencies = {
                                                               dispatchHeaders,
                                                               dispatch: (state) => state
                                                           }) => {
    const {dispatchHeaders, dispatch} = dependencies;

    return declaredResponses.forEach(({
                                          '$status': {dispatch: dispatchStatus = dispatch},
                                          '$headers': declaredHeaders = {},
                                          '$body': {dispatch: dispatchBody = dispatch}
                                      }) => {
        dispatchStatus({...state, response: status});
        dispatchHeaders(state, declaredHeaders, headers);
        dispatchBody({...state, response: body});
    });
};

export const dispatchResponse = (store = {},
                                 state = {'app': {}, 'view': {}, 'response': {}},
                                 {
                                     request = {'$responses': []},
                                     event = {type: ''},
                                     response = {status: 0, headers: {}, body: {}}
                                 },
                                 dependencies = {
                                     filterDeclaredResponsesMatchingResponse,
                                     dispatchDeclaredResponsesWithResponseState
                                 }) => {
    const {
        filterDeclaredResponsesMatchingResponse,
        dispatchDeclaredResponsesWithResponseState
    } = dependencies;
    const {'$responses': declaredResponses = []} = request;
    const {type: eventType = ''} = event;

    switch (eventType) {
        case 'load':
            const declaredResponsesMatchingResponse = filterDeclaredResponsesMatchingResponse(declaredResponses, response);

            return dispatchDeclaredResponsesWithResponseState(state, declaredResponsesMatchingResponse, response);
        case 'loadstart':
        case 'progress':
        case 'error':
        case 'abort':
        case 'timeout':
        case 'loadend':
        default:
            break;
    }
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

export const toDecoratedDeclarative = (declarative = {},
                                       store = {},
                                       dependencies = {
                                           compare,
                                           dispatchDeclarative,
                                           interpolateTemplate,
                                           selectState
                                       }) => {
    const {
        compare,
        dispatchDeclarative,
        interpolateTemplate,
        selectState
    } = dependencies;

    return {
        ...declarative,
        compare: (state) => compare(declarative, state),
        dispatch: (state) => dispatchDeclarative(declarative, state, store),

        interpolate: (state) => interpolateTemplate(declarative, state),
        select: (state) => selectState(declarative, state)
    };
};

export const viewStateFromEvent = (event = {'target': {'value': '', 'dataset': {'stateType': 'string'}}},
                                   dependencies = {mapChildrenToState}) => {
    const {mapChildrenToState} = dependencies;
    const {target} = event;
    const {value = '', dataset: {stateType: type = 'string'}} = target;
    const children = Array.from(target);

    return mapChildrenToState(children, type, value);
};

// noinspection JSValidateTypes
export const isAsyncAction = ({$uri = ''} = {'$uri': ''}) => (
    (typeof $uri === 'string' && $uri.length > 0)
    || (typeof $uri === 'object' && $uri !== null)
);

export const dispatchActionToStoreWithState = (action = {'$type': '', '$uri': ''},
                                               store = {getState: () => ({'$actions': {}})},
                                               state = {'app': {}, 'view': {}, 'response': {}},
                                               dependencies = {
                                                   toDecoratedDeclarative,
                                                   toDeclarativeRequest,
                                                   isAsyncAction,
                                                   dispatchRequestToStoreWithState,
                                                   dispatchDeclarative
                                               }) => {
    const {
        toDecoratedDeclarative,
        toDeclarativeRequest,
        isAsyncAction,
        dispatchRequestToStoreWithState,
        dispatchDeclarative
    } = dependencies;
    const onDeclarativeResponseState = (declarative) => toDecoratedDeclarative(declarative, store);
    const onDeclarativeSelector = (declarative) => toDecoratedDeclarative(declarative, store).select(state);
    const onDeclarativeInterpolator = (declarative) => toDecoratedDeclarative(declarative, store).interpolate(declarative);
    const delegate = {
        onDeclarativeStatus: onDeclarativeResponseState,
        onDeclarativeHeader: onDeclarativeResponseState,
        onDeclarativeBody: onDeclarativeResponseState,
        onDeclarativeAppStateSelector: onDeclarativeSelector,
        onDeclarativeViewStateSelector: onDeclarativeSelector,
        onDeclarativeUriTemplateInterpolator: onDeclarativeInterpolator,
        onDeclarativeJsTemplateInterpolator: onDeclarativeInterpolator
    };

    return isAsyncAction(action)
        ? dispatchRequestToStoreWithState(toDeclarativeRequest(action, delegate), store, state)
        : dispatchDeclarative(action, state, store);
};

export const createActionsMiddleware = (dependencies = {
    eventFromAction,
    viewStateFromEvent,
    appStateFromStore,
    actionsFromAppState,
    typeFromAction,
    stateFromAction,
    getAction,
    dispatchActionToStoreWithState
}) => {
    const {
        eventFromAction,
        viewStateFromEvent,
        appStateFromStore,
        actionsFromAppState,
        typeFromAction,
        stateFromAction,
        getAction,
        dispatchActionToStoreWithState
    } = dependencies;

    return (store = {
        getState: () => ({'$actions': {}}),
        dispatch: (action) => action
    }) => {
        return (next = (action) => action) => {
            return (action = {
                'type': '',
                'event': {'target': {'dataset': {'action': ''}}},
                'state': {'app': {}, 'view': {}, 'response': {}}
            }) => {
                // Think through control flow of actions in sequence or parallel and passing state between asynchronous actions, e.g., cascading response state.

                const event = eventFromAction(action) || {'target': {'dataset': {'action': ''}}};
                const app = appStateFromStore(store) || {};
                const view = viewStateFromEvent(event) || {};
                const state = {view, ...stateFromAction(action), app};
                const actions = actionsFromAppState(app) || {};
                const selector = typeFromAction(action) || '';
                const $action = getAction(actions, selector);

                return $action
                    ? dispatchActionToStoreWithState($action, store, state)
                    : next(action);
            };
        };
    };
};

export const actionDispatcherFromStore = (store = {dispatch: (action) => action},
                                          dependencies = {actionFromEvent}) => {
    const {actionFromEvent} = dependencies;

    return (event = {preventDefault: () => undefined}) => {
        const action = {'type': actionFromEvent(event) || '', event};

        event.preventDefault();
        store.dispatch(action);
    };
};