/**
 * S.A.V.E.
 * STORE/STATE - ACTIONS, COMPONENTS, STATES, STYLES, VIEWS
 * ACTION -
 * VIEW -
 * EVENT - LOAD, CLICK, SUBMIT, etc. emitted upstream from VIEW, RESPONSE, etc.
 */

import {composition} from "../../../imperative/app/composers";

/**
 * MAPS -
 * INPUT STATE types can be BOOL, NUMBER, STRING, NULL, UNDEFINED, SYMBOL, OBJECT, ARRAY.
 * OUTPUT STATE types can be BOOL, NUMBER, STRING, NULL, UNDEFINED, SYMBOL, OBJECT, ARRAY.
 *
 * PREDICATES/INDICATORS -
 * INPUT STATE types can be BOOL, NUMBER, STRING, NULL, UNDEFINED, SYMBOL, OBJECT, ARRAY.
 * OUTPUT STATE types can be BOOL.
 *
 * INTERPOLATORS -
 * INPUT STATE types can be BOOL, NUMBER, STRING, NULL, UNDEFINED, SYMBOL, OBJECT, ARRAY.
 * OUTPUT STATE types can be STRING.
 */

const action = {$type: 'create_primitive', $value: 0};
const action = {$type: 'read_primitive'};
const action = {$type: 'update_primitive', $value: 0};
const action = {$type: 'delete_primitive'};
const action = {$type: 'create_object_property', $value: 0};
const action = {$type: 'read_object_property', $value: 0};
const action = {$type: 'update_object_property', $value: 0};
const action = {$type: 'delete_object_property', $value: 0};
const predicate = (value, index, array) => true;
const action = {
    $type: 'patch_object_property',
    $value: [
        ({value, index, array, app, view, response}) => value,
        ({value, index, array, app, view, response}) => value
    ]
};

// [item].map().find(() =>)

// Compose an ACTION.
const composer = {
    $compose: [
        {$type: "create", $value: {}},
        {$type: "update", $path: "$['$type']", $value: "create_primitive"},
        {
            $type: "update", $path: "$['$value']", $value: {
                $compose: [
                    {$type: "create", $value: "State: {state}"},
                    {$type: "interpolate", $value: {state: {$compose: [{$type: "read", $path: "$['app']['state']"}]}}}
                ]
            }
        },
        {
            "$type": "update", "$path": "$['composed']['three']",
            "$value": {
                "$compose": [
                    {"$type": "read", "$value": "$['app']['title']"}
                ]
            }
        }
    ]
};

const composer = {
    $compose: [
        ({app: {state = ''} = {}, view = {}, response = {}, compose = {}}) => ({...compose, $type: "create_primitive", $value: `State: ${state}`})
    ]
};

const actions = [
    {
        "$type": "update_title", $value: {
            $compose: [
                ({app: {title = ''} = {"title": ""}, compose = title}) => compose
            ]
        }
    },
    {
        "$type": "update_title",
        $value: {
            $compose: [
                ({view: {title: [title = '']} = {"title": [""]}, compose = title}) => compose
            ]
        }
    }
];

// Compose a REQUEST.
// const composer = {
//     $compose: [
//         {$type: "create", $value: {}},
//         {
//             $type: "update", $path: "$['$uri']", $value: {
//                 $compose: [
//                     {$type: "create", $value: "/{path}"},
//                     {$type: "interpolate", $}
//                 ]
//             }
//         },
//         ({app = {}, view = {}, response = {}, compose = {}}) => ({...compose, "$uri": "/"}),
//     ]
// };

// const action = {
//     "$actions": [{"$type": "sync_on_read_titles_dictionary_request"}]
// };

const action = {
    // "$request": [({app = {}, view = {}, response = {}}) => ({"$uri": "titlesDictionary.json"})],
    // "$request": ({app = {}, view = {}, response = {}}) => ({"$uri": "titlesDictionary.json"}),
    "$comments": [
        "Remember to replace comparators, declarators, interpolators, reducers, and selectors with composers.",
        "data-style|state|action|view are all selectors.",
        "data-compare? will eventually be a comparator used for routing.",
        "A way to bind composers as reducers needs to be added to the application state.",
        "Basic composition should be allowed by default for all state, but complex compisitions should be allowed through composer binding.",
        "The request from the root level down may be composed using a composition before the request is made.",
        "The root level may be an object or a composition. Properties like uri, headers, etc. may be literals or compositions.",
        "Compositions may be functional or declarative.",
        "The composed state and other state, e.g., app, view, response, etc. is passed to every composing function. The final output state is the composed state."
    ],
    "$actions": [{"$type": "sync_on_read_titles_dictionary_request"}],
    "$request": {
        "$uri": {
            "$compose": [
                {"$select": "$.title[0]", "$from": "view"},
                {"$interpolate": "/{path}", "$type": "uri"}
            ]
        },
        "$headers": {
            "custom": {
                "$compose": [
                    {"$select": "$.title[0]", "$from": "view"},
                    {"$interpolate": "{title}", "$type": "js"},
                ]
            }
        },
    },
    "$events?": [
        {"$type": "action-event", "$actions": []},
        {"$type": "request", "$actions": []},
        {"$type": "after-request", "$actions": []},
        {"$type": "submit", "$actions": [{"$type": "sync_on_read_titles_dictionary_request"}]},
        {"$type": "click", "$actions": []},
        {"$type": "load", "$actions": []},
        {"$type": "loadstart", "$actions": []},
        {"$type": "progress", "$actions": []},
        {"$type": "error", "$actions": []},
        {"$type": "abort", "$actions": []},
        {"$type": "timeout", "$actions": []},
        {"$type": "loadend", "$actions": []}
    ],
    "$events": [
        {"$type": "load", "$actions": [{"$type": "sync_on_load"}]},
        {"$type": "loadstart", "$actions": [{"$type": "sync_on_loadstart"}]},
        {"$type": "progress", "$actions": [{"$type": "sync_on_progress"}]},
        {"$type": "error", "$actions": [{"$type": "sync_on_error"}]},
        {"$type": "abort", "$actions": [{"$type": "sync_on_abort"}]},
        {"$type": "timeout", "$actions": [{"$type": "sync_on_timeout"}]},
        {"$type": "loadend", "$actions": [{"$type": "sync_on_loadend"}]}
    ],
    "$responses": [
        {
            "$status": 200,
            "$headers": {"content-type": "application[/]json"},
            "$body": {
                "$schema": "http://json-schema.org/schema#",
                "type": "object",
                "properties": {"titles": {"type": "array"}}
            },
            "$actions": [{"$type": "sync_on_read_titles_dictionary_response_status_200"}]
        }
    ]
};

const one = [
    {"$compose": "read", "$value": "$['response']['headers']['content-length']", "$default": "0"},
    {"$compose": "capture", "$value": "^([0-9]+)$", "$default": ["0"]},
    {"$compose": "read", "$value": "$['composed'][0]", "$default": "0"}
];

const two = [
    {"$default": {"status": 0, "headers": {}, "body": {}}, "$compose": "read", "$type": "jsonpath", "$value": "$['response']"},
    {"$default": false, "$compose": "compare", "$type": "jsonschema", "$value": {"$schema": "response_json_card_view_schema"}}
];

const three = [
    {
        "$default": {"one": "", "two": ""}, "$compose": "create",
        "$value": {
            "one": {"$default": "", "$compose": "read", "$type": "jsonpath", "$value": "$['view']['title'][0]"},
            "two": [
                {
                    "$default": {"one": "", "two": ""}, "$compose": "create",
                    "$value": {
                        "one": {"$default": "", "$compose": "read", "$type": "jsonpath", "$value": "$['view']['title'][0]"},
                        "two": {"$default": "", "$compose": "read", "$type": "jsonpath", "$value": "$['app']['states']['title']"}
                    }
                },
                {"$default": "", "$compose": "interpolate", "$type": "template", "$value": "{one}{two}"}
            ]
        }
    },
    {"$default": "", "$compose": "interpolate", "$type": "template", "$value": "{one}{two}"}
];

const four = [
    {"$default": {"path": "", "extension": ""}, "$compose": "create", "$value": {"path": "titlesDictionary", "extension": ".json"}},
    {"$default": "/", "$compose": "interpolate", "$type": "uritemplate", "$value": "/{path}{extension}"}
];

const five = [
    {"$default": {}, "$compose": "read", "$type": "jsonpath", "$value": "$['response']['body']"},
    {
        "$default": {"titles": [{"title": ""}, {"title": ""}]}, "$compose": "spread",
        "$value": {
            "$default": {"titles": [{"title": ""}, {"title": ""}]}, "$compose": "create",
            "$value": {
                "titles": [
                    {"$default": [], "$compose": "read", "$type": "jsonpath", "$value": "$['response']['body']['titles']"},
                    {
                        "$default": [{"title": ""}, {"title": ""}], "$compose": "spread",
                        "$value": {
                            "$default": [{"title": ""}, {"title": ""}], "$compose": "create",
                            "$value": [
                                {"title": {"$compose": "read", "$type": "jsonpath", "$value": "$['app']['states']['title']", "$default": ""}},
                                {"title": {"$compose": "read", "$type": "jsonpath", "$value": "$['view']['title'][0]", "$default": ""}}
                            ]
                        }
                    }
                ]
            }
        }
    }
];

setTimeout(() => {
    console.log(
        composition(
            // Boolean,Null,Undefined,Number,BigInt,String,Symbol
            1234567890,
            {"composed": undefined, "app": {}, "view": {}, "response": {}}
        )
    );

    console.log(
        composition(
            {"$compose": "read", "$type": "regular_expression", "$value": "^application[/](json)", "$default": "application/xml"},
            {"composed": "application/json;charset=utf8", "app": {}, "view": {}, "response": {"headers": {"content-type": "application/json;charset=utf8"}}}
        )
    );

    console.log(
        composition(
            ({composed = undefined, app = {}, view = {}, response = {}}) => composed * 2,
            {"composed": 1337, "app": {}, "view": {}, "response": {}}
        )
    );

    console.log(
        composition(
            [{"$compose": "read", "$type": "json_path", "$value": "$['response']['headers']['content-type']", "$default": "application/json"}],
            {"composed": undefined, "app": {}, "view": {}, "response": {"headers": {"content-type": "text/html"}}}
        )
    );

    console.log(
        composition(
            [({composed = undefined, app = {}, view = {}, response = {}}) => composed * 3],
            {"composed": 1337, "app": {}, "view": {}, "response": {}}
        )
    );

    console.log(
        composition(
            [
                {"$default": {"path": "", "extension": ""}, "$compose": "create", "$value": {"path": "titlesDictionary", "extension": ".json"}},
                ({composed = undefined, app = {}, view = {}, response = {}}) => composed,
                {"$default": "/", "$compose": "expand", "$type": "uri_template", "$value": "/{path}{extension}"}
            ],
            {"composed": undefined, "app": {}, "view": {}, "response": {}}
        )
    );

    console.log(
        composition(
            [
                {
                    "$default": {"one": "", "two": ""},
                    "$compose": "create",
                    "$value": {
                        "one": {"$default": "", "$compose": "read", "$type": "json_path", "$value": "$['view']['title'][0]"},
                        "two": [
                            {
                                "$default": {"one": "", "two": ""},
                                "$compose": "create",
                                "$value": {
                                    "one": {"$default": "", "$compose": "read", "$type": "json_path", "$value": "$['view']['title'][0]"},
                                    "two": {"$default": "", "$compose": "read", "$type": "json_path", "$value": "$['app']['title']"}
                                }
                            },
                            {"$default": "", "$compose": "expand", "$type": "template", "$value": "{one};{two}"}
                        ]
                    }
                },
                ({composed = undefined, app = {}, view = {}, response = {}}) => composed,
                {"$default": "", "$compose": "expand", "$type": "template", "$value": "{one};{two}"}
            ],
            {"composed": undefined, "app": {"title": "App Title"}, "view": {"title": ["View Title"]}, "response": {}}
        )
    );

    console.log(
        composition(
            [
                {"$compose": "read", "$type": "json_path", "$value": "$['response']['headers']['content-length']", "$default": "0"},
                ({composed = '0', app = {}, view = {}, response = {}}) => `${Math.ceil(Number(composed) / 256)}`,
                {"$compose": "read", "$type": "regular_expression", "$value": "^([0-9]+)$", "$default": ["0"]},
                ({composed: [composed] = ['0'], app: {some_string = '652'} = {}, view = {}, response = {}}) => `${composed}${some_string}`,
                {"$compose": "read", "$type": "json_path", "$value": "$['composed']", "$default": "1234567890"},
                ({composed = "1234567890", app = {}, view = {}, response = {}}) => composed
            ],
            {"composed": undefined, "app": {"some_string": '652'}, "view": {}, "response": {"headers": {"content-length": "65535"}}}
        )
    );
}, 0);