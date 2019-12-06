export default {
    "$actions": [
        {
            "$action": "update_loading",
            "$value": true
        },
        {
            "$action": "update_title",
            "$select": {
                "$selector": "$.title",
                "$from": "app"
            }
        },
        {
            "$action": "update_title",
            "$select": {
                "$selector": "$.title[0]",
                "$from": "view"
            }
        },
        {
            "$action": "update_loading",
            "$select": () => true
        },
        {
            "$action": "update_title",
            "$select": ({app: {title = ''} = {"title": ""}}) => title
        },
        {
            "$action": "update_title",
            "$select": ({view: {title: [title = '']} = {"title": [""]}}) => title
        }
    ]
};