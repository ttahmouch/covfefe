/* eslint-disable no-use-before-define */
export const noop = (event) => console.log(event);

export const getResponseBody = (headers = {'content-type': ''}, body = '') => {
    const {'content-type': type = ''} = headers;

    return type.includes('application/json') ? JSON.parse(body) : body;
};

export const getResponseHeaders = (client = {getAllResponseHeaders: () => ''}) => {
    return client
        .getAllResponseHeaders()
        .split('\r\n')
        .filter((header) => header)
        .map((header) => header.split(': '))
        .reduce((headers, [name, value]) => ({...headers, [name.toLowerCase()]: value}), {});
};

export const getResponse = (client = {status: 200, responseText: ''},
                            dependencies = {
                                getResponseHeaders,
                                getResponseBody
                            }) => {
    const {getResponseHeaders, getResponseBody} = dependencies;
    const {status = 200, responseText = ''} = client;
    const headers = getResponseHeaders(client);
    const body = getResponseBody(headers, responseText);

    return {status, headers, body};
};

export const getRequestBody = (headers = {'content-type': ''}, body = '') => {
    const {'content-type': type = ''} = headers;

    return type.includes('application/json') ? JSON.stringify(body) : body;
};

export const asyncRequest = (request = {},
                             callback = noop,
                             client = new XMLHttpRequest(),
                             dependencies = {
                                 getRequestBody,
                                 getResponse
                             }) => {
    const {getRequestBody, getResponse} = dependencies;
    const {
        '$method': method = 'GET',
        '$uri': uri = '/',
        '$headers': headers = {},
        '$body': body = '',
        '$username': username = '',
        '$password': password = '',
        '$withCredentials': withCredentials = 'false'
    } = request;

    client.open(method, uri, true, username, password);

    Object
        .keys(headers)
        .forEach((header) => client.setRequestHeader(header, headers[header]));

    client.withCredentials = withCredentials === 'true';
    client.responseType = 'text';
    client.addEventListener('loadstart', (event) => callback(request, event));
    client.addEventListener('progress', (event) => callback(request, event));
    client.addEventListener('error', (event) => callback(request, event));
    client.addEventListener('abort', (event) => callback(request, event));
    client.addEventListener('timeout', (event) => callback(request, event));
    client.addEventListener('load', (event) => callback(request, event, getResponse(client)));
    client.addEventListener('loadend', (event) => callback(request, event));

    return client.send(getRequestBody(headers, body));
};
