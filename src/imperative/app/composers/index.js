/* eslint-disable no-use-before-define,no-unused-vars */
/**
 Think about dynamic composition of all state types, i.e., states, styles, views, schemas, actions, components.
 */
import jsonpath from 'jsonpath/jsonpath.min';
import Ajv from 'ajv';
import URITemplate from 'urijs/src/URITemplate';
// import {request} from "../actions/http";

// Dependency inject the imports.
// Finish create and spread.

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
    app,
    "composed": undefined,
    "view": {},
    "response": {},
};

export const functionalComposer = ({composed = undefined} = state) => composed;

export const declarativeComposer = {
    "$compose": "",
    "$type": "",
    "$value": undefined,
    "$default": undefined,
    "$state": state,
};

export const create = ({
                           $value = undefined,
                           $state = state,
                       },
                       dependencies = {isComposer, composition}) => {
    const {isComposer, composition} = dependencies;
    const toComposedValue = ($value) => create({$value, $state: {...$state, "composed": undefined}});
    const toComposedObject = ($value, key) => ({...$value, [key]: toComposedValue($value[key])});

    return (
        isComposer($value)
            ? composition($value, $state)
            : Array.isArray($value)
            ? $value.map(toComposedValue)
            : ($value !== null && typeof $value === 'object')
                ? Object.keys($value).reduce(toComposedObject, $value)
                : $value
    );
};

export const readRegularExpression = ({
                                          $value: $regular_expression = "",
                                          $state: {composed} = state,
                                      }) => new RegExp($regular_expression).exec(composed);

export const readJsonPath = ({
                                 $value: $json_path = "",
                                 $state = state,
                             }) => jsonpath.value($state, $json_path);

export const matchJsonSchema = ({
                                    $value: $json_schema = {"$schema": "http://json-schema.org/draft-07/schema#"},
                                    $state: {composed} = state,
                                }) => new Ajv().validate($json_schema, composed);

export const matchRegularExpression = ({
                                           $value: $regular_expression = "",
                                           $state: {composed} = state,
                                       }) => new RegExp($regular_expression).test(composed);

// noinspection JSValidateTypes
export const matchPrimitive = ({
                                   $value: $primitive = undefined,
                                   $state: {composed} = state,
                               }) => $primitive === composed;

export const expandUriTemplate = ({
                                      $value: $uri_template = "",
                                      $state: {composed} = state
                                  }) => new URITemplate($uri_template).expand(composed);

export const expandTemplate = ({
                                   $value: $template = "",
                                   $state: {composed} = state,
                               }) => {
    const expression = /{([^{}]*)}/g;
    const withValue = (match, param) => typeof composed[param] === 'string' ? composed[param] : match;

    return $template.replace(expression, withValue);
};

export const encodeJson = ({
                               $value = undefined,
                               $state: {composed} = state,
                           }) => JSON.stringify($value || composed);

export const compose = ({
                            $compose = "",
                            $type = "",
                            ...$composer
                        },
                        dependencies = {
                            create,
                            readRegularExpression,
                            readJsonPath,
                            matchJsonSchema,
                            matchRegularExpression,
                            matchPrimitive,
                            expandUriTemplate,
                            expandTemplate,
                            encodeJson
                        }) => {
    const {
        create,
        readRegularExpression,
        readJsonPath,
        matchJsonSchema,
        matchRegularExpression,
        matchPrimitive,
        expandUriTemplate,
        expandTemplate,
        encodeJson
    } = dependencies;

    // Use break statements instead of returns to allow default handling to exist at this higher level function.
    switch ($compose) {
        case "create":
            return create($composer);
        case "update":
            switch ($type) {
                case "spread":
                default:
                    return undefined;
            }
        case "read":
            switch ($type) {
                case "regular_expression":
                    return readRegularExpression($composer);
                case "json_path":
                default:
                    return readJsonPath($composer);
            }
        case "match":
            switch ($type) {
                case "json_schema":
                    return matchJsonSchema($composer);
                case "regular_expression":
                    return matchRegularExpression($composer);
                case "primitive":
                default:
                    return matchPrimitive($composer);
            }
        case "expand":
            switch ($type) {
                case "uri_template":
                    return expandUriTemplate($composer);
                case "template":
                default:
                    return expandTemplate($composer);
            }
        case "encode":
            switch ($type) {
                case "json":
                default:
                    return encodeJson($composer);
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

export const appStateFromStates = ({app = app} = state) => app;

export const composersFromAppState = ({$composers = {}} = app) => $composers;

export const composerIdentifierFromComposer = ({"$compose": id = ""} = declarativeComposer) => id;

export const composerDefaultFromComposer = ({$default = undefined} = declarativeComposer) => $default;

export const composerFromComposers = (composers = {}, identifier = "") => composers[identifier];

export const toDereferencedComposer = (composer = declarativeComposer,
                                       states = state,
                                       dependencies = {
                                           appStateFromStates,
                                           composersFromAppState,
                                           composerIdentifierFromComposer,
                                           composerDefaultFromComposer,
                                           composerFromComposers,
                                           compose,
                                           composition,
                                       }) => {
    const {
        appStateFromStates,
        composersFromAppState,
        composerIdentifierFromComposer,
        composerDefaultFromComposer,
        composerFromComposers,
        compose,
        composition,
    } = dependencies;
    const app = appStateFromStates(states) || app;
    const composers = composersFromAppState(app) || {};
    const identifier = composerIdentifierFromComposer(composer) || "";

    return composerFromComposers(composers, identifier)
        || (
            (states) => {
                return compose({"$state": states, ...composer})
                    || composition(composerDefaultFromComposer(composer), states);
            }
        );
};

export const toFunctionalComposer = (composer = functionalComposer,
                                     states = state,
                                     dependencies = {composition, toDereferencedComposer,}) => {
    const {composition, toDereferencedComposer,} = dependencies;

    return typeof composer === 'function'
        ? composer
        : Array.isArray(composer)
            ? (states) => composition(composer, states)
            : toFunctionalComposer(toDereferencedComposer(composer, states), states);
};

export const toComposedState = (states = state,
                                composer = functionalComposer) => {
    return {...states, "composed": composer(states)};
};

export const isComposer = (composer = functionalComposer) => {
    return typeof composer === 'function'
        || (composer !== null && typeof composer === 'object' && typeof composer.$compose === 'string')
        || (Array.isArray(composer) && composer.every(isComposer));
};

export const composition = (composer = functionalComposer,
                            states = state,
                            dependencies = {
                                isComposer,
                                toFunctionalComposer,
                                toComposedState
                            }) => {
    const {isComposer, toFunctionalComposer, toComposedState} = dependencies;

    return isComposer(composer)
        ? []
            .concat(composer)
            .map((composer) => toFunctionalComposer(composer, states))
            .reduce((states, composer) => toComposedState(states, composer), states)
            .composed
        : toComposedState(
            states,
            (states) => composition(
                {
                    "$compose": "create",
                    "$value": composer,
                    "$default": composer
                },
                states
            )
        )
            .composed;
};

export const composeValue2 = (identifier = "",
                              states = state,
                              path = `$['app']['$states']['${identifier}']`,
                              dependencies = {composition}) => {
    const {composition} = dependencies;

    return composition(
        {
            "$compose": identifier,
            "$default": {
                "$compose": "read",
                "$type": "json_path",
                "$value": path,
                "$default": undefined
            }
        },
        states
    );
};

// TODO REMOVE
// export const composeValue = (app = app,
//                              type = "$states",
//                              value = '',
//                              dependencies = {
//                                  composersFromAppState,
//                                  composerFromComposers,
//                                  composition
//                              }) => {
//     const {composersFromAppState, composerFromComposers, composition} = dependencies;
//     const composers = composersFromAppState(app) || {};
//     const read = {
//         "$compose": "read",
//         "$type": "json_path",
//         "$value": `$['app']['${type}']['${value}']`,
//         "$default": undefined
//     };
//     const composer = composerFromComposers(composers, value) || read;
//     const states = {
//         app,
//         "composed": undefined,
//         "view": undefined,
//         "response": undefined
//     };
//
//     return composition(composer, states)
// };