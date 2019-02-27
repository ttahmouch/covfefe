import React, {Component} from "react";
import ReactDOM from "react-dom";
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

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

    mapChild(child) {
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
                'data-action-prop': actionProp = 'data-action-prop'
            } = props;

            return React.cloneElement(child, {
                style: inlinedStyle || getStyle(importedStyle),
                children: React.Children.map(children, mapChild),
                [stateProp]: getState(state),
                [actionProp]: getDispatcher(`${action}_${state}`.toUpperCase())
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
    }
};
const action = (action, state) => `${action}_${state}`.toUpperCase();
const actions = (state) => {
    return {
        create: action('create', state),
        read: action('read', state),
        update: action('update', state),
        remove: action('remove', state)
    };
};
const reducers = (state = {}, reducers = {}) => {
    // Move to app?
    const reducer = (initialState, {create, read, update, remove}) => (state = initialState, {type, value}) => {
        switch (type) {
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

    Object.keys(state).forEach((key) => {
        let initialState = state[key];

        reducers = {
            ...reducers,
            [key]: reducer(initialState, actions(key))
        };
    });

    return reducers;
};
const dispatchers = (state = {}, store, dispatchers = {}) => {
    // Move to app?
    const dispatcher = (type) => (event) => {
        const {target} = event;
        const {value = '', dataset: {stateType = 'string'}} = target;
        const children = Array.from(target);

        event.preventDefault();

        switch (stateType) {
            case 'array':
                return store.dispatch({
                    type,
                    value: children
                        .filter(({name}) => name)
                        .map(({name, value}) => ({[name]: value}))
                });
            case 'dictionary':
                return store.dispatch({
                    type,
                    value: children
                        .filter(({name}) => name)
                        .reduce((map, {name, value}) => ({...map, [name]: [...map[name] || [], value]}), {})
                });
            case 'string':
            default:
                // Support form-urlencoded eventually?
                return store.dispatch({type, value});
        }
    };

    Object.keys(state).forEach((key) => {
        let {create, read, update, remove} = actions(key);

        dispatchers = {
            ...dispatchers,
            [create]: dispatcher(create),
            [read]: dispatcher(read),
            [update]: dispatcher(update),
            [remove]: dispatcher(remove)
        };
    });

    return dispatchers;
};

const {state, style} = declaration;

ReactDOM.render(
    <App state={state}
         style={style}
         reducers={reducers}
         dispatchers={dispatchers}>
        <RootView>
            <header data-style='header'>
                <JsonString data-state='title'
                            data-state-prop='string'/>
                <form data-action-prop='onSubmit'
                      data-action='remove'
                      data-state='title'>
                    <label>Update Title:</label>
                    <input data-action-prop='onChange'
                           data-action='update'
                           data-state='title'
                           data-state-prop='value'/>
                    <button type='submit'>Delete Title</button>
                </form>
                <JsonList data-state='titlesArray'
                          data-state-prop='list'/>
                <form data-action-prop='onSubmit'
                      data-action='create'
                      data-state='titlesArray'
                      data-state-type='array'>
                    <label>First Title:</label>
                    <input name='title'/>
                    <label>Second Title:</label>
                    <input name='title'/>
                    <label>Not Title:</label>
                    <input name='nottitle'/>
                    <button type='submit'>Submit</button>
                    <button data-action-prop='onClick'
                            data-action='remove'
                            data-state='titlesArray'
                            data-state-type='array'>
                        Remove Dictionary
                    </button>
                </form>
                <JsonDictionary data-state='titlesDictionary'
                                data-state-prop='dictionary'/>
                <form data-action-prop='onSubmit'
                      data-action='create'
                      data-state='titlesDictionary'
                      data-state-type='dictionary'>
                    <label>First Title:</label>
                    <input name='title'/>
                    <label>Second Title:</label>
                    <input name='title'/>
                    <label>Not Title:</label>
                    <input name='nottitle'/>
                    <button type='submit'>Submit</button>
                    <button data-action-prop='onClick'
                            data-action='remove'
                            data-state='titlesDictionary'
                            data-state-type='dictionary'>
                        Remove Dictionary
                    </button>
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
 */
