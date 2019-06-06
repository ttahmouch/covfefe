/* eslint-disable */
import Ajv from 'ajv';

export const noop = (event) => console.log(event);

export const compareLiteral = (declaredLiteral = 0, value = 0) => declaredLiteral === value;

export const compareRegexp = (declaredRegexp = '',
                              value = '',
                              regexp = new RegExp(declaredRegexp)) => regexp.test(value);

export const compareSchema = (declaredSchema = {},
                              value = {},
                              schema = new Ajv()) => schema.validate(declaredSchema, value);

export const compare = ({
                            '$literal_comparison': literal = undefined,
                            '$regexp_comparison': regexp = undefined,
                            '$schema_comparison': schema = undefined
                        },
                        value = '',
                        dependencies = {compareLiteral, compareRegexp, compareSchema}) => {
    const {compareLiteral, compareRegexp, compareSchema} = dependencies;

    if (regexp !== undefined) {
        return compareRegexp(regexp, value);
    }

    if (schema !== undefined) {
        return compareSchema(schema, value);
    }

    return compareLiteral(literal, value);
};

export const compareHeaders = (declaredHeaders = {}, headers = {}, dependencies = {noop}) => {
    const {noop} = dependencies;
    const declaredHeaderNames = Object.keys(declaredHeaders);
    const onHeader = ({header = '', compare = noop}) => compare(headers[header]);
    const toDeclaredHeader = (header = '') => ({header, ...declaredHeaders[header]});

    return declaredHeaderNames.length === declaredHeaderNames.map(toDeclaredHeader).filter(onHeader).length;
};

export const filterDeclaredResponsesMatchingResponse = (declaredResponses = [],
                                                        response = {status: 0, headers: {}, body: {}},
                                                        dependencies = {compareHeaders, noop}) => {
    const {compareHeaders, noop} = dependencies;
    const {status = 0, headers = {}, body = {}} = response;
    const onStatus = ({'$status': {compare = noop}}) => compare(status);
    const onHeaders = ({'$headers': declaredHeaders = {}}) => compareHeaders(declaredHeaders, headers);
    const onBody = ({'$body': {compare = noop}}) => compare(body);

    return declaredResponses.filter(onStatus).filter(onHeaders).filter(onBody);
};