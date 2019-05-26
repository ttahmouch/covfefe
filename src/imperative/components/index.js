/* eslint-disable no-use-before-define,no-unused-vars */
/**
 * TODO:
 * + Extract most logic of App into functions.
 * + Consolidate createElement and cloneElement logic for custom data-* props.
 * The dispatchers need to be regenerated every time the state changes because there will be no way to CRUD new state otherwise.
 * Refactor dispatchers() to rely on retrieving the most current state from the store since this is initial state.
 * Am I thinking about this part wrong? Should root state keys never get added at runtime? Should the nest structure of the state keys change instead?
 * That would mean that new reducers and dispatchers wouldn't need to be created dynamically.
 * I probably also need to finally add PATCH support to the reducers and dispatchers.
 */
import React, {Component} from 'react';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {action} from '../actions';

export const getEmptyObject = () => ({});

export const getStyle = (styles = {}, style = '') => styles[style];

export const getDispatcher = (dispatchers = {}, action = '') => dispatchers[action];

export const getState = (states = {}, state = '') => states[state];

export const getRequest = (requests = {}, request = '') => requests[request];

export const mapCustomPropsToReactProps = (props = {}, styles = {}, requests = {},
                                           store = {getState: getEmptyObject}, dispatchers = {},
                                           dependencies = {getStyle, getState, getDispatcher, getRequest, action}) => {
    const {getStyle, getState, getDispatcher, getRequest, action} = dependencies;
    const {
        style,
        'data-style': $style = '',
        'data-state': $state = '',
        'data-state-prop': $stateProp = 'children',
        'data-action': $action = '',
        'data-action-prop': $actionProp = 'data-action-prop',
        'data-action-request': $actionRequest = action($action, $state),
        'data-request': $request = JSON.stringify(getRequest(requests, $actionRequest) || {})
    } = props;

    return {
        ...props,
        style: style || getStyle(styles, $style),
        [$stateProp]: getState(store.getState(), $state),
        [$actionProp]: getDispatcher(dispatchers, action($action, $state)),
        'data-request': $request
    };
};

export const isDataProp = (prop = '') => /^data[-]/.test(prop);

export const areDataProps = (props = {}, dependencies = {isDataProp}) => {
    const {isDataProp} = dependencies;

    return props !== null && typeof props === 'object' && Object.keys(props).filter(isDataProp).length;
};

export const toReactProps = (props = {}, styles = {}, requests = {}, store = {}, dispatchers = {},
                             dependencies = {areDataProps, mapCustomPropsToReactProps}) => {
    const {areDataProps, mapCustomPropsToReactProps} = dependencies;

    return areDataProps(props) ? mapCustomPropsToReactProps(props, styles, requests, store, dispatchers) : props;
};

export const reactMethodWithCustomDataProps = (method = React.createElement, styles = {}, requests = {}, store = {},
                                               dispatchers = {}, dependencies = {toReactProps}) => {
    const {toReactProps} = dependencies;
    const fromCustomDataPropsToReactProps = (props) => toReactProps(props, styles, requests, store, dispatchers);

    return (...args) => method.apply(this, Array.from(args).map(fromCustomDataPropsToReactProps));
};

export const toClonedElement = (element = {}) => {
    const {props = {}} = element;
    const {children = []} = props;

    return React.cloneElement(element, props, React.Children.map(children, toClonedElement));
};

export const proxyReactMethodsToSupportCustomDataProps = (styles = {}, requests = {}, store = {}, dispatchers = {},
                                                          dependencies = {reactMethodWithCustomDataProps}) => {
    const {reactMethodWithCustomDataProps} = dependencies;

    React.createElement = reactMethodWithCustomDataProps(React.createElement, styles, requests, store, dispatchers);
    React.cloneElement = reactMethodWithCustomDataProps(React.cloneElement, styles, requests, store, dispatchers);
};

export class App extends Component {
    constructor(props) {
        super(props);

        const {
            states = {}, styles = {}, requests = {}, reducers = getEmptyObject, dispatchers = getEmptyObject,
            store = createStore(combineReducers(reducers(states)), states)
        } = props;

        this.store = store;

        // The state is probably still not needed here as it can be derived from the store.
        proxyReactMethodsToSupportCustomDataProps(styles, requests, store, dispatchers(states, store));
    }

    componentWillMount() {
        this.unsubscribe = this.store.subscribe(() => this.setState(this.store.getState()));
    }

    render() {
        const {store, props: {children = []}} = this;

        return (<Provider store={store} children={React.Children.map(children, toClonedElement)}/>);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}

export class Json extends Component {
    render() {
        const {props: {json = {}}} = this;
        return (
            <pre>{JSON.stringify(json, null, 4)}</pre>
        );
    }
}