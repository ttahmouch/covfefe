/* eslint-disable no-use-before-define,no-unused-vars */
import schema from '../../declarative/schema';

const {anything_schema, any_positive_integer_schema} = schema;

export const delegate = {
    onDeclarativeStatus: (declarative) => declarative,
    onDeclarativeHeader: (declarative) => declarative,
    onDeclarativeBody: (declarative) => declarative,
    onDeclarativeAppStateSelector: (declarative) => declarative,
    onDeclarativeViewStateSelector: (declarative) => declarative,
    onDeclarativeUriTemplateInterpolator: (declarative) => declarative,
    onDeclarativeJsTemplateInterpolator: (declarative) => declarative
    // onDeclarativeResponseStateSelector: (declarative) => declarative,
};

export const toDeclarativeStatus = (declaredStatus = {'$schema_comparison': any_positive_integer_schema}) => {
    return typeof declaredStatus !== 'number' ? declaredStatus : {'$literal_comparison': declaredStatus};
};

export const toDeclarativeHeader = (declaredHeader = '') => {
    return typeof declaredHeader !== 'string' ? declaredHeader : {'$regexp_comparison': declaredHeader};
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

export const toDeclarativeHttpTransaction = (declaredRequest = '{}', delegate = delegate,
                                             dependencies = {toDeclarativeResponses}) => {
    const {toDeclarativeResponses} = dependencies;

    return JSON.parse(declaredRequest, (key = '', value = null) => {
        const type = value === null ? 'null' : typeof value;

        if (key === '$responses' && Array.isArray(value)) {
            return toDeclarativeResponses(value, delegate);
        }

        // If key is '' meaning it's the root request, then check the properties allowed on a request for interpolation
        // and selection.
        // Make a `toDeclarativeRequest` method so that we can manage where selection and interpolation is allowed
        // instead of assuming it can happen anywhere, and handle dispatching actions from the request context.
        console.log(key);
        if (type === 'object') {
            const {
                '$from_app_state': appStateSelector = '',
                '$from_view_state': viewStateSelector = '',
                '$uri_template': uriTemplate = '',
                '$js_template': jsTemplate = ''
            } = value;

            if (appStateSelector) {
                return delegate.onDeclarativeAppStateSelector(value);
            }
            if (viewStateSelector) {
                return delegate.onDeclarativeViewStateSelector(value);
            }
            if (uriTemplate) {
                return delegate.onDeclarativeUriTemplateInterpolator(value);
            }
            if (jsTemplate) {
                return delegate.onDeclarativeJsTemplateInterpolator(value);
            }
        }

        return value;
    });
};