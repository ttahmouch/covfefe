export default {
    "$actions": [
        {
            "$action": "update_status"
        },
        {
            "$action": "update_status",
            "$select": ({response = 500}) => response
        }
    ]
};