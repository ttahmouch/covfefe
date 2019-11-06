+ Document
	+ Interpolators
	+ Comparators
	+ Selectors
	+ Actions
+ Make JSON Schemas FCCs, i.e., describe them in the app declaration.
+ something
+ something
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
 
 Support retrieval of data and view together or separately, i.e., download view and then download data, download view with data, download view for existing data.
 Static View - Embedded State: <div data-state-value={"Embedded State"}>Embedded State</div>
 Static View - Existing State: <div data-event="onNoState?" data-action="read" data-state="state">Embedded State</div>
 Dynamic View - Embedded State: <FlatList data-state-value={[]} data-bind-state="data"/> // How to handle the recycled view?
 Dynamic View - Existing State: <FlatList data-event="onNoState?" data-action="read" data-state="state" data-bind-state="data"/> // How to handle the recycled view?
 
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