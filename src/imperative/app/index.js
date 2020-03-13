/* eslint-disable no-use-before-define,no-unused-vars */
import React, {Component, createElement, Fragment, isValidElement} from 'react';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducersFromState} from './reducers/index.js';
import {eventDispatcherForStore, createActionsMiddleware} from './actions/index.js';
import {composeValue} from './composers/index.js';

/**
 * Dispatch event to the redux middleware.
 * If the event has registered actions, dispatch those with ACTION, PATH, VALUE, IF, and UNLESS.
 * VALUE, IF, and UNLESS should be compositions that return a final value or boolean.
 * If the action's IF or UNLESS condition
 * data-STYLE, STATE, EVENT, VIEW props should be composable.
 *
 */

export const appStateFromStore = (store = {getState: () => ({})}) => store.getState() || {};

export const composersFromAppState = ({$composers = {}} = {'$composers': {}}) => $composers;

export const viewFromAppState = ({$view = []} = {'$view': []}) => $view;

export const viewFromStore = (store = {getState: () => ({'$view': []})},
                              dependencies = {viewFromAppState, appStateFromStore}) => {
    const {viewFromAppState, appStateFromStore} = dependencies;

    return viewFromAppState(appStateFromStore(store));
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

export const mapCustomPropsToReactProps = (props = {},
                                           store = {getState: () => ({'$styles': {}})},
                                           dependencies = {
                                               appStateFromStore,
                                               composeValue,
                                               eventDispatcherForStore
                                           }) => {
    const {
        appStateFromStore,
        composeValue,
        eventDispatcherForStore
    } = dependencies;
    const app = appStateFromStore(store) || {};
    // DI?
    const dispatcher = eventDispatcherForStore(store);
    /**
     * Select state using basic id selectors, and select state using complex state composers.
     * Does the hollistic app structure need significant keys like $styles, $states, etc?
     */
    const {
        'data-style': $style = '',
        'data-state': $state = '',
        'data-event': $event = '',
        'data-style-value': $styleValue = composeValue(app, '$styles', $style),
        'data-state-value': $stateValue = composeValue(app, '$states', $state),
        // 'data-event-value': $eventValue = composeValue(app, '$events', $event),
        'data-event-value': $eventValue = $event ? dispatcher : undefined,
        // 'data-event-value': $eventValue = dispatcher,
        'data-bind-style': $bindStyle = $styleValue ? 'style' : 'data-bind-style',
        'data-bind-state': $bindState = $stateValue ? 'children' : 'data-bind-state',
        'data-bind-event': $bindEvent = 'data-bind-event',
    } = props;

    return {
        ...props,
        [$bindStyle]: $styleValue,
        [$bindState]: $stateValue,
        [$bindEvent]: $eventValue
    };
};


export const createElementWithCustomDataProps = (method = {createElement},
                                                 store = {
                                                     getState: () => ({
                                                         '$views': {},
                                                         '$components': {}
                                                     })
                                                 },
                                                 dependencies = {
                                                     appStateFromStore,
                                                     composersFromAppState,
                                                     composeValue,
                                                     toReactProps,
                                                     getType,
                                                     isElement
                                                 }) => {
    const {
        appStateFromStore,
        composersFromAppState,
        composeValue,
        toReactProps,
        getType,
        isElement
    } = dependencies;
    const {createElement} = method;
    const toChild = (child) => typeof child === 'string' ? child : toElement(child);
    const toElement = (type = '', props = {}, ...children) => {
        // 'data-if': $if = '',
        // 'data-unless': $unless = '',
        const app = appStateFromStore(store) || {};
        const components = composersFromAppState(app) || {};
        const {
            'data-view': $view = '',
            'data-view-value': $viewValue = composeValue(app, '$views', $view),
            ...$props
        } = props;
        const $element = $viewValue || type;

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
    createElementWithCustomDataProps,
    appStateFromStore,
    viewFromStore
};

export class App extends Component {
    constructor(props) {
        super(props);

        const {
            app = {},
            dependencies = componentDependencies
        } = props;
        const {
            reducersFromState,
            combineReducers,
            createStore,
            createActionsMiddleware,
            applyMiddleware,
            createElement,
            createElementWithCustomDataProps,
            appStateFromStore,
            viewFromStore
        } = dependencies;
        const {
            // All state types should be composable.
            // Composers are Functions of State: Components, Reducers, Comparators, Declarators, Interpolators, Selectors, ...
            // Actions should be able to specify the type of reduction that should happen registered as a custom or core composer.
            // Create and Update were previously the same thing when reducing, but Update still needs to be updated to allow complex data structure updates.
            $actions = {},
            $components = {},
            $composers = {},
            $events = {},
            $schemas = {},
            $states = {},
            $styles = {},
            $views = {},
            $view = [],
            $state = {
                ...$states,
                $actions,
                $components,
                $composers,
                $events,
                $schemas,
                $states,
                $styles,
                $views,
                $view
            },
            // The reducers should be cognizant of Action, Path, Value.
            // "action" for Composers, "path" for Composed State Selection, "value" for Composed State
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
            // $dispatcher = eventDispatcherForStore($store) || (() => ({}))
        } = app;

        this.store = $store;
        this.viewFromStore = viewFromStore;
        this.unsubscribe = $unsubscribe;

        // app or store?
        React.createElement = createElementWithCustomDataProps({createElement}, $store);

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

    componentWillUnmount() {
        this.unsubscribe();
    }
}