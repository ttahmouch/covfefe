const manifest = {
    "state": {
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
                        "title": {"@view_state": "$.title[0]"}
                    },
                    {
                        "title": {
                            "@js_template": "{value1}{value2}",
                            "value1": "value1",
                            "value2": {"@app_state": "$.title"}
                        }
                    }
                ]
            },
            "responses": [
                {
                    "status": 201,
                    "headers": {
                        "content-type": "application/json",
                        "location": "/titlesDictionary.json"
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
