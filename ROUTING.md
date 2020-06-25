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
