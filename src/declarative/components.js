import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

export class Json extends Component {
    render() {
        const {props: {json = {}}} = this;
        return (<pre>{JSON.stringify(json, null, 4)}</pre>);
    }
}

export const RootView = (props) => (
    <Router>
        <Header/>
        <Body/>
        <Footer/>
    </Router>
);

export const Header = (props) => (
    <nav data-style="navigation_bar">
        <Link to="/back">
            <div data-style="navigation_bar_back_button">
                ⬅
            </div>
        </Link>
        <Link to="/">
            <div data-style="navigation_bar_back_button">
                ◼︎
            </div>
        </Link>
        <div data-style="navigation_bar_title"
             data-state="page_title"/>
    </nav>
);

export const Body = (props) => (
    <>
        <Route path="/back" exact component={IndexContent}/>
        <Route path="/" exact component={BackContent}/>
    </>
);

export const IndexContent = (props) => (
    <main data-style="main_content">
        <div data-style="card">
            <header data-style="card_header"
                    data-state="card_title"/>
            <div data-style="card_main_content"/>
        </div>
    </main>
);

export const BackContent = (props) => (
    <main data-style="main_content">
        <div data-style="card">
            <header data-style="card_header"
                    data-state="card_title_2"/>
            <div data-style="card_main_content"/>
        </div>
    </main>
);

export const Footer = (props) => (
    <div>
        <Json data-state="titles_dictionary"
              data-state-prop="json"/>
        <form data-action-prop="onSubmit"
              data-action="async_read"
              data-state="titles_dictionary"
              data-state-type="dictionary">
            <div>
                <label>Title:</label>
                <input name="title"/>
            </div>
            <div>
                <button type="submit">
                    Read Titles Dictionary Async
                </button>
            </div>
        </form>
    </div>
);
