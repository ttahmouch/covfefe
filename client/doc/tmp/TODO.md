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

```
<>
    <div data-view="navigation_bar"/>
    <div data-if-path="/" data-view="home"/>
    <div data-if-path="/search" data-view="search"/>
    <div data-unless-path="^/(?:search)?$" data-view="404" data-path-type="regular_expression"/>

    <div style={{color: "red", fontSize: 14}}>
        <pre data-state="boolean" data-state-value={false}/>
        <pre data-state="null" data-state-value={null}/>
        <pre data-state="number" data-state-value={9000}/>
        <pre data-state="string" data-state-value={"string"}/>
        {/*<pre data-state="symbol" data-state-value={Symbol.for("symbol")}/>*/}
        <pre data-state="undefined" data-state-value={undefined}/>
        <pre data-state="object" data-state-value={{"0": 0, "1": 1}}/>
        <pre data-state="array" data-state-value={[0, 1]}/>

        <pre data-state="boolean" data-state-value={false}>(boolean)</pre>
        <pre data-state="null" data-state-value={null}>(null)</pre>
        <pre data-state="number" data-state-value={9000}>(number)</pre>
        <pre data-state="string" data-state-value={"string"}>(string)</pre>
        {/*<pre data-state="symbol" data-state-value={Symbol.for("symbol")}>(symbol)</pre>*/}
        <pre data-state="undefined" data-state-value={undefined}>(undefined)</pre>
        <pre data-state="primitive" data-state-value={true}>(primitive) <span/> (primitive)</pre>
        <pre data-state="object" data-state-value={{"0": 0, "1": 1}}>(0) <span/> (1)</pre>
        <pre data-state="array" data-state-value={[0, 1]}>(0) <span/> (1)</pre>

        <pre data-state="noop"/>
        <pre data-state="noop" data-state-default="noop"/>
        <pre data-state="title" data-state-path="$.app.$states.noop" data-state-default="noop"/>
        <pre data-state="noop" data-state-default-value="default"/>
        <pre data-state="title" data-state-path="$.app.$states.noop" data-state-default-value="default"/>
        <pre data-state="title"/>
        <pre data-state="noop" data-state-default="title"/>
        <pre data-state="title" data-state-path="$.app.$states.title"/>
        <pre data-state="title" data-state-path="$.app.$states.noop" data-state-default="title"/>

        <div data-state-repeat="true" data-state-repeat-key="9000"
             data-state="nested_primitive" data-state-value={9000}>
            <pre data-state="9000" data-state-path="$.view.9000"/>
        </div>
        <div data-state-repeat="true" data-state-repeat-key="integer"
             data-state="nested_array_of_integers" data-state-value={[0, 1, 2, 3]}>
            <pre data-state="integer" data-state-path="$.view.integer"/>
        </div>
        <div data-state-repeat="true" data-state-repeat-key="person" data-state="people"
             data-state-value={[
                 {
                     "children": [
                         {"pets": [{"name": "marshmallow"}, {"name": "chocolate"}]},
                         {"pets": [{"name": "graham"}, {"name": "peanut butter"}]}
                     ]
                 },
                 {
                     "children": [
                         {"pets": [{"name": "red"}, {"name": "orange"}]},
                         {"pets": [{"name": "yellow"}, {"name": "green"}]}
                     ]
                 }
             ]}>
            <div data-state-repeat="true" data-state-repeat-key="child" data-state-repeat-depth="1"
                 data-state="children" data-state-path="$.view.person.children">
                <div data-state-repeat="true" data-state-repeat-key="pet" data-state-repeat-depth="2"
                     data-state="pets" data-state-path="$.view.child.pets">
                    <pre data-state="name" data-state-path="$.view.pet.name"/>
                </div>
            </div>
        </div>
        <div data-state="netflix_originals"
             data-state-repeat="true" data-state-repeat-key="show">
            <div className="showcase_movie"
                 data-state="id" data-state-path="$.view.show.id" data-bind-state="key">
                <form className="showcase_movie_image"
                      data-event="on_click_movie" data-bind-event="onSubmit" data-state-type="dictionary">
                    <input className="showcase_movie_image" type="image"
                           data-bind-state="src" data-state="show_poster_image" alt=""/>
                    <input name="original_name" data-bind-state="defaultValue"
                           data-state="original_name" data-state-path="$.view.show.original_name"/>
                    <input name="name" data-bind-state="defaultValue"
                           data-state="name" data-state-path="$.view.show.name"/>
                    <input name="first_air_date" data-bind-state="defaultValue"
                           data-state="first_air_date" data-state-path="$.view.show.first_air_date"/>
                    <input name="backdrop_path" data-bind-state="defaultValue"
                           data-state="backdrop_path" data-state-path="$.view.show.backdrop_path"/>
                    <input name="original_language" data-bind-state="defaultValue"
                           data-state="original_language" data-state-path="$.view.show.original_language"/>
                    <input name="overview" data-bind-state="defaultValue"
                           data-state="overview" data-state-path="$.view.show.overview"/>
                    <input name="poster_path" data-bind-state="defaultValue"
                           data-state="poster_path" data-state-path="$.view.show.poster_path"/>
                    <input name="genre_ids" data-bind-state="defaultValue"
                           data-state="genre_ids" data-state-path="$.view.show.genre_ids"/>
                    <input name="popularity" data-bind-state="defaultValue"
                           data-state="popularity" data-state-path="$.view.show.popularity"/>
                    <input name="origin_country" data-bind-state="defaultValue"
                           data-state="origin_country" data-state-path="$.view.show.origin_country"/>
                    <input name="vote_count" data-bind-state="defaultValue"
                           data-state="vote_count" data-state-path="$.view.show.vote_count"/>
                    <input name="vote_average" data-bind-state="defaultValue"
                           data-state="vote_average" data-state-path="$.view.show.vote_average"/>
                    <input name="id" data-bind-state="defaultValue"
                           data-state="id" data-state-path="$.view.show.id"/>
                    <input name="media_type" data-bind-state="defaultValue" data-state="media_type"
                           data-state-path="$.view.show.media_type" data-state-default-value="tv"/>
                    <div data-state-repeat="true" data-state-repeat-key="nation" data-state-repeat-depth="1"
                         data-state="country" data-state-path="$.view.show.origin_country">
                        <input type="text" data-bind-state="defaultValue"
                               data-state="nation" data-state-path="$.view.nation"/>
                        <div data-state-repeat="true" data-state-repeat-key="genre" data-state-repeat-depth="2"
                             data-state="genres" data-state-path="$.view.show.genre_ids">
                            <input type="text" data-bind-state="defaultValue"
                                   data-state="genre" data-state-path="$.view.genre"/>
                        </div>
                    </div>
                    <div data-state-repeat="true" data-state-repeat-key="genre_id"
                         data-state-repeat-depth="0"
                         data-state="genre_ids" data-state-path="$.view.show.genre_ids">
                        <input type="text" data-bind-state="defaultValue"
                               data-state="genre_id" data-state-path="$.view.genre_id"/>
                    </div>
                </form>
            </div>
            <br/>
        </div>

        <div data-state="netflix_originals"
             data-state-value={[{"genre_ids": [80, 10765], "origin_country": ["US", "CA"]}]}
             data-state-repeat="true" data-state-repeat-key="show">
            <form className="showcase_movie_image"
                  data-event="on_click_movie" data-bind-event="onSubmit" data-state-type="dictionary">
                <div data-state-repeat="true" data-state-repeat-key="genre_id" data-state-repeat-depth="1"
                     data-state="genre_ids" data-state-path="$.view.show.genre_ids">
                    <input type="text" data-bind-state="defaultValue"
                           data-state="genre_id" data-state-path="$.view.genre_id"/>
                    <div data-state-repeat="true" data-state-repeat-key="country" data-state-repeat-depth="2"
                         data-state="countries" data-state-path="$.view.show.origin_country">
                        <input type="text" data-bind-state="defaultValue"
                               data-state="country" data-state-path="$.view.country"/>
                    </div>
                </div>
            </form>
        </div>

        <div data-state="netflix_originals"
             data-state-value={[{"genre_ids": [80, 10765], "origin_country": ["US", "CA"]}]}
             data-state-repeat="true"
             data-state-repeat-key="show">
            <div data-state="countries"
                 data-state-path="$.view.show.origin_country"
                 data-state-repeat="true"
                 data-state-repeat-key="country"
                 data-state-repeat-depth="1">
                <p>Country</p>
                <p data-state="country"
                   data-state-path="$.view.country"/>
                <div data-state="genre_ids"
                     data-state-path="$.view.show.genre_ids"
                     data-state-repeat="true"
                     data-state-repeat-key="genre_id"
                     data-state-repeat-depth="2">
                    <p>Genre ID</p>
                    <p data-state="genre_id"
                       data-state-path="$.view.genre_id"/>
                </div>
            </div>
        </div>
    </div>
</>
```

+ I need a list of all JavaScript Array Fold Functions.
+ I need them to not mutate the input Array, i.e., pure Higher-Order Functions, e.g., `[0,1].reverse()`.
+ I need them to rely on VALUE over REFERENCE comparisons, e.g., `[{}].indexOf({})`, `[{}].includes({})`.

**Input State:** 
> Array

**Output State:** 
> Array (Filter, Flat, FlatMap, Map, Sort (Copy -> Sort))
> 
> Boolean (Every, Some)
> 
> String (Join (i.e., Reduce -> String))
> 
> Any (Find, Reduce, ReduceRight)

**Predicate:** 
> `callback(element[, index[, array]])` (Not Reduce or ReduceRight)
> 
> `callback(accumulator, element[, index[, array]])` (Reduce, ReduceRight)
> 
> `callback(a, b)` (Sort)

```
✅ Array.prototype.filter()
✅ Array.prototype.flat()
✅ Array.prototype.map()
✅ Array.prototype.flatMap()
✅ Array.prototype.every()
✅ Array.prototype.find()
✅ Array.prototype.some()
✅ Array.prototype.reduce()
✅ Array.prototype.reduceRight()
✅ Array.prototype.sort()
```

// [
//     {"expression": "", "scope": {"a": 0, "b": 1}},
//     {"expression": ["a > b", "a < b"], "scope": {"a": 0, "b": 1}},
//     {"expression": "a > b", "scope": {"a": 0, "b": 1}},
//     {"expression": "a < b", "scope": {"a": 0, "b": 1}},
//     {"expression": "a != b", "scope": {"a": true, "b": false}},
//     {"expression": "a == b", "scope": {"a": true, "b": true}},
//     {"expression": "a / b", "scope": {"a": 0, "b": 1}},
//     {"expression": "a / b", "scope": {"a": 0, "b": 0}},
//     {"expression": "a / b", "scope": {"a": 1, "b": 0}},
//     {"expression": "a * b", "scope": {"a": 0, "b": 1}},
//     {"expression": "a > b", "scope": {"a": "3.14159", "b": "0"}},
// ].forEach(({expression, scope}) => {
//     console.time();
//     console.log(mathjs.evaluate(expression, scope));
//     console.timeEnd();
// })

// The sort fold needs to have a compare composition that can use the math expressions to evaluate a
// positive, negative, or neutral result to determine order of the items being sorted.
// The items being sorted may be primitive or complex data structures, i.e., undefined, null, boolean,
// number, string, (bigint, symbol,) object, array, (date, etc.)
// If a composition is provided, then it must be a compare composition.
// If `map` and `compare` compositions are provided, then

// If a single compsition is supplied, then it should be used as the compare function for the sort.
// If a mapsort is supplied with only a map, then a default sort function should be used.
// If a mapsort is supplied with only a sort, then a default map function should be used.
// If nothing is supplied, then a default map and sort function should be used.
// A map function should read state from each item in the array and map it to a new data structure
// to make the data easily comparable when sorting.
// A sort function should read state from two items in the array and compane them against each other.
// If the first is greater than the second, it should return a positive number; less, negative; equal, zero.

// This compare function receives the versions ideal for sorting returned by the map callback.
// If omitted, the versions ideal for sorting returned by the map callback are converted to strings and
// the elements are sorted according to the Unicode code point values of the characters of those
// converted "sortable" values.

// instance === null; JSON.stringify(null) => 'null'
// typeof instance === "undefined"; JSON.stringify(undefined) => undefined
// typeof instance === "function"; JSON.stringify(() => undefined) => undefined
// typeof instance === "symbol"; JSON.stringify(Symbol.for('')) => undefined
// typeof instance === "bigint"; JSON.stringify(0n) => TypeError: Do not know how to serialize a BigInt
// typeof instance === "boolean"; JSON.stringify(true) => 'true'
// typeof instance === "number"; JSON.stringify(0) => '0'
// typeof instance === "string"; JSON.stringify("") => '""'
// typeof instance === "object"; {}, [], new Date();
// JSON.stringify({}) => '{}';
// JSON.stringify([]) => '[]';
// JSON.stringify(new Date()) => '"2020-12-20T20:40:28.582Z"'

// If either operand evaluates to an object, then that object is converted to a primitive value.
// If both operands are strings, the two strings are compared.
// If at least one operand is not a string, both operands are converted to numbers and compared numerically.

// "$compare": [
//     {
//         "$compose": "create",
//         "$value": {
//             "one": {"$compose": "read", "$value": "$.item.one.value", "$default": 0},
//             "two": {"$compose": "read", "$value": "$.item.two.value", "$default": 0}
//         }
//     },
//     {"$compose": "math", "$value": "two - one", "$default": 0}
// ],
// "$compare": {
//     '$compose': 'compare',
//     '$value': {
//         '$one': {"$compose": "read", "$value": "$.item.one.value", "$default": 0},
//         '$two': {"$compose": "read", "$value": "$.item.two.value", "$default": 0},
//         '$order': 'descending'
//     },
//     '$default': 0
// }
// "$value": [
//     {
//         "$compose": "create",
//         "$value": {
//             "one": {"$compose": "read", "$value": "$.item.one.value.vote_average", "$default": 0},
//             "two": {"$compose": "read", "$value": "$.item.two.value.vote_average", "$default": 0}
//         }
//     },
//     {"$compose": "math", "$value": "two - one", "$default": 0}
// ]

// console.log(composeFromValue([
//     {
//         '$compose': 'create',
//         '$value': {
//             '$one': {'$compose': 'create', '$value': 100},
//             '$two': {'$compose': 'create', '$value': 101},
//             '$order': 'descending'
//         }
//     },
//     {'$compose': 'compare', '$default': 0}
// ]));
// console.log(composeFromValue([
//     {
//         '$compose': 'create',
//         '$value': {
//             '$one': {'$compose': 'create', '$value': "xavier"},
//             '$two': {'$compose': 'create', '$value': "tahmouch"},
//             '$order': 'descending'
//         }
//     },
//     {'$compose': 'compare', '$default': 0}
// ]));
// console.log(composeFromValue({'$compose': 'compare', '$value': {'$one': Symbol.for('symbol1'), '$two': Symbol.for('symbol2')}, '$default': 0}));
// console.log(composeFromValue({'$compose': 'compare', '$value': {'$one': false, '$two': true}, '$default': 0}));
// console.log(composeFromValue({'$compose': 'compare', '$value': {'$one': 0, '$two': 1}, '$default': 0}));
// console.log(composeFromValue({'$compose': 'compare', '$value': {'$one': '0', '$two': '1'}, '$default': 0}));
// console.log(composeFromValue({'$compose': 'compare', '$value': {'$one': () => undefined, '$two': () => undefined}, '$default': 0}));
// console.log(composeFromValue({'$compose': 'compare', '$value': {'$one': null, '$two': undefined}, '$default': 0}));
// console.log(composeFromValue({'$compose': 'compare', '$value': {'$one': [], '$two': {}}, '$default': 0}));
// console.log(composeFromValue({'$compose': 'compare', '$value': {'$one': [0, 1], '$two': [1, 0]}, '$default': 0}));
// console.log(composeFromValue({'$compose': 'compare', '$value': {'$one': {'key1': 0, 'key2': 1}, '$two': {'key2': 1, 'key1': 0}}, '$default': 0}));
// console.log(composeFromValue({
//     '$compose': 'compare',
//     '$type': 'date',
//     '$value': {
//         '$one': '2020-12-21T20:09:14.308Z',
//         '$two': '2020-12-21T20:09:14.309Z'
//     },
//     '$default': 0
// }));
// console.log(composeFromValue({
//     '$compose': 'compare',
//     '$type': 'locale',
//     '$value': {'$one': 'ä', '$two': 'z', '$order': 'ascending'},
//     '$default': 0
// }));
// console.log(composeFromValue({
//     '$compose': 'compare',
//     '$value': {
//         '$one': [{"0": 0, "fuck": [{"0": 0, "fuck": []}]}],
//         '$two': [{"fuck": [{"fuck": [], "0": 0}], "0": 0}]
//     },
//     '$default': 0
// }));

// console.log(composeFromValue([
//     {
//         $compose: "create",
//         // $value: [9,8,7,6,5,4,3,2,1,0],
//         $value: [
//             {surname: "z", name: "z"},
//             {surname: "tahmouch", name: "tony"},
//             {surname: "xavier", name: "charles"}
//         ],
//         // $value: ["9","8","7","6","5","4","3","2","1","0"],
//         // $value: [
//         //     "2020-12-21T20:09:14.309Z",
//         //     "2020-12-21T20:09:14.308Z",
//         //     "2020-12-21T20:09:14.307Z",
//         //     "2020-12-21T20:09:14.300Z"
//         // ]
//     },
//     {
//         $compose: "fold",
//         $type: "sort",
//         $value: {
//             // $map: [
//             //     {
//             //         "$compose": "create",
//             //         "$value": {"one": {"$compose": "read", "$value": "$.item.value", "$default": 0}}
//             //     },
//             //     {"$compose": "math", "$value": "one * PI", "$default": 0}
//             // ],
// $map: {"$compose": "read", "$value": "$.item.value.surname", "$default": ""},
// $compare: {"$compose": "compare", "$value": {"$order": "ascending"}, "$default": 0}
//             $map: [
//                 {
//                     $compose: "create",
//                     $value: {
//                         "name": {"$compose": "read", "$value": "$.item.value.name", "$default": ""},
//                         "surname": {"$compose": "read", "$value": "$.item.value.surname", "$default": ""}
//                     }
//                 },
//                 {$compose: "expand", $value: "{surname},{name}"}
//             ],
//             // $compare: {
//             //     $compose: "compare",
//             //     $type: "lexical",
//             //     $value: {
//             //         $one: [
//             //             {
//             //                 $compose: "create",
//             //                 $value: {
//             //                     "name": {"$compose": "read", "$value": "$.item.one.value.name", "$default": ""},
//             //                     "surname": {"$compose": "read", "$value": "$.item.one.value.surname", "$default": ""}
//             //                 }
//             //             },
//             //             {$compose: "expand", $value: "{surname},{name}"}
//             //         ],
//             //         $two: [
//             //             {
//             //                 $compose: "create",
//             //                 $value: {
//             //                     "name": {"$compose": "read", "$value": "$.item.two.value.name", "$default": ""},
//             //                     "surname": {"$compose": "read", "$value": "$.item.two.value.surname", "$default": ""}
//             //                 }
//             //             },
//             //             {$compose: "expand", $value: "{surname},{name}"}
//             //         ],
//             //         $order: "ascending"
//             //     }
//             // }
//         },
//         $default: []
//     }
// ]));
