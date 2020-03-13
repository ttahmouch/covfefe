/* eslint-disable no-use-before-define,no-unused-vars */
// import {composeValue} from '../composers/index.js';
// import {asyncRequest} from './http/index.js';

// Homogenize the usages of $ prefixes across the framework.
// Dispatch events, dispatch synchronous actions, localized state,
// Conditional views, conditional compositions,

import {composition} from "../composers";

export const headers = {
    "content-type": "",
};

export const request = {
    "$method": "GET",
    "$uri": "/",
    "$headers": headers,
    "$body": "",
    "$username": "",
    "$password": "",
    "$withCredentials": "false",
    "$events": {},
};

export const response = {
    "status": 200,
    "headers": headers,
    "body": {},
};

export const client = {
    getAllResponseHeaders: () => "",
    "status": 200,
    "responseText": "",
    "dataset": {
        "event": ""
    }
};

export const element = {
    // DOM View State
    "value": "",
    // DOM Event to Application Event Mapping
    "dataset": {
        "event": "",
        "stateType": "string"
    }
};

export const preventDefault = () => undefined;

export const domEvent = {
    preventDefault,
    // DOM Event Type
    "type": "",
    "target": {
        ...client,
        ...element
    },
};

export const syncAction = {
    "$action": "",
    "$path": "",
    "$value": undefined,
    "$if": undefined,
    "$unless": undefined
};

export const asyncAction = {
    "$action": "",
    "$request": {
        "$uri": ""
    },
    "$events": {}
};

// /**
//  * Events are groups of synchronous or asynchronous actions, or other events.
//  * Events are arrays of sync and async actions, and possibly other events.
//  * Referenced actions should have some properties transferred, e.g., if, unless, etc.
//  *
//  */

// const fuck1 = [
//     {
//         "$action": "request_json_card_view"
//     },
//     {
//         "$action": "request_json_card_view"
//         // Asynchronous action dereferenced.
//     },
//     {
//         "$action": "update",
//         "$path": "$['$states']['loading']",
//         "$value": false
//         // Basic synchronous action.
//     },
//     {
//         "$action": "update",
//         "$path": "views.card",
//         "$value": {
//             "$default": {"type": "div"},
//             "$compose": "read",
//             "$type": "jsonpath",
//             "$value": "$['response']['body']"
//         },
//         "$if": {
//             "$default": false,
//             "$compose": "is_response_json_card_view"
//         }
//         // Synchronous action with value and if conditional composition.
//     },
//     {
//         "$action": "update",
//         "$path": "states.error",
//         "$value": true,
//         "$unless": {
//             "$default": true,
//             "$compose": "is_response_json_card_view"
//         }
//         // Synchronous action with unless conditional composition.
//     },
//     {
//         "$action": "request_titles_dictionary",
//         "$if": {
//             "$compose": "is_title",
//             "$default": false
//         }
//         // Asynchronous action dereferenced, and conditionally dispatched.
//     }
// ];

export const declarativeEvent = [syncAction, asyncAction];

export const app = {
    "$actions": {},
    "$composers": {},
    "$events": {},
    "$schemas": {},
    "$states": {},
    "$styles": {},
    "$views": {},
};

export const state = {
    "app": app,
    "response": response,
    "composed": undefined,
    "view": {},
};

export const action = {
    $domEvent: domEvent,
    $event: declarativeEvent,
    $states: state,
};

export const dispatch = (action) => action;

export const getState = () => app;

export const store = {getState, dispatch};

export const getResponseBody = (headers = headers,
                                body = "") => {
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

export const getResponse = (client = client,
                            dependencies = {getResponseHeaders, getResponseBody}) => {
    const {getResponseHeaders, getResponseBody} = dependencies;
    const {status = 200, responseText = ""} = client;
    const headers = getResponseHeaders(client);
    const body = getResponseBody(headers, responseText);

    return {status, headers, body};
};

export const clientFromDomEvent = ({target = client} = domEvent) => target;

export const responseStateFromDomEvent = (event = domEvent,
                                          dependencies = {
                                              clientFromDomEvent,
                                              getResponse,
                                          }) => {
    const {
        clientFromDomEvent,
        getResponse,
    } = dependencies;
    const client = clientFromDomEvent(event) || client;

    return getResponse(client);
};

export const getRequestBody = (headers = headers,
                               body = "") => {
    const {"content-type": type = ""} = headers;

    return type.includes("application/json") ? JSON.stringify(body) : body;
};

export const requestFromAsyncAction = ({$request = {}} = asyncAction) => $request;

export const eventsFromAsyncAction = ({$events = {}} = asyncAction) => $events;

export const dispatchAsyncActionToStore = (action = asyncAction,
                                           store = store,
                                           client = new XMLHttpRequest(),
                                           dependencies = {
                                               getRequestBody,
                                               requestFromAsyncAction,
                                               eventsFromAsyncAction,
                                               eventDispatcherForStore,
                                               statesFromAction,
                                               composition,
                                           }) => {
    const {
        getRequestBody,
        requestFromAsyncAction,
        eventsFromAsyncAction,
        eventDispatcherForStore,
        statesFromAction,
        composition,
    } = dependencies;
    const request = requestFromAsyncAction(action) || {};
    const states = statesFromAction(action) || {};
    const composedRequest = composition(request, states) || {};
    const events = eventsFromAsyncAction(action) || {};
    const eventDispatcher = eventDispatcherForStore(store) || ((event = domEvent) => undefined);
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
    } = composedRequest;

    client.open($method, $uri, $async, $username, $password);

    Object
        .keys($headers)
        .forEach((header = "") => client.setRequestHeader(header, $headers[header]));

    client.withCredentials = $withCredentials;
    client.responseType = $responseType;

    Object
        .keys(events)
        .map((event = "") => ({event, ...events[event]}))
        .forEach(({
                      "event": domEventType = "",
                      "$event": appEventType = ""
                  }) => {
            return client.addEventListener(domEventType, (event = domEvent) => {
                event.target.dataset = {"event": appEventType};
                return eventDispatcher(event);
            });
        });

    return client.send(getRequestBody($headers, $body));
};

export const dispatchSyncActionToStore = (action = syncAction,
                                          store = store) => {
    return store.dispatch(action);
};

export const eventFromAction = ({$event = declarativeEvent} = action) => $event;

export const statesFromAction = ({$states = state} = action) => $states;

export const mapChildrenToState = (children = [],
                                   stateType = "string",
                                   state = "") => {
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

export const viewStateFromDomEvent = (event = domEvent,
                                      dependencies = {mapChildrenToState}) => {
    const {mapChildrenToState} = dependencies;
    const {target} = event;
    const {value = "", "dataset": {"stateType": type = "string"}} = target;
    const children = Array.from(target);

    return mapChildrenToState(children, type, value);
};

export const appStateFromStore = (store = store) => store.getState() || {};

export const eventsFromAppState = ({$events = {}} = app) => $events;

export const eventFromEvents = (events = {}, identifier = "") => events[identifier];

export const eventIdentifierFromDomEvent = ({"target": {"dataset": {"event": id = ""}}} = domEvent) => id;

export const eventIdentifierFromEvent = ({"$event": id = ""} = {"$event": ""}) => id;

export const isAsyncAction = (action = asyncAction) => {
    return (
        typeof action === 'object' && action !== null
        && typeof action.$action === 'string'
        && typeof action.$request === 'object' && action.$request !== null
    );
};

export const dispatchToStore = (action = syncAction,
                                store = store,
                                dependencies = {
                                    isAsyncAction,
                                    dispatchAsyncActionToStore,
                                    dispatchSyncActionToStore,
                                    eventDispatcherForStore,
                                }) => {
    const {
        isAsyncAction,
        dispatchAsyncActionToStore,
        dispatchSyncActionToStore,
        eventDispatcherForStore,
    } = dependencies;
    const eventDispatcher = eventDispatcherForStore(store) || ((event = domEvent) => undefined);
    const states = statesFromAction(action)

    return isAsyncAction(action)
        ? dispatchAsyncActionToStore(action, store)
        : dispatchSyncActionToStore(action, store);

    return Array.isArray(action)
        ? store.dispatch({$event: action, $states: states})
        :
    /**
     * return Array.isArray(action)
     *     ? dispatchActions(action) -> store.dispatch({$event: action, $states: states})
     *     : action is an event reference
     *     ? eventDispatcher({$event: action, $states: states})
     *     : isAsyncAction(action)
     *     ? dispatchAsyncActionToStore(action, store)
     *     : dispatchSyncActionToStore(action, store)
     */
};

export const isEvent = (event) => {
    return (typeof event === "object" && event !== null && typeof event.$event === "string")
        || (typeof event === "object" && event !== null && typeof event.$action === "string")
        || (Array.isArray(event) && event.every(isEvent));
};

export const createActionsMiddleware = (dependencies = {
    dispatchToStore,
    isEvent,
    eventFromAction,
    statesFromAction,
}) => {
    const {
        dispatchToStore,
        isEvent,
        eventFromAction,
        statesFromAction,
    } = dependencies;

    return (store = store) => (next = dispatch) => (action = action) => {
        /**
         * Build various states object, i.e., app, view, response, from store and action state.
         * Allow cascading state object with control flow of actions in sequence or parallel
         * and passing state between asynchronous actions, e.g., cascading response state.
         */
        console.group('Application Action:');
        console.log(action);
        console.groupEnd();

        const $event = eventFromAction(action) || {};
        const $states = statesFromAction(action) || {};

        // Default the app state if it doesn't exist already.

        return isEvent($event)
            ? []
                .concat($event)
                .forEach((action = syncAction) => dispatchToStore({...action, $states}, store))
            : next(action);
    };
};

// Make logging middleware.
// console.group(`Application Response Event ${event.type.toUpperCase()}:`);
// console.log(response);
// console.log(event);
// console.group('Application Response Actions:');
// Dispatch event action corresponding to response event.
// console.groupEnd();
// console.groupEnd();

export const actionFromDomEvent = (domEvent = domEvent,
                                   dependencies = {
                                       eventIdentifierFromDomEvent,
                                       viewStateFromDomEvent,
                                       responseStateFromDomEvent,
                                   }) => {
    const {
        eventIdentifierFromDomEvent,
        viewStateFromDomEvent,
        responseStateFromDomEvent,
    } = dependencies;

    return {
        "$event": {"$event": eventIdentifierFromDomEvent(domEvent) || ""},
        "$states": {
            "view": viewStateFromDomEvent(domEvent) || {},
            "response": responseStateFromDomEvent(domEvent) || {}
        }
    };
};

export const actionFromEvent = (event = declarativeEvent,
                                dependencies = {eventIdentifierFromEvent}) => {
    const {eventIdentifierFromEvent} = dependencies;

    return {
        "$event": {"$event": eventIdentifierFromEvent(event) || ""},
        "$states": {}
    };
};

export const fuck = ({
                         $domEvent,
                         $event: event,
                         $states: states = {}
                     } = action) => {
    const app = appStateFromStore(store) || {};
    const events = eventsFromAppState(app) || {};
    const action = $domEvent
        ? actionFromDomEvent($domEvent)
        : actionFromEvent(event);
    const {$event, $states} = action;

    $domEvent.preventDefault();

    const $event = eventFromEvents(events, identifier);
    const $states = {view, response, ...states, app};
    // const state = {view, ...stateFromAction(action), app};

    return store.dispatch({$domEvent, $event, $states});
};

export const eventDispatcherForStore = (store = store,
                                        dependencies = {
                                            appStateFromStore,
                                            viewStateFromDomEvent,
                                            responseStateFromDomEvent,
                                            eventIdentifierFromDomEvent,
                                            eventIdentifierFromEvent,
                                            eventsFromAppState,
                                            eventFromEvents,
                                        }) => {
    const {
        appStateFromStore,
        viewStateFromDomEvent,
        responseStateFromDomEvent,
        eventIdentifierFromDomEvent,
        eventIdentifierFromEvent,
        eventsFromAppState,
        eventFromEvents,
    } = dependencies;

    // return ($domEvent = domEvent) => {
    return ({
                $domEvent,
                $event: event,
                $states: states = {}
            } = action) => {
        const app = appStateFromStore(store) || {};
        const events = eventsFromAppState(app) || {};
        const identifier = eventIdentifierFromDomEvent($domEvent)
            || eventIdentifierFromEvent(event)
            || "";
        const view = viewStateFromDomEvent($domEvent) || {};
        const response = responseStateFromDomEvent($domEvent) || {};
        const $event = eventFromEvents(events, identifier);
        const $states = {view, response, ...states, app};
        // const state = {view, ...stateFromAction(action), app};

        $domEvent.preventDefault();
        return store.dispatch({$domEvent, $event, $states});
    }
};

/**
 * {$domEvent, $event, $states} = action
 * if $domEvent exists, then use it as expected because it is likely a view or http event.
 * else if $event exists, then
 */
/**
 * A DOM Event will have a generic type for an event, e.g., click, submit, load, etc.
 *
 + Get the various states, i.e., app, view, and response.
 + Get the event identifier from the generic DOM event to map to a custom event.
 + This event identifier will be sourced two different ways:
 0. Dataset for the case that it us set using HTML data-event attribute.
 1. ??? for XHR client.
 + Get an event from the declarative events defined in the app state using the event identifier.
 + Dispatch an event action with all the states and the custom event.
 */