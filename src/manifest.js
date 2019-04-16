export const state = {
    "status": 0,
    "header": "",
    "length": "",
    "title": "",
    "titles_array": [],
    "titles_dictionary": {}
};
export const style = {
    "header": {
        "backgroundColor": "#282c34",
        "display": "flex",
        "flexDirection": "column",
        "alignItems": "center",
        "justifyContent": "center",
        "color": "white"
    }
};
export const request = {
    "async_read_titles_dictionary": {
        "method": "GET",
        "uri": {
            "@uri_template": "/{path}",
            "path": "titlesDictionary.json"
        },
        "headers": {
            "custom": {
                "@js_template": "{value1}{value2}",
                "value1": {"@from_view_state": "$.title[0]"},
                "value2": {"@from_app_state": ({titles_array = []}) => titles_array[0] || ''}
            }
        },
        "body": {},
        "responses": [
            {
                "status": {
                    "@literal_comparison": 200,
                    "@to_app_state": [{"type": "UPDATE_STATUS"}]
                },
                "headers": {
                    "content-type": {
                        "@schema_comparison": {
                            "type": "string",
                            "pattern": "application[/]json"
                        },
                        "@to_app_state": [{"type": "UPDATE_HEADER"}]
                    },
                    "content-length": {
                        "@regexp_comparison": "^([0-9]+)$",
                        "@to_app_state": [{"type": "UPDATE_LENGTH", "@from_response_state": "$.0"}]
                    }
                },
                "body": {
                    "@schema_comparison": {
                        "type": "object",
                        "properties": {"titles": {"type": "array"}}
                    },
                    "@to_app_state": [
                        {"type": "UPDATE_TITLE", "@from_response_state": "$.titles.0.title"},
                        {"type": "UPDATE_TITLES_ARRAY", "@from_response_state": "$.titles"},
                        {"type": "UPDATE_TITLES_DICTIONARY"}
                    ]
                }
            }
        ]
    }
};
