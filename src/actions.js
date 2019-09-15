/**
 * TODO:
 * + Document `$uri_template` and `$js_template` TEMPLATE expressions.
 * + Document `$from_view_state`, `$from_app_state`, `$from_response_state` RETRIEVAL expressions.
 * + Document `$literal_comparison`, `$schema_comparison`, `$regexp_comparison` COMPARISON expressions.
 * + Document `$to_app_state` DISPATCH expressions.
 * + Allow JSON Schemas to be referenced by ID, i.e., no need to import `schema`.
 * Start thinking about the structures in the JSON as types based on the properties they retain.
 * Add synchronous actions to this JSON structure by just adding `{$actions:[]}`.
 */
export default {
    "ASYNC_READ_TITLES_DICTIONARY": {
        $method: "GET",
        $uri: {
            $uri_template: "/{path}{extension}",
            path: "titlesDictionary",
            extension: ".json"
        },
        // $uri: {$template: "/{path}{extension}", path: "titlesDictionary", extension: ".json"},
        $headers: {
            "custom": {
                $js_template: "{value1}{value2}",
                // Support functional selection.
                value1: {$selector: "$.title[0]", $from: "view"},
                value2: {
                    $js_template: "{value1}{value2}",
                    value1: {$selector: "$.title[0]", $from: "view"},
                    value2: {$selector: "$.title", $from: "app"}
                }
            }
        },
        $actions: [
            {
                $action: "update",
                $state: "loading",
                $value: true
            },
            {
                $action: "update",
                $state: "title",
                $select: {$selector: "$.title", $from: "app"}
            },
            {
                $action: "update",
                $state: "title",
                $select: {$selector: "$.title[0]", $from: "view"}
            },
            {
                $action: "update",
                $state: "loading",
                $select: () => true
            },
            {
                $action: "update",
                $state: "title",
                $select: ({app = {title: ''}}) => app.title
            },
            {
                $action: "update",
                $state: "title",
                $select: ({view = {title: ['']}}) => view.title[0]
            }
        ],
        $responses: [
            {
                $status: 200,
                $headers: {"content-type": "application[/]json"},
                $body: {
                    "$schema": "http://json-schema.org/schema#",
                    "type": "object",
                    "properties": {"titles": {"type": "array"}}
                }
            },
            {
                $status: {
                    $literal: 200,
                    $actions: [
                        {
                            $action: "update",
                            $state: "status"
                        },
                        {
                            $action: "update",
                            $state: "status",
                            $select: ({response = 200}) => response
                        }
                    ]
                },
                $headers: {
                    "content-type": {
                        $schema_comparison: {
                            "$schema": "http://json-schema.org/schema#",
                            "type": "string",
                            "pattern": "application[/]json"
                        },
                        $actions: [
                            {
                                $action: "update",
                                $state: "header"
                            },
                            {
                                $action: "update",
                                $state: "header",
                                $select: ({response = 'application/json'}) => response
                            }
                        ]
                    },
                    "content-length": {
                        $regexp: "^([0-9]+)$",
                        $actions: [
                            {
                                $action: "update",
                                $state: "length",
                                $select: {$selector: "$.0", $from: "response"}
                            },
                            {
                                $action: "update",
                                $state: "length",
                                $select: ({response = ['0']}) => response[0]
                            }
                        ]
                    }
                },
                $body: {
                    $schema_comparison: {
                        "$schema": "http://json-schema.org/schema#",
                        "type": "object",
                        "properties": {"titles": {"type": "array"}}
                    },
                    $actions: [
                        {
                            $action: "update",
                            $state: "titles_dictionary"
                        },
                        {
                            $action: "update",
                            $state: "title",
                            $select: {$selector: "$.titles.0.title", $from: "response"}
                        },
                        {
                            $action: "update",
                            $state: "titles_array",
                            $select: {$selector: "$.titles", $from: "response"}
                        },
                        {
                            $action: "update",
                            $state: "titles_dictionary",
                            $select: ({response = {titles: []}}) => response
                        },
                        {
                            $action: "update",
                            $state: "title",
                            $select: ({response = {titles: [{title: ''}]}}) => response.titles[0].title
                        },
                        {
                            $action: "update",
                            $state: "titles_array",
                            $select: ({response = {titles: []}}) => response.titles
                        }
                    ]
                }
            }
        ]
    }
};
