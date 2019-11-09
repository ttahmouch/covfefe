/* eslint-disable no-use-before-define,no-unused-vars */
/**
 * TODO:
 * + Extract most logic of App into functions.
 * The dispatchers need to be regenerated every time the state changes because there will be no way to CRUD new state otherwise.
 * Refactor dispatchers() to rely on retrieving the most current state from the store since this is initial state.
 * Am I thinking about this part wrong? Should root state keys never get added at runtime? Should the nest structure of the state keys change instead?
 * That would mean that new reducers and dispatchers wouldn't need to be created dynamically.
 * I probably also need to finally add PATCH support to the reducers and dispatchers.
 */
import React, {Component, createElement, Fragment, isValidElement} from 'react';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {action} from './actions';

export const getEmptyObject = () => ({});

export const getStyle = (styles = {}, style = '') => styles[style];

export const getDispatcher = (dispatchers = {}, action = '') => dispatchers[action];

export const getState = (states = {}, state = '') => states[state];

export const getView = (views = {}, view = '') => views[view];

export const getRequest = (requests = {}, request = '') => requests[request];

// Support data-platform and data-view and data-compare=comparator with data-state|view|style=selector.
// Support view stacks and stack selection using a selector.
// Support custom data structure operations in the reducers.
// Support data-action=crud data-state|view|style=selector data-event=onRender

export const mapCustomPropsToReactProps = (props = {},
                                           app = {
                                               $store: {getState: getEmptyObject},
                                               $styles: {},
                                               $dispatchers: {},
                                           },
                                           dependencies = {
                                               getStyle,
                                               getState,
                                               getDispatcher,
                                               action,
                                           }) => {
    const {
        getStyle,
        getState,
        getDispatcher,
        action,
    } = dependencies;
    const {
        $store = {getState: getEmptyObject},
        $styles = {},
        $dispatchers = {},
    } = app;
    const $states = $store.getState();
    // data-view-inject vs data-view-replace; Support both? Probably keep only one way.
    // Dispatchers aren't working right now.
    // Extract selectors out into the selectors.js(on).
    // Make actions determine if they are async or sync based on their declared type or duck type as opposed to their name.
    // Make reducers support generic data structure operations such as push, pop, insert, etc.
    const {
        style,
        'data-style': $style = '',
        'data-state': $state = '',
        'data-action': $action = '',
        'data-dispatcher': $dispatcher = action($action, $state),
        'data-event': $event = 'data-event',
        'data-style-value': $styleValue = getStyle($styles, $style),
        'data-state-value': $stateValue = getState($states, $state),
        'data-dispatcher-value': $dispatcherValue = getDispatcher($dispatchers, $dispatcher),
        'data-bind-style': $bindStyle = $style ? 'style' : 'data-bind-style',
        'data-bind-state': $bindState = $state ? 'children' : 'data-state',
        'data-action-request': $actionRequest = action($action, $state),
    } = props;

    return {
        ...props,
        [$bindStyle]: style || $styleValue,
        [$bindState]: $stateValue,
        [$event]: $dispatcherValue,
        'data-action-request': $actionRequest,
    };
};

export const isDataProp = (prop = '') => /^data[-]/.test(prop);

export const areDataProps = (props = {}, dependencies = {isDataProp}) => {
    const {isDataProp} = dependencies;

    return props !== null && typeof props === 'object' && Object.keys(props).filter(isDataProp).length;
};

export const toReactProps = (props = {},
                             app = {},
                             dependencies = {areDataProps, mapCustomPropsToReactProps}) => {
    const {areDataProps, mapCustomPropsToReactProps} = dependencies;

    return areDataProps(props) ? mapCustomPropsToReactProps(props, app) : props;
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
                                               app = {$views: {}, $components: {}},
                                               dependencies = {
                                                   toReactProps,
                                                   getType,
                                                   getView,
                                                   isElement
                                               }) => {
    const {
        toReactProps,
        getType,
        getView,
        isElement
    } = dependencies;
    const {createElement} = method;
    const toChild = (child) => typeof child === 'string' ? child : toElement(child);
    const toElement = (type = '', props = {}, ...children) => {
        const {$views = {}, $components = {}} = app;
        const {'data-view': $selector = '', ...$props} = props;
        const $view = getView($views, $selector);
        const $element = $view || type;

        if (isElement($element)) {
            const {type = '', props: {children = [], ...props} = {}} = $element;
            const $type = getType($components, type);
            const $children = [].concat(children).map(toChild);
            return toElement($type, {...props, ...$props}, ...$children);
        }

        return createElement(type, toReactProps(props, app), ...children);
    };

    return toElement;
};

export class App extends Component {
    constructor(props) {
        super(props);

        const {
            app: {
                $states = {},
                $view = [],
                $reducers = {},
                $reducer = combineReducers($reducers),
                $store = createStore($reducer, $states)
            }
        } = props;

        this.$store = $store;
        this.$view = $view;
    }

    render() {
        console.time('Render');
        const element = <Provider store={this.$store}>{React.createElement(this.$view)}</Provider>;
        console.timeEnd('Render');

        return element;
    }

    componentDidMount() {
        this.unsubscribe = this.$store.subscribe(() => this.setState(this.$store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}