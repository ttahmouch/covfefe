import {actions} from './actions';

// Move to app?
export const reducer = (initialState, actions) => {
    const {create, read, update, remove, async_create, async_read, async_update, async_remove} = actions;

    return (state = initialState, action) => {
        const {
            type, value,
            request: {responses = []} = {},
            event: {type: event = ''} = {},
            response: {status = 200, headers = {}, body = ''} = {}
        } = action;

        switch (type) {
            case async_create:
            case async_read:
            case async_update:
            case async_remove:
                switch (event) {
                    case 'load':
                        return body;
                    case 'loadstart':
                    case 'progress':
                    case 'error':
                    case 'abort':
                    case 'timeout':
                    case 'loadend':
                    default:
                        return state;
                }
            case remove:
                // console.log(`Reducing `{state, type, value, responses, event, response});
                return initialState;
            case create:
            case update:
                // Differentiate update?
                // console.log({state, type, value, responses, event, response});
                return value;
            case read:
            default:
                // console.log({state, type, value, responses, event, response});
                return state;
        }
    };
};

export const reducers = (state = {}) => {
    return Object.keys(state).reduce((reducers, key) => ({...reducers, [key]: reducer(state[key], actions(key))}), {});
};
