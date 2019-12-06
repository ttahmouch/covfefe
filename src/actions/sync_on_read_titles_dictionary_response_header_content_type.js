export default {
    "$actions": [
        {
            "$action": "update_header"
        },
        {
            "$action": "update_header",
            "$select": ({response = "application/json"}) => response
        }
    ]
};