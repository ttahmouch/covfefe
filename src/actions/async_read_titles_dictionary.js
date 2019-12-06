export default {
    "$method": "GET",
    "$uri": {
        "$uri_template": "/{path}{extension}",
        "path": "titlesDictionary",
        "extension": ".json"
    },
    // $uri: {$template: "/{path}{extension}", path: "titlesDictionary", extension: ".json"},
    "$headers": {
        "custom": {
            "$js_template": "{value1}{value2}",
            // Support functional selection.
            "value1": {
                "$selector": "$.title[0]",
                "$from": "view"
            },
            "value2": {
                "$js_template": "{value1}{value2}",
                "value1": {
                    "$selector": "$.title[0]",
                    "$from": "view"
                },
                "value2": {
                    "$selector": "$.title",
                    "$from": "app"
                }
            }
        }
    },
    "$actions": [{"$action": "sync_on_read_titles_dictionary_request"}],
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
                "$actions": [{"$action": "sync_on_read_titles_dictionary_response_status_200"}]
            },
            "$headers": {
                "content-type": {
                    "$schema_comparison": {"$schema": "http://json-schema.org/schema#", "type": "string", "pattern": "application[/]json"},
                    "$actions": [{"$action": "sync_on_read_titles_dictionary_response_header_content_type"}]
                },
                "content-length": {
                    "$regexp": "^([0-9]+)$",
                    "$actions": [{"$action": "sync_on_read_titles_dictionary_response_header_content_length"}]
                }
            },
            "$body": {
                "$schema_comparison": {"$schema": "http://json-schema.org/schema#", "type": "object", "properties": {"titles": {"type": "array"}}},
                "$actions": [{"$action": "sync_on_read_titles_dictionary_response_body"}]
            }
        }
    ]
};