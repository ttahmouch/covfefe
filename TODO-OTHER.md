# Components

+ Extract most logic of App into functions.
+ The dispatchers need to be regenerated every time the state changes because there will be no way to CRUD new state otherwise.
+ Refactor dispatchers() to rely on retrieving the most current state from the store since this is initial state.
+ Am I thinking about this part wrong? Should root state keys never get added at runtime? Should the nest structure of the state keys change instead?
+ That would mean that new reducers and dispatchers wouldn't need to be created dynamically.
+ I probably also need to finally add PATCH support to the reducers and dispatchers.
+ Support data-platform and data-view and data-compare=comparator with data-state|view|style=selector.
+ Support view stacks and stack selection using a selector.
+ Support custom data structure operations in the reducers.
+ Support data-action=crud data-state|view|style=selector data-bind-action=onRender
+ data-view-inject vs data-view-replace; Support both? Probably keep only one way.
+ Extract selectors out into the selectors.js(on).
+ Make actions determine if they are async or sync based on their declared type or duck type as opposed to their name.
+ Make reducers support generic data structure operations such as push, pop, insert, etc.

+ Universally support setting string `data-*` attributes whether or not the component was already rendered.
+ Eventually get everything to be pure XML instead of JSX.
+ Rename async to request?
+ Allow defining initial application state using JSON Schema.

### Dispatchers
  
+ Allow comparison of anything declared; not just response state.
+ Possibly treat request and response state the same with respect to comparing and dispatching selected state.
// store, state, actions
// Support $with in place of $select?
// Should this happen before this method is called? It feels like a lot of setup just to dispatch the action from
// this method.
// Make these composable.
// Move to app?
// I think it's done enough to start implementing to_app_state for requests.
// Distinguish these between request and response context.
// These should probably not be done because interpolating the state of the selectors and interpolators should
// happen dynamically as late as possible, i.e., immediately before a request or after a response when
// dispatching actions.
// This will make context of the selection and interpolation far more relevant now because before they just
// happened as a part of the JSON revival indiscriminately. Moving it to after the revival would mean that we
// have to be aware of where the selection and interpolation is taking place, e.g., method, uri, headers, body,
// username, password, actions, etc.
// Shift the need to interpolate or select state for the request and response to callbacks of the request client.
// This will shift the state management to as late as possible. Perhaps allow `{app:()=>store.getState()}` to
// allow late binding of app state.
// Dispatchers probably need to be regenerated whenever state is changed especially added.
// The state is probably still not needed here as it can be derived from the store.
  
##### Actions

##### Comparators

// Disambiguate `$schema_comparison` from `$schema`.
// Support `$compare`

##### Declarators

// Get rid of these and shift state selection and interpolation to later right before a request happens or right
// after a response is received. Try to keep the state of the request declaration immutable, and create a new
// data structure with the interpolation and selection done for the request that is made.
// onDeclarativeResponseStateSelector: (declarative) => declarative,
// const selector = {$selector: "$.title", $from: "app"};
// const other_selector = ({app, view, response}) => true;
// const interpolator = {$uri_template: "/{path}", path: selector};
// const action = {$action: "update", $state: "title", $select: selector};
// const other_action = {$action: "update", $state: "loading", $select: other_selector};
// // const other_action = {$action: "update", $state: "loading", $select: {$selector: ({app, view, response}) => true}};
// const literal_comparator = {$literal: 200, $actions: [action, other_action]};
// const regexp_comparator = {$regexp: "^([0-9]+)$", $actions: [action, other_action]};
// const schema_comparator = {$schema_comparison: {"$schema": ""}, $actions: [action, other_action]};
// const request = {
//     $method: interpolator,
//     $uri: interpolator,
//     $headers: {"content-type": interpolator},
//     $actions: [action, other_action],
//     $responses: [{
//         $status: literal_comparator,
//         $headers: {"content-type": schema_comparator, "content-length": regexp_comparator},
//         $body: schema_comparator
//     }]
// };

##### Interpolators

##### Request
    
##### Selectors

### Reducers
  
##### Actions
  
### Selectors?

+ Remember to solve the issue of name collision of renaming $schema_comparison to $schema.
+ $compare: {$regexp,$schema,$literal}
// I completely fucking forgot that functions are being parsed from a JSON string meaning that's why they won't
// be called. They won't exist. Functional selectors may have to be replaced with a filename or be serialized
// and evaluated which sounds horrible, e.g., {$file_path, $json_path}
// I may also be able to deserialize the entire request object at the proper time before dispatching an async
// action as opposed to serializing the function or requiring it from a separate file.