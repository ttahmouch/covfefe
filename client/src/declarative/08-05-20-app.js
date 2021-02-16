import React from "react";

const Home = () => (<div data-view="home_view_jsx"/>);
const Json = ({json = {}}) => (<pre>{JSON.stringify(json)}</pre>);

export default {
    "$settings": {
        // Event and Action Mocking
        // Return Declaration from Server

        // If these flags are enabled, then console logs and mocks will be on
        // for the whole application. If you'd like to disable individual logs
        // or mocks, you can set flags on each individual item.
        "debug": true,
        "mock": true
    },
    "$schemas": {
        "response_titles_dictionary_composer_schema": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["status", "headers", "body"],
            "properties": {
                "status": {
                    "type": "integer",
                    "const": 200
                },
                "headers": {
                    "type": "object",
                    "properties": {
                        "content-type": {
                            "type": "string",
                            "pattern": "application[/]json"
                        },
                        "content-length": {
                            "type": "string",
                            "pattern": "^([0-9]+)$"
                        }
                    }
                },
                "body": {
                    "$schema": "http://json-schema.org/schema#",
                    "type": "object",
                    "properties": {"titles": {"type": "array"}}
                }
            }
        },
        "title_schema": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "string",
            "pattern": "^([a-zA-Z]+)$"
        },
        "url_object_schema": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["pathname"],
            "properties": {"pathname": {"type": "string", "pattern": "/route/1$"}}
        },
        "url_string_schema": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "string",
            // "pattern": "^(([^:/?#]+):)?([/][/]([^/?#]*))?([^?#]*)([?]([^#]*))?([#](.*))?"
            "pattern": "/route/2$"
        }
    },
    "$composers": {
        Home,
        Json,
        "json_component": [
            {
                "$comment": "Create <pre>.",
                "$compose": "create",
                "$value": {
                    "type": "pre",
                    "props": {
                        "children": [
                            (state) => state.composed,
                            {
                                "$comment": "Read Dictionary.",
                                "$compose": "read",
                                "$type": "json_path",
                                "$value": "$.app['$states'].titles_dictionary",
                                "$default": {}
                            },
                            (state) => state.composed,
                            {
                                "$comment": "Encode JSON.",
                                "$compose": "encode",
                                "$type": "json",
                                "$default": "{}"
                            },
                            (state) => state.composed,
                        ]
                    }
                }
            }
        ],
        "is_response_titles_dictionary_composer": [
            {
                "$comment": "Read Response.",
                "$compose": "read",
                "$type": "json_path",
                "$value": "$.response",
                "$default": {"status": 0, "headers": {}, "body": {}}
            },
            {
                "$comment": "Validate Response.",
                "$compose": "match",
                "$type": "json_schema",
                "$value": {"$schema": "response_titles_dictionary_composer_schema"},
                "$default": false
            }
        ],
        "request_titles_dictionary_header_composer": [
            {
                "$comment": "Create Dictionary with Properties One and Two.",
                "$compose": "create",
                "$value": {
                    "one": {
                        "$comment": "Read Property One from the User Input in the View.",
                        "$compose": "read",
                        "$type": "json_path",
                        "$value": "$.view.title.0",
                        "$default": ""
                    },
                    "two": [
                        {
                            "$comment": "Create Dictionary with Properties One and Two.",
                            "$compose": "create",
                            "$value": {
                                "one": {
                                    "$comment": "Read Property One from the User Input in the View.",
                                    "$compose": "read",
                                    "$type": "json_path",
                                    "$value": "$.view.title.0",
                                    "$default": ""
                                },
                                "two": {
                                    "$comment": "Read Property Two from the Application State.",
                                    "$compose": "read",
                                    "$type": "json_path",
                                    "$value": "$.app['$states'].title",
                                    "$default": ""
                                }
                            }
                        },
                        {
                            "$comment": "Interpolate the Dictionary Properties into a String.",
                            "$compose": "expand",
                            "$type": "template",
                            "$value": "{one}{two}",
                            "$default": ""
                        }
                    ]
                }
            },
            {
                "$comment": "Interpolate the Dictionary Properties into a String.",
                "$compose": "expand",
                "$type": "template",
                "$value": "{one}{two}",
                "$default": ""
            }
        ],
        "request_titles_dictionary_uri_composer": [
            {
                "$comment": "Create Dictionary with Path and Extension Properties.",
                "$compose": "create",
                "$value": {"path": "titlesDictionary", "extension": ".json"}
            },
            {
                "$comment": "Interpolate Dictionary Properties into a URI.",
                "$compose": "expand",
                "$type": "uri_template",
                "$value": "/{path}{extension}",
                "$default": "/"
            }
        ],
        "response_titles_dictionary_composer": [
            {
                "$comment": "Read the Response Body Dictionary.",
                "$compose": "read",
                "$type": "json_path",
                "$value": "$.response.body",
                "$default": {}
            },
            {
                "$comment": "Spread New Dictionary on Incoming Dictionary.",
                "$compose": "spread",
                "$value": {
                    "titles": [
                        {
                            "$comment": "Read Titles Array from the Response Body Dictionary.",
                            "$compose": "read",
                            "$type": "json_path",
                            "$value": "$.response.body.titles",
                            "$default": []
                        },
                        {
                            "$comment": "Spread New Array on Incoming Array.",
                            "$compose": "spread",
                            "$value": [
                                {
                                    "title": {
                                        "$comment": "Read Title String from the Application State.",
                                        "$compose": "read",
                                        "$type": "json_path",
                                        "$value": "$.app['$states'].title",
                                        "$default": ""
                                    }
                                },
                                {
                                    "title": {
                                        "$comment": "Read Title String from the User Input in the View.",
                                        "$compose": "read",
                                        "$type": "json_path",
                                        "$value": "$.view.title.0",
                                        "$default": ""
                                    }
                                }
                            ],
                            "$default": [{"title": ""}, {"title": ""}]
                        }
                    ]
                },
                "$default": {"titles": [{"title": ""}, {"title": ""}]}
            }
        ],
        "is_title_composer": [
            {
                "$comment": "Read Title String from User Input in the View.",
                "$compose": "read",
                "$type": "json_path",
                "$value": "$.view.title.0",
                "$default": ""
            },
            {
                "$comment": "Validate User Input.",
                "$compose": "match",
                "$type": "json_schema",
                "$value": {
                    "$schema": "title_schema",
                    "pattern": "^([a-zA-Z0-9]+)$"
                },
                "$default": false
            }
        ],
        "is_url_one": [
            {
                "$compose": "read",
                "$type": "json_path",
                "$value": "$.app['$route']",
                "$default": {"pathname": "/", "search": "", "hash": "", "searchParams": {}}
            },
            {
                "$compose": "match",
                "$type": "json_schema",
                "$value": {"$schema": "url_object_schema"},
                "$default": false
            }
        ],
        "is_url_two": [
            {
                "$compose": "read",
                "$type": "json_path",
                "$value": "$.app['$route']",
                "$default": {"pathname": "/", "search": "", "hash": "", "searchParams": {}}
            },
            {
                "$compose": "encode",
                "$type": "uri",
                "$default": "http://localhost:3000/"
            },
            {
                "$compose": "match",
                "$type": "json_schema",
                "$value": {"$schema": "url_string_schema"},
                "$default": false
            }
        ],
        "is_loading": [
            {
                "$compose": "read",
                "$type": "json_path",
                "$value": "$.app['$states'].loading",
                "$default": false
            }
        ]
    },
    "$requests": {
        "read_titles": {
            "$method": "GET",
            "$uri": "/titles",
            "$timeout": 30000
        },
        "create_title": {
            "$method": "POST",
            "$uri": "/titles",
            "$headers": {
                "content-type": "application/json"
            },
            "$body": {
                "title": "Fourth Title"
            },
            "$timeout": 30000
        }
    },
    "$responses": {
        "read_titles_success": {
            "$status": 200,
            "$headers": {
                "content-type": "application/json"
            },
            "$body": {
                "titles": [
                    {
                        "title": "Mock Title"
                    }
                ]
            }
        },
        "create_title_success": {
            "$status": 201,
            "$headers": {
                "content-type": "application/json",
                "location": "https://localhost:3000/titles/0"
            },
            "$body": {
                "title": "Mock Title"
            }
        },
        "unauthorized": {
            "$status": 401,
            "$headers": {
                "www-authenticate": "Basic charset='UTF-8'"
            }
        }
    },
    "$actions": {
        "request_titles_dictionary_action": {
            "$action": "request_titles_dictionary_action",
            "$request": {
                "$request": "read_titles",
                "$uri": {
                    "$compose": "request_titles_dictionary_uri_composer",
                    "$default": "/"
                },
                "$headers": {
                    "header": {
                        "$compose": "request_titles_dictionary_header_composer",
                        "$default": ""
                    }
                }
            },
            "$responses": [
                {
                    "$mock": true,
                    "$response": "read_titles_success",
                    "$headers": {
                        "content-type": "application/json",
                        "content-language": [
                            {
                                "$compose": "create",
                                "$default": "en-US"
                            }
                        ]
                    }
                },
                {
                    // "$mock": true,
                    "$response": "unauthorized"
                }
            ],
            "$events": {
                "loadstart": {"$event": "load_start_event"},
                "progress": {"$event": "progress_event"},
                "error": {"$event": "error_event"},
                "timeout": {"$event": "timeout_event"},
                "abort": {"$event": "abort_event"},
                "load": {"$event": "load_event"},
                "200": {"$event": "request_titles_dictionary_200_event"},
                "401": {"$event": "request_titles_dictionary_401_event"},
                "loadend": {"$event": "load_end_event"}
            }
        }
    },
    "$events": {
        "load_start_event": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"loading": true, "event": "load_start"}}
            }
        ],
        "progress_event": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"loading": true, "event": "progress"}}
            }
        ],
        "error_event": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"loading": false, "event": "error"}}
            }
        ],
        "timeout_event": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"loading": false, "event": "timeout"}}
            }
        ],
        "abort_event": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"loading": false, "event": "abort"}}
            }
        ],
        "load_event": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"loading": false, "event": "load"}}
            }
        ],
        "request_titles_dictionary_401_event": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"loading": false, "event": "401"}}
            }
        ],
        "load_end_event": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"loading": false, "event": "load_end"}}
            }
        ],
        "request_titles_dictionary_200_event": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"loading": false, "event": "200"}}
            },
            {
                "$action": "create_$states_items",
                "$value": {
                    "items": {
                        "length": [
                            {
                                "$compose": "read",
                                "$type": "json_path",
                                "$value": "$.response.headers['content-length']",
                                "$default": "0"
                            },
                            {
                                "$compose": "read",
                                "$type": "regular_expression",
                                "$value": "^([0-9]+)$",
                                "$default": ["0"]
                            },
                            {
                                "$compose": "read",
                                "$type": "json_path",
                                "$value": "$.composed.0",
                                "$default": "0"
                            }
                        ]
                    }
                }
            },
            {
                "$action": "create_$states_items",
                "$value": {
                    "items": {
                        "titles_dictionary": {
                            "$comment": "Dereference Composer.",
                            "$compose": "response_titles_dictionary_composer",
                            "$default": {}
                        }
                    }
                },
                "$if": {
                    "$comment": "Dereference Composer.",
                    "$compose": "is_response_titles_dictionary_composer",
                    "$default": false
                }
            },
            {
                "$action": "create_$states_items",
                "$value": {"items": {"error": true}},
                "$unless": {
                    "$comment": "Dereference Composer.",
                    "$compose": "is_response_titles_dictionary_composer",
                    "$default": false
                }
            }
        ],
        "title_submit_event": [
            {
                "$action": "create_$states_items",
                "$value": {
                    "items": {
                        "title": [
                            {
                                "$compose": "read",
                                "$type": "json_path",
                                "$value": "$.view.title.0",
                                "$default": ""
                            }
                        ]
                    }
                },
                "$if": {
                    "$comment": "Dereference Composer.",
                    "$compose": "is_title_composer",
                    "$default": false
                }
            },
            {
                "$action": "request_titles_dictionary_action",
                "$if": {
                    "$comment": "Dereference Composer.",
                    "$compose": "is_title_composer",
                    "$default": false
                }
            },
            {
                "$action": "create_$states_items",
                "$value": {"items": {"error": true}},
                "$unless": {
                    "$comment": "Dereference Composer.",
                    "$compose": "is_title_composer",
                    "$default": true
                }
            }
        ]
    },
    "$route": {},
    "$states": {
        "title": "title",
        "titles_dictionary": {"title": "title"},
        "title_form_label": "Title:",
        "title_form_submit_button_label": "Read Titles Dictionary Async",
        "length": 0,
        "loading": false,
        "error": false,
        "event": ""
    },
    "$styles": {
        "form_input_style": {
            "width": "100%",
            "display": "block"
        },
        "form_button_gray_style": {
            "background": "gray",
            "width": "100%",
            "display": "block"
        }
    },
    "$views": {
        "input_view": {
            "type": "form",
            "props": {
                "data-event": "title_submit_event",
                "data-bind-event": "onSubmit",
                "data-state-type": "dictionary",
                "children": [
                    {
                        "type": "input",
                        "props": {
                            "name": "title",
                            "data-style": "form_input_style",
                            "data-state": "title_form_label",
                            "data-bind-state": "placeholder"
                        }
                    },
                    {
                        "type": "button",
                        "props": {
                            "type": "submit",
                            "data-style": "form_button_gray_style",
                            "data-state": "title_form_submit_button_label"
                        }
                    }
                ]
            }
        },
        "input_view_jsx": (
            <form data-event="title_submit_event"
                  data-bind-event="onSubmit"
                  data-state-type="dictionary">
                <input name="title"
                       data-style="form_input_style"
                       data-state="title_form_label"
                       data-bind-state="placeholder"/>
                <button type="submit"
                        data-style="form_button_gray_style"
                        data-state="title_form_submit_button_label"/>
            </form>
        ),
        "json_view": {
            "type": "Json",
            "props": {
                "data-state": "titles_dictionary",
                "data-bind-state": "json"
            }
        },
        "json_view_jsx": (
            <Json data-state="titles_dictionary"
                  data-bind-state="json"/>
        ),
        "output_view": {"type": "div", "props": {"data-view": "json_component"}},
        "output_view_jsx": (<div data-view="json_component"/>),
        "home_view": {
            "type": "div",
            "props": {
                "children": [
                    {"type": "div", "props": {"data-view": "input_view"}},
                    {"type": "div", "props": {"data-view": "output_view"}},
                    {"type": "div", "props": {"data-view": "json_view"}}
                ]
            }
        },
        "route_one": {"type": "div", "props": {"children": ["Is /route/1 ."]}},
        "route_two": (<div>Is /route/2 .</div>),
        "route_three": (<div>Is /route/:number([0-9]+) .</div>),
        "route_four": (<div>Is /route/[0-9]+[/]?$ .</div>),
        "404": (<div>404</div>),
        "route_loading": (
            <div className="loading-spinner center">
                <div/>
            </div>
        ),
        "home_view_jsx": (
            <div>
                <div data-view="input_view"/>
                <div data-view="output_view"/>
                <div data-view="json_view"/>
                <div data-view="route_one"
                     data-if="is_url_one"/>
                <div data-view="route_two"
                     data-if="is_url_two"/>
                <div data-view="route_three"
                     data-if-path="/route/:number([0-9]+)"
                     data-path-type="path_template"
                     data-comment="`data-path-type` defaults to `path_template`."/>
                <div data-view="route_four"
                     data-if-path="/route/([0-9]+)[/]?$"
                     data-path-type="regular_expression"/>
                <div data-view="404"
                     data-unless-path="/route/:number([0-9]+)"/>
                <div data-view="route_loading"
                     data-if="is_loading"/>
            </div>
        )
    },
    "$view": (<Home/>)
};
