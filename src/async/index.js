export default {
    "async_read_titles_dictionary": {
        "method": "GET",
        "uri": {$uri_template: "/{path}{extension}", $path: "titlesDictionary", $extension: ".json"},
        "headers": {
            "custom": {
                $js_template: "{value1}{value2}",
                $value1: {$from_view_state: "$.title[0]"},
                $value2: {$from_app_state: "$.title"}
                // $value2: {$from_app_state: ({titles_array = []}) => titles_array[0] || ''}
            }
        },
        "responses": [
            {
                "status": {
                    $literal_comparison: 200,
                    // store.dispatch({type:'update_status', value:200})
                    $to_app_state: [{$action: "update", $state: "status"}]
                },
                "headers": {
                    "content-type": {
                        $schema_comparison: {"type": "string", "pattern": "application[/]json"},
                        $to_app_state: [{$action: "update", $state: "header"}]
                    },
                    "content-length": {
                        $regexp_comparison: "^([0-9]+)$",
                        $to_app_state: [{$action: "update", $state: "length", $from_response_state: "$.0"}]
                    }
                },
                "body": {
                    $schema_comparison: {
                        "type": "object",
                        "properties": {"titles": {"type": "array"}}
                    },
                    $to_app_state: [
                        {$action: "update", $state: "title", $from_response_state: "$.titles.0.title"},
                        {$action: "update", $state: "titles_array", $from_response_state: "$.titles"},
                        {$action: "update", $state: "titles_dictionary",}
                    ]
                }
            }
        ]
    }
};
