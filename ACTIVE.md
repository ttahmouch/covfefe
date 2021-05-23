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
