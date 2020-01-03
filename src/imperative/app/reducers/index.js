/* eslint-disable no-use-before-define,no-fallthrough */
export const reducerFromInitialStateKeyAndValue = (key = '', initial = undefined) => {
    return (state = initial, {type = '', value = initial}) => {
        switch (type) {
            case `create_${key}`:
            case `update_${key}`:
            case `delete_${key}`:
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

export const fuck = (state = {}, combine) => {

};