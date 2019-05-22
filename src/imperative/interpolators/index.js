import URITemplate from 'urijs/src/URITemplate';

/**
 * Template Interpolation.
 */
export const interpolateJsTemplateUsingExpression = (template = '',
                                                     params = {},
                                                     expression = /{([^{}]*)}/g) => {
    return template.replace(expression, (match, param) => typeof params[param] === 'string' ? params[param] : match);
};

export const interpolateUriTemplate = (template = '',
                                       params = {},
                                       uriTemplate = new URITemplate(template)) => uriTemplate.expand(params);