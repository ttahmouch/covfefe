# Backlog

+ ❌ Triage this list and categorize them logically instead of just by importance.
+ ❌ Grab all comments from the code that are TODO-ish and consolidate them here.
+ ❌ Organize the "imperative" library code into a react library that can be published to NPM with `create-react-library`.
+ ❌ Port "netflux" to the library as a sample application that uses it.
+ ❌ Write unit and integration tests. Not a lot of them though.
+ ❌ Write documentation. Not a lot of it though.
+ ❌ Write a series of blog posts about the motives and the implementation.
     Derive it from the documentation. Discuss things like functional core; imperative shell, state management, no state mutation, etc.
+ ❌ Extract library to NPM to get people using it.
+ ❌ Make a shorthand notation for composers? `{$read:"$.state"}`
+ ❌ Make a shorthand notation for reading state into templates? `{$compose:"expand", $value:"/path/{$.state}"}`
+ ❌ Make a `$debug` property that can be added to any composable object to dynamically add a breakpoint to the runtime.
+ ❌ Make a way to handle Media Types and Media Features like CSS, but in the JSON declarative structure to add future support for RN.
     (Consider that `onResize` may have to update redux state for the elements to re-render with correct styles applied.)
     https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
     https://medium.com/@wcandillon/responsive-uis-in-react-native-a406b5d6c36a
     https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event

+ ❌ Support data-event="onLayout".
+ ❌ Wrap all composers in a general try/catch.
+ ❌ Compose the `data-event-delay[-type]`.
+ ❌ Support accessibility with multi-prop `data-state` for aria props and `aria` or `i18n` declarations.
+ ❌ Support internationalization with multi-prop `data-state` for state props and `i18n` declarations.
+ ❌ Support Expanding Templates For Props Other Than Children, e.g., data-state-template.
+ ❌ Support Encoding JSON Values From State.
+ ❌ Thunks (Arbitrary Asynchronous Actions, i.e., not HTTP)
+ ❌ Return app JSON from a server and reduce it in the client.
+ ❌ Implement CRUD reducers as composers;
+ ❌ Implement JS Object methods from snake to camel case for all methods, e.g., String.prototype.includes, etc.
+ ❌ Support reducing sub-level state, e.g., "movie": {"id": 0, "title": "title"}.
+ ❌ Support Array Higher-Order Folding Functions in Reducers.
+ ❌ Add map, reduce, filter, etc. to reducers.
+ ❌ Support conditional from events for cases like response status codes where you don't know what you're expecting, e.g., `500`.

+ ❌ Improve JSON JSX format, or allow XML to be used instead.
+ ❌ Aborting HTTP Requests.
+ ❌ Animations
+ ❌ Support embedding composers inside types like styles instead of generating styles from composers.
+ ❌ Make input state from input fields with unique names not get provided in an array.
+ ❌ Create convenience for managing query parameter expansion for a request composer?
+ ❌ Check the order of the composition when recursively composing is `json_component` composition.
+ ❌ Add FlatList equivalent for dynamic list elements.
+ ❌ Add support for data-id to allow click events on items in a list to uniquely identify the item.
+ ❌ Start trying to add event handlers for things like the Modal Dialog.
+ ❌ Support data-style with className+CSS.
+ ❌ Support state cascading from ancestor to child view elements, e.g., "FlatList-like."
+ ❌ getState doesn't appear to be getting the latest state between actions in an event.
+ ❌ Organize the categories into the same model in the store state, and map them with a "FlatList."
+ ❌ Store state as value attributes in any element that can be read from during an event.
+ ❌ Make `data-state-repeat=true` the default way to handle arrays.
+ ❌ Blog, Vlog, Pinterest, Etsy, 3d Print,
+ ❌ Don't traverse `data-view` twice when the dereferenced view is a `data-state-repeat` with a template child element.
+ ❌ Support `data-memo` to Memoize Views?
