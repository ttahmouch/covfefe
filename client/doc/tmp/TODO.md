# Philosophy
# Tasks

<!--+ Unify all declarations into store state. This allows dynamic updating and selecting.-->
<!--+ Namespace declarations, e.g., views, states, composers, styles, etc.-->
+ Add support for data structure reduction, e.g., {} and []. 
+ Document
	+ Interpolators
	+ Comparators
	+ Selectors
	+ Actions
+ Make JSON Schemas FCCs, i.e., describe them in the app declaration.
+ Add support for dispatching actions declaratively from when a request is created.
+ Add support for dispatching actions declaratively from when a response/event is received irrespective of what response/event it is.
+ Add support for declaratively specifying events other than responses.

+ Add support for sets, i.e., createItem, readItem, updateItem, removeItem.
+ Add asynchrony.
+ Add routing.
+ Build a basic Reddit app.
+ Use data attributes for now to avoid misusing the normal attributes.
+ Add client rendering of HTTP metadata, i.e., URI Templates, JSON Path, JSON Schema, etc.
+ Add response handling for success and error states using reducers that change synchronous state, i.e., JSON Path, JSON Schema.
+ Refactor for dependency injection.
+ Interpolate the request metadata using URI Templates.
+ Templates may have static or dynamic variables.
+ Dynamic variables will be computed from the store using Json Path. Should they include encoding?
+ Should I allow selectors to be pure functions as well as declarative Json Paths?
"Support remote JSON and XML variations of JSX from remote resources using actions like normal state,
 e.g., data-action='read' data-state='view'.",
 
 Support retrieval of data and view together or separately, i.e., download view and then download data, download view with data, 
 download view for existing data.
 Static View - Embedded State: <div data-state-value={"Embedded State"}>Embedded State</div>
 Static View - Existing State: <div data-event="onNoState?" data-action="read" data-state="state">Embedded State</div>
 Dynamic View - Embedded State: <FlatList data-state-value={[]} data-bind-state="data"/> // How to handle the recycled view?
 Dynamic View - Existing State: <FlatList data-event="onNoState?" data-action="read" data-state="state" data-bind-state="data"/> 
 // How to handle the recycled view?
 
 Support custom "styles" for RN props that are clearly styles.
 
 {
   "props": {
     "horizontal": true // FlatList
   }
 }
 
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
  
  // import ReactDOMServer from 'react-dom/server';
  // const responseXml = ReactDOMServer.renderToString(
  //     React.createElement(
  //         'View',
  //         {},
  //         React.createElement(
  //             'FlatList',
  //             {
  //                 'data-state': 'array',
  //                 'data-item': 'view',
  //                 'data':{display:'block'}
  //             }
  //         )
  //     )
  // );
  // console.log(responseXml);
  // const parsedXml = new DOMParser().parseFromString(responseXml, 'application/xhtml+xml');
  // console.log(parsedXml);
  
// $uri: {$template: "/{path}{extension}", path: "titlesDictionary", extension: ".json"},
// Support functional selection.

# Components

+ Extract most logic of App into functions.
+ The dispatchers need to be regenerated every time the state changes because there will be no way to CRUD new state otherwise.
+ Refactor dispatchers() to rely on retrieving the most current state from the store since this is initial state.
+ Am I thinking about this part wrong? Should root state keys never get added at runtime? 
Should the nest structure of the state keys change instead?
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

/**
 * Dispatch event to the redux middleware.
 * If the event has registered actions, dispatch those with ACTION, PATH, VALUE, IF, and UNLESS.
 * VALUE, IF, and UNLESS should be compositions that return a final value or boolean.
 * If the action"s IF or UNLESS condition
 * data-STYLE, STATE, EVENT, VIEW props should be composable.
 *
 */

// All state types should be composable.
// Composers are Functions of State: Components, Reducers, Comparators, Declarators, Interpolators, Selectors, ...
// Actions should be able to specify the type of reduction that should happen registered as a custom or core composer.
// Create and Update were previously the same thing when reducing, but Update still needs to be updated to allow complex data structure updates.
// The reducers should be cognizant of Action, Path, Value.
// "action" for Composers, "path" for Composed State Selection, "value" for Composed State

/**
 * {$domEvent, $event, $states} = action
 * if $domEvent exists, then use it as expected because it is likely a view or http event.
 * else if $event exists, then
 */
/**
 * A DOM Event will have a generic type for an event, e.g., click, submit, load, etc.
 *
 + Get the various states, i.e., app, view, and response.
 + Get the event identifier from the generic DOM event to map to a custom event.
 + This event identifier will be sourced two different ways:
 0. Dataset for the case that it us set using HTML data-event attribute.
 1. ??? for XHR client.
 + Get an event from the declarative events defined in the app state using the event identifier.
 + Dispatch an event action with all the states and the custom event.
 */
 
 // Homogenize the usages of $ prefixes across the framework.
 // Dispatch events, dispatch synchronous actions, localized state,
 // Conditional views, conditional compositions,

// Make logging middleware.
// console.group(`Application Response Event ${event.type.toUpperCase()}:`);
// console.log(response);
// console.log(event);
// console.group('Application Response Actions:');
// Dispatch event action corresponding to response event.
// console.groupEnd();
// console.groupEnd();

/**
 Think about dynamic composition of all state types, i.e., states, styles, views, schemas, actions, components.
 */
 
 // Dependency inject the imports.
 // Finish create and spread.

// TODO REMOVE
// export const composeValue = (app = app,
//                              type = "$states",
//                              value = "",
//                              dependencies = {
//                                  composersFromAppState,
//                                  composerFromComposers,
//                                  composition
//                              }) => {
//     const {composersFromAppState, composerFromComposers, composition} = dependencies;
//     const composers = composersFromAppState(app) || {};
//     const read = {
//         "$compose": "read",
//         "$type": "json_path",
//         "$value": `$["app"]["${type}"]["${value}"]`,
//         "$default": undefined
//     };
//     const composer = composerFromComposers(composers, value) || read;
//     const states = {
//         app,
//         "composed": undefined,
//         "view": undefined,
//         "response": undefined
//     };
//
//     return composition(composer, states)
// };

// Think about dynamic composition of all state types, i.e., states, styles, views, schemas, actions, components.
// Dependency inject jsonpath, Ajv, and URITemplate; Rename the imports for consistency.
// Finish create? and spread.

// ---------------

// const func = () => undefined;
// const object = {}
// console.log(matchValues(true, true));
// console.log(matchValues(func, func));
// console.log(matchValues(null, null));
// console.log(matchValues(0, 0));
// console.log(matchValues("", ""));
// console.log(matchValues(Symbol.for(""), Symbol.for("")));
// console.log(matchValues(undefined, undefined));
// console.log(matchValues(object, object));
// console.log(matchValues({}, {}));
// console.log(matchValues({"1": "1"}, {"1": "1"}));
// console.log(matchValues([0], [0]));
// console.log(matchValues(
//     [{"vin": "1234567890"}, {"vin": "0987654321"}],
//     [{"vin": "1234567890"}, {"vin": "0987654321"}]
// ));
// console.log(matchValues(
//     {"name": "tony", "surname": "tahmouch"},
//     {"surname": "tahmouch", "name": "tony"}
// ));
// console.log(matchValues(false, true));
// console.log(matchValues(() => undefined, () => undefined));
// console.log(matchValues(1, 0));
// console.log(matchValues("", "0"));
// console.log(matchValues(Symbol.for(""), Symbol.for("0")));
// console.log(matchValues({0: 0}, {}));
// console.log(matchValues({}, {0: 0}));
// console.log(matchValues({0: 0}, {0: 1}));
// console.log(matchValues({0: 0}, {1: 1}));
// console.log(matchValues([0], [1]));
// console.log(matchValues(
//     [{"vin": "1234567890"}, {"vin": "0987654321"}],
//     [{"vin": "0987654321"}, {"vin": "1234567890"}]
// ));
// console.log(matchValues(
//     [{"vin": "1234567890", "account": {"id": "0"}}, {"vin": "0987654321", "account": {"id": "1"}}],
//     [{"vin": "1234567890", "account": {"id": "0"}}, {"vin": "0987654321", "account": {"id": "2"}}]
// ));
// console.log(composeFromValue([
//     {
//         "$compose": "create",
//         "$value": [{"vin": "1234567890", "account": {"id": "0"}}, {"vin": "0987654321", "account": {"id": "2"}}]
//     },
//     {
//         "$compose": "match",
//         "$value": [{"vin": "1234567890", "account": {"id": "0"}}, {"vin": "0987654321", "account": {"id": "2"}}],
//         "$default": false
//     }
// ], state));

// console.log(composeParametersFromPathTemplate("/:number", {"app": {"$route": {"pathname": ""}}}, "path_template")["number"]);
// console.log(composeParametersFromPathTemplate("/:number", {"app": {"$route": {"pathname": "/"}}}, "path_template")["number"]);
// console.log(composeParametersFromPathTemplate("/:number", {"app": {"$route": {"pathname": "/0"}}}, "path_template")["number"]);
// console.log(composeParametersFromPathTemplate(undefined, {"app": {"$route": {"pathname": "/0"}}}, "path_template"));
// console.log(composeParametersFromPathTemplate("/:number", {"app": {"$route": {"pathname": undefined}}}, "path_template"));
// console.log(composeParametersFromPathTemplate("/", {"app": {"$route": {"pathname": "/0"}}}, "path_template"));
// console.log(composeParametersFromPathTemplate("/", {"app": {"$route": {"pathname": "/"}}}, "path_template"));
// console.log(composeParametersFromPathTemplate("/", {"app": {"$route": {"pathname": ""}}}, "path_template"));
// console.log(composeParametersFromPathTemplate("", {"app": {"$route": {"pathname": ""}}}, "path_template"));
// console.log(composeParametersFromPathTemplate("", {"app": {"$route": {"pathname": "/"}}}, "path_template"));
// console.log(composeParametersFromPathTemplate("", {"app": {"$route": {"pathname": "/0"}}}, "path_template"));
// console.log(composeParametersFromPathTemplate("^/([0-9]+)$", {"app": {"$route": {"pathname": ""}}}, "regular_expression")[1]);
// console.log(composeParametersFromPathTemplate("^/([0-9]+)$", {"app": {"$route": {"pathname": "/"}}}, "regular_expression")[1]);
// console.log(composeParametersFromPathTemplate("^/([0-9]+)$", {"app": {"$route": {"pathname": "/0"}}}, "regular_expression")[1]);
// console.log(composeParametersFromPathTemplate(undefined, {"app": {"$route": {"pathname": "/0"}}}, "regular_expression"));
// console.log(composeParametersFromPathTemplate("^/([0-9]+)$", {"app": {"$route": {"pathname": undefined}}}, "regular_expression"));
// console.log(composeParametersFromPathTemplate("^/$", {"app": {"$route": {"pathname": ""}}}, "regular_expression")[0]);
// console.log(composeParametersFromPathTemplate("^/$", {"app": {"$route": {"pathname": "/"}}}, "regular_expression")[0]);
// console.log(composeParametersFromPathTemplate("^/$", {"app": {"$route": {"pathname": "/0"}}}, "regular_expression")[0]);
// console.log(composeParametersFromPathTemplate("", {"app": {"$route": {"pathname": ""}}}, "regular_expression")[0]);
// console.log(composeParametersFromPathTemplate("", {"app": {"$route": {"pathname": "/"}}}, "regular_expression")[0]);
// console.log(composeParametersFromPathTemplate("", {"app": {"$route": {"pathname": "/0"}}}, "regular_expression")[0]);

// store.dispatch({
//     "type": "route_push",
//     "value": {"uri": "/sign_in?query=query#fragment"}
// });
// store.dispatch({"type": "route_push", "value": {uri: "/garage"}});
// store.dispatch({"type": "route_push", "value": {uri: "/dashboard"}});
// store.dispatch({"type": "route_replace", "value": {uri: "/sign_in"}});
// store.dispatch({"type": "route_back"});
// store.dispatch({"type": "route_replace", "value": {uri: "/garage"}});
// store.dispatch({"type": "route_forward"});

/**
 * If `mock-client` is enabled, then dispatch all the events that
 * would have been dispatched if a server was actually reached
 * and returned an HTTP response.
 *
 * Pretend to be a server in mock mode, and dispatch the events
 * in sequential order, i.e., loadstart, progress, load, etc.
 * When the load event is dispatched, enumerate the response
 * possibilities and return the first possibility that is mocked.
 * If none are mocked, then simulate a timeout scenario.
 *
 * How much time should be in between events?
 * Is the only event that includes data the load/status code event?
 * Maybe add the DOMEvent to the states object to be selected from?
 *
 * Type         Times                               When
 * loadstart    Once.                               First.
 * progress     Once or more.                       After loadstart has been dispatched.
 * error        Zero or once (mutually exclusive).  After the last progress has been dispatched.
 * abort
 * timeout
 * load
 * loadend      Once.                               After one of error, abort, timeout or load has been dispatched.
 * The error, abort, timeout, and load event types are mutually exclusive.
 */
 
 /**
      Undefined    "undefined"   --> null ("undefined"?)
      Function     "function"    --> null ("function"?)
      Null         "object"      --> null
      NaN          "number"      --> null ("number:nan"?)
      Infinity     "number"      --> null ("number:infinity"?)
      Boolean      "boolean"     --> self
      Number       "number"      --> self
      String       "string"      --> self
      Object       "object"      --> self
      Array        "object"      --> self
      BigInt       "bigint"      --> Number(self)
      Symbol       "symbol"      --> Symbol.keyFor(self) ("symbol:key"?)
*/

// console.log(JSON.parse(JSON.stringify(undefined, (key, value) => toValidJson(value))));
// console.log(JSON.parse(JSON.stringify(() => undefined, (key, value) => toValidJson(value))));
// console.log(JSON.parse(JSON.stringify(null, (key, value) => toValidJson(value))));
// console.log(JSON.parse(JSON.stringify(NaN, (key, value) => toValidJson(value))));
// console.log(JSON.parse(JSON.stringify(Infinity, (key, value) => toValidJson(value))));
// console.log(JSON.parse(JSON.stringify(false, (key, value) => toValidJson(value))));
// console.log(JSON.parse(JSON.stringify(0, (key, value) => toValidJson(value))));
// // console.log(JSON.parse(JSON.stringify(0n, (key, value) => toValidJson(value))));
// console.log(JSON.parse(JSON.stringify("", (key, value) => toValidJson(value))));
// console.log(JSON.parse(JSON.stringify(Symbol.for("symbol"), (key, value) => toValidJson(value))));
// console.log(JSON.parse(JSON.stringify({
//     "boolean": false,
//     "function": () => undefined,
//     "infinity": Infinity,
//     "nan": NaN,
//     "null": null,
//     "number": 0,
//     "string": "",
//     "symbol": Symbol.for("symbol"),
//     "undefined": undefined,
//     // "bigint": 0n,
// }, (key, value) => toValidJson(value))));
// console.log(JSON.parse(JSON.stringify([
//     false, () => undefined, Infinity, NaN, null, 0, "", Symbol.for("symbol"), undefined
// ], (key, value) => toValidJson(value))));

console.log(expandTemplate({
    "$value": `
        Your search for {title} did not have any matches.

        Suggestions:

        ⦿ Try different keywords.
        ⦿ Looking for a movie or TV show?
        ⦿ Try using a movie, TV show title, an actor or director.
        ⦿ Try a genre, like comedy, romance, sports, or drama.
        ⦿ {something} (something)
    `,
    "$state": {"composed": {"something": "fuck"}}
}));

{/*<div children={0n}/>*/}
{/*<div children={false}/>*/}
{/*<div children={null}/>*/}
{/*<div children={0}/>*/}
{/*<div children={""}/>*/}
{/*<div children={Symbol.for("")}/>*/}
{/*<div children={undefined}/>*/}
{/*<div children={{}}/>*/}
{/*<div children={[]}/>*/}
{/*<div data-state="title"/>*/}
{/*<div data-state="movie" data-bind-state="data-state">*/}
{/*    <div data-state="movie" data-bind-state="data-state"/>*/}
{/*</div>*/}
{
    /**
     * The store state can be selected or composed and passed to an element via the normal `data-state` prop.
     * As the view renders, the selected/composed state is aggregated in the states object to be selectable
     * by composers. Text Nodes should be interpolatable with expand composers template syntax.
     * If the node selecting state selects a primitive, it should map to a string through expand (?) composition, e.g.,
     * <div data-state="title" data-compose="expand">Movie: {title}</div>
     * If primitive, then map the key to key.
     * If structure, then map keys to keys.
     * State maps to children by default. This just enhances the mapping to a composition.
     * State --> Text or Element Mapping
     * <div data-state="string,boolean,number,null,undefined,object,array"/>
     *     <div data-state-path="$.view..."/>
     * In order to render anything it must map to a TextNode.
     */
    // {
    //     "original_name": "Lucifer",
    //     "name": "Lucifer",
    //     "first_air_date": "2016-01-25",
    //     "backdrop_path": "/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg",
    //     "original_language": "en",
    //     "overview": "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
    //     "poster_path": "/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg"
    //     "genre_ids": [80, 10765],
    //     "popularity": 286.139,
    //     "origin_country": ["US"],
    //     "vote_count": 4150,
    //     "id": 63174,
    //     "vote_average": 8.5,
    // }
}