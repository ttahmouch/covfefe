import React, {Fragment} from 'react';

export default (
    <Fragment>
        <div data-view="json_element"/>
        <div data-view="jsx_element"/>
        <div data-view="json_fragment_element"/>
        <div data-view="jsx_fragment_element"/>
        <button data-style="form_button_gray"
                data-state-value="Download New Card View"
                data-action="read_json_card_view"
                data-bind-action="onClick"/>
    </Fragment>
);