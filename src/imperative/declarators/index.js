/* eslint-disable no-use-before-define */
import schema from '../../declarative/schema';

const {anything_schema, any_positive_integer_schema} = schema;

export const toDeclarativeStatus = (declaredStatus = {'$schema_comparison': any_positive_integer_schema}) => {
    return typeof declaredStatus !== 'number' ? declaredStatus : {'$literal_comparison': declaredStatus};
};

export const toDeclarativeHeader = (declaredHeader = '') => {
    return typeof declaredHeader !== 'string' ? declaredHeader : {'$regexp_comparison': declaredHeader};
};

export const toDeclarativeHeaders = (declaredHeaders = {}, dependencies = {toDeclarativeHeader}) => {
    const {toDeclarativeHeader} = dependencies;
    const toHeadersArray = (header) => [header, declaredHeaders[header]];
    const toHeadersObject = (headers, [header, value]) => ({...headers, [header]: toDeclarativeHeader(value)});

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
                                      dependencies = {
                                          toDeclarativeStatus, toDeclarativeHeader, toDeclarativeHeaders,
                                          toDeclarativeBody
                                      }) => {
    const {toDeclarativeStatus, toDeclarativeHeaders, toDeclarativeBody} = dependencies;

    return {
        '$status': toDeclarativeStatus(declaredStatus),
        '$headers': toDeclarativeHeaders(declaredHeaders, dependencies),
        '$body': toDeclarativeBody(declaredBody)
    };
};

export const toDeclarativeResponses = (declaredResponses = [],
                                       dependencies = {
                                           toDeclarativeStatus, toDeclarativeHeader, toDeclarativeHeaders,
                                           toDeclarativeBody, toDeclarativeResponse
                                       }) => {
    const {toDeclarativeResponse} = dependencies;

    return declaredResponses.map((declaredResponse) => toDeclarativeResponse(declaredResponse, dependencies));
};