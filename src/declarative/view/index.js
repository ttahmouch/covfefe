/**
 * TODO:
 * + Universally support setting string `data-*` attributes whether or not the component was already rendered.
 * + Eventually get everything to be pure XML instead of JSX.
 */
import React from 'react';
// import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import style from "../style"
import state from "../state";
import request from "../async";
import {App, Json} from "../../imperative/components";
import {reducers} from "../../imperative/reducers";
import {dispatchers} from "../../imperative/dispatchers";

const {
    navigation_bar,
    navigation_bar_back_button,
    navigation_bar_title,
    main_content,
    card,
    card_header,
    card_main_content
} = style;

export default (
    <App state={state}
         style={style}
         request={request}
         reducers={reducers}
         dispatchers={dispatchers}>
        <nav style={navigation_bar}>
            <div style={navigation_bar_back_button}>⬅</div>
            <div style={navigation_bar_title}>Remote Commands</div>
        </nav>
        <main style={main_content}>
            <div style={card}>
                <header style={card_header}>Locks: 12:37 PM Succeeded</header>
                <div style={card_main_content}/>
            </div>
            <div>
                <Json data-state='titles_array'
                      data-state-prop='json'/>
                <form data-action-prop='onSubmit'
                      data-action='async_read'
                      data-state='titles_array'
                      data-state-type='dictionary'>
                    <div>
                        <label>Title:</label>
                        <input name='title'/>
                    </div>
                    <div>
                        <button type='submit'>Read Titles Dictionary Async</button>
                    </div>
                </form>
            </div>
        </main>
    </App>
);