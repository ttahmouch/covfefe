/* eslint-disable no-use-before-define,no-unused-vars */
import React, {Component, createElement, Fragment, isValidElement} from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {getState, getStyle, getView} from './selectors.js';
import {reducersFromState} from './reducers';
import {actionDispatcherFromStore, createActionsMiddleware} from './dispatchers';

export const appStateFromStore = (store = {getState: () => ({})}) => store.getState() || {};

export const viewsFromAppState = ({$views = {}} = {'$views': {}}) => $views;

export const viewFromAppState = ({$view = []} = {'$view': []}) => $view;

export const viewFromStore = (store = {getState: () => ({'$view': []})},
                              dependencies = {viewFromAppState, appStateFromStore}) => {
    const {viewFromAppState, appStateFromStore} = dependencies;

    return viewFromAppState(appStateFromStore(store));
};

export const stylesFromAppState = ({$styles = {}} = {'$styles': {}}) => $styles;

export const componentsFromAppState = ({$components = {}} = {'$components': {}}) => $components;

export const mapCustomPropsToReactProps = (props = {},
                                           store = {getState: () => ({'$styles': {}})},
                                           // app = {
                                           //     $store: {getState: getEmptyObject},
                                           //     $styles: {},
                                           //     $dispatchers: {},
                                           // },
                                           dependencies = {
                                               // getEmptyObject,
                                               appStateFromStore,
                                               stylesFromAppState,
                                               getStyle,
                                               getState,
                                               actionDispatcherFromStore
                                               // getDispatcher,
                                           }) => {
    // dispatcher = actionDispatcherFromStore($store) || (() => ({}))
    const {
        // getEmptyObject,
        appStateFromStore,
        stylesFromAppState,
        getStyle,
        getState,
        actionDispatcherFromStore
        // getDispatcher,
    } = dependencies;
    const $states = appStateFromStore(store) || {};
    const $styles = stylesFromAppState($states) || {};
    // const {
    //     $store = {getState: getEmptyObject},
    //     $styles = {},
    //     $dispatchers = {},
    // } = app;
    // const $states = $store.getState();
    const {
        style,
        'data-style': $styleSelector = '',
        'data-state': $stateSelector = '',
        'data-action': $actionSelector = '',
        'data-style-value': $styleValue = getStyle($styles, $styleSelector),
        'data-state-value': $stateValue = getState($states, $stateSelector),
        // 'data-action-value': $actionValue = getDispatcher($dispatchers, $actionSelector),
        'data-action-value': $actionValue = $actionSelector ? actionDispatcherFromStore(store) : undefined,
        'data-bind-style': $bindStyle = $styleValue || style ? 'style' : 'data-bind-style',
        'data-bind-state': $bindState = $stateValue ? 'children' : 'data-state',
        'data-bind-action': $bindAction = 'data-bind-action'
    } = props;

    return {
        ...props,
        [$bindStyle]: style || $styleValue,
        [$bindState]: $stateValue,
        [$bindAction]: $actionValue
    };
};

export const isDataProp = (prop = '') => /^data[-]/.test(prop);

export const areDataProps = (props = {}, dependencies = {isDataProp}) => {
    const {isDataProp} = dependencies;

    return props !== null && typeof props === 'object' && Object.keys(props).filter(isDataProp).length;
};

export const toReactProps = (props = {},
                             store = {},
                             dependencies = {areDataProps, mapCustomPropsToReactProps}) => {
    const {areDataProps, mapCustomPropsToReactProps} = dependencies;

    return areDataProps(props) ? mapCustomPropsToReactProps(props, store) : props;
};

export const isFragment = (fragment = Fragment) => fragment === Fragment;

export const isComponent = (component = Component) => typeof component === 'function';

export const isElementLike = (element = {type: '', props: {children: []}}) => (
    typeof element === 'object'
    && element !== null
    && typeof element.$$typeof === 'undefined'
);

export const isElement = (element = {}, dependencies = {isElementLike, isValidElement}) => {
    const {isElementLike, isValidElement} = dependencies;

    return isElementLike(element) || isValidElement(element);
};

export const getType = (components = {},
                        type = '',
                        dependencies = {isFragment, isComponent, isElement}) => {
    const {isFragment, isComponent, isElement} = dependencies;
    const $components = {...components, '': Fragment, Fragment};

    return isElement(type) || isFragment(type) || isComponent(type)
        ? type
        : $components[type] || type || Fragment;
};

export const reactMethodWithCustomDataProps = (method = {createElement},
                                               store = {getState: () => ({'$views': {}, '$components': {}})},
                                               dependencies = {
                                                   appStateFromStore,
                                                   viewsFromAppState,
                                                   componentsFromAppState,
                                                   toReactProps,
                                                   getType,
                                                   getView,
                                                   isElement
                                               }) => {
    const {
        appStateFromStore,
        viewsFromAppState,
        componentsFromAppState,
        toReactProps,
        getType,
        getView,
        isElement
    } = dependencies;
    const {createElement} = method;
    const toChild = (child) => typeof child === 'string' ? child : toElement(child);
    const toElement = (type = '', props = {}, ...children) => {
        const state = appStateFromStore(store);
        const views = viewsFromAppState(state);
        const components = componentsFromAppState(state);
        const {'data-view': $selector = '', ...$props} = props;
        const $view = getView(views, $selector);
        const $element = $view || type;

        if (isElement($element)) {
            const {type = '', props: {children = [], ...props} = {}} = $element;
            const $type = getType(components, type);
            const $children = [].concat(children).map(toChild);
            return toElement($type, {...props, ...$props}, ...$children);
        }

        return createElement(type, toReactProps(props, store), ...children);
    };

    return toElement;
};

export const componentDependencies = {
    reducersFromState,
    combineReducers,
    createStore,
    createActionsMiddleware,
    applyMiddleware,
    createElement,
    reactMethodWithCustomDataProps,
    appStateFromStore,
    viewFromStore
};

export class App extends Component {
    constructor(props) {
        super(props);

        const {app = {}, dependencies = componentDependencies} = props;
        const {
            reducersFromState,
            combineReducers,
            createStore,
            createActionsMiddleware,
            applyMiddleware,
            createElement,
            reactMethodWithCustomDataProps,
            appStateFromStore,
            viewFromStore
        } = dependencies;
        const {
            $states = {},
            $styles = {},
            $actions = {},
            $components = {},
            $views = {},
            $view = [],
            $state = {
                ...$states,
                $states,
                $styles,
                $actions,
                $components,
                $views,
                $view
            },
            $reducers = reducersFromState($state) || {},
            $reducer = combineReducers($reducers) || (() => $state),
            $middleware = [createActionsMiddleware()],
            $enhancer = applyMiddleware(...$middleware) || ((createStore) => createStore),
            $store = createStore($reducer, $state, $enhancer) || {
                getState: () => ({}),
                dispatch: (action) => action,
                subscribe: () => (() => undefined)
            },
            $unsubscribe = $store.subscribe(() => {
                const $state = appStateFromStore($store);

                console.group('Application State:');
                console.log($state);
                console.groupEnd();

                this.setState($state);
            }) || (() => undefined),
            $imperative = {
                $reducers,
                $reducer,
                $middleware,
                $enhancer,
                $store,
                $unsubscribe
            }
            // $dispatcher = actionDispatcherFromStore($store) || (() => ({}))
        } = app;

        this.store = $store;
        this.viewFromStore = viewFromStore;
        this.unsubscribe = $unsubscribe;

        // app or store?
        React.createElement = reactMethodWithCustomDataProps({createElement}, $store);

        console.group('Application State:');
        console.log($state);
        console.groupEnd();

        console.group('Application Imperative:');
        console.log($imperative);
        console.groupEnd();
    }

    render() {
        console.time('Application Render');
        const element = (
            <Provider store={this.store}>
                {React.createElement(this.viewFromStore(this.store))}
            </Provider>
        );
        console.timeEnd('Application Render');

        return element;
    }

    // componentDidMount() {
    //     this.unsubscribe = this.$store.subscribe(() => this.setState(this.$store.getState()));
    // }

    componentWillUnmount() {
        this.unsubscribe();
    }
}