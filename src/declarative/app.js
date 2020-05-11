import React, {Fragment} from "react";

const Home = () => (<Fragment data-view="home_view_jsx"/>);
const Json = ({json = {}}) => (<pre>{JSON.stringify(json)}</pre>);

export default {
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
                "$value": {"$schema": "title_schema"},
                "$default": false
            }
        ]
    },
    "$actions": {
        "request_titles_dictionary_action": {
            "$action": "request_titles_dictionary_action",
            "$request": {
                "$method": "GET",
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
            "$events": {
                // "load": {"$event": "load"},
                // "load": {"$event": "request_titles_dictionary_200_event"},
                "loadstart": {"$event": "load_start_event"},
                // "progress": {"$event": "progress"},
                // "error": {"$event": "error"},
                // "abort": {"$event": "abort"},
                // "timeout": {"$event": "timeout"},
                "loadend": {"$event": "load_end_event"},
                "200": {"$event": "request_titles_dictionary_200_event"}
            }
        }
    },
    "$events": {
        "load_end_event": [
            {
                "$action": "spread_$states",
                "$value": {"loading": false}
            }
        ],
        "load_start_event": [
            {
                "$action": "spread_$states",
                "$value": {"loading": true}
            }
        ],
        "request_titles_dictionary_200_event": [
            {
                "$action": "spread_$states",
                "$value": {
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
            },
            {
                "$action": "spread_$states",
                "$value": {
                    "titles_dictionary": {
                        "$comment": "Dereference Composer.",
                        "$compose": "response_titles_dictionary_composer",
                        "$default": {}
                    }
                },
                "$if": {
                    "$comment": "Dereference Composer.",
                    "$compose": "is_response_titles_dictionary_composer",
                    "$default": false
                }
            },
            {
                "$action": "spread_$states",
                "$value": {"error": true},
                "$unless": {
                    "$comment": "Dereference Composer.",
                    "$compose": "is_response_titles_dictionary_composer",
                    "$default": false
                }
            }
        ],
        "title_submit_event": [
            {
                "$action": "spread_$states",
                "$value": {
                    "title": [{
                        "$compose": "read",
                        "$type": "json_path",
                        "$value": "$.view.title.0",
                        "$default": ""
                    }]
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
                "$action": "spread_$states",
                "$value": {"error": true},
                "$unless": {
                    "$comment": "Dereference Composer.",
                    "$compose": "is_title_composer",
                    "$default": true
                }
            }
        ]
    },
    "$states": {
        "title": "title",
        "titles_dictionary": {"title": "title"},
        "title_form_label": "Title:",
        "title_form_submit_button_label": "Read Titles Dictionary Async",
        "length": 0,
        "loading": false,
        "error": false
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
        "output_view": {"type": "Fragment", "props": {"data-view": "json_component"}},
        "output_view_jsx": (<Fragment data-view="json_component"/>),
        "home_view": {
            "type": "Fragment",
            "props": {
                "children": [
                    {"type": "Fragment", "props": {"data-view": "input_view"}},
                    {"type": "Fragment", "props": {"data-view": "output_view"}},
                    {"type": "Fragment", "props": {"data-view": "json_view"}}
                ]
            }
        },
        "home_view_jsx": (
            <Fragment>
                <Fragment data-view="input_view"/>
                <Fragment data-view="output_view"/>
                <Fragment data-view="json_view"/>
            </Fragment>
        )
    },
    "$view": (<Home/>)
};
