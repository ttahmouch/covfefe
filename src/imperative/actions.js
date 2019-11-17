export const actions = (state) => {
    return {
        create: `create_${state}`,
        read: `read_${state}`,
        update: `update_${state}`,
        remove: `remove_${state}`,
        async_create: `async_create_${state}`,
        async_read: `async_read_${state}`,
        async_update: `async_update_${state}`,
        async_remove: `async_remove_${state}`
    };
};
