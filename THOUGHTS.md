```
// View.
<JsonDictionary data-state='titles_dictionary'  //
                data-state-prop='dictionary'/>  //
// View.
<form data-action-prop='onSubmit'       // Event.
      data-action='async_update'        // Action.
      data-state='titles_dictionary'    // Application State.
      data-state-type='dictionary'>     // View State. This should probably be called `data-view-state-type`.
                                        // There should probably be a `data-app-state-type` that accepts a Json Path.
    <div>
        <label>First Title:</label>     
        <input name='title'/>           // View State.
    </div>
    <div>
        <button type='submit'>          // Event.
            Update Titles Dictionary Async
        </button>
    </div>
</form>

// If status code matches identically, and 
// If headers match, and body is valid, then you've matched a response possibility.
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
```

+ Add support for sets, i.e., createItem, readItem, updateItem, removeItem.
+ Add asynchrony.
+ Add routing.
+ Build a basic Reddit app.
+ Use data attributes for now to avoid misusing the normal attributes.
+ Add client rendering of HTTP metadata, i.e., URI Templates, JSON Path, JSON Schema, etc.
+ Add response handling for success and error states using reducers that change synchronous state, i.e., JSON Path, JSON Schema.
+ Refactor for dependency injection.
+ Interpolate the request metadata using URI Templates.
+ Method must be an HTTP method.
+ Uri may be a string or a template.
+ Headers may be a string or a template.
+ Body may be anything that can serialize to Json, and may contain templates and dynamic state using Json Path.
+ User and Password credentials will likely never be needed unless people need a way to do HTTP Basic Auth in Uri.
+ Templates may have static or dynamic variables.
+ Dynamic variables will be computed from the store using Json Path. Should they include encoding?
+ Should I allow selectors to be pure functions as well as declarative Json Paths?

// Body serializes to JSON by default.
// "": {"@from_app_state": "$.title"},
// "username": "",
// "username": {
//     "@js_template": "{value1}{value2}",
//     "value1": "is static value expansion necessary?",
//     "value2": {"@from_app_state": "$.title"}
// },
// "password": "",
// "password": {
//     "@js_template": "{value1}{value2}",
//     "value1": "is static value expansion necessary?",
//     "value2": {"@from_app_state": "$.title"}
// },
// "withCredentials": "false",

// How do I grab the state I need from the entire response message?
// { "@to_app_state": "" } Reviver?
// Literal comparison (String), RegExp (@regexp), JSON Schema ($schema), ...
// Literal capture, RegExp Capture Groups, JSON Path, ...
// Consider making status a string like everything else.
// Json Schemas can do regular expressions, but can they capture groups?
// Literal comparison should probably be restricted to primitive values that don't need deep comparisons.
// Deep comparisons can probably be handled by a Json Schema.
// RegExp can handle deep string comparison; Literal comparison can handle shallow string comparison.
// Schema comparison can handle deep data structure comparison.
// This is the equivalent of returning a response model in MVP.
// Returning a view model in MVP should be done declaratively by dispatching new actions to the store.

// Convert the previously implemented comparison functions to accept any type of comparison.
// Capture state from the response using the @value, integer, or JSON Path properties when a response
// fully matches a response declaration.

```
// How do I grab the state I need from the entire response message?
// { "@to_app_state": "" } Reviver?
// Literal comparison (String), RegExp (@regexp), JSON Schema ($schema), ...
// Literal capture, RegExp Capture Groups, JSON Path, ...
// Consider making status a string like everything else.
// Json Schemas can do regular expressions, but can they capture groups?
// Literal comparison should probably be restricted to primitive values that don't need deep comparisons.
// Deep comparisons can probably be handled by a Json Schema.
// RegExp can handle deep string comparison; Literal comparison can handle shallow string comparison.
// Schema comparison can handle deep data structure comparison.
// This is the equivalent of returning a response model in MVP.
// Returning a view model in MVP should be done declaratively by dispatching new actions to the store.

// Convert the previously implemented comparison functions to accept any type of comparison.
// Capture state from the response using the @value, integer, or JSON Path properties when a response
// fully matches a response declaration.
{
    "name": "async_create_titles_dictionary_created",
    // This is literal comparison with capturing response state.
    // The captured value should be the whole value compared.
    "status": {
        "@literal_comparison": 201,
        "@value": {"@to_app_state": "update_state"}
    },
    "headers": {
        // This is literal comparison without capturing response state.
        "content-type": "application/json",
        "location": "/titlesDictionary.json",
        // This is string-only comparison using regular expressions with capturing response state using capture groups.
        // The captured values should be indexed according to the capture group they represent.
        // Should `value` be allowed to capture the entire string? Or should be rely on a capture group for the whole string?
        "header": {
            "@regexp_comparison": "(application)[/](json)",
            "0": {"@to_app_state": "update_state"},
            "1": {"@to_app_state": "update_state"},
            "@value": {"@to_app_state": "update_state"}
        },
        // This is comparison of any valid JSON structure, i.e., object, array, primitive, with capturing using JSON Path.
        // Should `value` be allowed to capture the entire structure? Or should be rely on a JSON Path for the whole structure?
        // I think JSON Path can only query objects and arrays.
        "other-header": {
            "@schema_comparison": {
                "$schema": "http://json-schema.org/schema#",
                "$id": "http://yourdomain.com/schemas/myschema.json",
                "type": "string",
                "pattern": "[/]titlesDictionary[.]json"
            },
            "@value": {"@to_app_state": "update_state"}
        }
    },
    "body": {
        "@schema_comparison": {
            "$schema": "http://json-schema.org/schema#",
            "$id": "http://yourdomain.com/schemas/myschema.json",
            "type": "object",
            "properties": {
                "titles": {
                    "type": "array"
                }
            }
        },
        "$.titles": {"@to_app_state": "update_titles_array"},
        "@value": {"@to_app_state": "update_titles_dictionary"}
    },
    // "@from_response_state": "$"
}
```

// JSON Path the response states you need. Possibly allow pure functions to select the state as well.
// This is the equivalent in MVP of having the Model construct a Response Model.
// Dispatch actions to the store with the selected state to update the View.
// This is the equivalent in MVP of having the Presenter construct a View Model.

// Dispatch synchronous actions unassociated with the request to indicate state changes from responses.
// return dispatch(store, {type, request, event, response, value});
// What if no response state matches expectations?

// Dispatch this action to signify the asynchrony is possibly complete depending on the event.
// Is this even necessary anymore? Because we're no longer expecting to derive state directly from the event actions.
// We are now updating store state as synchronous dispatching based on if responses match the declared responses.