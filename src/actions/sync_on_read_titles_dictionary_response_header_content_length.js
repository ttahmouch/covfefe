export default {
    "$actions": [
        {
            "$action": "update_length",
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
            "$action": "update_length",
            "$capture": {
                "$regexp": "^([0-9]+)$",
                "$from": "response"
            },
            "$select": ({response: [length = "0"]}) => length
        }
    ]
};