/* eslint-disable no-use-before-define */
import jsonpath from 'jsonpath/jsonpath.min';

/**
 * State Selection.
 */

export const selectStateUsingJsonPath = (state = {},
                                         selector = '',
                                         jsonPath = jsonpath) => selector ? jsonPath.value(state, selector) : state;

export const selectStateUsingRegExp = (state = '',
                                       selector = '',
                                       regexp = new RegExp(selector)) => (regexp.exec(state) || []).slice(1);

export const selectState = (state = {},
                            selector = '',
                            {regexp = undefined, schema = undefined},
                            dependencies = {selectStateUsingJsonPath, selectStateUsingRegExp}) => {
    const {selectStateUsingJsonPath, selectStateUsingRegExp} = dependencies;

    if (regexp !== undefined) {
        return selectStateUsingJsonPath(selectStateUsingRegExp(state, regexp), selector);
    }

    if (schema !== undefined) {
        return selectStateUsingJsonPath(state, selector);
    }

    return state;
};