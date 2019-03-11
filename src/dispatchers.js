/* eslint-disable no-use-before-define,no-unused-vars */
import {actions} from './actions';
import {asyncRequest} from './request';

/**
 * Refactor for dependency injection.
 */

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

export const asyncDispatcher = (type = '',
                                store = {},
                                dependencies = {
                                    mapChildrenToState,
                                    asyncRequest,
                                    dispatch,
                                    preventDefault: noop
                                }) => {
    const {mapChildrenToState, asyncRequest, dispatch, preventDefault} = dependencies;

    return (event = {preventDefault}) => {
        const {target} = event;
        const {
            value: stateValue = '',
            dataset: {stateType = 'string', request: metadata = '{}'}
        } = target;
        const children = Array.from(target);
        const request = {
            headers: {'content-type': 'application/json'},
            body: mapChildrenToState(children, stateType, stateValue),
            ...JSON.parse(metadata)
        };

        event.preventDefault();
        dispatch(store, {type, request});

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
