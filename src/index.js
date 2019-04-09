import React from 'react';
import ReactDOM from 'react-dom';
import {state, style, request} from './manifest';
import {dispatchers} from './dispatchers';
import {reducers} from './reducers';
import {App, JsonDictionary, JsonList, JsonString, RootView} from './components';

ReactDOM.render(
    <App state={state}
         style={style}
         request={request}
         reducers={reducers}
         dispatchers={dispatchers}>
        <RootView>
            <header data-style="header">
                <>
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
                    <JsonList data-state='titles_array'
                              data-state-prop='list'/>
                    <form data-action-prop='onSubmit'
                          data-action='create'
                          data-state='titles_array'
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
                                    data-state='titles_array'
                                    data-state-type='array'>
                                Remove Array
                            </button>
                        </div>
                    </form>
                    <JsonDictionary data-state='titles_dictionary'
                                    data-state-prop='dictionary'/>
                    <form data-action-prop='onSubmit'
                          data-action='remove'
                          data-state='titles_dictionary'
                          data-state-type='dictionary'>
                        <div>
                            <button type='submit'>Remove Dictionary</button>
                        </div>
                    </form>
                    <form data-action-prop='onSubmit'
                          data-action='create'
                          data-state='titles_dictionary'
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
                            <button type='submit'>Create Dictionary</button>
                        </div>
                    </form>
                </>
                <>
                    <JsonString data-state='status'
                                data-state-prop='string'/>
                    <JsonString data-state='header'
                                data-state-prop='string'/>
                    <form data-action-prop='onSubmit'
                          data-action='async_create'
                          data-state='titles_dictionary'
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
                            <button type='submit'>Create Titles Dictionary Async</button>
                        </div>
                    </form>
                    <form data-action-prop='onSubmit'
                          data-action='async_read'
                          data-state='titles_dictionary'
                          data-state-type='dictionary'>
                        <div>
                            <label>Title:</label>
                            <input name='title'/>
                        </div>
                        <div>
                            <button type='submit'>Read Titles Dictionary Async</button>
                        </div>
                    </form>
                    <button data-action-prop='onClick'
                            data-action='async_read'
                            data-state='titles_dictionary'
                            data-state-type='dictionary'>
                        Read Titles Dictionary Async
                    </button>
                    <form data-action-prop='onSubmit'
                          data-action='async_update'
                          data-state='titles_dictionary'
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
                            <button type='submit'>Update Titles Dictionary Async</button>
                        </div>
                    </form>
                    <form data-action-prop='onSubmit'
                          data-action='async_remove'
                          data-state='titles_dictionary'
                          data-state-type='dictionary'>
                        <div>
                            <button type='submit'>Remove Titles Dictionary Async</button>
                        </div>
                    </form>
                </>
            </header>
        </RootView>
    </App>,
    document.getElementById("root")
);