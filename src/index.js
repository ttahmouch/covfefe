import React, {Component} from "react";
import ReactDOM from "react-dom";
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

const declaration = {
    state: {
        title: '',
        titlesArray: [],
        titlesDictionary: {}
    },
    style: {
        header: {
            'backgroundColor': '#282c34',
            'display': 'flex',
            'flexDirection': 'column',
            'alignItems': 'center',
            'justifyContent': 'center',
            'color': 'white'
        }
    },
    request: {
        createTitlesDictionary: {
            method: 'POST',
            uri: '/titlesDictionary.json',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: {
                "titles": []
            },
            username: '',
            password: '',
            withCredentials: 'false',
            responses: [
                {
                    status: 201,
                    headers: {
                        'content-type': 'application/json',
                        'location': '/titlesDictionary.json'
                    },
                    body: {
                        type: 'object',
                        properties: {
                            titles: {type: 'array'}
                        }
                    }
                }
            ]
        },
        readTitlesDictionary: {
            method: 'GET',
            uri: '/titlesDictionary.json',
            headers: {
                'accept': 'application/json'
            },
            body: '',
            username: '',
            password: '',
            withCredentials: 'false',
            responses: [
                {
                    status: 200,
                    headers: {'content-type': 'application/json'},
                    body: {
                        type: 'object',
                        properties: {
                            titles: {type: 'array'}
                        }
                    }
                }
            ]
        },
        updateTitlesDictionary: {
            method: 'PUT',
            uri: '/titlesDictionary.json',
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: {
                "titles": []
            },
            username: '',
            password: '',
            withCredentials: 'false',
            responses: [
                {
                    status: 200,
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: {
                        type: 'object',
                        properties: {
                            titles: {type: 'array'}
                        }
                    }
                }
            ]
        },
        removeTitlesDictionary: {
            method: 'DELETE',
            uri: '/titlesDictionary.json',
            headers: {
                'accept': 'application/json'
            },
            body: '',
            username: '',
            password: '',
            withCredentials: 'false',
            responses: [
                {
                    status: 204,
                    headers: {},
                    body: {}
                }
            ]
        }
    }
};

class App extends Component {
    constructor(props) {
        super(props);

        const {
            state = {},
            reducers = () => ({}),
            dispatchers = () => ({}),
            store = createStore(combineReducers(reducers(state)), state)
        } = props;

        this.state = {...state};
        this.store = store;
        this.dispatchers = dispatchers(state, store);
    }

    componentWillMount() {
        const {store} = this;
        // Possibly unsubscribe?
        store.subscribe(() => this.setState(store.getState()));
    }

    getStyle(key) {
        const {props: {style = {}}} = this;

        return style[key];
    }

    getDispatcher(action) {
        const {dispatchers = {}} = this;

        return dispatchers[action];
    }

    getState(key) {
        const {state = {}} = this;

        return state[key];
    }

    getRequest(key) {
        const {props: {request = {}}} = this;

        return request[key];
    }

    mapChild(child) {
        const getRequest = this.getRequest.bind(this);
        const getDispatcher = this.getDispatcher.bind(this);
        const getState = this.getState.bind(this);
        const getStyle = this.getStyle.bind(this);
        const mapChild = this.mapChild.bind(this);
        const {props} = child;

        if (!props) {
            return child;
        } else {
            const {
                children,
                style: inlinedStyle,
                'data-style': importedStyle = '',
                'data-state': state = '',
                'data-state-prop': stateProp = 'data-state-prop',
                'data-action': action = '',
                'data-action-prop': actionProp = 'data-action-prop',
                'data-action-request': actionRequest = ''
            } = props;

            return React.cloneElement(child, {
                style: inlinedStyle || getStyle(importedStyle),
                children: React.Children.map(children, mapChild),
                [stateProp]: getState(state),
                [actionProp]: getDispatcher(`${action}_${state}`.toUpperCase()),
                'data-request': JSON.stringify(getRequest(actionRequest) || {})
            });
        }
    }

    render() {
        const mapChild = this.mapChild.bind(this);
        const {store, props: {children}} = this;

        return (
            <Provider store={store}>
                {React.Children.map(children, mapChild)}
            </Provider>
        );
    }
}

// Just for example.
class JsonString extends Component {
    render() {
        const {props: {string = ''}} = this;
        return (
            <pre>{JSON.stringify(string, null, 4)}</pre>
        );
    }
}

class JsonList extends Component {
    render() {
        const {props: {list = []}} = this;
        return (
            <pre>{JSON.stringify(list, null, 4)}</pre>
        );
    }
}

class JsonDictionary extends Component {
    render() {
        const {props: {dictionary = {}}} = this;
        return (
            <pre>{JSON.stringify(dictionary, null, 4)}</pre>
        );
    }
}

// Necessary?
class RootView extends Component {
    render() {
        const {props: {children}} = this;
        return (children);
    }
}

const action = (action, state) => `${action}_${state}`.toUpperCase();

const actions = (state) => {
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

// Move to app?
const reducer = (initialState, actions) => {
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

const reducers = (state = {}, reducers = {}) => {
    Object
        .keys(state)
        .forEach((key) => reducers = {...reducers, [key]: reducer(state[key], actions(key))});

    return reducers;
};

const noop = (event) => console.log(event);

const asyncRequest = (metadata, callback = noop) => {
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

const mapChildrenToState = (children = [], stateType = 'string', state = '') => {
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
const dispatcher = (type, store) => (event) => {
    const {target} = event;
    const {value: stateValue = '', dataset: {stateType = 'string'}} = target;
    const children = Array.from(target);
    const value = mapChildrenToState(children, stateType, stateValue);

    event.preventDefault();

    console.log(`Dispatching a sync action, ${type}, with value, ${JSON.stringify(value, null, 4)}.`);
    return store.dispatch({type, value});
};

const asyncDispatcher = (type, store) => (event) => {
    const {target} = event;
    const {value: stateValue = '', dataset: {stateType = 'string', request: metadata = '{}'}} = target;
    const children = Array.from(target);
    const actionRequest = JSON.parse(metadata);
    const request = {
        headers: {'content-type': 'application/json'},
        body: mapChildrenToState(children, stateType, stateValue),
        ...actionRequest
    };

    event.preventDefault();
    store.dispatch({type, request});

    console.log(`Dispatching async action, ${type}, with request: ${JSON.stringify(request, null, 4)}`);
    return asyncRequest(request, (event, response) => {
        store.dispatch({type, request, event, response});
        console.log(`Dispatching a sync action, ${type}, with event ${event.type} and response: ${JSON.stringify(response, null, 4)}.`);
    });
};

const dispatchers = (state = {}, store, dispatchers = {}) => {
    Object.keys(state).forEach((key) => {
        let {create, read, update, remove, async_create, async_read, async_update, async_remove} = actions(key);

        dispatchers = {
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
    });

    return dispatchers;
};

const {state, style, request} = declaration;

ReactDOM.render(
    <App state={state}
         style={style}
         request={request}
         reducers={reducers}
         dispatchers={dispatchers}>
        <RootView>
            <header data-style="header">
                <JsonString data-state='title'
                            data-state-prop='string'/>
                <form data-action-prop='onSubmit'
                      data-action='remove'
                      data-state='title'>
                    <div>
                        <label>Update Title:</label>
                        <input data-action-prop='onChange'
                               data-action='update'
                               data-state='title'
                               data-state-prop='value'/>
                    </div>
                    <div>
                        <button type='submit'>Delete Title</button>
                    </div>
                </form>
                <JsonList data-state='titlesArray'
                          data-state-prop='list'/>
                <form data-action-prop='onSubmit'
                      data-action='create'
                      data-state='titlesArray'
                      data-state-type='array'>
                    <div>
                        <label>First Title:</label>
                        <input name='title'/>
                    </div>
                    <div>
                        <label>Second Title:</label>
                        <input name='title'/>
                    </div>
                    <div>
                        <label>Not Title:</label>
                        <input name='nottitle'/>
                    </div>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                    <div>
                        <button data-action-prop='onClick'
                                data-action='remove'
                                data-state='titlesArray'
                                data-state-type='array'>
                            Remove Array
                        </button>
                    </div>
                </form>
                <JsonDictionary data-state='titlesDictionary'
                                data-state-prop='dictionary'/>
                <form data-action-prop='onSubmit'
                      data-action='create'
                      data-state='titlesDictionary'
                      data-state-type='dictionary'>
                    <div>
                        <label>First Title:</label>
                        <input name='title'/>
                    </div>
                    <div>
                        <label>Second Title:</label>
                        <input name='title'/>
                    </div>
                    <div>
                        <label>Not Title:</label>
                        <input name='nottitle'/>
                    </div>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                    <div>
                        <button data-action-prop='onClick'
                                data-action='remove'
                                data-state='titlesDictionary'
                                data-state-type='dictionary'>
                            Remove Dictionary
                        </button>
                    </div>
                    <div>
                        <button data-action-prop='onClick'
                                data-action='async_create'
                                data-action-request='createTitlesDictionary'
                                data-state='titlesDictionary'
                                data-state-type='dictionary'>
                            Create Titles Dictionary Async
                        </button>
                    </div>
                    <div>
                        <button data-action-prop='onClick'
                                data-action='async_read'
                                data-action-request='readTitlesDictionary'
                                data-state='titlesDictionary'
                                data-state-type='dictionary'>
                            Read Titles Dictionary Async
                        </button>
                    </div>
                    <div>
                        <button data-action-prop='onClick'
                                data-action='async_update'
                                data-action-request='updateTitlesDictionary'
                                data-state='titlesDictionary'
                                data-state-type='dictionary'>
                            Update Titles Dictionary Async
                        </button>
                    </div>
                    <div>
                        <button data-action-prop='onClick'
                                data-action='async_remove'
                                data-action-request='removeTitlesDictionary'
                                data-state='titlesDictionary'
                                data-state-type='dictionary'>
                            Remove Titles Dictionary Async
                        </button>
                    </div>
                </form>
            </header>
        </RootView>
    </App>,
    document.getElementById("root")
);

/*
Add support for sets, i.e., createItem, readItem, updateItem, removeItem.
Add asynchrony.
Add routing.
Build a basic Reddit app.
Use data attributes for now to avoid misusing the normal attributes.
Add client rendering of HTTP metadata, i.e., URI Templates, JSON Path, JSON Schema, etc.
Add response handling for success and error states using reducers that change synchronous state, i.e., JSON Path, JSON Schema.
 */
