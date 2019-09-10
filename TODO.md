
+ Add support for dispatching actions declaratively from when a request is created.
+ Add support for dispatching actions declaratively from when a response/event is received irrespective of what response/event it is.
+ Add support for declaratively specifying events other than responses.

/**
 * TODO:
 * + Document `$uri_template` and `$js_template` TEMPLATE expressions.
 * + Document `$from_view_state`, `$from_app_state`, `$from_response_state` RETRIEVAL expressions.
 * + Document `$literal_comparison`, `$schema_comparison`, `$regexp_comparison` COMPARISON expressions.
 * + Document `$to_app_state` DISPATCH expressions.
 * + Allow JSON Schemas to be referenced by ID, i.e., no need to import `schema`.
 *
 * # State:
 *
 * ## Dispatch:
 * $to_app_state (Is currently only defined for the response context. It will be added to the request context.)
 * $action
 * $state
 * $type
 *
 * ## Selection:
 * $from_app_state (Can happen in request or response context.)
 * $from_view_state (Can happen in request or response context.)
 * $from_response_state (Can only happen in the response context.)
 * $selected_response_state
 *
 * ## Comparison:
 * $literal_comparison (Is currently only defined for the response context. Is it needed in a request context?)
 * $regexp_comparison (Is currently only defined for the response context. Is it needed in a request context?)
 * $schema_comparison (Is currently only defined for the response context. Is it needed in a request context?)
 *
 * ## Interpolation:
 * $uri_template (Can happen in request or response context.)
 * $js_template (Can happen in request or response context.)
 *
 * # Request:
 * $method
 * $uri
 * $headers
 * $body
 * $username
 * $password
 * $withCredentials
 *
 * # Response:
 * $status
 * $headers
 * $body
 * $responses
 */
