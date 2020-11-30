export const headers = {
    "content-type": "",
};

export const request = {
    "$request": "",
    "$method": "GET",
    "$uri": "/",
    "$headers": headers,
    "$body": "",
    "$username": "",
    "$password": "",
    "$withCredentials": "false",
    // "$events": {},
};

export const response = {
    "$response": "",
    "$status": 0,
    "$headers": headers,
    "$body": ""
};

export const getAllResponseHeaders = () => "";

export const client = {
    getAllResponseHeaders,
    "status": 0,
    "responseText": "",
    "dataset": {
        "event": ""
    }
};

// export const element = {
//     // DOM View State
//     "value": "",
//     // DOM Event to Application Event Mapping
//     "dataset": {
//         "event": "",
//         "stateType": "string"
//     }
// };

export const preventDefault = () => undefined;

export const domEvent = {
    preventDefault,
    // DOM Event Type
    "type": "",
    "target": {
        ...client,
        ...{
            // DOM View State
            "value": "",
            // DOM Event to Application Event Mapping
            "dataset": {
                "event": "",
                "stateType": "string"
            }
        }
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
    "$responses": [],
    "$response": {
        "$status": 0
    },
    "$events": {}
};

// export const declarativeEvent = [syncAction, asyncAction];
export const declarativeEvent = [];

export const settings = {
    "mock": false,
    "debug": false
};

export const app = {
    "$actions": {},
    "$composers": {},
    "$events": {},
    "$schemas": {},
    "$settings": settings,
    "$states": {},
    "$styles": {},
    "$views": {},
    "$view": []
};

export const state = {
    "app": app,
    "response": {
        "status": 0,
        "headers": headers,
        "body": "",
    },
    "composed": undefined,
    "input": {},
    "view": {},
    "item": {
        "value": undefined,
        "index": 0,
        "array": [],
        "one": {
            "value": undefined,
            "index": 0,
            "array": []
        },
        "two": {
            "value": undefined,
            "index": 0,
            "array": [],
        }
    }
};

export const action = {
    $domEvent: domEvent,
    $event: declarativeEvent,
    $states: state,
};

export const store = {
    getState: () => app,
    dispatch: (action) => action,
    subscribe: () => (() => undefined)
};

export const schema = {"$schema": "http://json-schema.org/draft-07/schema#"};

export const functionalComposer = ({composed = undefined} = state) => composed;

export const declarativeComposer = {
    "$compose": "",
    "$type": "",
    "$value": undefined,
    "$default": undefined,
    "$state": state,
};

export const reducers = {};

export const reducer = () => app;

export const enhancer = (createStore) => createStore

export const element = {type: "", props: {children: []}};

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
