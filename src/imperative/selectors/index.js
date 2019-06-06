/* eslint-disable no-use-before-define */
import jsonpath from 'jsonpath/jsonpath.min';

export const selectStateUsingJsonPath = (selector = '',
                                         state = {},
                                         jsonPath = jsonpath) => selector ? jsonPath.value(state, selector) : state;

export const selectStateUsingRegExp = (selector = '',
                                       state = '',
                                       regexp = new RegExp(selector)) => (regexp.exec(state) || []).slice(1);

// Schema is not necessary.
export const selectState = ({
                                '$regexp_comparison': regexp = undefined,
                                '$schema_comparison': schema = undefined,
                                '$from_app_state': appStateSelector = '',
                                '$from_view_state': viewStateSelector = '',
                                '$from_response_state': responseStateSelector = '',
                                '$selector': $selector = appStateSelector || viewStateSelector || responseStateSelector || ''
                            },
                            state = {},
                            dependencies = {selectStateUsingJsonPath, selectStateUsingRegExp}) => {
    const {selectStateUsingJsonPath, selectStateUsingRegExp} = dependencies;

    if (regexp !== undefined) {
        return selectStateUsingJsonPath($selector, selectStateUsingRegExp(regexp, state));
    }

    return selectStateUsingJsonPath($selector, state);
};