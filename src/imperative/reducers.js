import {actions} from './actions';

// Move to app?
export const reducer = (initialState, actions) => {
    const {create, read, update, remove, async_create, async_read, async_update, async_remove} = actions;

    return (state = initialState, {type, value, event = {type: ''}}) => {
        const {type: eventType = ''} = event;

        switch (type) {
            case async_create:
            case async_read:
            case async_update:
            case async_remove:
                switch (eventType) {
                    case 'load':
                    case 'loadstart':
                    case 'progress':
                    case 'error':
                    case 'abort':
                    case 'timeout':
                    case 'loadend':
                    default:
                        // Are event types even relevant to the reducer? They should probably be handled similar to response states.
                        return state;
                }
            case remove:
                return initialState;
            case create:
            case update:
                // Differentiate update?
                return value;
            case read:
            default:
                return state;
        }
    };
};

export const reducersFromStates = (state = {}) => {
    return Object
        .keys(state)
        .reduce((reducers, key) => ({...reducers, [key]: reducer(state[key], actions(key))}), {});
};
