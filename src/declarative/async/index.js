import schema from "../schema";

const {titles_dictionary_schema, json_content_type_schema} = schema;

/**
 * TODO:
 * + Document `$uri_template` and `$js_template` TEMPLATE expressions.
 * + Document `$from_view_state`, `$from_app_state`, `$from_response_state` RETRIEVAL expressions.
 * + Document `$literal_comparison`, `$schema_comparison`, `$regexp_comparison` COMPARISON expressions.
 * + Document `$to_app_state` DISPATCH expressions.
 * + Allow JSON Schemas to be referenced by ID, i.e., no need to import `schema`.
 */
export default {
    "async_read_titles_dictionary": {
        "method": "GET",
        "uri": {$uri_template: "/{path}{extension}", path: "titlesDictionary", extension: ".json"},
        "headers": {
            "custom": {
                $js_template: "{value1}{value2}",
                value1: {$from_view_state: "$.title[0]"},
                value2: {$from_app_state: "$.title"}
                // $value2: {$from_app_state: ({titles_array = []}) => titles_array[0] || ''}
            }
        },
        $responses: [
            {
                $status: {
                    $literal_comparison: 200,
                    $to_app_state: [{$action: "update", $state: "status"}]
                },
                $headers: {
                    "content-type": {
                        $schema_comparison: json_content_type_schema,
                        $to_app_state: [{$action: "update", $state: "header"}]
                    },
                    "content-length": {
                        $regexp_comparison: "^([0-9]+)$",
                        $to_app_state: [{$action: "update", $state: "length", $from_response_state: "$.0"}]
                    }
                },
                $body: {
                    $schema_comparison: titles_dictionary_schema,
                    $to_app_state: [
                        {$action: "update", $state: "title", $from_response_state: "$.titles.0.title"},
                        {$action: "update", $state: "titles_array", $from_response_state: "$.titles"},
                        {$action: "update", $state: "titles_dictionary"}
                    ]
                }
            }
        ]
    },
    "async_read_titles_array": {
        // Revise these to use $ prefix.
        "method": "GET",
        "uri": "/titlesDictionary.json",
        $responses: [
            {$status: 200, $headers: {"content-type": "application[/]json"}, $body: titles_dictionary_schema},
            {
                // literal
                $status: 200,
                // regex
                $headers: {"content-type": "application[/]json"},
                // schema
                $body: {
                    $schema_comparison: titles_dictionary_schema,
                    $to_app_state: [{$action: "update", $state: "titles_array", $from_response_state: "$.titles"}]
                }
            }
        ]
    }
};
