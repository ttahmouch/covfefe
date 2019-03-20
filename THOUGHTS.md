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
// "": {"@app_state": "$.title"},
// "username": "",
// "username": {
//     "@js_template": "{value1}{value2}",
//     "value1": "is static value expansion necessary?",
//     "value2": {"@app_state": "$.title"}
// },
// "password": "",
// "password": {
//     "@js_template": "{value1}{value2}",
//     "value1": "is static value expansion necessary?",
//     "value2": {"@app_state": "$.title"}
// },
// "withCredentials": "false",