/* eslint-disable no-use-before-define,no-unused-vars,no-fallthrough */
import React, {createElement} from "react";
import {applyMiddleware, combineReducers, compose as composeEnhancers, createStore} from "redux";
import {Provider, useSelector} from "react-redux";
// Composers
import {JSONPath} from "jsonpath-plus";
import Ajv from "ajv";
import URITemplate from "urijs/src/URITemplate";
import {compile, match} from "path-to-regexp";
import * as mathjs from "mathjs";
import {
    action,
    app,
    asyncAction,
    client,
    declarativeComposer,
    domEvent,
    functionalComposer,
    headers,
    request,
    response,
    settings,
    state,
    store,
    syncAction
} from "./types.js";
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
    requestIdentifierFromRequest,
    responseFromAsyncAction,
    responseIdentifierFromResponse,
    responsesFromAsyncAction,
    schemaIdentifierFromSchema,
    statesFromAction,
    valueFromAction,
    viewFromAppState,
    viewStateFromStates
} from "./dependencies.js";

// Reducers ------------------------------------------------------------------------------------------------------------

/**
 Create element in back: push
 Create element in front: unshift
 Create element in middle: splice
 Delete element in back: pop
 Delete element in front: shift
 Delete element in middle: splice
 Update element anywhere: splice
 Update all elements: map, filter, sort

 [...state.slice(0, 0), "value4", ...state.slice(1)]
 .filter((item)=>item !== undefined)
 */

export const array = ({state = [], lead = [0, 0], item = undefined, items = undefined, last = [state.length, 0]}) => {
    return [...state.slice(...lead), ...(items || [item]), ...state.slice(...last)];
};

export const createItems = ({state = [], key = 0, items = []}, dependencies = {array}) => {
    const {array} = dependencies;
    return array({state, "lead": [0, key], items, "last": [key, state.length - key]});
};

export const createItem = ({state = [], key = 0, item = undefined}, dependencies = {array}) => {
    const {array} = dependencies;
    return array({state, "lead": [0, key], item, "last": [key, state.length - key]});
};

export const updateItem = ({state = [], key = 0, item = undefined}, dependencies = {array}) => {
    const {array} = dependencies;
    return array({state, "lead": [0, key], item, "last": [key + 1, state.length - (key + 1)]});
};

export const deleteItem = ({state = [], key = 0}, dependencies = {updateItem}) => {
    const {updateItem} = dependencies;
    return updateItem({state, key}).filter((item) => item !== undefined)
};

/**
 * Creates a reducer function for an initial state key and value pair.
 * The reducer can handle Create, Read, Update, and Delete operations.
 * The Delete operation can be called by dispatching an action without a value, e.g., `{"type":"delete_state"}`.
 * The value defaults to the initial value defined in the state object.
 * The Create and Update operations currently behave identically,
 * and can be called by dispatching an action with a value, e.g., `{"type":"update_state", "value":""}`.
 */
export const reducerFromInitialStateKeyAndValue = (key = "", initial = undefined,
                                                   dependencies = {createItem, createItems, updateItem, deleteItem}) => {
    const {createItem, createItems, updateItem, deleteItem} = dependencies;
    return (state = initial, action) => {
        const {type = "", value = initial} = action;

        switch (type) {
            case `create_${key}_items`: {
                const {key = "", items = []} = value;
                return Array.isArray(state) ? createItems({state, key, items}) : {...state, ...items};
            }
            case `push_${key}_items`: {
                const {items = []} = value;
                return createItems({state, "key": state.length, items});
            }
            case `unshift_${key}_items`: {
                const {items = []} = value;
                return createItems({state, "key": 0, items});
            }
            case `create_${key}_item`: {
                const {key = "", item = undefined} = value;
                return Array.isArray(state) ? createItem({state, key, item}) : {...state, [key]: item};
            }
            case `push_${key}_item`: {
                const {item = undefined} = value;
                return createItem({state, "key": state.length, item});
            }
            case `unshift_${key}_item`: {
                const {item = undefined} = value;
                return createItem({state, "key": 0, item});
            }
            case `update_${key}_item`: {
                const {key = "", item = undefined} = value;
                return Array.isArray(state) ? updateItem({state, key, item}) : {...state, [key]: item};
            }
            case `delete_${key}_item`: {
                const {key = "", item = undefined} = value;
                return Array.isArray(state) ? deleteItem({state, key}) : {...state, [key]: item};
            }
            case `pop_${key}_item`:
                return deleteItem({state, "key": state.length - 1});
            case `shift_${key}_item`:
                return deleteItem({state, "key": 0});
            // Spread is the same thing as push_items.
            // case `spread_${key}`:
            //     return Array.isArray(state) ? [...state, ...value] : {...state, ...value};
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

export const toDereferencedSchema = (schema, states = state,
                                     dependencies = {schemaIdentifierFromSchema, composeFromIdentifier}) => {
    const {schemaIdentifierFromSchema, composeFromIdentifier} = dependencies;
    const identifier = schemaIdentifierFromSchema(schema) || "";
    const reference = composeFromIdentifier(identifier, states, "$schemas") || schema;
    const {$schema = "http://json-schema.org/draft-07/schema#"} = reference;

    return {...reference, ...schema, $schema};
};

export const isComposer = (composer = functionalComposer) => {
    return (
        typeof composer === "function"
        || (composer !== null && typeof composer === "object" && typeof composer.$compose === "string")
        || (Array.isArray(composer) && composer.length > 1 && composer.every(isComposer))
    );
};

// Add implicit create compositions in all other composers to make nesting compositions easier?
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

// TODO: Make CRUD composers based on CRUD reducers.
export const spread = (composer, dependencies = {create}) => {
    const {create} = dependencies;
    const {$state: {composed} = state} = composer;

    return Array.isArray(composed)
        // ? composed.concat(create(composer))
        ? [...composed, ...create(composer)]
        : {...composed, ...create(composer)};
};

export const readPathTemplate = ({$value: $path_template = "", $state: {composed} = state}) => {
    const {params = {}} = match($path_template, {"decode": decodeURIComponent})(composed) || {};
    return {...params};
};

export const readRegularExpression = ({$value: $regular_expression = "", $state: {composed} = state}) => {
    return new RegExp($regular_expression).exec(composed) || [];
};

export const jsonpath = new JSONPath({"wrap": false, "autostart": false});

export const readJsonPath = ({$value: $json_path = "", $state = state}, path = jsonpath) => {
    return path.evaluate({"path": $json_path, "json": $state});
};

export const math = ({$value: $expression = "", $state: {composed} = state}, expression = mathjs) => {
    return expression.evaluate($expression, composed);
};

export const snakeToCamelCase = (string = "", config = {}) => {
    const {expression = /[-_]([^-_])/g, withValue = (_, lowercase) => lowercase.toUpperCase()} = config;
    return string.replace(expression, withValue);
};

export const fold = (composer = {}, dependencies = {composeFromValue, isComposer, snakeToCamelCase}) => {
    const {composeFromValue, isComposer, snakeToCamelCase} = dependencies;
    const {$type = "reduce", $value = {"$compose": "read", "$value": "$.composed"}, $state = state, $default = undefined} = composer;
    const {composed} = $state;
    const type = snakeToCamelCase($type);
    const compose = ({composed, value, index, array, composer = $value, state = $state} = {}) => {
        return composeFromValue(composer, {...state, composed, "item": {value, index, array}});
    };
    switch ($type) {
        // case "flat":
        case "every":
        case "filter":
        case "find":
        case "flat_map":
        case "map":
        case "some":
            return composed[type]((value, index, array) => compose({value, index, array}));
        // Implement a map and compare object.
        case "sort":
            const {
                "$map": map = {"$compose": "read", "$value": "$.item.value"},
                "$compare": compare = {"$compose": "compare", "$default": 0}
            } = isComposer($value) ? {"$map": undefined, "$compare": $value} : $value;
            return composed
                .map((value, index, array) => ({"value": compose({value, index, array, "composer": map}), index, array}))
                .sort((one, two) => composeFromValue(compare, {...$state, "item": {one, two}}))
                .map(({index}) => composed[index]);
        case "reduce_right":
        case "reduce":
        default: {
            const initial = composeFromValue($default, {...$state, "composed": undefined});
            const reduced = composed[type]((composed, value, index, array) => compose({composed, value, index, array}), initial);
            return reduced !== undefined ? reduced : null;
        }
    }
};

export const compare = (composer = {}, dependencies = {create, toNormalizedJson, toType}) => {
    // If either operand evaluates to an object, then that object is converted to a primitive value.
    // If both operands are strings, the two strings are compared.
    // If at least one operand is not a string, both operands are converted to numbers and compared numerically.
    const {create, toNormalizedJson, toType} = dependencies;
    const {$type = "lexical", $value = undefined, $state = state} = composer;
    const {composed} = $state;
    const {
        $one = {"$compose": "read", "$value": "$.item.one.value"},
        $two = {"$compose": "read", "$value": "$.item.two.value"},
        $order = "ascending"
    } = $value || composed;
    const composedOne = toNormalizedJson(create({"$value": $one, $state}));
    const composedTwo = toNormalizedJson(create({"$value": $two, $state}));
    const oneType = toType(composedOne);
    const twoType = toType(composedTwo);
    const oneIsObject = oneType === "array" || oneType === "object";
    const twoIsObject = twoType === "array" || twoType === "object";
    const oneIsDate = oneType === "string" && $type === "date";
    const twoIsDate = twoType === "string" && $type === "date";
    const shouldCompareLocaleSensitively = oneType === "string" && twoType === "string" && $type === "locale";
    const onValue = (key, value) => toNormalizedJson(value);
    const one = oneIsObject ? JSON.stringify(composedOne, onValue) : oneIsDate ? Date.parse(composedOne) : composedOne;
    const two = twoIsObject ? JSON.stringify(composedTwo, onValue) : twoIsDate ? Date.parse(composedTwo) : composedTwo;
    const compareLexicographically = (one, two) => one < two ? -1 : one > two ? +1 : 0;

    switch ($order) {
        case "descending":
            return shouldCompareLocaleSensitively ? two.localeCompare(one) : compareLexicographically(two, one);
        case "ascending":
        default:
            return shouldCompareLocaleSensitively ? one.localeCompare(two) : compareLexicographically(one, two);
    }
};

export const matchPathTemplate = ({$value: $path_template = "", $state: {composed} = state}) => {
    return !!match($path_template, {"decode": decodeURIComponent})(composed);
};

export const jsonschema = new Ajv();

export const matchJsonSchema = ({
                                    $value: $json_schema = {"$schema": "http://json-schema.org/draft-07/schema#"},
                                    $state = state,
                                },
                                schema = jsonschema,
                                dependencies = {toDereferencedSchema}) => {
    const {toDereferencedSchema} = dependencies;
    const {composed} = $state;
    return schema.validate(toDereferencedSchema($json_schema, $state), composed);
};

export const matchRegularExpression = ({$value: $regular_expression = "", $state: {composed} = state}) => {
    return new RegExp($regular_expression).test(composed);
};

export const matchObjects = (one = {}, two = {}, dependencies = {matchValues}) => {
    const {matchValues} = dependencies;
    const oneKeys = Object.keys(one);
    const twoKeys = Object.keys(two);

    // Support subsets in addition to exact matches?
    return (oneKeys.length === twoKeys.length)
        && (oneKeys.every((key) => twoKeys.includes(key)))
        && (oneKeys.every((key) => matchValues(one[key], two[key])));
};

export const matchSameType = (one = undefined, two = undefined, type = "undefined", dependencies = {matchObjects}) => {
    const {matchObjects} = dependencies;

    switch (type) {
        case "bigint":
        case "boolean":
        case "function":
        case "null":
        case "number":
        case "string":
        case "symbol":
        case "undefined":
            return one === two;
        case "object":
            return one === two || matchObjects(one, two);
    }
};

export const matchValues = (one = undefined, two = undefined, dependencies = {matchSameType}) => {
    const {matchSameType} = dependencies;
    const oneType = one === null ? "null" : typeof one;
    const twoType = two === null ? "null" : typeof two;

    return (oneType === twoType) && matchSameType(one, two, oneType);
};

// Support matching subsets.
export const matchPrimitive = (composer, dependencies = {create}) => {
    const {create} = dependencies;
    const {$state: {composed} = state} = composer;

    return matchValues(create(composer), composed);
};

export const expandPathTemplate = ({$value: $path_template = "", $state: {composed} = state}) => {
    return compile($path_template, {"encode": encodeURIComponent})(composed);
};

export const expandUriTemplate = ({$value: $uri_template = "", $state: {composed} = state}) => {
    return new URITemplate($uri_template).expand(composed);
};

export const expandTemplate = (composer, dependencies = {create, toNormalizedJson}) => {
    const {create, toNormalizedJson} = dependencies;
    const {$state: {composed} = state} = composer;
    const expression = /[{(]([^{}()]*)[)}]/g;
    const withValue = (match, param) => {
        const value = composed[param];
        const type = value === null ? "null" : typeof value;

        return type === "object"
            ? JSON.stringify(value, (key, value) => toNormalizedJson(value), 2)
            : type !== "undefined"
                ? String(composed[param])
                : match;
    };

    return create(composer).replace(expression, withValue);
};

export const encodeJson = ({$value = undefined, $state: {composed} = state}) => {
    return JSON.stringify($value || composed);
};

export const encodeUri = ({$value, $state: {composed} = state}) => {
    const url = new URL(typeof window !== "undefined" ? window.location : "protocol://hostname");
    const {
        protocol = "", username = "", password = "", hostname = "", port = "", pathname = "/", search = "", hash = ""
    } = $value || composed;

    url.protocol = protocol;
    url.username = username;
    url.password = password;
    url.hostname = hostname;
    url.port = port;
    url.pathname = pathname;
    url.search = search;
    url.hash = hash;
    return url.toString();
};

export const decodeJson = ({$value = undefined, $state: {composed} = state}) => {
    return JSON.parse($value || composed);
};

export const valueOrDefault = (value = undefined, $default = undefined) => value !== undefined ? value : $default;

export const compose = ($composer, dependencies = {
    compare, create, decodeJson, encodeJson,
    encodeUri, expandPathTemplate, expandTemplate,
    expandUriTemplate, fold, matchJsonSchema,
    matchPathTemplate, matchPrimitive, matchRegularExpression,
    math, readJsonPath, readPathTemplate,
    readRegularExpression, spread, valueOrDefault
}) => {
    const {
        compare, create, decodeJson, encodeJson,
        encodeUri, expandPathTemplate, expandTemplate,
        expandUriTemplate, fold, matchJsonSchema,
        matchPathTemplate, matchPrimitive, matchRegularExpression,
        math, readJsonPath, readPathTemplate,
        readRegularExpression, spread, valueOrDefault
    } = dependencies;
    const {$compose = "", $type = "", $default = undefined} = $composer;

    switch ($compose) {
        case "create":
            return valueOrDefault(create($composer), $default);
        case "spread":
            return valueOrDefault(spread($composer), $default);
        case "read":
            switch ($type) {
                case "path_template":
                    return valueOrDefault(readPathTemplate($composer), $default);
                case "regular_expression":
                    return valueOrDefault(readRegularExpression($composer), $default);
                case "json_path":
                default:
                    return valueOrDefault(readJsonPath($composer), $default);
            }
        case "math":
            return valueOrDefault(math($composer), $default);
        case "fold":
            return valueOrDefault(fold($composer), $default);
        case "compare":
            return valueOrDefault(compare($composer), $default);
        case "match":
            switch ($type) {
                case "path_template":
                    return valueOrDefault(matchPathTemplate($composer), $default);
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
                case "path_template":
                    return valueOrDefault(expandPathTemplate($composer), $default);
                case "uri_template":
                    return valueOrDefault(expandUriTemplate($composer), $default);
                case "template":
                default:
                    return valueOrDefault(expandTemplate($composer), $default);
            }
        case "encode":
            switch ($type) {
                case "uri":
                    return valueOrDefault(encodeUri($composer), $default);
                case "json":
                default:
                    return valueOrDefault(encodeJson($composer), $default);
            }
        case "decode":
            switch ($type) {
                case "uri":
                case "json":
                default:
                    return valueOrDefault(decodeJson($composer), $default);
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
    // console.group("Compose:", composer);
    const value = isComposer(composer)
        ? []
            .concat(composer)
            .map((composer) => toFunctionalComposer(composer, states))
            .reduce((states, composer) => {
                const composed = toComposedState(states, composer);
                // console.log("From:", states.composed, "To:", composed.composed);
                return composed;
            }, states)
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
    // console.groupEnd()

    return value;
};

// TODO: Refactor the parameters across all usages of the function.
export const composeFromIdentifier = (identifier = "", states = state, type = `$states`, defaultValue = undefined,
                                      dependencies = {composeFromValue}) => {
    const {composeFromValue} = dependencies;

    return composeFromValue(
        {
            "$comment": "Dereference Composer.", "$compose": identifier,
            "$default": {
                "$comment": "Dereference State.",
                "$compose": "read", "$type": "json_path", "$value": `$.app.${type}.${identifier}`, "$default": defaultValue
            }
        },
        states
    );
};

// TODO: Rename this.
export const composeFromPathTemplate = (template = "", states = state, type = "path_template",
                                        dependencies = {composeFromValue}) => {
    const {composeFromValue} = dependencies;

    // Compare Path + Query + Fragment, or just Path?
    // Query and Fragment are Order-Dependent so comparisons with Path Template and RegExp could easily fail.
    return composeFromValue([
        {"$compose": "read", "$type": "json_path", "$value": "$.app.$route.pathname", "$default": "/"},
        {"$compose": "match", "$type": type, "$value": template, "$default": false}
    ], states);
};

export const composeParametersFromPathTemplate = (template = "", states = state, type = "path_template",
                                                  dependencies = {composeFromValue}) => {
    const {composeFromValue} = dependencies;

    return composeFromValue([
        {"$compose": "read", "$type": "json_path", "$value": "$.app.$route.pathname", "$default": "/"},
        {"$compose": "read", "$type": type, "$value": template, "$default": {}}
    ], states);
};

export const composeStringFromTemplate = (template = "", params = {}, states = state,
                                          dependencies = {composeFromValue}) => {
    const {composeFromValue} = dependencies;

    return composeFromValue([
        {"$compose": "create", "$value": params, "$default": {}},
        {"$compose": "expand", "$type": "template", "$value": template, "$default": template}
    ], states)
};

export const composeValueFromPath = (path = "", defaultValue = undefined, states = state,
                                     dependencies = {composeFromValue}) => {
    const {composeFromValue} = dependencies;

    return composeFromValue({"$compose": "read", "$type": "json_path", "$value": path, "$default": defaultValue}, states);
};

// Actions -------------------------------------------------------------------------------------------------------------

export const toDereferencedRequest = (request = request, states = state,
                                      dependencies = {
                                          requestIdentifierFromRequest, composeFromIdentifier, composeFromValue
                                      }) => {
    const {requestIdentifierFromRequest, composeFromIdentifier, composeFromValue} = dependencies;
    const identifier = requestIdentifierFromRequest(request) || "";
    const reference = composeFromIdentifier(identifier, states, "$requests") || request;

    // console.log("Reference:", reference);

    // Is this necessary to dereferencing schemas, actions, events?
    return composeFromValue({...reference, ...request}, states) || {};
};

export const toDereferencedResponse = (response = response, states = state,
                                       dependencies = {
                                           responseIdentifierFromResponse, composeFromIdentifier, composeFromValue
                                       }) => {
    const {responseIdentifierFromResponse, composeFromIdentifier, composeFromValue} = dependencies;
    const identifier = responseIdentifierFromResponse(response) || "";
    const reference = composeFromIdentifier(identifier, states, "$responses") || response;

    // console.log("Reference:", reference);

    // Is this necessary to dereferencing schemas, actions, events?
    return composeFromValue({...reference, ...response}, states) || {};
};

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

export const settingsFromAppState = ({$settings = {}} = app) => $settings;

export const mockSettingFromSettings = ({mock = false} = settings) => mock;

export const mockResponseFromResponses = (responses = []) => {
    const [response = {}] = responses;

    return responses.find(({$mock = false}) => $mock === true) || response;
};

export const mockEventFromEvents = (events = {}) => (
    Object
        .keys(events)
        .filter((event) => !["loadstart", "progress", "loadend"].includes(event))
        .map((event) => ({...events[event], "$event": event}))
        .find(({$mock = false}) => $mock === true)
    || {"$event": ""}
);

export const mockResponse = (client = client, response) => {
    const {
        $status = 0,
        $headers = {},
        $body = ""
    } = response;
    const {"content-type": type = ""} = $headers;
    const getAllResponseHeaders = () => (
        Object
            .keys($headers)
            .reduce((string, header) => `${string}${header}: ${$headers[header]}\r\n`, "")
    );
    const responseText = type.includes("application/json") ? JSON.stringify($body) : $body;

    return Object.defineProperties(client, {
        "status": {"value": $status},
        "getAllResponseHeaders": {"value": getAllResponseHeaders},
        "responseText": {"value": responseText}
    });
};

export const toDomProgressEvent = (event = {}, dependencies = {isNaN}) => {
    const {isNaN} = dependencies;
    const identifier = eventIdentifierFromEvent(event) || "";
    const $event = isNaN(identifier) ? identifier : "load";

    return {...event, $event};
};

export const dispatchMockEventAndResponseFromClient = (client, event, response,
                                                       dependencies = {
                                                           eventIdentifierFromEvent, mockResponse, toDomProgressEvent
                                                       }) => {
    const {eventIdentifierFromEvent, mockResponse, toDomProgressEvent} = dependencies;
    const {$status = 0} = response;
    const $event = eventIdentifierFromEvent(event) || ($status > 0 ? "load" : "timeout");
    const identifier = eventIdentifierFromEvent(toDomProgressEvent({...event, $event}));

    setTimeout(() => client.dispatchEvent(new ProgressEvent("loadstart")), 0);
    setTimeout(() => client.dispatchEvent(new ProgressEvent("progress")), 0);
    setTimeout(() => {
        if (identifier === "load") {
            mockResponse(client, response);
        }

        return client.dispatchEvent(new ProgressEvent(identifier));
    }, 0);
    return setTimeout(() => client.dispatchEvent(new ProgressEvent("loadend")), 0);
};

export const dispatchAsyncActionToStore = (action = asyncAction, states, store = store, client = new XMLHttpRequest(),
                                           dependencies = {
                                               getRequestBody, requestFromAsyncAction, responsesFromAsyncAction,
                                               responseFromAsyncAction, eventsFromAsyncAction, eventDispatcherForStore,
                                               settingsFromAppState, toDereferencedRequest, toDereferencedResponse,
                                               appStateFromStates, mockResponseFromResponses, mockSettingFromSettings,
                                               dispatchMockEventAndResponseFromClient, mockEventFromEvents,
                                               dispatchSyncActionToStore, viewStateFromStates
                                           }) => {
    const {
        getRequestBody, requestFromAsyncAction, responsesFromAsyncAction, responseFromAsyncAction, eventsFromAsyncAction,
        eventDispatcherForStore, settingsFromAppState, toDereferencedRequest, toDereferencedResponse, appStateFromStates,
        mockResponseFromResponses, mockSettingFromSettings, dispatchMockEventAndResponseFromClient, mockEventFromEvents,
        dispatchSyncActionToStore, viewStateFromStates
    } = dependencies;
    const app = appStateFromStates(states) || app;
    const view = viewStateFromStates(states) || {};
    const settings = settingsFromAppState(app) || {};
    const mock = mockSettingFromSettings(settings) || false;
    const request = toDereferencedRequest(requestFromAsyncAction(action), states) || {};
    const responses = responsesFromAsyncAction(action) || [];
    const response = toDereferencedResponse(mockResponseFromResponses(responses), states) || {};
    const events = eventsFromAsyncAction(action) || {};
    const event = mockEventFromEvents(events) || {};
    const dispatch = eventDispatcherForStore(store, view) || ((event = domEvent) => undefined);
    const {
        $method = "GET",
        $uri = "/",
        $headers = {},
        $body = "",
        $username = "",
        $password = "",
        $withCredentials = false,
        $async = true,
        $responseType = "text",
        $timeout = 0
    } = request;

    client.open($method, $uri, $async, $username, $password);

    Object
        .keys($headers)
        .forEach((header = "") => client.setRequestHeader(header, $headers[header]));

    client.withCredentials = $withCredentials;
    client.responseType = $responseType;
    client.timeout = $timeout;

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

    // console.group("Async Action:", action);
    // console.log("Mock:", mock);
    // console.log("Request:", request);
    // console.log("Response:", response);
    // console.log("Events:", events);
    // console.log("Event:", event);
    // console.groupEnd();

    dispatchSyncActionToStore(action, states, store);
    return mock
        ? dispatchMockEventAndResponseFromClient(client, event, response)
        : client.send(getRequestBody($headers, $body));
};

export const dispatchSyncActionToStore = (action = syncAction, states, store = store) => {
    const {
        $action = undefined,
        $value = undefined
    } = action;

    return store.dispatch({
        ...action,
        "$states": states,
        "type": $action !== undefined && composeFromValue($action, states),
        "value": $value !== undefined && composeFromValue($value, states),
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

            // !$should && console.group("Suppressing Action:", item)
            // !$should && console.groupEnd();

            if ($should) {
                return isEvent(item)
                    ? dispatchEventToStore(item, states, store)
                    : isEventReference(item)
                        ? dispatchEventToStore(toDereferencedEvent(item, states), states, store)
                        // store.getState between actions in case they changed the store state synchronously.
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
            // EVENT_TYPE instead of $event???
        const $event = eventFromAction(action) || {};
        const $states = statesFromAction(action) || {};

        next(action);
        return isEvent($event) && dispatchEventToStore($event, $states, store);
    };
};

export const createLogMiddleware = () => {
    return (store = store) => (next = (action) => action) => (action = action) => {
        // Should Async Actions and Suppressed Actions still go through dispatching
        // before they are suppressed so the decisions can all be handled in middleware
        // and be logged?
        const $event = eventFromAction(action);
        const $value = valueFromAction(action);

        // $event && console.group("Event:", action, $event);
        // !$event && console.group("Sync Action:", action, $value);

        // console.log("State Before:", store.getState());
        next(action);
        // console.log("State After:", store.getState());
        // console.groupEnd();
    };
};

export const dispatchRoutePathParamsToStore = (pathParams = {}, states = state, store = store,
                                               dependencies = {dispatchEventToStore}) => {
    const {dispatchEventToStore} = dependencies;
    const spreadRoutePathParams = [
        {"$compose": "read", "$type": "json_path", "$value": "$.app.$route.pathParams", "$default": {}},
        {"$compose": "spread", "$value": pathParams, "default": {}}
    ];
    const routePathParamsDidNotChange = [
        {"$compose": "read", "$type": "json_path", "$value": "$.app.$route.pathParams", "$default": {}},
        {"$compose": "match", "$type": "primitive", "$value": spreadRoutePathParams, "$default": false}
    ];

    return dispatchEventToStore(
        [{
            "$action": "update_$route_item", "$value": {"key": "pathParams", "item": spreadRoutePathParams},
            "$unless": routePathParamsDidNotChange
        }],
        states,
        store
    );
};

export const dispatchRouteToStore = (route = {"pathname": "/", "search": "", "hash": ""},
                                     store = store) => {
    const {
        pathname = "/", search = "", hash = "",
        pathParams = {}, searchParams = Object.fromEntries(new URLSearchParams(search)),
        fragment = (hash.match(/[#](.*)/) || ["", ""])[1]
        // searchParams = URI.parseQuery(search)
    } = route;

    // dispatchEventToStore?
    return store.dispatch({
        "type": "update_$route",
        "value": {pathname, search, hash, pathParams, searchParams, fragment}
    });
};

export const createRouteMiddleware = (history, dependencies = {dispatchRouteToStore}) => {
    const {dispatchRouteToStore} = dependencies;

    return (store = store) => {
        history.listen((route, action) => dispatchRouteToStore(route, store));

        return (next = (action) => action) => (action = action) => {
            const {type = "", value = {}} = action;

            next(action);

            switch (type) {
                case "route_push": {
                    const {uri = {"pathname": "/", "search": "", "hash": ""}, state = undefined} = value;
                    return history.push(uri, state);
                }
                case "route_replace": {
                    const {uri = {"pathname": "/", "search": "", "hash": ""}, state = undefined} = value;
                    return history.replace(uri, state);
                }
                case "route_go": {
                    const {position = 0} = value;
                    return history.go(position);
                }
                case "route_back":
                    return history.go(-1);
                case "route_forward":
                    return history.go(1);
                default:
                    return;
            }
        };
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

export const inputStateFromDomEvent = (event = domEvent, dependencies = {mapChildrenToState}) => {
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

    return event.target instanceof XMLHttpRequest
        && ["abort", "error", "load", "loadend", "loadstart", "progress", "timeout"].includes(type);
};

export const isDomFormEvent = (event, dependencies = {eventTypeFromDomEvent}) => {
    const {eventTypeFromDomEvent} = dependencies;
    const type = eventTypeFromDomEvent(event) || "";

    return ["change", "input", "submit"].includes(type);
};

export const eventDispatcherForStore = (store = store, view = {},
                                        dependencies = {
                                            appStateFromStore, inputStateFromDomEvent, responseStateFromDomEvent,
                                            eventIdentifierFromDomEvent, eventsFromAppState, eventFromEvents,
                                            isDomProgressEvent, isDomFormEvent, isDomEvent, toDereferencedEvent,
                                            eventTypeFromDomEvent
                                        }) => {
    const {
        appStateFromStore, inputStateFromDomEvent, responseStateFromDomEvent, eventIdentifierFromDomEvent,
        eventsFromAppState, eventFromEvents, isDomProgressEvent, isDomFormEvent, isDomEvent, toDereferencedEvent,
        eventTypeFromDomEvent
    } = dependencies;

    return (event, states = {}) => {
        const {input: previousInput = {}, response: previousResponse = {}} = states;
        const app = appStateFromStore(store) || {};
        const input = isDomFormEvent(event) ? inputStateFromDomEvent(event) : previousInput;
        const response = isDomProgressEvent(event) ? responseStateFromDomEvent(event) : previousResponse;
        const $states = {app, input, response, view};
        const $event = toDereferencedEvent(event, $states);

        typeof event.preventDefault === "function" && event.preventDefault();
        return store.dispatch({$event, $states, type: eventTypeFromDomEvent(event)});
    };
};

// App -----------------------------------------------------------------------------------------------------------------

export const toType = (value) => Array.isArray(value) ? 'array' : value === null ? 'null' : typeof value;

export const toNormalizedJson = (value, dependencies = {toType}) => {
    const {toType} = dependencies;

    switch (toType(value)) {
        case "bigint":
            return Number(value);
        case "object":
            return Object.keys(value).sort().reduce((map, key) => (map[key] = value[key], map), {});
        case "symbol":
            return Symbol.keyFor(value);
        case "array":
        case "boolean":
        case "number":
        case "string":
            return value;
        case "function":
        case "null":
        case "undefined":
            return null;
    }
};

export const bindEvent = ({
                              target = "self",
                              // target = {"addEventListener": (type, listener) => listener({type})},
                              dispatch = (event) => undefined,
                              fromEvent = "",
                              toEvent = ""
                          } = {}) => {
    switch (target) {
        case "window":
        case "document":
            return window[target].addEventListener(fromEvent, (event) => dispatch({"$event": toEvent}));
        case "self":
        default:
            return;
    }
};

export const mapCustomPropsToReactProps = (props = {}, children = [], store = {getState: () => ({"$styles": {}})}, view = {},
                                           dependencies = {
                                               appStateFromStore, bindEvent, composeFromIdentifier,
                                               composeStringFromTemplate, composeValueFromPath, eventDispatcherForStore,
                                               toNormalizedJson
                                           }) => {
    const {
        appStateFromStore, bindEvent, composeFromIdentifier,
        composeStringFromTemplate, composeValueFromPath, eventDispatcherForStore, toNormalizedJson
    } = dependencies;
    const app = appStateFromStore(store) || {};
    const dispatch = eventDispatcherForStore(store, view);
    const {"data-current-depth": $currentDepth = 0} = view;
    const {
        // Did switching from "" to undefined impact rendering speed?
        "data-state": $state = undefined,
        "data-state-repeat": $stateRepeat = undefined,
        "data-state-repeat-depth": $stateRepeatDepth = "0",
        "data-state-repeat-depth-value": $stateRepeatDepthValue = Number($stateRepeatDepth) || 0,
        "data-should-state-repeat": $shouldStateRepeat = $stateRepeat === "true" && $stateRepeatDepthValue === $currentDepth,
        "data-state-repeat-key": $stateRepeatKey = "item",
        "data-state-default": $stateDefault = undefined,
        "data-state-default-value": $stateDefaultValue = $stateDefault && composeFromIdentifier($stateDefault, {app, view}, "$states"),
        "data-state-path": $statePath = undefined,
        "data-state-path-value": $statePathValue = $statePath && composeValueFromPath($statePath, $stateDefaultValue, {app, view}),
        "data-state-value": $stateValue = $statePath ? $statePathValue : $state
            ? composeFromIdentifier($state, {app, view}, "$states", $stateDefaultValue)
            : $stateDefaultValue,
        "data-state-type": $stateType = $stateValue === null ? "null" : typeof $stateValue,
        "data-state-params": $stateParams = $stateType === "object" ? $stateValue : {[$state]: toNormalizedJson($stateValue)},
        // TODO: Support binding state to multiple props.
        "data-bind-state": $bindState = $stateType !== "undefined" ? "children" : "data-bind-state",
        "data-should-bind-template": $shouldBindTemplate = $bindState === "children" && children.length === 0,
        "data-bind-template": $bindTemplate = !$shouldBindTemplate ? "" : $stateType === "object"
            // TODO: Consolidate the JSON.stringifys.
            ? JSON.stringify($stateValue, (key, value) => toNormalizedJson(value), 2)
            : `(${$state})`,
        "data-style": $style = undefined,
        "data-style-value": $styleValue = $style && composeFromIdentifier($style, {app, view}, "$styles"),
        "data-bind-style": $bindStyle = $styleValue ? "style" : "data-bind-style",
        "data-event": $event = undefined,
        "data-event-value": $eventValue = $event && ((event) => dispatch(event)),
        "data-event-target": $eventTarget = "self",
        "data-bind-event": $bindEvent = "data-bind-event",
        "data-should-event-target-self": $shouldEventTargetSelf = $eventTarget === "self",
        "data-bind-self-event": $bindSelfEvent = $shouldEventTargetSelf ? $bindEvent : "data-bind-event",
        "data-event-self-value": $eventSelfValue = $shouldEventTargetSelf ? $eventValue : undefined
    } = props;

    $state && (view[$state] = $stateValue);
    bindEvent({"target": $eventTarget, "dispatch": $eventValue, "fromEvent": $bindEvent, "toEvent": $event});

    const reactProps = {
        "props": {...props, [$bindStyle]: $styleValue, [$bindState]: $stateValue, [$bindSelfEvent]: $eventSelfValue},
        "children": ($shouldStateRepeat && Array.isArray($stateValue) ? $stateValue : [$stateValue])
            .flatMap((item) => {
                $shouldStateRepeat && (view[$stateRepeatKey] = item);
                $shouldStateRepeat && (view["data-current-depth"]++);

                const elements = ($shouldBindTemplate ? [$bindTemplate] : children)
                    .map((child) => {
                        return typeof child === "string"
                            ? composeStringFromTemplate(child, $stateParams, {app, view})
                            : $shouldStateRepeat
                                ? React.createElement(child)
                                : child;
                    });

                $shouldStateRepeat && (view["data-current-depth"]--);
                $shouldStateRepeat && (view[$stateRepeatKey] = undefined);

                return elements;
            })
    };

    $state && (view[$state] = undefined);

    return reactProps;
};

export const toReactProps = (props = {}, children = [], store = {}, view = {},
                             dependencies = {areDataProps, mapCustomPropsToReactProps}) => {
    const {areDataProps, mapCustomPropsToReactProps} = dependencies;

    // areDataProps(props) && console.log("toReactProps", props, {...view});
    return areDataProps(props) ? mapCustomPropsToReactProps(props, children, store, view) : {props, children};
};

export const createElementWithCustomDataProps = (method = {createElement}, store = store, view = {"data-current-depth": 0},
                                                 dependencies = {
                                                     appStateFromStore, composersFromAppState, composeFromIdentifier,
                                                     composeFromPathTemplate, composeParametersFromPathTemplate,
                                                     dispatchRoutePathParamsToStore, toReactProps, getType, isElement
                                                 }) => {
    const {
        appStateFromStore, composersFromAppState, composeFromIdentifier, composeFromPathTemplate,
        composeParametersFromPathTemplate, dispatchRoutePathParamsToStore, toReactProps, getType, isElement
    } = dependencies;
    const {createElement} = method;
    // If Child is a `data-view` don't traverse it twice.
    const toChild = (child) => {
        return typeof child === "string" ? child : toElement(child);
    };
    const toElement = (type = "", props = {}, ...children) => {
        // Support single, exclusive routes like a Switch component, e.g., /login, /:route.
        // Would the useSelector hook work in a non-component function used in the provider?
        // Fix composeValue to use the new implementation.
        // If compositions should be used for all state types, i.e., actions (events), schemas, states, styles, views,
        // Then find where composeValue needs to be invoked; Most are in the `data-*` props, and probably don't need to
        // be composed dynamically. Are JSON composers in place of JS Component functions really worth it?
        const app = appStateFromStore(store) || {};
        const components = composersFromAppState(app) || {};
        const {
            "data-if": $if = "",
            "data-if-value": $ifValue = $if && composeFromIdentifier($if, {app, view}, "$states"),
            "data-unless": $unless = "",
            "data-unless-value": $unlessValue = $unless && !composeFromIdentifier($unless, {app, view}, "$states"),
            "data-path-type": $pathType = "path_template",
            "data-if-path": $ifPath = "",
            "data-if-path-value": $ifPathValue = $ifPath && composeFromPathTemplate($ifPath, {app, view}, $pathType),
            "data-unless-path": $unlessPath = "",
            "data-unless-path-value": $unlessPathValue = $unlessPath && !composeFromPathTemplate($unlessPath, {app, view}, $pathType),
            "data-should": $should = ($if === "" && $unless === "" && $ifPath === "" && $unlessPath === "")
                || $ifValue === true
                || $unlessValue === true
                || $ifPathValue === true
                || $unlessPathValue === true,
            "data-path": $path = $ifPath || $unlessPath || "",
            "data-path-params": $pathParams = ($path && $should && composeParametersFromPathTemplate($path, {app, view}, $pathType)) || {},
            "data-view": $view = "",
            "data-view-value": $viewValue = $view && $should && composeFromIdentifier($view, {app, view}, "$views"),
            ...$props
        } = props;
        const $element = $viewValue || type;

        $path && $should && dispatchRoutePathParamsToStore($pathParams, {app, view}, store);

        // $view && $should && console.group("View:", $viewValue);
        // $view && !$should && console.group("Suppressing View:", $view);
        // $view && console.groupEnd();

        if (isElement($element)) {
            const {type = "", props: {children = [], ...props} = {}} = $element;
            const $type = getType(components, type);
            const $children = [].concat(children).map(toChild);
            return toElement($type, {...props, ...$props}, ...$children);
        }

        const {
            "props": reactProps,
            "children": reactChildren
        } = toReactProps(props, children, store, view);

        return createElement(type, reactProps, ...reactChildren);
    };

    return toElement;
};

export const storeFromInitialAppState = ({
                                             $actions = {}, $composers = {}, $settings = {"debug": false, "mock": false},
                                             $events = {}, $requests = {}, $responses = {}, $route = {}, $schemas = {},
                                             $states = {}, $styles = {}, $views = {}, $view = [], $state = {
                                                 $actions, $composers, $settings, $events, $requests, $responses, $route,
                                                 $schemas, $states, $styles, $views, $view
                                             }
                                         },
                                         middleware = [],
                                         enhancers = [],
                                         composer = composeEnhancers,
                                         dependencies = {
                                             createStore, applyMiddleware, reducerFromState
                                         }) => {
    const {createStore, applyMiddleware, reducerFromState} = dependencies;

    return createStore(reducerFromState($state), $state, composer(applyMiddleware(...middleware), ...enhancers));
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
