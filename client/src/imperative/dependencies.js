import {Component, Fragment, isValidElement} from "react";
import {action, app, asyncAction, client, declarativeComposer, domEvent, element, request, response, schema, state, store, syncAction} from "./types.js";

export const appStateFromStore = (store = store) => store.getState() || {};

export const viewFromAppState = ({$view = []} = app) => $view;

export const isDataProp = (prop = "") => /^data[-]/.test(prop);

export const areDataProps = (props = {},
                             dependencies = {isDataProp}) => {
    const {isDataProp} = dependencies;

    return props !== null
        && typeof props === "object"
        && Object.keys(props).filter(isDataProp).length;
};

export const isFragment = (fragment = Fragment) => fragment === Fragment;

export const isComponent = (component = Component) => typeof component === "function";

export const isElementLike = (element = element) => (
    typeof element === "object"
    && element !== null
    && typeof element.$$typeof === "undefined"
);

export const isElement = (element = element,
                          dependencies = {
                              isElementLike,
                              isValidElement
                          }) => {
    const {
        isElementLike,
        isValidElement
    } = dependencies;

    return isElementLike(element) || isValidElement(element);
};

export const getType = (components = {},
                        type = "",
                        dependencies = {
                            isFragment,
                            isComponent,
                            isElement
                        }) => {
    const {
        isFragment,
        isComponent,
        isElement
    } = dependencies;
    const $components = {...components, "": Fragment, Fragment};

    return isElement(type) || isFragment(type) || isComponent(type)
        ? type
        : $components[type] || type || Fragment;
};

// Composers

export const appStateFromStates = ({app = app} = state) => app;

export const viewStateFromStates = ({view = {}} = state) => view;

export const composersFromAppState = ({$composers = {}} = app) => $composers;

export const composerIdentifierFromComposer = ({"$compose": id = ""} = declarativeComposer) => id;

export const composerDefaultFromComposer = ({$default = undefined} = declarativeComposer) => $default;

export const composerFromComposers = (composers = {}, identifier = "") => composers[identifier];

export const schemaIdentifierFromSchema = ({"$schema": id = ""} = schema) => id;

// Actions

export const clientFromDomEvent = ({target = client} = domEvent) => target;

export const requestFromAsyncAction = ({$request = {}} = asyncAction) => $request;

export const responsesFromAsyncAction = ({$responses = []} = asyncAction) => $responses;

export const responseFromAsyncAction = ({$response = {}} = asyncAction) => $response;

export const eventsFromAsyncAction = ({$events = {}} = asyncAction) => $events;

export const eventFromAction = ({$event} = action) => $event;

export const statesFromAction = ({$states = state} = action) => $states;

export const valueFromAction = ({value} = syncAction) => value;

export const requestIdentifierFromRequest = ({"$request": id = ""} = request) => id;

export const responseIdentifierFromResponse = ({"$response": id = ""} = response) => id;

export const actionIdentifierFromAction = ({"$action": id = ""} = syncAction) => id;

export const actionsFromAppState = ({$actions = {}} = app) => $actions;

export const actionFromActions = (actions = {}, identifier = "") => actions[identifier];

export const eventsFromAppState = ({$events = {}} = app) => $events;

export const eventFromEvents = (events = {}, identifier = "") => events[identifier];

export const eventTypeFromDomEvent = ({type = ""} = domEvent) => type;

export const eventIdentifierFromDomEvent = ({"target": {"dataset": {"event": id = ""}}} = domEvent) => id;

export const eventIdentifierFromEvent = ({"$event": id = ""} = {"$event": ""}) => id;
