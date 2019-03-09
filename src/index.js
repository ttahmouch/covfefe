import React from 'react';
import ReactDOM from 'react-dom';
import {state, style, request} from './manifest';
import {dispatchers} from './dispatchers';
import {reducers} from './reducers';
import {App, JsonDictionary, JsonList, JsonString, RootView} from './components';

/*
Add support for sets, i.e., createItem, readItem, updateItem, removeItem.
Add asynchrony.
Add routing.
Build a basic Reddit app.
Use data attributes for now to avoid misusing the normal attributes.
Add client rendering of HTTP metadata, i.e., URI Templates, JSON Path, JSON Schema, etc.
Add response handling for success and error states using reducers that change synchronous state, i.e., JSON Path, JSON Schema.
 */

ReactDOM.render(
    <App state={state}
         style={style}
         request={request}
         reducers={reducers}
         dispatchers={dispatchers}>
        <RootView>
            <header data-style="header">
                <JsonString data-state='title'
                            data-state-prop='string'/>
                <form data-action-prop='onSubmit'
                      data-action='remove'
                      data-state='title'>
                    <div>
                        <label>Update Title:</label>
                        <input data-action-prop='onChange'
                               data-action='update'
                               data-state='title'
                               data-state-prop='value'/>
                    </div>
                    <div>
                        <button type='submit'>Delete Title</button>
                    </div>
                </form>
                <JsonList data-state='titlesArray'
                          data-state-prop='list'/>
                <form data-action-prop='onSubmit'
                      data-action='create'
                      data-state='titlesArray'
                      data-state-type='array'>
                    <div>
                        <label>First Title:</label>
                        <input name='title'/>
                    </div>
                    <div>
                        <label>Second Title:</label>
                        <input name='title'/>
                    </div>
                    <div>
                        <label>Not Title:</label>
                        <input name='nottitle'/>
                    </div>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                    <div>
                        <button data-action-prop='onClick'
                                data-action='remove'
                                data-state='titlesArray'
                                data-state-type='array'>
                            Remove Array
                        </button>
                    </div>
                </form>
                <JsonDictionary data-state='titlesDictionary'
                                data-state-prop='dictionary'/>
                <form data-action-prop='onSubmit'
                      data-action='create'
                      data-state='titlesDictionary'
                      data-state-type='dictionary'>
                    <div>
                        <label>First Title:</label>
                        <input name='title'/>
                    </div>
                    <div>
                        <label>Second Title:</label>
                        <input name='title'/>
                    </div>
                    <div>
                        <label>Not Title:</label>
                        <input name='nottitle'/>
                    </div>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                    <div>
                        <button data-action-prop='onClick'
                                data-action='remove'
                                data-state='titlesDictionary'
                                data-state-type='dictionary'>
                            Remove Dictionary
                        </button>
                    </div>
                    <div>
                        <button data-action-prop='onClick'
                                data-action='async_create'
                                data-action-request='createTitlesDictionary'
                                data-state='titlesDictionary'
                                data-state-type='dictionary'>
                            Create Titles Dictionary Async
                        </button>
                    </div>
                    <div>
                        <button data-action-prop='onClick'
                                data-action='async_read'
                                data-action-request='readTitlesDictionary'
                                data-state='titlesDictionary'
                                data-state-type='dictionary'>
                            Read Titles Dictionary Async
                        </button>
                    </div>
                    <div>
                        <button data-action-prop='onClick'
                                data-action='async_update'
                                data-action-request='updateTitlesDictionary'
                                data-state='titlesDictionary'
                                data-state-type='dictionary'>
                            Update Titles Dictionary Async
                        </button>
                    </div>
                    <div>
                        <button data-action-prop='onClick'
                                data-action='async_remove'
                                data-action-request='removeTitlesDictionary'
                                data-state='titlesDictionary'
                                data-state-type='dictionary'>
                            Remove Titles Dictionary Async
                        </button>
                    </div>
                </form>
            </header>
        </RootView>
    </App>,
    document.getElementById("root")
);
