import {actions} from './actions';

export const noop = (event) => console.log(event);

export const asyncRequest = (metadata, callback = noop) => {
    const client = new XMLHttpRequest();
    const {
        method = 'GET', uri = '/', headers = {}, body = '', username = '', password = '', withCredentials = 'false'
    } = metadata;
    const {'content-type': type = ''} = headers;

    client.open(method, uri, true, username, password);

    Object.keys(headers).forEach((header) => client.setRequestHeader(header, headers[header]));

    client.withCredentials = withCredentials === 'true';
    client.responseType = 'text';
    client.addEventListener('loadstart', callback);
    client.addEventListener('progress', callback);
    client.addEventListener('error', callback);
    client.addEventListener('abort', callback);
    client.addEventListener('timeout', callback);
    client.addEventListener('load', (event) => {
        const {status = 200, responseText: body = ''} = client;
        const headers = client.getAllResponseHeaders()
            .split('\r\n')
            .filter((header) => header)
            .map((header) => header.split(': '))
            .reduce((headers, [name, value]) => ({...headers, [name.toLowerCase()]: value}), {});
        const {'content-type': type = ''} = headers;

        return callback(event, {status, headers, body: type.includes('application/json') ? JSON.parse(body) : body});
    });
    client.addEventListener('loadend', callback);
    client.send(type.includes('application/json') ? JSON.stringify(body) : body);
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

// Move to app?
export const dispatcher = (type, store) => (event) => {
    const {target} = event;
    const {value: stateValue = '', dataset: {stateType = 'string'}} = target;
    const children = Array.from(target);
    const value = mapChildrenToState(children, stateType, stateValue);

    event.preventDefault();

    // console.log(`Dispatching a sync action, ${type}, with value, ${JSON.stringify(value, null, 4)}.`);
    return store.dispatch({type, value});
};

export const asyncDispatcher = (type, store) => (event) => {
    const {target} = event;
    const {value: stateValue = '', dataset: {stateType = 'string', request: metadata = '{}'}} = target;
    const request = {
        headers: {'content-type': 'application/json'},
        body: mapChildrenToState(Array.from(target), stateType, stateValue),
        ...JSON.parse(metadata)
    };

    event.preventDefault();
    store.dispatch({type, request});

    // console.log(`Dispatching async action, ${type}, with request: ${JSON.stringify(request, null, 4)}`);
    return asyncRequest(request, (event, response) => {
        store.dispatch({type, request, event, response});
        // console.log(`Dispatching a sync action, ${type}, with event ${event.type} and response: ${JSON.stringify(response, null, 4)}.`);
    });
};

export const dispatchers = (state = {}, store) => {
    return Object.keys(state).reduce((dispatchers, key) => {
        let {create, read, update, remove, async_create, async_read, async_update, async_remove} = actions(key);

        return {
            ...dispatchers,
            [create]: dispatcher(create, store),
            [read]: dispatcher(read, store),
            [update]: dispatcher(update, store),
            [remove]: dispatcher(remove, store),
            [async_create]: asyncDispatcher(async_create, store),
            [async_read]: asyncDispatcher(async_read, store),
            [async_update]: asyncDispatcher(async_update, store),
            [async_remove]: asyncDispatcher(async_remove, store)
        };
    }, {});
};
