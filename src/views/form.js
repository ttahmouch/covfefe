import React, {Fragment} from 'react';

export default (
    <form data-action="async_read_titles_dictionary"
          data-bind-action="onSubmit"
          data-state-type="dictionary">
        <div>
            <label data-state="title_form_label"/>
            <input name="title"/>
        </div>
        <Fragment data-view="buttons"/>
        <Fragment data-view="json_component_element"/>
        <Fragment data-view="jsx_component_element"/>
    </form>
);