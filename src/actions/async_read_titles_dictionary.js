export default {
    "$method": "GET",
    "$uri": {"$uri_template": "/{path}{extension}", "path": "titlesDictionary", "extension": ".json"},
    // $uri: {$template: "/{path}{extension}", path: "titlesDictionary", extension: ".json"},
    "$headers": {
        "custom": {
            "$js_template": "{value1}{value2}",
            // Support functional selection.
            "value1": {"$selector": "$.title[0]", "$from": "view"},
            "value2": {
                "$js_template": "{value1}{value2}",
                "value1": {"$selector": "$.title[0]", "$from": "view"},
                "value2": {"$selector": "$.title", "$from": "app"}
            }
        }
    },
    "$actions": [
        {"$action": "update_loading", "$value": true},
        {"$action": "update_title", "$select": {"$selector": "$.title", "$from": "app"}},
        {"$action": "update_title", "$select": {"$selector": "$.title[0]", "$from": "view"}},
        {"$action": "update_loading", "$select": () => true},
        {"$action": "update_title", "$select": ({app = {"title": ""}}) => app.title},
        {"$action": "update_title", "$select": ({view = {"title": [""]}}) => view.title[0]}
    ],
    "$responses": [
        {
            "$status": 200,
            "$headers": {"content-type": "application[/]json"},
            "$body": {
                "$schema": "http://json-schema.org/schema#",
                "type": "object",
                "properties": {"titles": {"type": "array"}}
            }
        },
        {
            "$status": {
                "$literal": 200,
                "$actions": [
                    {"$action": "update_status"},
                    {"$action": "update_status", "$select": ({response = 200}) => response}
                ]
            },
            "$headers": {
                "content-type": {
                    "$schema_comparison": {
                        "$schema": "http://json-schema.org/schema#",
                        "type": "string",
                        "pattern": "application[/]json"
                    },
                    "$actions": [
                        {"$action": "update_header"},
                        {"$action": "update_header", "$select": ({response = "application/json"}) => response}
                    ]
                },
                "content-length": {
                    "$regexp": "^([0-9]+)$",
                    "$actions": [
                        {"$action": "update_length", "$select": {"$selector": "$.0", "$from": "response"}},
                        {"$action": "update_length", "$select": ({response = ["0"]}) => response[0]}
                    ]
                }
            },
            "$body": {
                "$schema_comparison": {
                    "$schema": "http://json-schema.org/schema#",
                    "type": "object",
                    "properties": {"titles": {"type": "array"}}
                },
                "$actions": [
                    {"$action": "update_titles_dictionary"},
                    {"$action": "update_title", "$select": {"$selector": "$.titles.0.title", "$from": "response"}},
                    {"$action": "update_titles_array", "$select": {"$selector": "$.titles", "$from": "response"}},
                    {"$action": "update_titles_dictionary", "$select": ({response = {"titles": []}}) => response},
                    {"$action": "update_title", "$select": ({response = {"titles": [{"title": ""}]}}) => response.titles[0].title},
                    {"$action": "update_titles_array", "$select": ({response = {"titles": []}}) => response.titles}
                ]
            }
        }
    ]
};