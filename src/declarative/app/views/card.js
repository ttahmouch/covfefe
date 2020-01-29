import React, {Fragment} from 'react';
import $composers from '../composers/index.js';

const {Json} = $composers;

export default (
    <div data-style="card">
        <header data-style="card_header"
                data-state="card_title"/>
        <div data-style="card_main_content">
            <form data-event="title_submit"
                  data-bind-event="onSubmit"
                  data-state-type="dictionary">
                <div>
                    <label data-state="title_form_label"/>
                    <input name="title"/>
                </div>
                <button data-style="form_button_gray"
                        data-state="title_form_submit_button_label"
                        type="submit"/>
                <Fragment data-view="button"
                          data-style="form_button_red"
                          data-state-value="Download New Card View"/>
                <Json data-state="titles_dictionary"
                      data-bind-state="json"/>
            </form>
        </div>
    </div>
);