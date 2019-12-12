export default {
    "$actions": [
        {
            "$type": "update_status"
        },
        {
            "$type": "update_status",
            "$select": ({response = 500}) => response
        }
    ]
};