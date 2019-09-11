/* eslint-disable no-use-before-define,no-unused-vars */
export const anything_schema = {"$schema": "http://json-schema.org/schema#"};
export const any_positive_integer_schema = {
    "$schema": "http://json-schema.org/schema#",
    "type": "integer",
    "minimum": 0
};

export const delegate = {
    onDeclarativeStatus: (declarative) => declarative,
    onDeclarativeHeader: (declarative) => declarative,
    onDeclarativeBody: (declarative) => declarative,
    // Get rid of these and shift state selection and interpolation to later right before a request happens or right
    // after a response is received. Try to keep the state of the request declaration immutable, and create a new
    // data structure with the interpolation and selection done for the request that is made.
    onDeclarativeAppStateSelector: (declarative) => declarative,
    onDeclarativeViewStateSelector: (declarative) => declarative,
    onDeclarativeUriTemplateInterpolator: (declarative) => declarative,
    onDeclarativeJsTemplateInterpolator: (declarative) => declarative
    // onDeclarativeResponseStateSelector: (declarative) => declarative,
};

export const toDeclarativeStatus = (declaredStatus = {'$schema_comparison': any_positive_integer_schema}) => {
    return typeof declaredStatus !== 'number' ? declaredStatus : {'$literal': declaredStatus};
};

export const toDeclarativeHeader = (declaredHeader = '') => {
    return typeof declaredHeader !== 'string' ? declaredHeader : {'$regexp': declaredHeader};
};

export const toDeclarativeHeaders = (declaredHeaders = {}, delegate = delegate,
                                     dependencies = {toDeclarativeHeader}) => {
    const {toDeclarativeHeader} = dependencies;
    const toHeadersArray = (header) => [header, declaredHeaders[header]];
    const toHeadersObject = (headers, [header, value]) => ({
        ...headers,
        [header]: delegate.onDeclarativeHeader(toDeclarativeHeader(value))
    });

    return Object.keys(declaredHeaders).map(toHeadersArray).reduce(toHeadersObject, {});
};

export const toDeclarativeBody = (declaredBody = {'$schema_comparison': anything_schema}) => {
    return typeof declaredBody['$schema'] !== 'string' ? declaredBody : {'$schema_comparison': declaredBody};
};

export const toDeclarativeResponse = ({
                                          '$status': declaredStatus = undefined,
                                          '$headers': declaredHeaders = undefined,
                                          '$body': declaredBody = undefined
                                      },
                                      delegate = delegate,
                                      dependencies = {
                                          toDeclarativeStatus, toDeclarativeHeaders, toDeclarativeBody
                                      }) => {
    const {toDeclarativeStatus, toDeclarativeHeaders, toDeclarativeBody} = dependencies;

    return {
        '$status': delegate.onDeclarativeStatus(toDeclarativeStatus(declaredStatus)),
        '$headers': toDeclarativeHeaders(declaredHeaders, delegate),
        '$body': delegate.onDeclarativeBody(toDeclarativeBody(declaredBody))
    };
};

export const toDeclarativeResponses = (declaredResponses = [], delegate = delegate,
                                       dependencies = {toDeclarativeResponse}) => {
    const {toDeclarativeResponse} = dependencies;

    return declaredResponses.map((declaredResponse) => toDeclarativeResponse(declaredResponse, delegate));
};

export const toDeclarativeSelector = (declaredSelector = {$selector: '', $from: ''},
                                      delegate = delegate) => {
    // Support functional selectors.
    const {$selector = '', $from = ''} = declaredSelector;

    switch ($from) {
        case 'app':
            return delegate.onDeclarativeAppStateSelector(declaredSelector);
        case 'view':
            return delegate.onDeclarativeViewStateSelector(declaredSelector);
        default:
            return declaredSelector;
    }
};


export const toDeclarativeInterpolator = (declaredInterpolator = {'$uri_template': '', '$js_template': ''},
                                          delegate = delegate) => {
    const {
        '$uri_template': uriInterpolator = '',
        '$js_template': jsInterpolator = ''
    } = declaredInterpolator;

    if (uriInterpolator) {
        return delegate.onDeclarativeUriTemplateInterpolator(declaredInterpolator);
    }

    if (jsInterpolator) {
        return delegate.onDeclarativeJsTemplateInterpolator(declaredInterpolator);
    }

    return declaredInterpolator;
};

export const compose = (...composers) => (composed = {}, ...rest) => {
    return composers.reduceRight((composed, composer) => composer(composed, ...rest), composed);
};

export const toComposedDeclarative = (declarative = {},
                                      delegate = delegate,
                                      dependencies = {compose, toDeclarativeInterpolator, toDeclarativeSelector}) => {
    const {compose, toDeclarativeInterpolator, toDeclarativeSelector} = dependencies;

    return compose(toDeclarativeInterpolator, toDeclarativeSelector)(declarative, delegate);
};

export const toRecursivelyComposedDeclarative = (declarative = {},
                                                 delegate = delegate,
                                                 dependencies = {toComposedDeclarative}) => {
    const {toComposedDeclarative} = dependencies;
    const onKey = (object, key) => ({...object, [key]: toRecursivelyComposedDeclarative(object[key], delegate)});
    const onObject = (object = {}, onKey = onKey) => Object.keys(object).reduce(onKey, object);

    return declarative === null || typeof declarative !== 'object' || Array.isArray(declarative)
        ? declarative
        : toComposedDeclarative(onObject(declarative, onKey), delegate);
};

export const toDeclarativeRequestField = (key = '',
                                          object = null,
                                          delegate = delegate,
                                          dependencies = {
                                              toDeclarativeResponses,
                                              toRecursivelyComposedDeclarative
                                          }) => {
    const {toDeclarativeResponses, toRecursivelyComposedDeclarative} = dependencies;

    switch (key) {
        case'$method':
        case'$uri':
        case'$headers':
        case'$body':
        case'$username':
        case'$password':
        case'$withCredentials':
        case'$actions':
            return toRecursivelyComposedDeclarative(object, delegate);
        case '$responses':
            return !Array.isArray(object) ? object : toDeclarativeResponses(object, delegate);
        default:
            return object;
    }
};

export const toDeclarativeRequest = (request = {
                                         '$method': 'GET',
                                         '$uri': '/',
                                         '$headers': {},
                                         '$body': '',
                                         '$username': '',
                                         '$password': '',
                                         '$withCredentials': 'false',
                                         '$actions': [],
                                         '$responses': []
                                     },
                                     delegate = delegate,
                                     dependencies = {toDeclarativeRequestField}) => {
    const {toDeclarativeRequestField} = dependencies;
    const onField = (request, key) => ({...request, [key]: toDeclarativeRequestField(key, request[key], delegate)});

    return Object.keys(request).reduce(onField, request);
};

// ---------------------------------------------------------------------------------------------------------------------

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
