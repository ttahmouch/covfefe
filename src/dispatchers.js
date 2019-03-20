/* eslint-disable no-use-before-define,no-unused-vars */
import jsonpath from 'jsonpath/jsonpath.min';
import URITemplate from 'urijs/src/URITemplate';
import {actions} from './actions';
import {asyncRequest} from './request';

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

export const dispatch = (store = {dispatch: noop}, action = {}) => store.dispatch(action);

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

    return template.replace(templateExpression, (match, param) => params[param] || match);
};

export const selectState = (state = {}, selector = '', dependencies = {jsonpath}) => {
    const {jsonpath} = dependencies;

    return jsonpath.value(state, selector);
};

export const interpolateUriTemplate = (template = '', params = {}, dependencies = {URITemplate}) => {
    const {URITemplate} = dependencies;

    return new URITemplate(template).expand(params);
};

export const reviver = (key = '',
                        value = null,
                        appState = {},
                        viewState = {},
                        dependencies = {
                            selectState,
                            interpolateUriTemplate,
                            interpolateJsTemplate
                        }) => {
    const {selectState, interpolateUriTemplate, interpolateJsTemplate} = dependencies;
    const type = value === null ? 'null' : typeof value;

    if (type === 'object') {
        const {
            '@app_state': appStateSelector = '',
            '@view_state': viewStateSelector = '',
            '@uri_template': uriTemplate = '',
            '@js_template': jsTemplate = ''
        } = value;

        if (appStateSelector) {
            return selectState(appState, appStateSelector);
        }
        if (viewStateSelector) {
            return selectState(viewState, viewStateSelector);
        }
        if (uriTemplate) {
            return interpolateUriTemplate(uriTemplate, value);
        }
        if (jsTemplate) {
            return interpolateJsTemplate(jsTemplate, value);
        }
    }
    return value;
};

export const asyncDispatcher = (type = '',
                                store = {getState: noop},
                                dependencies = {
                                    mapChildrenToState,
                                    asyncRequest,
                                    dispatch,
                                    preventDefault: noop,
                                    reviver
                                }) => {
    const {mapChildrenToState, asyncRequest, dispatch, preventDefault, reviver} = dependencies;

    return (event = {preventDefault}) => {
        const {target} = event;
        const {
            value: stateValue = '',
            dataset: {stateType = 'string', request: metadata = '{}'}
        } = target;
        const children = Array.from(target);
        const appState = store.getState();
        const viewState = mapChildrenToState(children, stateType, stateValue);
        const request = JSON.parse(metadata, (key, value) => reviver(key, value, appState, viewState));

        event.preventDefault();
        dispatch(store, {type, request});

        console.log(JSON.stringify(JSON.parse(metadata), null, 4));
        console.log(JSON.stringify(request, null, 4));

        return asyncRequest(request, (event, response) => dispatch(store, {type, request, event, response}));
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
