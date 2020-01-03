/**
 * S.A.V.E.
 * STORE/STATE - ACTIONS, COMPONENTS, STATES, STYLES, VIEWS
 * ACTION -
 * VIEW -
 * EVENT - LOAD, CLICK, SUBMIT, etc. emitted upstream from VIEW, RESPONSE, etc.
 */

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