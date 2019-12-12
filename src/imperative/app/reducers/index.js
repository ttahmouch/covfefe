/* eslint-disable no-use-before-define,no-fallthrough */
export const reducerFromInitialStateKeyAndValue = (key = '', initial = undefined) => {
    return (state = initial, {type = '', value = initial}) => {
        // event = {type: ''}
        // const {type: eventType = ''} = event;

        switch (type) {
            // case async_create:
            // case async_read:
            // case async_update:
            // case async_remove:
            //     switch (eventType) {
            //         case 'load':
            //         case 'loadstart':
            //         case 'progress':
            //         case 'error':
            //         case 'abort':
            //         case 'timeout':
            //         case 'loadend':
            //         default:
            //             Are event types even relevant to the reducer? They should probably be handled similar to response states.
            // return state;
            // }
            case `delete_${key}`:
            // return value;
            case `create_${key}`:
            case `update_${key}`:
                // Differentiate update?
                return value;
            case `read_${key}`:
            default:
                return state;
        }
    };
};

export const reducersFromState = (state = {}, dependencies = {reducerFromInitialStateKeyAndValue}) => {
    const {reducerFromInitialStateKeyAndValue} = dependencies;

    return Object
        .keys(state)
        .reduce((reducers, key) => ({
            ...reducers,
            [key]: reducerFromInitialStateKeyAndValue(key, state[key])
        }), {});
};
