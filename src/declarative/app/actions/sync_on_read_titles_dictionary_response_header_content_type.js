export default {
    "$actions": [
        {
            "$type": "update_header"
        },
        {
            "$type": "update_header",
            "$select": ({response = "application/json"}) => response
        }
    ]
};