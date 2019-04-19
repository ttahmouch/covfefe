import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {App} from "../components";
import style from "./style"
import state from "./state";
import request from "./async";
import {reducers} from "../reducers";
import {dispatchers} from "../dispatchers";

export default (
    <App state={state}
         style={style}
         request={request}
         reducers={reducers}
         dispatchers={dispatchers}>
        <nav data-style="navigation_bar">
            <div data-style="navigation_bar_back_button">➡</div>
            <div data-style="navigation_bar_title">Remote Commands</div>
        </nav>
        <main data-style="main_content">
            <div data-style="card">
                <header data-style="card_header">Locks: 12:37 PM Succeeded</header>
                <div data-style="card_main_content"/>
            </div>
        </main>
    </App>
);