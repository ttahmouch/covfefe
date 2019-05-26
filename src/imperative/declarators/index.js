/* eslint-disable no-use-before-define,no-unused-vars */
import schema from '../../declarative/schema';
import {interpolateJsTemplateUsingExpression, interpolateUriTemplate} from '../interpolators';
import {selectStateUsingJsonPath} from '../selectors';

const {anything_schema, any_positive_integer_schema} = schema;

export const delegate = {
    onDeclarativeStatus: (declarative) => declarative,
    onDeclarativeHeader: (declarative) => declarative,
    onDeclarativeBody: (declarative) => declarative
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

export const toDeclarativeHttpTransaction = (declaredRequest = '{}', appState = {}, viewState = {}, delegate = delegate,
                                             dependencies = {
                                                 selectStateUsingJsonPath, interpolateUriTemplate,
                                                 interpolateJsTemplateUsingExpression, toDeclarativeResponses
                                             }) => {
    const {
        selectStateUsingJsonPath, interpolateUriTemplate, interpolateJsTemplateUsingExpression,
        toDeclarativeResponses
    } = dependencies;

    return JSON.parse(declaredRequest, (key = '', value = null) => {
        const type = value === null ? 'null' : typeof value;

        if (key === '$responses' && Array.isArray(value)) {
            return toDeclarativeResponses(value, delegate);
        }

        if (type === 'object') {
            const {
                '$from_app_state': appStateSelector = '',
                '$from_view_state': viewStateSelector = '',
                '$uri_template': uriTemplate = '',
                '$js_template': jsTemplate = ''
            } = value;

            if (appStateSelector) {
                return selectStateUsingJsonPath(appState, appStateSelector);
            }
            if (viewStateSelector) {
                return selectStateUsingJsonPath(viewState, viewStateSelector);
            }
            if (uriTemplate) {
                return interpolateUriTemplate(uriTemplate, value);
            }
            if (jsTemplate) {
                return interpolateJsTemplateUsingExpression(jsTemplate, value);
            }
        }

        return value;
    });
};