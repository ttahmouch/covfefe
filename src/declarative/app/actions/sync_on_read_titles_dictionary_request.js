export default {
    "$actions": [
        {
            "$type": "update_loading",
            "$value": true
        },
        {
            "$type": "update_title",
            "$select": {
                "$selector": "$.title",
                "$from": "app"
            }
        },
        {
            "$type": "update_title",
            "$select": {
                "$selector": "$.title[0]",
                "$from": "view"
            }
        },
        {
            "$type": "update_loading",
            "$select": () => true
        },
        {
            "$type": "update_title",
            "$select": ({app: {title = ''} = {"title": ""}}) => title
        },
        {
            "$type": "update_title",
            "$select": ({view: {title: [title = '']} = {"title": [""]}}) => title
        }
    ]
};