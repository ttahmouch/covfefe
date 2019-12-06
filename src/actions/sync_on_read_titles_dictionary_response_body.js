export default {
    "$actions": [
        {
            "$action": "update_titles_dictionary"
        },
        {
            "$action": "update_title",
            "$select": {
                "$selector": "$.titles.0.title",
                "$from": "response"
            }
        },
        {
            "$action": "update_titles_array",
            "$select": {
                "$selector": "$.titles",
                "$from": "response"
            }
        },
        {
            "$action": "update_titles_dictionary",
            "$select": ({
                            app: {title: app_title = 'app_title'} = {"title": [""]},
                            view: {title: [view_title = 'view_title']} = {"title": [""]},
                            response = {"titles": []}
                        }) => {
                return {...response, 'titles': [{'title': app_title}, {'title': view_title}, ...response.titles]};
            }
        },
        {
            "$action": "update_title",
            "$select": ({response: {titles: [one, two, {title = ''}]} = {"titles": [{"title": ""}, {"title": ""}, {"title": ""}]}}) => title
        },
        {
            "$action": "update_titles_array",
            "$select": ({response: {titles: [one, two, ...titles]} = {"titles": []}}) => titles
        }
    ]
};