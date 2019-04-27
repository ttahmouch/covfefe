/**
 * TODO:
 */
export default {
    anything_schema: {
        '$schema': 'http://json-schema.org/schema#'
    },
    any_positive_integer_schema: {
        '$schema': 'http://json-schema.org/schema#',
        'type': 'integer',
        'minimum': 0
    },
    titles_dictionary_schema: {
        "$schema": "http://json-schema.org/schema#",
        "type": "object",
        "properties": {
            "titles": {"type": "array"}
        }
    },
    json_content_type_schema: {
        "$schema": "http://json-schema.org/schema#",
        "type": "string",
        "pattern": "application[/]json"
    }
};