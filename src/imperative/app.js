/* eslint-disable no-use-before-define,no-unused-vars,no-fallthrough */
import React, {createElement} from "react";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {Provider, useSelector} from "react-redux";
// Composers
import jsonpath from "jsonpath/jsonpath.min";
import Ajv from "ajv";
import URITemplate from "urijs/src/URITemplate";

import {action, app, asyncAction, client, declarativeComposer, domEvent, functionalComposer, headers, state, store, syncAction} from "./types.js";
import {
    actionFromActions,
    actionIdentifierFromAction,
    actionsFromAppState,
    appStateFromStates,
    appStateFromStore,
    areDataProps,
    clientFromDomEvent,
    composerDefaultFromComposer,
    composerFromComposers,
    composerIdentifierFromComposer,
    composersFromAppState,
    eventFromAction,
    eventFromEvents,
    eventIdentifierFromDomEvent,
    eventIdentifierFromEvent,
    eventsFromAppState,
    eventsFromAsyncAction,
    eventTypeFromDomEvent,
    getType,
    isElement,
    requestFromAsyncAction,
    schemaIdentifierFromSchema,
    statesFromAction,
    valueFromAction,
    viewFromAppState
} from "./dependencies.js";

// Reducers ------------------------------------------------------------------------------------------------------------

/**
 * Creates a reducer function for an initial state key and value pair.
 * The reducer can handle Create, Read, Update, and Delete operations.
 * The Delete operation can be called by dispatching an action without a value, e.g., `{"type":"delete_state"}`.
 * The value defaults to the initial value defined in the state object.
 * The Create and Update operations currently behave identically,
 * and can be called by dispatching an action with a value, e.g., `{"type":"update_state", "value":""}`.
 */
export const reducerFromInitialStateKeyAndValue = (key = "", initial = undefined) => {
    return (state = initial, action) => {
        const {type = "", value = initial} = action;

        switch (type) {
            case `spread_${key}`:
                return {...state, ...value};
            case `create_${key}`:
            case `update_${key}`:
            case `delete_${key}`:
                // Differentiate update?
                return value;
            case `read_${key}`:
            default:
                return state;
        }
    };
};

export const reducersFromState = (state = {}, dependencies = {reducerFromInitialStateKeyAndValue}) => {
    const {reducerFromInitialStateKeyAndValue} = dependencies;

    return Object
        .keys(state)
        .reduce((reducers, key) => ({...reducers, [key]: reducerFromInitialStateKeyAndValue(key, state[key])}), {});
};

export const reducerFromState = (state = {}, dependencies = {combineReducers, reducersFromState}) => {
    const {combineReducers, reducersFromState} = dependencies;

    return combineReducers(reducersFromState(state));
};

// Composers -----------------------------------------------------------------------------------------------------------

export const toDereferencedSchema = (schema, states = state, dependencies = {}) => {
    const identifier = schemaIdentifierFromSchema(schema) || "";
    return composeFromIdentifier(identifier, states, "$schemas") || schema;
};

export const isComposer = (composer = functionalComposer) => {
    return (
        typeof composer === "function"
        || (composer !== null && typeof composer === "object" && typeof composer.$compose === "string")
        || (Array.isArray(composer) && composer.every(isComposer))
    );
};

export const create = ({$value = undefined, $state = state},
                       dependencies = {isComposer, composeFromValue}) => {
    const {isComposer, composeFromValue} = dependencies;
    const toComposedValue = ($value) => create({$value, $state: {...$state, "composed": undefined}});
    const toComposedObject = ($value, key) => ({...$value, [key]: toComposedValue($value[key])});

    return (
        isComposer($value)
            ? composeFromValue($value, $state)
            : Array.isArray($value)
            ? $value.map(toComposedValue)
            : ($value !== null && typeof $value === "object")
                ? Object.keys($value).reduce(toComposedObject, $value)
                : $value
    );
};

export const spread = (composer, dependencies = {create}) => {
    const {create} = dependencies;
    const {$state: {composed} = state} = composer;

    return Array.isArray(composed)
        ? [...composed, ...create(composer)]
        : {...composed, ...create(composer)};
};

export const readRegularExpression = ({$value: $regular_expression = "", $state: {composed} = state}) => {
    return new RegExp($regular_expression).exec(composed);
};

export const readJsonPath = ({$value: $json_path = "", $state = state}) => {
    return jsonpath.value($state, $json_path);
};

export const matchJsonSchema = ({
                                    $value: $json_schema = {"$schema": "http://json-schema.org/draft-07/schema#"},
                                    $state = state,
                                },
                                dependencies = {toDereferencedSchema}) => {
    const {toDereferencedSchema} = dependencies;
    const {composed} = $state;
    return new Ajv().validate(toDereferencedSchema($json_schema, $state), composed);
};

export const matchRegularExpression = ({$value: $regular_expression = "", $state: {composed} = state}) => {
    return new RegExp($regular_expression).test(composed);
};

export const matchPrimitive = ({$value: $primitive = undefined, $state: {composed} = state}) => {
    return $primitive === composed;
};

export const expandUriTemplate = ({$value: $uri_template = "", $state: {composed} = state}) => {
    return new URITemplate($uri_template).expand(composed);
};

export const expandTemplate = ({$value: $template = "", $state: {composed} = state}) => {
    const expression = /{([^{}]*)}/g;
    const withValue = (match, param) => typeof composed[param] === "string" ? composed[param] : match;

    return $template.replace(expression, withValue);
};

export const encodeJson = ({$value = undefined, $state: {composed} = state}) => {
    return JSON.stringify($value || composed);
};

export const valueOrDefault = (value = undefined, $default = undefined) => value !== undefined ? value : $default;

export const compose = ({$compose = "", $type = "", $default = undefined, ...$composer},
                        dependencies = {
                            create, spread, readRegularExpression, readJsonPath, matchJsonSchema, matchRegularExpression,
                            matchPrimitive, expandUriTemplate, expandTemplate, encodeJson, valueOrDefault
                        }) => {
    const {
        create, spread, readRegularExpression, readJsonPath, matchJsonSchema, matchRegularExpression,
        matchPrimitive, expandUriTemplate, expandTemplate, encodeJson, valueOrDefault
    } = dependencies;

    switch ($compose) {
        case "create":
            return valueOrDefault(create($composer), $default);
        case "spread":
            return valueOrDefault(spread($composer), $default);
        case "read":
            switch ($type) {
                case "regular_expression":
                    return valueOrDefault(readRegularExpression($composer), $default);
                case "json_path":
                default:
                    return valueOrDefault(readJsonPath($composer), $default);
            }
        case "match":
            switch ($type) {
                case "json_schema":
                    return valueOrDefault(matchJsonSchema($composer), $default);
                case "regular_expression":
                    return valueOrDefault(matchRegularExpression($composer), $default);
                case "primitive":
                default:
                    return valueOrDefault(matchPrimitive($composer), $default);
            }
        case "expand":
            switch ($type) {
                case "uri_template":
                    return valueOrDefault(expandUriTemplate($composer), $default);
                case "template":
                default:
                    return valueOrDefault(expandTemplate($composer), $default);
            }
        case "encode":
            switch ($type) {
                case "json":
                default:
                    return valueOrDefault(encodeJson($composer), $default);
            }
        case "decode":
            switch ($type) {
                case "json":
                default:
                    return undefined;
            }
        case "assert":
            switch ($type) {
                // case "json":
                default:
                    return undefined;
            }
        default:
            return undefined;
    }
};

export const toDereferencedComposer = (composer = declarativeComposer, states = state,
                                       dependencies = {
                                           appStateFromStates, composersFromAppState, composerIdentifierFromComposer,
                                           composerDefaultFromComposer, composerFromComposers, compose, composeFromValue
                                       }) => {
    const {
        appStateFromStates, composersFromAppState, composerIdentifierFromComposer,
        composerDefaultFromComposer, composerFromComposers, compose, composeFromValue
    } = dependencies;
    const app = appStateFromStates(states) || app;
    const composers = composersFromAppState(app) || {};
    const identifier = composerIdentifierFromComposer(composer) || "";

    return composerFromComposers(composers, identifier)
        || ((states) => {
            const value = compose({"$state": states, ...composer});
            return value !== undefined ? value : composeFromValue(composerDefaultFromComposer(composer), states);
        });
};

export const toFunctionalComposer = (composer = functionalComposer, states = state,
                                     dependencies = {composeFromValue, toDereferencedComposer}) => {
    const {composeFromValue, toDereferencedComposer} = dependencies;

    return typeof composer === "function"
        ? composer
        : Array.isArray(composer)
            ? (states) => composeFromValue(composer, states)
            : toFunctionalComposer(toDereferencedComposer(composer, states), states);
};

export const toComposedState = (states = state, composer = functionalComposer) => {
    return {...states, "composed": composer(states)};
};

export const composeFromValue = (composer = functionalComposer, states = state,
                                 dependencies = {isComposer, toFunctionalComposer, toComposedState}) => {
    const {isComposer, toFunctionalComposer, toComposedState} = dependencies;
    const value = isComposer(composer)
        ? []
            .concat(composer)
            .map((composer) => toFunctionalComposer(composer, states))
            .reduce((states, composer) => toComposedState(states, composer), states)
            .composed
        : toComposedState(
            states,
            (states) => composeFromValue({
                "$compose": "create",
                "$value": composer,
                "$default": composer
            }, states)
        )
            .composed;

    return value;
};

export const composeFromIdentifier = (identifier = "", states = state, type = `$states`,
                                      dependencies = {composeFromValue}) => {
    const {composeFromValue} = dependencies;

    return composeFromValue(
        {
            "$comment": "Dereference Composer.",
            "$compose": identifier,
            "$default": {
                "$comment": "Dereference State.",
                "$compose": "read",
                "$type": "json_path",
                "$value": `$["app"]["${type}"]["${identifier}"]`,
                "$default": undefined
            }
        },
        states
    );
};

// Actions -------------------------------------------------------------------------------------------------------------

export const getResponseBody = (headers = headers, body = "") => {
    const {"content-type": type = ""} = headers;

    return type.includes("application/json") ? JSON.parse(body) : body;
};

export const getResponseHeaders = (client = client) => {
    return client
        .getAllResponseHeaders()
        .split("\r\n")
        .filter((header) => header)
        .map((header) => header.split(": "))
        .reduce((headers, [name, value]) => ({...headers, [name.toLowerCase()]: value}), {});
};

export const getResponse = (client = client, dependencies = {getResponseHeaders, getResponseBody}) => {
    const {getResponseHeaders, getResponseBody} = dependencies;
    const {status = 0, responseText = ""} = client;
    const headers = getResponseHeaders(client);
    const body = getResponseBody(headers, responseText);

    return {status, headers, body};
};

export const getRequestBody = (headers = headers, body = "") => {
    const {"content-type": type = ""} = headers;

    return type.includes("application/json") ? JSON.stringify(body) : body;
};

export const dispatchAsyncActionToStore = (action = asyncAction, states, store = store, client = new XMLHttpRequest(),
                                           dependencies = {
                                               getRequestBody, requestFromAsyncAction, eventsFromAsyncAction,
                                               eventDispatcherForStore, composeFromValue
                                           }) => {
    const {
        getRequestBody, requestFromAsyncAction, eventsFromAsyncAction, eventDispatcherForStore, composeFromValue
    } = dependencies;
    const request = composeFromValue(requestFromAsyncAction(action), states) || {};
    const events = eventsFromAsyncAction(action) || {};
    const dispatch = eventDispatcherForStore(store) || ((event = domEvent) => undefined);
    const {
        $method = "GET",
        $uri = "/",
        $headers = {},
        $body = "",
        $username = "",
        $password = "",
        $withCredentials = false,
        $async = true,
        $responseType = "text"
    } = request;

    console.group("Async Action:", action);
    console.log("Request:", request);
    console.log("Events:", events);
    console.groupEnd();

    client.open($method, $uri, $async, $username, $password);

    Object
        .keys($headers)
        .forEach((header = "") => client.setRequestHeader(header, $headers[header]));

    client.withCredentials = $withCredentials;
    client.responseType = $responseType;

    Object
        .keys(events)
        .map(($fromEvent = "") => {
            const {$event: $toEvent = ""} = events[$fromEvent];

            return {$fromEvent, $toEvent};
        })
        .forEach(({$fromEvent = "", $toEvent = ""}) => {
            return client.addEventListener($fromEvent, (event = domEvent) => {
                event.target.dataset = {"event": $toEvent};
                return dispatch(event, states);
            });
        });

    client.addEventListener("load", (event = domEvent) => {
        const {status = 0} = responseStateFromDomEvent(event);
        const {$event: $toEvent = ""} = events[`${status}`] || {}
        event.target.dataset = {"event": $toEvent};
        return $toEvent && dispatch(event, states);
    });

    return client.send(getRequestBody($headers, $body));
};

export const dispatchSyncActionToStore = (action = syncAction, states, store = store) => {
    const {
        $action = undefined,
        $value = undefined
    } = action;

    return store.dispatch({
        ...action,
        type: $action !== undefined && composeFromValue($action, states),
        value: $value !== undefined && composeFromValue($value, states),
    });
}

export const isAsyncAction = (action = asyncAction) => (
    typeof action === "object" && action !== null
    && typeof action.$action === "string"
    && typeof action.$request === "object" && action.$request !== null
);

export const dispatchActionToStore = (action = syncAction, states, store = store,
                                      dependencies = {isAsyncAction, dispatchAsyncActionToStore, dispatchSyncActionToStore}) => {
    const {isAsyncAction, dispatchAsyncActionToStore, dispatchSyncActionToStore} = dependencies;
    const app = appStateFromStore(store) || {};
    const $states = {...states, app};

    return isAsyncAction(action)
        ? dispatchAsyncActionToStore(action, $states, store)
        : dispatchSyncActionToStore(action, $states, store);
};

// Referenceable things need to be propagatable and composable?
// How to handle default values for composable and referencable values?
export const toDereferencedEvent = (event, states = state, dependencies = {
    appStateFromStates, eventsFromAppState, eventIdentifierFromEvent, eventFromEvents, isDomEvent,
    eventIdentifierFromDomEvent
}) => {
    const identifier = (
        isDomEvent(event)
            ? eventIdentifierFromDomEvent(event)
            : eventIdentifierFromEvent(event)
    ) || "";
    return composeFromIdentifier(identifier, states, "$events") || [];
};

export const toDereferencedAction = (action, states = state, dependencies = {
    appStateFromStates, actionsFromAppState, actionIdentifierFromAction, actionFromActions
}) => {
    const identifier = actionIdentifierFromAction(action) || "";
    return composeFromIdentifier(identifier, states, "$actions") || action;
};

export const dispatchEventToStore = (event, states, store = store, dependencies = {
    composeFromValue, isEvent, isEventReference, toDereferencedEvent, isAction, toDereferencedAction, dispatchActionToStore
}) => {
    const {
        composeFromValue, isEvent, isEventReference, toDereferencedEvent, isAction, toDereferencedAction,
        dispatchActionToStore
    } = dependencies;
    // If the event is an [{}], then enumerate each possible action.
    // If each possible action is an array, then recurse.
    // If each possible action has an `if` or `unless` property, then compose `true` or `false`.
    // If `if` composes to `false`, then ignore the {$event} or {$action}.
    // If `unless` composes to `true`, then ignore the {$event} or {$action}.
    // If each possible action is an {$event}, then dereference the event, and recurse.
    // If each possible action is an {$action}, then dereference the action (if possible).
    // If any property on the action can be composed, then compose it, e.g., `value`, `request`.
    // Dispatch the action.

    return []
        .concat(event)
        .forEach((item) => {
            const {
                $if = undefined,
                $ifValue = $if !== undefined && composeFromValue($if, states),
                $unless = undefined,
                $unlessValue = $unless !== undefined && !composeFromValue($unless, states),
                $should = ($if === undefined && $unless === undefined)
                    || $ifValue === true
                    || $unlessValue === true
            } = item;

            !$should && console.group("Suppressing Action:", item)
            !$should && console.groupEnd();

            if ($should) {
                return isEvent(item)
                    ? dispatchEventToStore(item, states, store)
                    : isEventReference(item)
                        ? dispatchEventToStore(toDereferencedEvent(item, states), states, store)
                        : dispatchActionToStore(toDereferencedAction(item, states), states, store)
            }
        });
};

export const createEventMiddleware = (dependencies = {isEvent, eventFromAction, statesFromAction, dispatchEventToStore}) => {
    const {isEvent, eventFromAction, statesFromAction, dispatchEventToStore} = dependencies;

    return (store = store) => (next = (action) => action) => (action = action) => {
        /**
         * Build various states object, i.e., app, view, response, from store and action state.
         * Allow cascading state object with control flow of actions in sequence or parallel
         * and passing state between asynchronous actions, e.g., cascading response state.
         */
        const $event = eventFromAction(action) || {};
        const $states = statesFromAction(action) || {};

        return isEvent($event)
            ? dispatchEventToStore($event, $states, store)
            : next(action);
    };
};

export const createLogMiddleware = () => {
    return (store = store) => (next = (action) => action) => (action = action) => {
        // Should Async Actions and Suppressed Actions still go through dispatching
        // before they are suppressed so the decisions can all be handled in middleware
        // and be logged?
        const $event = eventFromAction(action);
        const $value = valueFromAction(action);

        $event && console.group("Event:", action, $event);
        !$event && console.group("Sync Action:", action, $value);

        console.log("State Before:", store.getState());
        next(action);
        console.log("State After:", store.getState());
        console.groupEnd();
    };
};

// Events --------------------------------------------------------------------------------------------------------------

export const mapChildrenToState = (children = [], stateType = "string", state = "") => {
    switch (stateType) {
        case "array":
            return children
                .filter(({name}) => name)
                .map(({name, value}) => ({[name]: value}));
        case "dictionary":
            return children
                .filter(({name}) => name)
                .reduce((map, {name, value}) => ({...map, [name]: [...map[name] || [], value]}), {});
        case "string":
        default:
            return state;
    }
};

export const responseStateFromDomEvent = (event = domEvent, dependencies = {clientFromDomEvent, getResponse}) => {
    const {clientFromDomEvent, getResponse} = dependencies;
    const client = clientFromDomEvent(event) || client;

    return getResponse(client);
};

export const viewStateFromDomEvent = (event = domEvent, dependencies = {mapChildrenToState}) => {
    const {mapChildrenToState} = dependencies;
    const {target} = event;
    const {value = "", "dataset": {"stateType": type = "string"}} = target;
    const children = Array.from(target);

    return mapChildrenToState(children, type, value);
};

export const isAction = (event) => (
    typeof event === "object" && event !== null && typeof event.$action === "string"
);

export const isEventReference = (event) => (
    typeof event === "object" && event !== null && typeof event.$event === "string"
);

export const isEvent = (event, dependencies = {isAction, isEventReference}) => {
    const {isAction, isEventReference} = dependencies;

    return Array.isArray(event)
        && event.every((item) => isAction(item) || isEventReference(item) || isEvent(item));
};

export const isDomEvent = (event) => (typeof event === "object" && event !== null && typeof event.type === "string");

export const isDomProgressEvent = (event, dependencies = {eventTypeFromDomEvent}) => {
    const {eventTypeFromDomEvent} = dependencies;
    const type = eventTypeFromDomEvent(event) || "";

    return ["abort", "error", "load", "loadend", "loadstart", "progress", "timeout"].includes(type)
};

export const isDomFormEvent = (event, dependencies = {eventTypeFromDomEvent}) => {
    const {eventTypeFromDomEvent} = dependencies;
    const type = eventTypeFromDomEvent(event) || "";

    return ["change", "input", "submit"].includes(type)
};

export const eventDispatcherForStore = (store = store,
                                        dependencies = {
                                            appStateFromStore, viewStateFromDomEvent, responseStateFromDomEvent,
                                            eventIdentifierFromDomEvent, eventsFromAppState, eventFromEvents,
                                            isDomProgressEvent, isDomFormEvent, isDomEvent, toDereferencedEvent
                                        }) => {
    const {
        appStateFromStore, viewStateFromDomEvent, responseStateFromDomEvent, eventIdentifierFromDomEvent,
        eventsFromAppState, eventFromEvents, isDomProgressEvent, isDomFormEvent, isDomEvent, toDereferencedEvent
    } = dependencies;

    return (event, states = {}) => {
        const {view: previousView = {}, response: previousResponse = {}} = states;
        const app = appStateFromStore(store) || {};
        const view = isDomFormEvent(event) ? viewStateFromDomEvent(event) : previousView;
        const response = isDomProgressEvent(event) ? responseStateFromDomEvent(event) : previousResponse;
        const $states = {app, view, response};
        const $event = toDereferencedEvent(event, $states);

        event.preventDefault();
        return store.dispatch({event, $event, $states});
    };
};

// App -----------------------------------------------------------------------------------------------------------------

export const mapCustomPropsToReactProps = (props = {}, store = {getState: () => ({"$styles": {}})},
                                           dependencies = {appStateFromStore, composeFromIdentifier, eventDispatcherForStore}) => {
    const {appStateFromStore, composeFromIdentifier, eventDispatcherForStore} = dependencies;
    const app = appStateFromStore(store) || {};
    const dispatch = eventDispatcherForStore(store);
    /**
     * Select state using basic id selectors, and select state using complex state composers.
     * Does the hollistic app structure need significant keys like $styles, $states, etc?
     */
    const {
        "data-style": $style = "",
        "data-state": $state = "",
        "data-event": $event = "",
        "data-style-value": $styleValue = $style && composeFromIdentifier($style, {app}, "$styles"),
        "data-state-value": $stateValue = $state && composeFromIdentifier($state, {app}, "$states"),
        "data-event-value": $eventValue = $event && ((event) => dispatch(event)),
        "data-bind-style": $bindStyle = $styleValue ? "style" : "data-bind-style",
        "data-bind-state": $bindState = $stateValue ? "children" : "data-bind-state",
        "data-bind-event": $bindEvent = "data-bind-event",
    } = props;

    return {
        ...props,
        [$bindStyle]: $styleValue,
        [$bindState]: $stateValue,
        [$bindEvent]: $eventValue
    };
};

export const toReactProps = (props = {}, store = {}, dependencies = {areDataProps, mapCustomPropsToReactProps}) => {
    const {areDataProps, mapCustomPropsToReactProps} = dependencies;

    return areDataProps(props) ? mapCustomPropsToReactProps(props, store) : props;
};

export const createElementWithCustomDataProps = (method = {createElement}, store = store,
                                                 dependencies = {
                                                     appStateFromStore, composersFromAppState, composeFromIdentifier,
                                                     toReactProps, getType, isElement
                                                 }) => {
    const {appStateFromStore, composersFromAppState, composeFromIdentifier, toReactProps, getType, isElement} = dependencies;
    const {createElement} = method;
    const toChild = (child) => typeof child === "string" ? child : toElement(child);
    const toElement = (type = "", props = {}, ...children) => {
        // "data-if": $if = "",
        // "data-unless": $unless = "",
        // Would the useSelector hook work in a non-component function used in the provider?
        // Fix composeValue to use the new implementation.
        // If compositions should be used for all state types, i.e., actions (events), schemas, states, styles, views,
        // Then find where composeValue needs to be invoked; Most are in the `data-*` props, and probably don't need to
        // be composed dynamically. Are JSON composers in place of JS Component functions really worth it?
        const app = appStateFromStore(store) || {};
        const components = composersFromAppState(app) || {};
        const {
            "data-view": $view = "",
            "data-view-value": $viewValue = $view && composeFromIdentifier($view, {app}, "$views"),
            ...$props
        } = props;
        const $element = $viewValue || type;

        if (isElement($element)) {
            const {type = "", props: {children = [], ...props} = {}} = $element;
            const $type = getType(components, type);
            const $children = [].concat(children).map(toChild);
            return toElement($type, {...props, ...$props}, ...$children);
        }

        return createElement(type, toReactProps(props, store), ...children);
    };

    return toElement;
};

export const storeFromInitialAppState = ({
                                             $actions = {}, $composers = {}, $events = {}, $schemas = {}, $states = {},
                                             $styles = {}, $views = {}, $view = [],
                                             $state = {
                                                 $actions, $composers, $events, $schemas, $states, $styles, $views,
                                                 $view
                                             }
                                         },
                                         dependencies = {
                                             createStore, applyMiddleware, reducerFromState, createLogMiddleware,
                                             createEventMiddleware
                                         }) => {
    const {createStore, applyMiddleware, reducerFromState, createLogMiddleware, createEventMiddleware} = dependencies;

    return createStore(
        reducerFromState($state),
        $state,
        applyMiddleware(createLogMiddleware(), createEventMiddleware())
    );
};

export const View = () => {
    console.time("Render");
    const element = React.createElement(viewFromAppState(useSelector((state) => state)));
    console.timeEnd("Render");

    return element;
}

export const App = ({store = store}) => (
    <Provider store={store}>
        <View/>
    </Provider>
);
