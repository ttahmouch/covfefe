/* eslint-disable no-use-before-define,no-unused-vars */
import jsonpath from 'jsonpath/jsonpath.min';
import URITemplate from 'urijs/src/URITemplate';
import Ajv from 'ajv';
import {actions} from '../actions';
import {asyncRequest} from '../request';

export const noop = (event) => console.log(event);

export const mapChildrenToState = (children = [],
                                   stateType = 'string',
                                   state = '') => {
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

export const dispatch = (store = {dispatch: noop}, action = {}) => {
    console.log(action);
    return store.dispatch(action);
};

// Move to app?
export const syncDispatcher = (type = '',
                               store = {},
                               dependencies = {
                                   mapChildrenToState,
                                   dispatch,
                                   preventDefault: noop
                               }) => {
    const {mapChildrenToState, dispatch, preventDefault} = dependencies;

    return (event = {preventDefault}) => {
        const {target} = event;
        const {
            value: stateValue = '',
            dataset: {stateType = 'string'}
        } = target;
        const children = Array.from(target);
        const value = mapChildrenToState(children, stateType, stateValue);

        event.preventDefault();

        return dispatch(store, {type, value});
    };
};

export const templateExpression = /{([^{}]*)}/g;

export const interpolateJsTemplate = (template = '', params = {}, dependencies = {templateExpression}) => {
    const {templateExpression} = dependencies;

    return template.replace(templateExpression, (match, param) => {
        const value = params[param];

        return typeof value === 'string' ? value : match;
    });
};

export const selectStateUsingJsonPath = (state = {}, selector = '', dependencies = {jsonpath}) => {
    const {jsonpath} = dependencies;

    return selector ? jsonpath.value(state, selector) : state;
};

export const selectStateUsingRegExp = (state = '', selector = '', regexp = new RegExp(selector)) => {
    return (regexp.exec(state) || []).slice(1);
};

export const selectState = (state = {},
                            selector = '',
                            {
                                regexp = undefined,
                                schema = undefined
                            },
                            dependencies = {selectStateUsingJsonPath, selectStateUsingRegExp}) => {
    const {selectStateUsingJsonPath, selectStateUsingRegExp} = dependencies;

    if (regexp !== undefined) {
        return selectStateUsingJsonPath(selectStateUsingRegExp(state, regexp), selector);
    }

    if (schema !== undefined) {
        return selectStateUsingJsonPath(state, selector);
    }

    return state;
};

export const interpolateUriTemplate = (template = '', params = {}, dependencies = {URITemplate}) => {
    const {URITemplate} = dependencies;

    return new URITemplate(template).expand(params);
};

export const compareLiteral = (declaredLiteral = 0, value = 0) => declaredLiteral === value;

export const compareRegexp = (declaredRegexp = '', value = '', regexp = new RegExp(declaredRegexp)) => regexp.test(value);

export const compareSchema = (declaredSchema = {}, value = {}, schema = new Ajv()) => schema.validate(declaredSchema, value);

export const dispatchDeclaredActionsWithResponseState = (declaredActions = {
                                                             '@regexp_comparison': undefined,
                                                             '@schema_comparison': undefined,
                                                             "@to_app_state": []
                                                         },
                                                         responseState = undefined,
                                                         store = {},
                                                         dependencies = {dispatch, selectState}) => {
    const {dispatch, selectState} = dependencies;
    const {
        '@regexp_comparison': regexp = undefined,
        '@schema_comparison': schema = undefined,
        "@to_app_state": appStateActions = []
    } = declaredActions;
    // Uppercase the action type?
    const dispatchAction = ({
                                "@from_response_state": selector = '',
                                "@selected_response_state": value = selectState(responseState, selector, {
                                    regexp,
                                    schema
                                }),
                                type
                            }) => dispatch(store, {type, value});

    return appStateActions.forEach(dispatchAction);
};

export const reviver = (key = '',
                        value = null,
                        store = {},
                        appState = {},
                        viewState = {},
                        dependencies = {
                            selectStateUsingJsonPath,
                            interpolateUriTemplate,
                            interpolateJsTemplate,
                            compareLiteral,
                            compareRegexp,
                            compareSchema,
                            dispatchDeclaredActionsWithResponseState
                        }) => {
    const {
        selectStateUsingJsonPath, interpolateUriTemplate, interpolateJsTemplate, compareLiteral, compareRegexp,
        compareSchema, dispatchDeclaredActionsWithResponseState
    } = dependencies;
    const type = value === null ? 'null' : typeof value;

    if (type === 'object') {
        const {
            '@from_app_state': appStateSelector = '',
            '@from_view_state': viewStateSelector = '',
            '@uri_template': uriTemplate = '',
            '@js_template': jsTemplate = '',
            '@literal_comparison': literal = undefined,
            '@regexp_comparison': regexp = undefined,
            '@schema_comparison': schema = undefined
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
            return interpolateJsTemplate(jsTemplate, value);
        }

        if (literal !== undefined) {
            return {
                ...value,
                compare: (responseState) => compareLiteral(literal, responseState),
                dispatch: (responseState) => dispatchDeclaredActionsWithResponseState(value, responseState, store)
            };
        }

        if (regexp !== undefined) {
            return {
                ...value,
                compare: (responseState) => compareRegexp(regexp, responseState),
                dispatch: (responseState) => dispatchDeclaredActionsWithResponseState(value, responseState, store)
            };
        }

        if (schema !== undefined) {
            return {
                ...value,
                compare: (responseState) => compareSchema(schema, responseState),
                dispatch: (responseState) => dispatchDeclaredActionsWithResponseState(value, responseState, store)
            };
        }
    }
    return value;
};

export const compareHeaders = (declaredHeaders = {}, headers = {}, dependencies = {noop}) => {
    const {noop} = dependencies;
    const declaredHeaderNames = Object.keys(declaredHeaders);
    const onHeader = ({header = '', compare = noop}) => compare(headers[header]);
    const toDeclaredHeader = (header = '') => ({header, ...declaredHeaders[header]});

    return declaredHeaderNames.length === declaredHeaderNames.map(toDeclaredHeader).filter(onHeader).length;
};

export const filterDeclaredResponsesMatchingResponse = (declaredResponses = [],
                                                        response = {status: 0, headers: {}, body: {}},
                                                        dependencies = {compareHeaders, noop}) => {
    const {compareHeaders, noop} = dependencies;
    const {status = 0, headers = {}, body = {}} = response;
    const onStatus = ({status: {compare = noop}}) => compare(status);
    const onHeaders = ({headers: declaredHeaders = {}}) => compareHeaders(declaredHeaders, headers);
    const onBody = ({body: {compare = noop}}) => compare(body);

    return declaredResponses.filter(onStatus).filter(onHeaders).filter(onBody);
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
    const dispatch = ({
                          status: {dispatch: dispatchStatus = noop},
                          headers: declaredHeaders = {},
                          body: {dispatch: dispatchBody = noop}
                      }) => {
        dispatchStatus(status);
        dispatchHeaders(declaredHeaders, headers);
        dispatchBody(body);
    };

    return declaredResponses.forEach(dispatch);
};

export const dispatchResponse = (store = {},
                                 {
                                     type = '',
                                     request = {responses: []},
                                     event = {type: ''},
                                     response = {status: 0, headers: {}, body: {}}
                                 },
                                 dependencies = {
                                     dispatch,
                                     filterDeclaredResponsesMatchingResponse,
                                     dispatchDeclaredResponsesWithResponseState
                                 }) => {
    const {
        dispatch,
        filterDeclaredResponsesMatchingResponse,
        dispatchDeclaredResponsesWithResponseState
    } = dependencies;
    const {responses: declaredResponses = []} = request;
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

export const asyncDispatcher = (type = '',
                                store = {getState: noop},
                                dependencies = {
                                    mapChildrenToState, asyncRequest, dispatch,
                                    reviver, dispatchResponse,
                                    preventDefault: noop
                                }) => {
    const {
        mapChildrenToState, asyncRequest, dispatch,
        reviver, dispatchResponse, preventDefault
    } = dependencies;

    return (event = {preventDefault}) => {
        const {target} = event;
        const {
            value: stateValue = '',
            dataset: {stateType = 'string', request: metadata = '{}'}
        } = target;
        const children = Array.from(target);
        const appState = store.getState();
        const viewState = mapChildrenToState(children, stateType, stateValue);
        const request = JSON.parse(metadata, (key, value) => reviver(key, value, store, appState, viewState));
        const onResponse = (request, event, response) => dispatchResponse(store, {type, request, event, response});

        event.preventDefault();
        dispatch(store, {type, request});

        console.log(JSON.stringify(JSON.parse(metadata), null, 4));
        console.log(JSON.stringify(request, null, 4));

        return asyncRequest(request, onResponse);
    };
};

export const reduceDispatchers = (dispatchers = {},
                                  state = '',
                                  store = {},
                                  dependencies = {
                                      actions,
                                      syncDispatcher,
                                      asyncDispatcher
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

export const dispatchers = (state = {},
                            store = {},
                            dependencies = {reduceDispatchers}) => {
    const {reduceDispatchers} = dependencies;

    return Object
        .keys(state)
        .reduce((dispatchers, state) => reduceDispatchers(dispatchers, state, store), {});
};