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
