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
// I completely forgot that functions are being parsed from a JSON string meaning that's why they won't
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
    "$state": {"composed": {"something": "test"}}
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
//         '$one': [{"0": 0, "test": [{"0": 0, "test": []}]}],
//         '$two': [{"test": [{"test": [], "0": 0}], "0": 0}]
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

// const listener = (event) => {
//     const dispatch = eventDispatcherForStore(store);
//
//     return dispatch({"$event": "on_logo_click", "preventDefault": () => undefined});
// };
//
// window.addEventListener("load", listener);
// window.addEventListener("DOMContentLoaded", listener);

/**
 TT | Replacing JS Functional Component `SearchRow` with a declarative JSX element for the repeated search results.

 + Previously, the `SearchRow` component was needed to do an array filter before rendering the search results.
 Now, filter, map, reduce, and various other array folding operations have been built in a declarative way.
 `map`, `filter`, `sort` have been used to filter only TV Shows and Movies from TMDB API results and sort them
 descendingly by rating when rendering declaratively.
 */

----------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * S.A.V.E.
 * STORE/STATE - ACTIONS, COMPONENTS, STATES, STYLES, VIEWS
 * ACTION -
 * VIEW -
 * EVENT - LOAD, CLICK, SUBMIT, etc. emitted upstream from VIEW, RESPONSE, etc.
 */

import {composition} from "../../../imperative/app/composers";

/**
 * MAPS -
 * INPUT STATE types can be BOOL, NUMBER, STRING, NULL, UNDEFINED, SYMBOL, OBJECT, ARRAY.
 * OUTPUT STATE types can be BOOL, NUMBER, STRING, NULL, UNDEFINED, SYMBOL, OBJECT, ARRAY.
 *
 * PREDICATES/INDICATORS -
 * INPUT STATE types can be BOOL, NUMBER, STRING, NULL, UNDEFINED, SYMBOL, OBJECT, ARRAY.
 * OUTPUT STATE types can be BOOL.
 *
 * INTERPOLATORS -
 * INPUT STATE types can be BOOL, NUMBER, STRING, NULL, UNDEFINED, SYMBOL, OBJECT, ARRAY.
 * OUTPUT STATE types can be STRING.
 */

const action = {$type: 'create_primitive', $value: 0};
const action = {$type: 'read_primitive'};
const action = {$type: 'update_primitive', $value: 0};
const action = {$type: 'delete_primitive'};
const action = {$type: 'create_object_property', $value: 0};
const action = {$type: 'read_object_property', $value: 0};
const action = {$type: 'update_object_property', $value: 0};
const action = {$type: 'delete_object_property', $value: 0};
const predicate = (value, index, array) => true;
const action = {
    $type: 'patch_object_property',
    $value: [
        ({value, index, array, app, view, response}) => value,
        ({value, index, array, app, view, response}) => value
    ]
};

// [item].map().find(() =>)

// Compose an ACTION.
const composer = {
    $compose: [
        {$type: "create", $value: {}},
        {$type: "update", $path: "$['$type']", $value: "create_primitive"},
        {
            $type: "update", $path: "$['$value']", $value: {
                $compose: [
                    {$type: "create", $value: "State: {state}"},
                    {$type: "interpolate", $value: {state: {$compose: [{$type: "read", $path: "$['app']['state']"}]}}}
                ]
            }
        },
        {
            "$type": "update", "$path": "$['composed']['three']",
            "$value": {
                "$compose": [
                    {"$type": "read", "$value": "$['app']['title']"}
                ]
            }
        }
    ]
};

const composer = {
    $compose: [
        ({app: {state = ''} = {}, view = {}, response = {}, compose = {}}) => ({...compose, $type: "create_primitive", $value: `State: ${state}`})
    ]
};

const actions = [
    {
        "$type": "update_title", $value: {
            $compose: [
                ({app: {title = ''} = {"title": ""}, compose = title}) => compose
            ]
        }
    },
    {
        "$type": "update_title",
        $value: {
            $compose: [
                ({view: {title: [title = '']} = {"title": [""]}, compose = title}) => compose
            ]
        }
    }
];

// Compose a REQUEST.
// const composer = {
//     $compose: [
//         {$type: "create", $value: {}},
//         {
//             $type: "update", $path: "$['$uri']", $value: {
//                 $compose: [
//                     {$type: "create", $value: "/{path}"},
//                     {$type: "interpolate", $}
//                 ]
//             }
//         },
//         ({app = {}, view = {}, response = {}, compose = {}}) => ({...compose, "$uri": "/"}),
//     ]
// };

// const action = {
//     "$actions": [{"$type": "sync_on_read_titles_dictionary_request"}]
// };

const action = {
    // "$request": [({app = {}, view = {}, response = {}}) => ({"$uri": "titlesDictionary.json"})],
    // "$request": ({app = {}, view = {}, response = {}}) => ({"$uri": "titlesDictionary.json"}),
    "$comments": [
        "Remember to replace comparators, declarators, interpolators, reducers, and selectors with composers.",
        "data-style|state|action|view are all selectors.",
        "data-compare? will eventually be a comparator used for routing.",
        "A way to bind composers as reducers needs to be added to the application state.",
        "Basic composition should be allowed by default for all state, but complex compisitions should be allowed through composer binding.",
        "The request from the root level down may be composed using a composition before the request is made.",
        "The root level may be an object or a composition. Properties like uri, headers, etc. may be literals or compositions.",
        "Compositions may be functional or declarative.",
        "The composed state and other state, e.g., app, view, response, etc. is passed to every composing function. The final output state is the composed state."
    ],
    "$actions": [{"$type": "sync_on_read_titles_dictionary_request"}],
    "$request": {
        "$uri": {
            "$compose": [
                {"$select": "$.title[0]", "$from": "view"},
                {"$interpolate": "/{path}", "$type": "uri"}
            ]
        },
        "$headers": {
            "custom": {
                "$compose": [
                    {"$select": "$.title[0]", "$from": "view"},
                    {"$interpolate": "{title}", "$type": "js"},
                ]
            }
        },
    },
    "$events?": [
        {"$type": "action-event", "$actions": []},
        {"$type": "request", "$actions": []},
        {"$type": "after-request", "$actions": []},
        {"$type": "submit", "$actions": [{"$type": "sync_on_read_titles_dictionary_request"}]},
        {"$type": "click", "$actions": []},
        {"$type": "load", "$actions": []},
        {"$type": "loadstart", "$actions": []},
        {"$type": "progress", "$actions": []},
        {"$type": "error", "$actions": []},
        {"$type": "abort", "$actions": []},
        {"$type": "timeout", "$actions": []},
        {"$type": "loadend", "$actions": []}
    ],
    "$events": [
        {"$type": "load", "$actions": [{"$type": "sync_on_load"}]},
        {"$type": "loadstart", "$actions": [{"$type": "sync_on_loadstart"}]},
        {"$type": "progress", "$actions": [{"$type": "sync_on_progress"}]},
        {"$type": "error", "$actions": [{"$type": "sync_on_error"}]},
        {"$type": "abort", "$actions": [{"$type": "sync_on_abort"}]},
        {"$type": "timeout", "$actions": [{"$type": "sync_on_timeout"}]},
        {"$type": "loadend", "$actions": [{"$type": "sync_on_loadend"}]}
    ],
    "$responses": [
        {
            "$status": 200,
            "$headers": {"content-type": "application[/]json"},
            "$body": {
                "$schema": "http://json-schema.org/schema#",
                "type": "object",
                "properties": {"titles": {"type": "array"}}
            },
            "$actions": [{"$type": "sync_on_read_titles_dictionary_response_status_200"}]
        }
    ]
};

const one = [
    {"$compose": "read", "$value": "$['response']['headers']['content-length']", "$default": "0"},
    {"$compose": "capture", "$value": "^([0-9]+)$", "$default": ["0"]},
    {"$compose": "read", "$value": "$['composed'][0]", "$default": "0"}
];

const two = [
    {"$default": {"status": 0, "headers": {}, "body": {}}, "$compose": "read", "$type": "jsonpath", "$value": "$['response']"},
    {"$default": false, "$compose": "compare", "$type": "jsonschema", "$value": {"$schema": "response_json_card_view_schema"}}
];

const three = [
    {
        "$default": {"one": "", "two": ""}, "$compose": "create",
        "$value": {
            "one": {"$default": "", "$compose": "read", "$type": "jsonpath", "$value": "$['view']['title'][0]"},
            "two": [
                {
                    "$default": {"one": "", "two": ""}, "$compose": "create",
                    "$value": {
                        "one": {"$default": "", "$compose": "read", "$type": "jsonpath", "$value": "$['view']['title'][0]"},
                        "two": {"$default": "", "$compose": "read", "$type": "jsonpath", "$value": "$['app']['states']['title']"}
                    }
                },
                {"$default": "", "$compose": "interpolate", "$type": "template", "$value": "{one}{two}"}
            ]
        }
    },
    {"$default": "", "$compose": "interpolate", "$type": "template", "$value": "{one}{two}"}
];

const four = [
    {"$default": {"path": "", "extension": ""}, "$compose": "create", "$value": {"path": "titlesDictionary", "extension": ".json"}},
    {"$default": "/", "$compose": "interpolate", "$type": "uritemplate", "$value": "/{path}{extension}"}
];

const five = [
    {"$default": {}, "$compose": "read", "$type": "jsonpath", "$value": "$['response']['body']"},
    {
        "$default": {"titles": [{"title": ""}, {"title": ""}]}, "$compose": "spread",
        "$value": {
            "$default": {"titles": [{"title": ""}, {"title": ""}]}, "$compose": "create",
            "$value": {
                "titles": [
                    {"$default": [], "$compose": "read", "$type": "jsonpath", "$value": "$['response']['body']['titles']"},
                    {
                        "$default": [{"title": ""}, {"title": ""}], "$compose": "spread",
                        "$value": {
                            "$default": [{"title": ""}, {"title": ""}], "$compose": "create",
                            "$value": [
                                {"title": {"$compose": "read", "$type": "jsonpath", "$value": "$['app']['states']['title']", "$default": ""}},
                                {"title": {"$compose": "read", "$type": "jsonpath", "$value": "$['view']['title'][0]", "$default": ""}}
                            ]
                        }
                    }
                ]
            }
        }
    }
];

setTimeout(() => {
    console.log(
        composition(
            // Boolean,Null,Undefined,Number,BigInt,String,Symbol
            1234567890,
            {"composed": undefined, "app": {}, "view": {}, "response": {}}
        )
    );

    console.log(
        composition(
            {"$compose": "read", "$type": "regular_expression", "$value": "^application[/](json)", "$default": "application/xml"},
            {"composed": "application/json;charset=utf8", "app": {}, "view": {}, "response": {"headers": {"content-type": "application/json;charset=utf8"}}}
        )
    );

    console.log(
        composition(
            ({composed = undefined, app = {}, view = {}, response = {}}) => composed * 2,
            {"composed": 1337, "app": {}, "view": {}, "response": {}}
        )
    );

    console.log(
        composition(
            [{"$compose": "read", "$type": "json_path", "$value": "$['response']['headers']['content-type']", "$default": "application/json"}],
            {"composed": undefined, "app": {}, "view": {}, "response": {"headers": {"content-type": "text/html"}}}
        )
    );

    console.log(
        composition(
            [({composed = undefined, app = {}, view = {}, response = {}}) => composed * 3],
            {"composed": 1337, "app": {}, "view": {}, "response": {}}
        )
    );

    console.log(
        composition(
            [
                {"$default": {"path": "", "extension": ""}, "$compose": "create", "$value": {"path": "titlesDictionary", "extension": ".json"}},
                ({composed = undefined, app = {}, view = {}, response = {}}) => composed,
                {"$default": "/", "$compose": "expand", "$type": "uri_template", "$value": "/{path}{extension}"}
            ],
            {"composed": undefined, "app": {}, "view": {}, "response": {}}
        )
    );

    console.log(
        composition(
            [
                {
                    "$default": {"one": "", "two": ""},
                    "$compose": "create",
                    "$value": {
                        "one": {"$default": "", "$compose": "read", "$type": "json_path", "$value": "$['view']['title'][0]"},
                        "two": [
                            {
                                "$default": {"one": "", "two": ""},
                                "$compose": "create",
                                "$value": {
                                    "one": {"$default": "", "$compose": "read", "$type": "json_path", "$value": "$['view']['title'][0]"},
                                    "two": {"$default": "", "$compose": "read", "$type": "json_path", "$value": "$['app']['title']"}
                                }
                            },
                            {"$default": "", "$compose": "expand", "$type": "template", "$value": "{one};{two}"}
                        ]
                    }
                },
                ({composed = undefined, app = {}, view = {}, response = {}}) => composed,
                {"$default": "", "$compose": "expand", "$type": "template", "$value": "{one};{two}"}
            ],
            {"composed": undefined, "app": {"title": "App Title"}, "view": {"title": ["View Title"]}, "response": {}}
        )
    );

    console.log(
        composition(
            [
                {"$compose": "read", "$type": "json_path", "$value": "$['response']['headers']['content-length']", "$default": "0"},
                ({composed = '0', app = {}, view = {}, response = {}}) => `${Math.ceil(Number(composed) / 256)}`,
                {"$compose": "read", "$type": "regular_expression", "$value": "^([0-9]+)$", "$default": ["0"]},
                ({composed: [composed] = ['0'], app: {some_string = '652'} = {}, view = {}, response = {}}) => `${composed}${some_string}`,
                {"$compose": "read", "$type": "json_path", "$value": "$['composed']", "$default": "1234567890"},
                ({composed = "1234567890", app = {}, view = {}, response = {}}) => composed
            ],
            {"composed": undefined, "app": {"some_string": '652'}, "view": {}, "response": {"headers": {"content-length": "65535"}}}
        )
    );
}, 0);

----------------------------------------------------------------------------------------------------------------------------------------------------------------

History: /path?query=query#fragment


**1st Example: Basic Routing**

```
When the <Route>'s path matches the current URL, it renders its children (your component).

// All route props (match, location and history) are available to User
function User({match, location, history}) {return <h1>Hello {match.params.username}!</h1>;}

Without Redux, the Router component likely connects to History state.
Without Redux, the Link component likely modifies the History state of the current Location.

The Switch Component makes it simpler to handle conditions for mutual exclusion, 
but also for prioritized routes, e.g., /home, /sign_in, /:route. 
Without Switch, /home and /sign_in would render at the same time if their routes were defined as /:route. 
It also makes it possible to render a 404 route easily because it doesn't have to have a path defined, 
which would normally make it always render if it was defined outside of a Switch, 
but inside the Switch it would only render if no other routes were matched to the location. 
The 404 route is complicated if needed to be addressed by it's own path because the resource would never be navigated to explicitly. 
It also can't be rendered as a peer of other routes because it would always render. It has to be rendered last.

`Sensitive`, `Strict`, `Exact` may be unnecessary as the `data-path` could have a RegExp alternative via the `data-if` 
with a composition, or something to the effect of `data-regexp`.

`render`, `component`, `children` functions may be unnecessary as `<Fragment data-view=""/>` allows you to reference 
an element formed of HOCs, and state doesn't need to be passed in via props because it can be referenced via `data-state`. 
That doesn't mean it's impossible to use a function though. 
`data-view` could dereference to `<Home/>` which would be a functional component that could still `useState` or `useDispatch`. 
The history is still accessible via action dispatching, and the location is still accessible from state selecting.

+ data-path [DONE]
+ data-regexp / data-path-type === "regular_expression" [DONE]
+ data-unless-path [DONE]
+ data-uri? data-path-query-fragment? [DONE]
+ match (Path Segments, Fragment) [DONE]

ReactDOM.render(
  <Router>
    <div>
      <Router>
        <Link to="/">Home</Link>
        <Switch>
          <Route path="/"><Home /></Route>
        </Switch>
        <Route exact strict sensitive path="/home"
               render={({match, location, history}) => <Home/>}
               component={Home}>
           <Home />
        </Route>
        <Route path={["/users/:id", "/profile/:id"]}
               render={({match, location, history}) => <User/>}
               children={({match, location, history}) => (
                   <Animate>{match && <User {...{location, history}}/>}</Animate>
               )}
               component={User}>
           <User />
        </Route>
      </Router>

      <a data-event="on_click_about" data-bind-event="onClick"/>
      {/** 
      Dispatch synchronous action that updates the route
      stack. When the application re-renders, consult the
      route stack with a composition, e.g., check the top
      of the route stack for a route, and conditionally
      display an element in the DOM.
      **/}
      <Fragment data-if="is_signed_in"><Dashboard/></Fragment>
      <Fragment data-unless="is_signed_in"><SignIn/></Fragment>
      <Fragment data-route="" />
    </div>
  </Router>,
  node
);
```

----------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * TODO:
 */
export const locales = [];

export default {
    back: {
        'en': {
            'US': '⬅',
            '*': '⬅'
        },
        'fr': {
            'CA': '⬅',
            '*': '⬅'
        },
        '*': {
            'CA': '⬅',
            '*': '⬅'
        }
    }
};

----------------------------------------------------------------------------------------------------------------------------------------------------------------

// /**
//  * Events are groups of synchronous or asynchronous actions, or other events.
//  * Events are arrays of sync and async actions, and possibly other events.
//  * Referenced actions should have some properties transferred, e.g., if, unless, etc.
//  *
//  */

// const test = [
//     {
//         "$action": "request_json_card_view"
//     },
//     {
//         "$action": "request_json_card_view"
//         // Asynchronous action dereferenced.
//     },
//     {
//         "$action": "update",
//         "$path": "$['$states']['loading']",
//         "$value": false
//         // Basic synchronous action.
//     },
//     {
//         "$action": "update",
//         "$path": "views.card",
//         "$value": {
//             "$default": {"type": "div"},
//             "$compose": "read",
//             "$type": "jsonpath",
//             "$value": "$['response']['body']"
//         },
//         "$if": {
//             "$default": false,
//             "$compose": "is_response_json_card_view"
//         }
//         // Synchronous action with value and if conditional composition.
//     },
//     {
//         "$action": "update",
//         "$path": "states.error",
//         "$value": true,
//         "$unless": {
//             "$default": true,
//             "$compose": "is_response_json_card_view"
//         }
//         // Synchronous action with unless conditional composition.
//     },
//     {
//         "$action": "request_titles_dictionary",
//         "$if": {
//             "$compose": "is_title",
//             "$default": false
//         }
//         // Asynchronous action dereferenced, and conditionally dispatched.
//     }
// ];

----------------------------------------------------------------------------------------------------------------------------------------------------------------

console.log(serializeJson(composeFromValue([
    {'$compose': 'create', '$value': {'$compose': 'create', '$value': {'one': 'ä'}}}
])));
console.log(serializeJson(composeFromValue([
    [
        {'$compose': 'create', '$value': {'one': 'ä'}},
        {'$compose': 'spread', '$value': {'two': 'z', 'three': {'$compose': 'create', '$value': 'ä'}}}
    ]
])));
console.log(serializeJson(composeFromValue([
    [
        {'$compose': 'create', '$value': "fuck"},
        {"$compose": "read", "$value": {'$compose': 'create', '$value': "$.composed"}}
    ]
])));
console.log(serializeJson(composeFromValue([
    [
        {'$compose': 'create', '$value': "fuck"},
        {"$compose": "read", "$type": "regular_expression", "$value": {'$compose': 'create', '$value': "^(fu).*$"}}
    ]
])));
console.log(serializeJson(composeFromValue([
    [
        {'$compose': 'create', '$value': "/fuck/fuck"},
        {"$compose": "read", "$type": "path_template", "$value": {'$compose': 'create', '$value': "/:fuck1/:fuck2"}}
    ]
])));
console.log(serializeJson(composeFromValue([
    [
        {'$compose': 'create', '$value': {"one": 1, "two": 2}},
        {"$compose": "math", "$value": {'$compose': 'create', '$value': "two + one"}, "$default": 0}
    ]
])));
console.log(serializeJson(composeFromValue([
    [
        {'$compose': 'create', '$value': [0, 1, 2, 3, 4]},
        {
            "$compose": "fold", "$type": "flat_map", "$default": [],
            "$value": [
                {'$compose': 'create', '$value': {"item": {"$compose": "read", "$value": "$.item.value", "$default": 0}}},
                {"$compose": "math", "$value": "item + 2", "$default": 0}
            ]
        }
    ]
])));
console.log(serializeJson(composeFromValue([{
    '$compose': 'compare',
    '$type': 'date',
    '$value': {
        '$one': {'$compose': 'create', '$value': '2020-12-21T20:09:14.308Z'},
        '$two': {'$compose': 'create', '$value': '2020-12-21T20:09:14.308Z'}
    },
    '$default': 0
}])));
console.log(serializeJson(composeFromValue([
    {"$compose": "create", "$value": [{"vin": "1234567890", "account": {"id": "1"}}]},
    {"$compose": "match", "$value": {"$compose": "create", "$value": [{"vin": "1234567890", "account": {"id": "0"}}]}}
])));
console.log(serializeJson(composeFromValue([
    {"$compose": "create", "$value": "/fuck/fuck/fuck"},
    {"$compose": "match", "$type": "path_template", "$value": {"$compose": "create", "$value": "/:fuck/:fuck"}}
])));
console.log(serializeJson(composeFromValue([
    {"$compose": "create", "$value": "/fuck/fuck/fuck"},
    {"$compose": "match", "$type": "regular_expression", "$value": {"$compose": "create", "$value": "^[/]fuck[/]fuck[/]fuc$"}}
])));
console.log(serializeJson(composeFromValue([
    {"$compose": "create", "$value": "/fuck/fuck/fuck"},
    {
        "$compose": "match", "$type": "json_schema",
        "$value": {"$compose": "create", "$value": {"type": "string", "pattern": "^[/]fuck[/]fuck[/]fuck$"}}
    }
])));
console.log(serializeJson(composeFromValue([
    {"$compose": "create", "$value": {"name": "tony", "surname": "tahmouch"}},
    {"$compose": "expand", "$type": "template", "$value": {"$compose": "create", "$value": "{surname},{name}"}}
])));
console.log(serializeJson(composeFromValue([
    {"$compose": "create", "$value": {"name": "tony", "surname": "tahmouch"}},
    {"$compose": "expand", "$type": "uri_template", "$value": {"$compose": "create", "$value": "/{surname}/{name}"}}
])));
console.log(serializeJson(composeFromValue([
    {"$compose": "create", "$value": {"name": "tony", "surname": "tahmouch"}},
    {"$compose": "expand", "$type": "path_template", "$value": {"$compose": "create", "$value": "/:surname/:name"}}
])));
console.log(serializeJson(composeFromValue([
    {"$compose": "encode", "$type": "json", "$value": {"$compose": "create", "$value": {"name": "tony"}}}
])));
console.log(serializeJson(composeFromValue([{
    "$compose": "encode", "$type": "uri",
    "$value": {
        "hash": {"$compose": "create", "$value": "#final"},
        "host": "www.google.com:444",
        "hostname": "www.final.com",
        "password": "final",
        "pathname": "/final",
        "port": "777",
        "protocol": "http:",
        "search": "?fuck1=true&fuck2=false",
        "searchParams": {"final1": "true", "final2": "false"},
        "username": "final"
    }
}])));
console.log(serializeJson(composeFromValue([
    {"$compose": "decode", "$type": "json", "$value": {"$compose": "create", "$value": "{\"name\":\"tony\"}"}}
])));
console.log(serializeJson(composeFromValue([
    {"$compose": "decode", "$type": "uri", "$value": {"$compose": "create", "$value": "https://user:pass@www.google.com:444/fuck?fuck1=true&fuck2=false#fuck"}}
])));

console.log(composeFromValue([
    [
        {"$compose": "create", "$value": "https://user:pass@www.google.com:444/fuck?fuck1=true&fuck2=false#fuck"},
        {"$compose": "decode", "$type": "uri"},
        {"$compose": "spread", "$value": {"pathname": "/shit/fuck/balls"}},
        {"$compose": "encode", "$type": "uri"}
    ]
]));
console.log(composeFromValue([
    [
        {"$compose": "decode", "$type": "uri", "$value": "/fuck?fuck1=true&fuck2=false#fuck"},
        {"$compose": "spread", "$value": {"pathname": "/shit/fuck/balls"}},
        {"$compose": "encode", "$type": "uri"}
    ]
]));

console.log(serializeJson(composeFromValue([{"$compose": "read", "$value": "@throw()"}])));
console.log(serializeJson(composeFromValue([{"$compose": "read", "$type": "path_template", "$value": "?throw"}])));
console.log(serializeJson(composeFromValue([{"$compose": "math", "$value": "throw", "$default": 0}])));
console.log(serializeJson(composeFromValue([{"$compose": "match", "$type": "path_template", "$value": "?throw"}])));
console.log(serializeJson(composeFromValue([{"$compose": "match", "$type": "json_schema", "$value": {"type": "throw"}}])));
console.log(serializeJson(composeFromValue([{"$compose": "expand", "$type": "uri_template", "$value": "{throw"}])));
console.log(serializeJson(composeFromValue([{"$compose": "expand", "$type": "path_template", "$value": "?throw"}])));
console.log(serializeJson(composeFromValue([{"$compose": "decode", "$type": "json", "$value": "throw"}])));

console.assert(composeFromValue({"$compose": "create"}) === undefined);
console.assert(Object.keys(composeFromValue({"$compose": "spread"})).length === 0);
console.assert(composeFromValue({"$compose": "read"}) === undefined);
console.assert(composeFromValue({"$compose": "read", "$type": "regular_expression"})[0] === "");
console.assert(Object.keys(composeFromValue({"$compose": "read", "$type": "path_template"})).length === 0);
console.assert(composeFromValue({"$compose": "math"}) === undefined);
console.assert(composeFromValue({"$compose": "fold", "$type": "every"}) === true);
console.assert(composeFromValue({"$compose": "fold", "$type": "filter"}).length === 0);
console.assert(composeFromValue({"$compose": "fold", "$type": "find"}) === undefined);
console.assert(composeFromValue({"$compose": "fold", "$type": "flat_map"}).length === 0);
console.assert(composeFromValue({"$compose": "fold", "$type": "map"}).length === 0);
console.assert(composeFromValue({"$compose": "fold", "$type": "some"}) === false);
console.assert(composeFromValue({"$compose": "fold", "$type": "sort"}).length === 0);
console.assert(composeFromValue({"$compose": "fold", "$type": "reduce_right"}) === null);
console.assert(composeFromValue({"$compose": "fold", "$type": "reduce"}) === null);
console.assert(composeFromValue({"$compose": "compare"}) === 0);
console.assert(composeFromValue({"$compose": "compare", "$type": "date"}) === 0);
console.assert(composeFromValue({"$compose": "compare", "$type": "locale"}) === 0);
console.assert(composeFromValue({"$compose": "match"}) === true);
console.assert(composeFromValue({"$compose": "match", "$type": "path_template"}) === true);
console.assert(composeFromValue({"$compose": "match", "$type": "json_schema"}) === true);
console.assert(composeFromValue({"$compose": "match", "$type": "regular_expression"}) === true);
console.assert(composeFromValue({"$compose": "expand"}) === "");
console.assert(composeFromValue({"$compose": "expand", "$type": "path_template"}) === "");
console.assert(composeFromValue({"$compose": "expand", "$type": "uri_template"}) === "");
console.assert(composeFromValue({"$compose": "decode", "$type": "uri"}).href === "http://localhost:3000/");
console.assert(composeFromValue({"$compose": "decode"}) === null);
console.assert(composeFromValue({"$compose": "encode", "$type": "uri"}) === "http://localhost:3000/");
console.assert(composeFromValue({"$compose": "encode"}) === "null");

console.assert(composeFromValue([
    {"$compose": "create", "$value": [0]},
    {"$compose": "fold", "$type": "every", "$value": {"$compose": "create", "$value": false}}
]) === false);
console.assert(composeFromValue([
    {"$compose": "create", "$value": [0]},
    {"$compose": "fold", "$type": "filter", "$value": {"$compose": "create", "$value": true}}
]).length === 1);
console.assert(composeFromValue([
    {"$compose": "create", "$value": [0]},
    {"$compose": "fold", "$type": "find", "$value": {"$compose": "create", "$value": true}}
]) === 0);
console.assert(composeFromValue([
    {"$compose": "create", "$value": [0]},
    {"$compose": "fold", "$type": "flat_map", "$value": {"$compose": "create", "$value": true}}
])[0] === true);
console.assert(composeFromValue([
    {"$compose": "create", "$value": [0]},
    {"$compose": "fold", "$type": "map", "$value": {"$compose": "create", "$value": true}}
])[0] === true);
console.assert(composeFromValue([
    {"$compose": "create", "$value": [0]},
    {"$compose": "fold", "$type": "some", "$value": {"$compose": "create", "$value": true}}
]));
console.assert(composeFromValue([
    {"$compose": "create", "$value": [0, 1]},
    {"$compose": "fold", "$type": "sort", "$value": {"$compose": "create", "$value": -1}}
])[0] === 1);
console.assert(composeFromValue([
    {"$compose": "create", "$value": [0]},
    {"$compose": "fold", "$type": "reduce_right", "$value": {"$compose": "create", "$value": 1337}}
]) === 1337);
console.assert(composeFromValue([
    {"$compose": "create", "$value": [0]},
    {"$compose": "fold", "$type": "reduce", "$value": {"$compose": "create", "$value": 1337}}
]) === 1337);

// case "create":✅
// case "spread":✅
// case "read":✅
//  case "path_template":✅
//  case "regular_expression":✅
//  case "json_path":✅
// case "math":✅
// case "fold":✅
//  case "every":✅
//  case "filter":✅
//  case "find":✅
//  case "flat_map":✅
//  case "map":✅
//  case "some":✅
//  case "sort":✅
//  case "reduce_right":✅
//  case "reduce":✅
// case "compare":✅
// case "match":✅
//  case "path_template":✅
//  case "json_schema":✅
//  case "regular_expression":✅
//  case "primitive":✅
// case "expand":✅
//  case "path_template":✅
//  case "uri_template":✅
//  case "template":✅
// case "encode":✅
//  case "uri":✅
//  case "json":✅
// case "decode":✅
//  case "uri":✅
//  case "json":✅


/**
 * Mutually exclusive
 * Specificity
 *
 * # Single
 * {$compose: "create", $value: 'rgba(0,0,0,0)', $if: "is_scrolling"} // 'rgba(0,0,0,0)' if scrolling; else undefined.
 *
 * {$compose: "create", $value: 'rgba(0,0,0,1)', $unless: "is_scrolling"} // 'rgba(0,0,0,1)' if not scrolling; else undefined.
 *
 * # Multiple; Mutual Exclusion.
 * [
 *   {$compose: "create", $value: 'rgba(0,0,0,0)', $if: "is_scrolling"},
 *   {$compose: "create", $value: 'rgba(0,0,0,1)', $unless: "is_scrolling"}
 * ] // 'rgba(0,0,0,0)' if scrolling; else 'rgba(0,0,0,1)' if not scrolling.
 *
 * [
 *   {$compose: "create", $value: 'rgba(0,0,0,0)'},
 *   {$compose: "create", $value: 'rgba(0,0,0,1)', $unless: "is_scrolling"}
 * ] // 'rgba(0,0,0,0)' if scrolling; else 'rgba(0,0,0,1)'
 *
 * [
 *   {$compose: "create", $value: 'rgba(0,0,0,1)'},
 *   {$compose: "create", $value: 'rgba(0,0,0,0)', $if: "is_scrolling"}
 * ] // 'rgba(0,0,0,0)' if scrolling; else 'rgba(0,0,0,1)'
 *
 * [
 *   {$compose: "create", $value: 'black'},
 *   {$compose: "create", $value: 'red', $if: "is_stopping"},
 *   {$compose: "create", $value: 'yellow', $if: "is_slowing"},
 *   {$compose: "create", $value: 'green', $if: "is_starting"}
 * ] // is black by default; red is stopping; yellow if slowing; green if going;
 * (Think Switch Cases; Specificity matters hence the default case being first
 * otherwise it would always be black.)
 */

/**
 * Shorthand
 *
 * {$type: "br"}
 * {$children: []} // Fragment
 * {$type: "div", onClick: "", $children: []}
 * {$type: "input", type: "text"}
 *
 * Longhand
 *
 * {type: "br"}
 * {props: {children: []}} // Fragment
 * {type: "div", props: {onClick: "", children: []}}
 * {type: "input", props: {type: "text"}}
 */
