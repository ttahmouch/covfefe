import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import app, {$composers, $views} from "./netflux.json";

const HomeButton = () => {
    const dispatch = useDispatch();
    const state = useSelector(({"$states": {home_title = ""}}) => home_title);
    useEffect(() => dispatch({"type": "RENDERED_HOME_BUTTON"}));

    return (
        <div className="navigation_bar_link pseudo-link">
            {state}
        </div>
    );
};

export default {
    ...app,
    "$view": (
        <div data-bind-event="DOMContentLoaded"
             data-event="on_load"
             data-event-target="window">
            <div data-view="navigation_bar"/>
            <div data-if-path="/" data-view="home"/>
            <div data-if-path="/search" data-view="search"/>
            <div data-unless-path="^/(?:search)?$" data-view="404" data-path-type="regular_expression"/>
        </div>
    ),
    "$views": {
        "search_icon": (
            <svg version="1.1" viewBox="0 0 251 251">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g fill="#FFFFFF" fillRule="nonzero">
                        <path
                            d="M244.186,214.604 L189.807,160.226 C189.518,159.937 189.179,159.735 188.877,159.466 C199.577,143.235 205.822,123.806 205.822,102.912 C205.822,46.075 159.747,0 102.911,0 C46.075,0 0,46.075 0,102.911 C0,159.746 46.074,205.822 102.91,205.822 C123.805,205.822 143.233,199.577 159.464,188.877 C159.733,189.178 159.934,189.517 160.223,189.806 L214.603,244.186 C222.772,252.354 236.016,252.354 244.186,244.186 C252.354,236.017 252.354,222.773 244.186,214.604 Z M102.911,170.146 C65.777,170.146 35.675,140.044 35.675,102.911 C35.675,65.777 65.778,35.675 102.911,35.675 C140.043,35.675 170.146,65.778 170.146,102.911 C170.146,140.044 140.043,170.146 102.911,170.146 Z"/>
                    </g>
                </g>
            </svg>
        ),
        "bell_icon": (
            <svg version="1.1" viewBox="0 0 512 512">
                <path
                    d="M467.812,431.851l-36.629-61.056c-16.917-28.181-25.856-60.459-25.856-93.312V224c0-67.52-45.056-124.629-106.667-143.04 V42.667C298.66,19.136,279.524,0,255.993,0s-42.667,19.136-42.667,42.667V80.96C151.716,99.371,106.66,156.48,106.66,224v53.483 c0,32.853-8.939,65.109-25.835,93.291l-36.629,61.056c-1.984,3.307-2.027,7.403-0.128,10.752c1.899,3.349,5.419,5.419,9.259,5.419 H458.66c3.84,0,7.381-2.069,9.28-5.397C469.839,439.275,469.775,435.136,467.812,431.851z"/>
                <path d="M188.815,469.333C200.847,494.464,226.319,512,255.993,512s55.147-17.536,67.179-42.667H188.815z"/>
            </svg>
        ),
        "add_icon": (
            <svg version="1.1" viewBox="0 0 492 492">
                <path
                    d="M465.167,211.614H280.245V26.691c0-8.424-11.439-26.69-34.316-26.69s-34.316,18.267-34.316,26.69v184.924H26.69 C18.267,211.614,0,223.053,0,245.929s18.267,34.316,26.69,34.316h184.924v184.924c0,8.422,11.438,26.69,34.316,26.69 s34.316-18.268,34.316-26.69V280.245H465.17c8.422,0,26.69-11.438,26.69-34.316S473.59,211.614,465.167,211.614z"/>
            </svg>
        ),
        "down_icon": (
            <svg version="1.1" viewBox="0 0 255 255">
                <polygon points="0,63.75 127.5,191.25 255,63.75"/>
            </svg>
        ),
        "play_icon": (
            <svg version="1.1" viewBox="0 0 42 42">
                <path
                    d="M36.068,20.176l-29-20C6.761-0.035,6.363-0.057,6.035,0.114C5.706,0.287,5.5,0.627,5.5,0.999v40 c0,0.372,0.206,0.713,0.535,0.886c0.146,0.076,0.306,0.114,0.465,0.114c0.199,0,0.397-0.06,0.568-0.177l29-20 c0.271-0.187,0.432-0.494,0.432-0.823S36.338,20.363,36.068,20.176z"/>
            </svg>
        ),
        "netflix_originals": (
            <div className="showcase" data-state="netflix_originals" data-state-repeat="true" data-state-repeat-key="show">
                <div className="showcase_movie" data-state="id" data-state-path="$.view.show.id" data-bind-state="key">
                    <form className="showcase_movie_image" data-event="on_click_movie" data-bind-event="onSubmit" data-state-type="dictionary">
                        <input type="hidden" name="id" data-bind-state="defaultValue" data-state="id" data-state-path="$.view.show.id"/>
                        <input type="hidden" name="media_type" data-bind-state="defaultValue" data-state="media_type"
                               data-state-path="$.view.show.media_type" data-state-default-value="tv"/>
                        <input className="showcase_movie_image" type="image" data-bind-state="src" data-state="show_poster_image" alt=""/>
                    </form>
                </div>
            </div>
        ),
        "trending": (
            <div className="showcase" data-state="trending" data-state-repeat="true" data-state-repeat-key="show">
                <div className="showcase_movie" data-state="id" data-state-path="$.view.show.id" data-bind-state="key">
                    <form className="showcase_movie_image" data-event="on_click_movie" data-bind-event="onSubmit" data-state-type="dictionary">
                        <input type="hidden" name="id" data-bind-state="defaultValue" data-state="id" data-state-path="$.view.show.id"/>
                        <input type="hidden" name="media_type" data-bind-state="defaultValue" data-state="media_type"
                               data-state-path="$.view.show.media_type" data-state-default-value="tv"/>
                        <input className="showcase_movie_image" type="image" data-bind-state="src" data-state="show_backdrop_image" alt=""/>
                    </form>
                </div>
            </div>
        ),
        "netflix_originals_row": (
            <>
                <h1 className="movieShowcase__heading" data-state="netflix_originals_title">(netflix_originals_title)</h1>
                <div className="movieShowcase__container" draggable="true">
                    <div data-view="netflix_originals"/>
                </div>
            </>
        ),
        "trending_row": (
            <>
                <h1 className="movieShowcase__heading" data-state="trending_title">(trending_title)</h1>
                <div className="movieShowcase__container" draggable="true">
                    <div data-view="trending"/>
                </div>
            </>
        ),
        "header": (
            <header data-style="movie_background_image_style" className="header">
                <div className="header__container">
                    <h1 className="header_title" data-state="movie_title" data-state-path="$.app.$states.movie.title"
                        data-state-default-value="Title">
                        (movie_title)
                    </h1>
                    <button className="header__container-btnPlay" data-bind-event="onClick"
                            data-event="on_click_play">
                        <div data-view="play_icon" className="header_container_button_play"/>
                        <span data-state="play_title"/>
                    </button>
                    <button className="header__container-btnMyList" data-bind-event="onClick"
                            data-event="on_click_play">
                        <div data-view="add_icon" className="header__container-btnMyList-add"/>
                        <span data-state="my_list_title"/>
                    </button>
                    <p className="header__container-overview" data-state="movie_overview"
                       data-state-path="$.app.$states.movie.overview" data-state-default-value="Movie Overview"/>
                </div>
                <div className="header--fadeBottom"/>
            </header>
        ),
        "modal": (
            <>
                <div className="backdrop" data-bind-event="onClick" data-event="on_click_modal_background"/>
                <div className="modal show" data-style="movie_background_image_style">
                    <div className="modal__container">
                        <h1 className="modal__title" data-state="movie_title" data-state-path="$.app.$states.movie.title"
                            data-state-default-value="Title">
                            (movie_title)
                        </h1>
                        <p className="modal__info">
                            <span className="modal__rating" data-state="movie_rating" data-state-path="$.app.$states.movie.rating"
                                  data-state-default-value="0">
                                Rating: (movie_rating)&nbsp;
                            </span>
                            <span data-state="movie_release" data-state-path="$.app.$states.movie.release" data-state-default-value="">
                                Release: (movie_release)&nbsp;
                            </span>
                            <span data-state="movie_runtime" data-state-path="$.app.$states.movie.runtime" data-state-default-value="0">
                                Runtime: (movie_runtime) minutes
                            </span>
                        </p>
                        <p className="modal__overview" data-state="movie_overview"
                           data-state-path="$.app.$states.movie.overview" data-state-default-value="Movie Overview"/>
                        <button className="modal__btn modal__btn--red" data-bind-event="onClick" data-event="on_click_play">
                            <div data-view="play_icon" className="header_container_button_play"/>
                            <span data-state="play_title"/>
                        </button>
                        <button className="modal__btn" data-bind-event="onClick" data-event="on_click_play">
                            <div data-view="add_icon" className="modal__btn--icon"/>
                            <span data-state="my_list_title"/>
                        </button>
                    </div>
                </div>
            </>
        ),
        "main": (
            <div className="container">
                <div data-view="header"/>
                <div className="movieShowcase">
                    <div data-view="netflix_originals_row"/>
                    <div data-view="trending_row"/>
                    <div data-view="trending_row"/>
                    <div data-view="trending_row"/>
                    <div data-view="trending_row"/>
                    <div data-view="trending_row"/>
                </div>
            </div>
        ),
        "home": (
            <>
                <div data-view="main"/>
                <div data-view="modal" data-if="should_show_modal"/>
            </>
        ),
        "no_results": (
            <div className="no-results">
                <div className="no-results__text">
                    <p data-state="title" data-state-path="$.app.$states.title" data-state-default-value="">
                        Your search for (title) did not have any matches.<br/><br/>
                        Suggestions:<br/><br/>
                        ⦿ Try different keywords.<br/>
                        ⦿ Looking for a movie or TV show?<br/>
                        ⦿ Try using a movie, TV show title, an actor or director.<br/>
                        ⦿ Try a genre, like comedy, romance, sports, or drama.
                    </p>
                </div>
            </div>
        ),
        "results": (
            <div className="search-container" data-state="query" data-state-repeat="true" data-state-repeat-key="show">
                <div className="movie" data-state="id" data-state-path="$.view.show.id" data-bind-state="key">
                    <div className="movie__column-poster">
                        <form className="movie__poster" data-event="on_click_movie" data-bind-event="onSubmit"
                              data-state-type="dictionary">
                            <input type="hidden" name="id" data-bind-state="defaultValue" data-state="id" data-state-path="$.view.show.id"/>
                            <input type="hidden" name="media_type" data-bind-state="defaultValue" data-state="media_type"
                                   data-state-path="$.view.show.media_type" data-state-default-value="tv"/>
                            <input className="movie__poster" type="image" data-bind-state="src" data-state="show_poster_image" alt=""/>
                        </form>
                    </div>
                </div>
            </div>
        ),
        "search": (
            <>
                <div data-view="results" data-unless="search_no_results"/>
                <div data-view="no_results" data-if="search_no_results"/>
                <div data-view="modal" data-if="should_show_modal"/>
            </>
        ),
        "404": (
            <div className="no-results">
                <div className="no-results__text">
                    <p>
                        Lost your way?<br/><br/>
                        Sorry, we can't find that page. You'll find lots to explore on the home page.<br/><br/>
                        Error Code NSES-404
                    </p>
                </div>
            </div>
        ),
        "dropdown": (
            <div className="navigation__container--userLogo">
                <div className="dropdownContent">
                    <div>
                        <div className="dropdownContent--user"/>
                        <p className="dropdownContent--user-text" data-state="user_one"/>
                    </div>
                    <div>
                        <div className="dropdownContent--user dropdownContent--user-2"/>
                        <p className="dropdownContent--user-text" data-state="user_two"/>
                    </div>
                    <div>
                        <div className="dropdownContent--user dropdownContent--user-3"/>
                        <p className="dropdownContent--user-text" data-state="user_three"/>
                    </div>
                    <p className="dropdownContent-text" data-state="manage_profiles_title"/>
                </div>
                <div className="dropdownContent dropdownContent--2">
                    <p className="dropdownContent-textOutside" data-state="account_title"/>
                    <p className="dropdownContent-textOutside" data-state="help_title"/>
                    <p className="dropdownContent-textOutside" data-state="sign_out_title"/>
                </div>
            </div>
        ),
        "navigation_bar": (
            // Pull this up to root when we support binding multiple events.
            <nav className="navigation"
                 data-style="conditional_navigation_bar_style"
                 data-bind-event="scroll"
                 data-event="on_scroll"
                 data-event-target="window"
                 data-event-state="scrollY"
                 data-event-state-path="$.event.currentTarget.scrollY"
                 data-event-delay="0"
                 data-event-delay-type="debounce">
                <ul className="navigation__container">
                    <img className="navigation__container--logo" data-state="netflix_logo" data-bind-state="src"
                         data-bind-event="onClick" data-event="on_logo_click" alt=""/>
                    <div data-view="down_icon" className="navigation__container--downArrow-2"/>
                    <HomeButton/>
                    <div className="navigation_bar_link pseudo-link" data-state="shows_title"/>
                    <div className="navigation_bar_link pseudo-link" data-state="movies_title"/>
                    <div className="navigation_bar_link pseudo-link" data-state="recently_added_title"/>
                    <div className="navigation_bar_link pseudo-link" data-state="my_list_title"/>
                    <div className="navigation__container--left">
                        <div data-view="search_icon" className="logo"/>
                        <input className="navigation__container--left__input"
                               name="title"
                               type="text"
                               defaultValue=""
                               placeholder="Title, Genres, People"
                               data-bind-event="onKeyUp"
                               data-event="on_change_title"
                               data-event-state="title"
                               data-event-state-path="$.event.currentTarget.value"
                               data-event-state-default-value=""
                               data-event-delay="1000"
                               data-event-delay-type="debounce"/>
                    </div>
                    <div className="navigation_bar_link pseudo-link" data-state="kids_title"/>
                    <div className="navigation_bar_link pseudo-link" data-state="dvd_title"/>
                    <div data-view="bell_icon" className="navigation__container--bellLogo"/>
                    <div data-view="dropdown"/>
                    <div data-view="down_icon" className="navigation__container--downArrow"/>
                </ul>
            </nav>
        ),
        ...$views
    },
    "$composers": {
        HomeButton,
        ...$composers
    }
};
