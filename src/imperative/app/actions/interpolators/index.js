/* eslint-disable no-use-before-define */
import URITemplate from 'urijs/src/URITemplate';

export const interpolateJsTemplateUsingExpression = (template = '',
                                                     params = {},
                                                     expression = /{([^{}]*)}/g) => {
    return template.replace(expression, (match, param) => typeof params[param] === 'string' ? params[param] : match);
};

export const interpolateUriTemplate = (template = '',
                                       params = {},
                                       uriTemplate = new URITemplate(template)) => uriTemplate.expand(params);

export const interpolateTemplate = ({
                                        '$uri_template': uriTemplate = '',
                                        '$js_template': jsTemplate = ''
                                    },
                                    params = {},
                                    dependencies = {interpolateUriTemplate, interpolateJsTemplateUsingExpression}) => {
    const {interpolateUriTemplate, interpolateJsTemplateUsingExpression} = dependencies;

    if (uriTemplate) {
        return interpolateUriTemplate(uriTemplate, params);
    }

    return interpolateJsTemplateUsingExpression(jsTemplate, params);
};