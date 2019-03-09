import React, {Component} from 'react';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

export class App extends Component {
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
export class JsonString extends Component {
    render() {
        const {props: {string = ''}} = this;
        return (
            <pre>{JSON.stringify(string, null, 4)}</pre>
        );
    }
}

export class JsonList extends Component {
    render() {
        const {props: {list = []}} = this;
        return (
            <pre>{JSON.stringify(list, null, 4)}</pre>
        );
    }
}

export class JsonDictionary extends Component {
    render() {
        const {props: {dictionary = {}}} = this;
        return (
            <pre>{JSON.stringify(dictionary, null, 4)}</pre>
        );
    }
}

// Necessary?
export class RootView extends Component {
    render() {
        const {props: {children}} = this;
        return (children);
    }
}
