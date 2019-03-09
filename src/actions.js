export const action = (action, state) => `${action}_${state}`.toUpperCase();

export const actions = (state) => {
    return {
        create: action('create', state),
        read: action('read', state),
        update: action('update', state),
        remove: action('remove', state),
        async_create: action('async_create', state),
        async_read: action('async_read', state),
        async_update: action('async_update', state),
        async_remove: action('async_remove', state)
    };
};
