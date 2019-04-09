const manifest = {
    "state": {
        "status": 0,
        "header": "",
        "title": "",
        "titles_array": [],
        "titles_dictionary": {}
    },
    "style": {
        "header": {
            "backgroundColor": "#282c34",
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "justifyContent": "center",
            "color": "white"
        }
    },
    "request": {
        "async_create_titles_dictionary": {
            "method": "POST",
            "uri": "/titlesDictionary.json",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "header": {
                    "@js_template": "{value1}{value2}",
                    "value1": "value1",
                    "value2": "value2"
                }
            },
            "body": {
                "titles": [
                    {
                        "title": {"@from_view_state": "$.title[0]"}
                    },
                    {
                        "title": {
                            "@js_template": "{value1}{value2}",
                            "value1": "value1",
                            "value2": {"@from_app_state": "$.title"}
                        }
                    }
                ]
            },
            "responses": [
                {
                    "status": {
                        "@literal_comparison": 201,
                        "@to_app_state": [{"type": "UPDATE_STATE"}]
                    },
                    "headers": {
                        "content-type": {"@literal_comparison": "application/json"},
                        "location": {"@literal_comparison": "/titlesDictionary.json"},
                        "header": {
                            "@regexp_comparison": "(application)[/](json)",
                            "@to_app_state": [
                                {"type": "UPDATE_STATE", "@from_response_state": "$.0"},
                                {"type": "UPDATE_STATE", "@from_response_state": "$.1"},
                                {"type": "UPDATE_STATE"}
                            ],
                        },
                        "other-header": {
                            "@schema_comparison": {"type": "string", "pattern": "[/]titlesDictionary[.]json"},
                            "@to_app_state": [{"type": "UPDATE_STATE"}]
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
                    },
                },
                {
                    "status": {"@literal_comparison": 404},
                    "headers": {},
                    "body": {"@schema_comparison": {}}
                }
            ]
        },
        "async_read_titles_dictionary": {
            "method": "GET",
            "uri": "/titlesDictionary.json",
            "headers": {
                "accept": "application/json"
            },
            "body": "",
            "username": "",
            "password": "",
            "withCredentials": "false",
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
        },
        "async_update_titles_dictionary": {
            "method": "PUT",
            "uri": "/titlesDictionary.json",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": {
                "titles": []
            },
            "username": "",
            "password": "",
            "withCredentials": "false",
            "responses": [
                {
                    "status": 200,
                    "headers": {
                        "content-type": "application/json"
                    },
                    "body": {
                        "type": "object",
                        "properties": {
                            "titles": {
                                "type": "array"
                            }
                        }
                    }
                }
            ]
        },
        "async_remove_titles_dictionary": {
            "method": "DELETE",
            "uri": "/titlesDictionary.json",
            "headers": {
                "accept": "application/json"
            },
            "body": "",
            "username": "",
            "password": "",
            "withCredentials": "false",
            "responses": [
                {
                    "status": 204,
                    "headers": {},
                    "body": {}
                }
            ]
        }
    }
};

export const state = manifest.state;
export const style = manifest.style;
export const request = manifest.request;
