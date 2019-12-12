export default {
    "$actions": [
        {
            "$type": "update_length",
            "$capture": {
                "$regexp": "^([0-9]+)$",
                "$from": "response"
            },
            "$select": {
                "$selector": "$.0",
                "$from": "response"
            }
        },
        {
            "$type": "update_length",
            "$capture": {
                "$regexp": "^([0-9]+)$",
                "$from": "response"
            },
            "$select": ({response: [length = "0"]}) => length
        }
    ]
};