import selectors from './selectors.json';

export default {
    ...selectors,
    true: {"$selector": () => true},
    title_from_app: {"$selector": ({app = {"title": ""}}) => app.title},
    title_from_view: {"$selector": ({view = {"title": [""]}}) => view.title[0]},
    status_from_response: {"$selector": ({response = 200}) => response},
    content_type_from_header: {"$selector": ({response = "application/json"}) => response},
    content_length_from_header: {"$selector": ({response = ["0"]}) => response[0]},
    titles_dictionary_from_response: {"$selector": ({response = {"titles": []}}) => response},
    title_from_response: {"$selector": ({response = {"titles": [{"title": ""}]}}) => response.titles[0].title},
    titles_array_from_response: {"$selector": ({response = {"titles": []}}) => response.titles}
};