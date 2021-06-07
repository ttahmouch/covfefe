# Active

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
+ ❌ Support comparison operators? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#comparison_operators
+ ❌ Support boolean algebra logical operators? AND, OR, NOT at bare minimum. I think that allows everything? AND, OR, XOR, NOT, NAND, NOR, and XNOR stretch goal.
    https://en.wikipedia.org/wiki/Logic_gate
+ ❌ 🏆 Support literal create composer type to support arrays that are not compositions.
+ ❌ 🏆 Support multi-prop state binding for `data-style`, `data-state`, `data-event`.
    Support Binding Multiple Props From State, e.g., children and value.
    Allow `data-multi-state` to bind `{"value": "User Input", "placeholder": "Movie Title,..."}` without a single `data-bind="value"`?
+ ❌ Action Sequences
+ ❌ Support Action Sequences because order matters for being able to display a modal dialog after data is fetched.
+ ❌ Should fonts be a first-class citizen? Think about how platform-checks should be made declaratively.
    Are views and styles the only things that need platform checks? Inline all styles instead of CSS in Netflux? How Media Query?
+ ❌ Support embedding composers inside types like styles instead of generating styles from composers. Support `style` and `data-style?
    Support dereferencing styles the same way we handle HTTP requests.
+ ❌ Upgrade React and React DOM.

---

 # React Native Concerns
 + Styling (data-style needs to be referencable, composable, like data-view).
 + ✅ Repeating (data-bind-state binds to children by default when repeating.)
 + ✅ Event Handling (React Native events don't include the same metadata as
 DOM events.)
 + Function Props (Are these any different from traditional events? I think so
 as they don't indicate a side-effect,i.e., user input, response, etc.)
 + ✅ Bind multiple props (e.g., DPCategories, size 👉 height and size 👉 width)
 + Map custom function props to compositions (i.e., not events that dispatch
 actions; compositions that return state)
 (e.g., FlatList 👉 renderItem and FlatList 👉 keyExtractor)
 + Consider if there is actually a fix for the case of StackNavigator 👉
 tabBarIcon since that is not a component (i.e., tabBarIcon: ({focused}) =>
 Set the focused state and then React.createElement({}) with it selectable)
 + Replace `iPhoneNotch` usages with `SafeAreaView` (and consider Android
 notches)
 + Replace all image sources with {"$compose": "encode", "$type": "uri"}

 I made all image sources dynamically fetched from an image server, i.e.,
 GitHub. This means I'll eventually need to reduce the Image `source` to
 composed state that can just structure the URI into an object that may be
 serialized as the URI right now are pretty large.

 I also need to consider not dereferencing views from the Redux Store
 unnecessarily. I started moving views to the `$views` section of the Redux
 Store as an incremental way of shifting as many of the components from the JS
 functions to JSON as was reasonable. I may need to reconsider bringing some
 of the `data-view` references back into their parent JSON to simplify cases
 of state binding when multiple props are supported in state binding.

 I also currently left the usage of React Navigation intact to prove that an
 implementation of a third-party navigation engine works perfectly fine while
 still keeping the majority of the application code declarative using JSON.
 However, I can't avoid needing to provide functions for things like `focused`
 for the tab button presses, and `navigation` to push and pop routes from the
 stack. I will build a parallel implementation showing how to handle routing
 using the built-in routing system in the framework. I will still need to
 consider how to add animations to the routing engine though to make more
 polished looking transitions for things like page navigations on a stack.

 I also need to consider if it makes sense to add support for dispatching
 actions to present alerts to the user in the system default alert views for web
 and native implementations since those should be considered a side-effect much
 in the same way as an HTTP request. Their practicality is rather limited though
 since there is nothing stopping someone from implementing a custom modal view
 and binding state to it from the Redux Store.

 Should this be done with custom middleware in user space? Or is this a core
 feature of the library? Or hybrid by allowing the middleware to be passed in as
 an option but not defaulting it?

 ✅ There is still an issue with event dispatching in React Native since the
 event objects that get passed to the event handlers don't contain all the same
 metadata that they do in React Web. So that will need to be handled somehow to
 allow for things like `onPress` to work as expected.

 I still need to support a platform-agnostic way of handling localization of
 state from the Redux Store. Right now everything is just treated as generic
 state so all localizations would have to be provided from the server, or you'd
 have to implement a way of distinguishing the different state based on the
 current user's locale in a custom manner.

 I still need to decide if it makes sense to expect the consumer of the
 framework to export all components they will need as a base set in the
 `$composers`, or if there should be a base set provided for React Native at the
 very least. It feels perfectly reasonable to expect that they be provided
 manually as too many assumptions would have to be made about possible
 components with naming collisions, e.g., Image from RN and image from RNSVG.
 However, I feel like `$components` should be created to allow distinguishing JS
 components from arbitrary compositions even though they are technically
 compositions. Components just don't compose arbitrary state, but rather view
 elements. In the same vein, will the framework need to provide things like the
 window width and height out of the box in React Native since CSS doesn't exist
 in this context? Right now I added them into the initial state of the Redux
 Store manually, and this feels reasonable to me.

 I would really like a way for styles to be composable, referencable, and
 propogatable if needed (similarly to views),
 i.e., "data-style": "style-id"
 i.e., "data-style": ["style-id", "style-id2"]
 i.e., "data-style": {"backgroundColor": "red"}
 i.e., "data-style": {"$style": "style-id", "backgroundColor": "red"}
 i.e., "data-style": [
 {"$style": "style-id", "backgroundColor": "red"},
 {"$style": "style-id2", "backgroundColor": {"$compose": "create", "$value": "red"}}},
 Last Item Takes Precedence.
 ]
 Should this work the same way for state and events?

 ✅ I also need to get element repetition polished for React Native as some
 props are only needed since the behavior of React Native is much stricter about
 things like setting text as children of nodes in the element tree that are not
 explicitly `<Text>` elements. This seems to cause an issue with the `children`
 prop getting set twice before the final elements get set necessitation
 `"data-bind-state": "data-bind-state"`.
