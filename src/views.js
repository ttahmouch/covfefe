import React, {Fragment} from "react";
import views from './views.json';
import {Json} from './components';

export default {
    ...views,
    "jsx_element": <button data-style="form_button_gray"
                           data-state="title_form_submit_button_label"
                           type="submit"/>,
    "jsx_component_element": <Json data-state="titles_dictionary"
                                   data-bind-state="json"/>,
    "jsx_fragment_element": (
        <Fragment>
            <Fragment data-view="jsx_element"
                      data-style="form_button_red"
                      data-state-value="JSX"/>
        </Fragment>
    ),
    "buttons": (
        <Fragment>
            <Fragment data-view="json_element"/>
            <Fragment data-view="jsx_element"/>
            <Fragment data-view="json_fragment_element"/>
            <Fragment data-view="jsx_fragment_element"/>
        </Fragment>
    ),
    "form": (
        <form data-event="onSubmit"
              data-action="async_read"
              data-state="titles_dictionary"
              data-state-type="dictionary">
            <div>
                <label data-state="title_form_label"/>
                <input name="title"/>
            </div>
            <Fragment data-view="buttons"/>
            <Fragment data-view="json_component_element"/>
            <Fragment data-view="jsx_component_element"/>
        </form>
    ),
    "card": (
        <div data-style="card">
            <header data-style="card_header"
                    data-state="card_title"/>
            <div data-style="card_main_content">
                <Fragment data-view="form"/>
            </div>
        </div>
    ),
    "root": (
        <div data-style="root">
            <nav data-style="navigation_bar">
                <div data-style="navigation_bar_button"
                     data-state="back"/>
                <div data-style="navigation_bar_button"
                     data-state="forward"/>
                <div data-style="navigation_bar_title"
                     data-state="page_title"/>
            </nav>
            <div data-style="header">
                <img data-style="hero-image"
                     id="hero-image"
                     src="dashboard_hero_image_gmc.png"
                     alt="Hero"/>
            </div>
            <div data-style="garage-door">
                <p data-style="garage-door-text"
                   data-state="selected_vehicle"/>
            </div>
            <div data-style="footer">
                <Fragment data-view="card"/>
                <Fragment data-view="card"/>
                <Fragment data-view="card"/>
                <Fragment data-view="card"/>
                <Fragment data-view="card"/>
                <Fragment data-view="card"/>
                <Fragment data-view="card"/>
            </div>
        </div>
    )
};