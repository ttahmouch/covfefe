# Product Backlog

+ ✅ Implement HTTP Response Mocking.
+ ✅ Routing
+ ✅ Debug using Redux Dev Tools.
+ ✅ Should redux-devtools-extension be a dependency of the app or lib?
+ ✅ Netflux Clone.
+ ✅ Call view state that the user enters, e.g., form submit, scroll coordinate, etc, `user` state.
+ ✅ Call view state that the user does not enter, e.g., state selected from the app state, `view` state.
+ ✅ Consolidate Header and Modal Style into Background Image Style.
+ ✅ Change all JSON Paths in the framework to use dot notation instead of subscript notation.
+ ✅ Allow subviews to select from the view state of the super view; Allow array state to bind to repeatable views.
+ ✅ Support JSON Path in data-state like data-if-path.
+ ✅ Warning: Invalid attribute name: ``
+ ✅ Implement mapsort composer;
+ ✅ Implement compare composer;
+ ✅ Implement math composer;
+ ✅ Support Array Higher-Order Folding Functions in Composers.
+ ✅ Add map, reduce, filter, etc. to composers.
+ ✅ Support `onLoad` event binding.
+ ✅ Support onScroll, onRender (DOMContentLoaded, onLoad), etc.
+ ✅ Animate the navigation bar on scroll to show it as an example.
+ ✅ Detect onScroll and hide/show the navigation bar background.
+ ✅ Implement the same `data-*` props in the HTTP cases since those are not DOM nodes.
+ ✅ Debounce or throttle all events by default, and make it optional to avoid.
+ ✅ Utilize the JSONPath selectors instead of having custom code for selecting input `onChange` of text.
+ ✅ Support create composer in all the other composers for the value property to make them more useful.
+ ✅ Support default composed values in case someone tried to compose an undefined incoming value.
+ ✅ Wrap specific composers in a try/catch just in case some of the dependencies of the composers throw unexpected exceptions, e.g., URITemplate/Path Template.
+ ❌ 🏆 Compose conditional expressions, i.e., match, AND, OR, XOR, etc., and return a value from the condition.
             Leverage the conditional composers for things like the nav bar alpha.
+ ❌ 🏆 Support literal create composer type to support arrays that are not compositions.
+ ❌ 🏆 Support multi-prop state binding for `data-style`, `data-state`, `data-event`.
             Support Binding Multiple Props From State, e.g., children and value.
             Allow `data-multi-state` to bind `{"value": "User Input", "placeholder": "Movie Title,..."}` without a single `data-bind="value"`?
+ ❌ Support data-event="onLayout".
+ ❌ Wrap all composers in a general try/catch.
+ ❌ Compose the `data-event-delay[-type]`.

## Important

+ ❌ Triage this list and categorize them logically instead of just by importance.
+ ❌ Grab all comments from the code that are TODO-ish and consolidate them here.
+ ❌ Organize the "imperative" library code into a react library that can be published to NPM with `create-react-library`.
+ ❌ Port "netflux" to the library as a sample application that uses it.
+ ❌ Write unit and integration tests. Not a lot of them though.
+ ❌ Write documentation. Not a lot of it though.
+ ❌ Write a series of blog posts about the motives and the implementation.
     Derive it from the documentation. Discuss things like functional core; imperative shell, state management, no state mutation, etc.
+ ❌ Extract library to NPM to get people using it.

+ ❌ Support accessibility with multi-prop `data-state` for aria props and `aria` or `i18n` declarations.
+ ❌ Support internationalization with multi-prop `data-state` for state props and `i18n` declarations.
+ ❌ Support Expanding Templates For Props Other Than Children, e.g., data-state-template.
+ ❌ Support Encoding JSON Values From State.
+ ❌ Thunks (Arbitrary Asynchronous Actions, i.e., not HTTP)
+ ❌ Action Sequences
+ ❌ Return app JSON from a server and reduce it in the client.
+ ❌ Implement CRUD reducers as composers;
+ ❌ Implement JS Object methods from snake to camel case for all methods, e.g., String.prototype.includes, etc.
+ ❌ Support reducing sub-level state, e.g., "movie": {"id": 0, "title": "title"}.
+ ❌ Support Array Higher-Order Folding Functions in Reducers.
+ ❌ Add map, reduce, filter, etc. to reducers.
+ ❌ Support conditional from events for cases like response status codes where you don't know what you're expecting, e.g., `500`.

## Not Important

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
+ ❌ Support Action Sequences because order matters for being able to display a modal dialog after data is fetched.
+ ❌ Organize the categories into the same model in the store state, and map them with a "FlatList."
+ ❌ Store state as value attributes in any element that can be read from during an event.
+ ❌ Make `data-state-repeat=true` the default way to handle arrays.
+ ❌ Blog, Vlog, Pinterest, Etsy, 3d Print,
+ ❌ Don't traverse `data-view` twice when the dereferenced view is a `data-state-repeat` with a template child element.
+ ❌ Support `data-memo` to Memoize Views?
