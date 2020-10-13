import React from "react";

export const MovieRow = ({movies = []}) => {
    return (
        <div className="showcase">
            {
                movies.map((movie) => {
                    return (
                        <div className="showcase_movie" key={movie}>
                            <img className="showcase_movie_image" data-bind-event="onClick" data-event="on_click_movie"
                                 src={movie} alt=""/>
                        </div>
                    );
                })
            }
        </div>
    );
};

export const ShowRow = ({shows = [], poster = true}) => {
    return (
        <div className="showcase">
            {
                shows
                    .map(({id = 0, media_type = "tv", poster_path = "", backdrop_path = ""}) => {
                        return (
                            <div className="showcase_movie" key={id}>
                                <form className="showcase_movie_image" data-event="on_click_movie" data-bind-event="onSubmit"
                                      data-state-type="dictionary">
                                    <input name="id" type="hidden" value={JSON.stringify(id)}/>
                                    <input name="media_type" type="hidden" value={JSON.stringify(media_type)}/>
                                    <input className="showcase_movie_image" type="image"
                                           src={`https://image.tmdb.org/t/p/w500${poster ? poster_path : backdrop_path}`} alt=""/>
                                </form>
                            </div>
                        );
                    })
            }
        </div>
    );
};

export const SearchRow = ({query = []}) => {
    return (
        <div className="search-container">
            {
                query
                    .filter(({poster_path = "", media_type = ""}) => poster_path !== null && media_type !== "person")
                    .map((result) => {
                        const {id = 0, media_type = "tv", poster_path = ""} = result;
                        return (
                            <div className="movie" key={id}>
                                <div className="movie__column-poster">
                                    <form className="movie__poster" data-event="on_click_movie" data-bind-event="onSubmit"
                                          data-state-type="dictionary">
                                        <input name="id" type="hidden" value={JSON.stringify(id)}/>
                                        <input name="media_type" type="hidden" value={JSON.stringify(media_type)}/>
                                        <input className="movie__poster" type="image"
                                               src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt=""/>
                                    </form>
                                </div>
                            </div>
                        );
                    })
            }
        </div>
    );
};

export default {
    "$settings": {
        "debug": true,
        "mock": false
    },
    "$schemas": {
        "request_movie_success_schema": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["status", "headers", "body"],
            "properties": {
                "status": {"type": "integer", "const": 200},
                "headers": {
                    "type": "object",
                    "properties": {"content-type": {"type": "string", "pattern": "application[/]json"}}
                },
                "body": {
                    "$schema": "http://json-schema.org/schema#",
                    "type": "object",
                    "required": [],
                    "properties": {
                        "id": {"type": "number"},
                        "title": {"type": "string"},
                        "overview": {"type": "string"},
                        "runtime": {"type": "number"},
                        "vote_average": {"type": "number"},
                        "release_date": {"type": "string"},
                        "backdrop_path": {"type": ["string", "null"]}
                    }
                }
            }
        },
        "request_tv_success_schema": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["status", "headers", "body"],
            "properties": {
                "status": {"type": "integer", "const": 200},
                "headers": {
                    "type": "object",
                    "properties": {"content-type": {"type": "string", "pattern": "application[/]json"}}
                },
                "body": {
                    "$schema": "http://json-schema.org/schema#",
                    "type": "object",
                    "required": [],
                    "properties": {
                        "id": {"type": "number"},
                        "name": {"type": "string"},
                        "overview": {"type": "string"},
                        "episode_run_time": {"type": "array", "items": {"type": "number"}},
                        "vote_average": {"type": "number"},
                        "first_air_date": {"type": "string"},
                        "backdrop_path": {"type": ["string", "null"]}
                    }
                }
            }
        },
        "request_netflix_originals_success_schema": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["status", "headers", "body"],
            "properties": {
                "status": {"type": "integer", "const": 200},
                "headers": {
                    "type": "object",
                    "properties": {"content-type": {"type": "string", "pattern": "application[/]json"}}
                },
                "body": {
                    "$schema": "http://json-schema.org/schema#",
                    "type": "object",
                    "required": [],
                    "properties": {"results": {"type": "array"}}
                }
            }
        },
        "request_trending_success_schema": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["status", "headers", "body"],
            "properties": {
                "status": {"type": "integer", "const": 200},
                "headers": {
                    "type": "object",
                    "properties": {"content-type": {"type": "string", "pattern": "application[/]json"}}
                },
                "body": {
                    "$schema": "http://json-schema.org/schema#",
                    "type": "object",
                    "required": [],
                    "properties": {"results": {"type": "array"}}
                }
            }
        },
        "request_search_success_schema": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "required": ["status", "headers", "body"],
            "properties": {
                "status": {"type": "integer", "const": 200},
                "headers": {
                    "type": "object",
                    "properties": {"content-type": {"type": "string", "pattern": "application[/]json"}}
                },
                "body": {
                    "$schema": "http://json-schema.org/schema#",
                    "type": "object",
                    "required": [],
                    "properties": {"results": {"type": "array"}}
                }
            }
        },
        "title_schema": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "string",
            "pattern": "^.+$"
        },
        "search_no_results_schema": {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "array",
            "maxItems": 0
        }
    },
    "$composers": {
        MovieRow,
        ShowRow,
        SearchRow,
        "movie_title": {"$compose": "read", "$value": "$.app['$states'].movie.title", "$default": "movie_title"},
        "movie_overview": {"$compose": "read", "$value": "$.app['$states'].movie.overview", "$default": "movie_overview"},
        "movie_runtime": [
            {
                "$compose": "create",
                "$value": {"runtime": {"$compose": "read", "$value": "$.app['$states'].movie.runtime", "$default": 0}}
            },
            {
                "$compose": "expand", "$type": "template", "$value": "Runtime: {runtime} minutes ",
                "$default": "Runtime: {runtime} minutes "
            }
        ],
        "movie_rating": [
            {
                "$compose": "create",
                "$value": {"rating": {"$compose": "read", "$value": "$.app['$states'].movie.rating", "$default": 0}}
            },
            {"$compose": "expand", "$type": "template", "$value": "Rating: {rating} ", "$default": "Rating: {rating} "}
        ],
        "movie_release": [
            {
                "$compose": "create",
                "$value": {"release": {"$compose": "read", "$value": "$.app['$states'].movie.release", "$default": ""}}
            },
            {"$compose": "expand", "$type": "template", "$value": "Release: {release} ", "$default": "Release: {release} "}
        ],
        "movie_background_image": [
            {
                "$compose": "create",
                "$value": {
                    "background_image": {
                        "$compose": "read", "$value": "$.app['$states'].movie.background_image",
                        "$default": "/vbY95t58MDArtyUXUIb8Fx1dCry.jpg"
                    }
                }
            },
            {
                "$compose": "expand", "$value": "https://image.tmdb.org/t/p/original{background_image}",
                "$default": "https://image.tmdb.org/t/p/original{background_image}"
            }
        ],
        "modal_style": [
            {
                "$compose": "create",
                "$value": {
                    "backgroundSize": "cover",
                    "backgroundImage": [
                        {
                            "$compose": "create",
                            "$value": {"movie_background_image": {"$compose": "movie_background_image"}}
                        },
                        {
                            "$compose": "expand", "$value": "url({movie_background_image})",
                            "$default": "url({movie_background_image})"
                        }
                    ]
                }
            }
        ],
        "header_style": [
            {
                "$compose": "create",
                "$value": {
                    "backgroundImage": [
                        {
                            "$compose": "create",
                            "$value": {"movie_background_image": {"$compose": "movie_background_image"}}
                        },
                        {
                            "$compose": "expand", "$value": "url({movie_background_image})",
                            "$default": "url({movie_background_image})"
                        }
                    ]
                }
            }
        ],
        "is_title": [
            {"$compose": "read", "$value": "$.input", "$default": ""},
            {"$compose": "match", "$type": "json_schema", "$value": {"$schema": "title_schema"}, "$default": false}
        ],
        "is_movie": [
            {"$compose": "read", "$value": "$.input.media_type.0", "$default": ""},
            {"$compose": "match", "$type": "regular_expression", "$value": "(?:movie)", "$default": false}
        ],
        "search_no_results_body": [
            {
                "$compose": "create",
                "$value": {"title": {"$compose": "read", "$value": "$.app['$states'].title", "$default": ""}}
            },
            {
                "$compose": "expand",
                "$value": {"$compose": "read", "$value": "$.app['$states'].search_no_results_body", "$default": ""},
                "$default": ""
            }
        ],
        "search_no_results": [
            {"$compose": "read", "$value": "$.app['$states'].query", "$default": []},
            {
                "$compose": "match", "$type": "json_schema", "$value": {"$schema": "search_no_results_schema"},
                "$default": false
            }
        ],
        "show_poster_image": [
            {
                "$compose": "create",
                "$value": {
                    "poster_path": {
                        "$compose": "read", "$value": "$.view.show.poster_path", "$default": "/vbY95t58MDArtyUXUIb8Fx1dCry.jpg"
                    }
                }
            },
            {
                "$compose": "expand", "$value": "https://image.tmdb.org/t/p/w500{poster_path}",
                "$default": "https://image.tmdb.org/t/p/w500{poster_path}"
            }
        ]
    },
    "$requests": {
        "request_movie": {
            "$method": "GET",
            "$uri": "https://api.themoviedb.org/3/movie/{id}?api_key={api_key}",
            "$timeout": 30000
        },
        "request_tv": {
            "$method": "GET",
            "$uri": "https://api.themoviedb.org/3/tv/{id}?api_key={api_key}",
            "$timeout": 30000
        },
        "request_movie_background_image": {
            "$method": "GET",
            "$uri": "https://image.tmdb.org/t/p/original{background_image}",
            "$timeout": 30000
        },
        "request_netflix_originals": {
            "$method": "GET",
            "$uri": "https://api.themoviedb.org/3/discover/tv?with_networks=213&api_key={api_key}",
            "$timeout": 30000
        },
        "request_trending": {
            "$method": "GET",
            "$uri": "https://api.themoviedb.org/3/trending/all/week?api_key={api_key}",
            "$timeout": 30000
        },
        "request_search": {
            "$method": "GET",
            "$uri": "https://api.themoviedb.org/3/search/multi?query={query}&api_key={api_key}",
            "$timeout": 30000
        }
    },
    "$responses": {
        "request_movie_success": {
            "$status": 200,
            "$headers": {
                "access-control-allow-methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
                "access-control-allow-origin": "*",
                "access-control-expose-headers": "ETag, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After, Content-Length, Content-Range",
                "age": "58",
                "cache-control": "public, max-age=3600",
                "content-encoding": "br",
                "content-type": "application/json;charset=utf-8",
                "date": "Sat, 22 Aug 2020 14:55:15 GMT",
                "etag": "W/\"72743df27d5050181a671c94c5f9e124\"",
                "last-modified": "Sat, 22 Aug 2020 14:54:17 GMT",
                "server": "openresty",
                "status": "304",
                "vary": "Accept-Encoding",
                "via": "1.1 545e523089dd0806c0ea03a8c1e73d53.cloudfront.net (CloudFront)",
                "x-amz-cf-id": "1wRUOo_zHRWpnx_3iy4oib2snSUmmPrz_uG76SKcmsKUaRcvRs8Fmw==",
                "x-amz-cf-pop": "ORD52-C2",
                "x-cache": "Hit from cloudfront",
                "x-memc": "HIT",
                "x-memc-age": "2365",
                "x-memc-expires": "1235",
                "x-memc-key": "4e7258d5e4dd9f6ec63b81e4aa940114"
            },
            "$body": {
                "adult": false,
                "backdrop_path": "/vbY95t58MDArtyUXUIb8Fx1dCry.jpg",
                "belongs_to_collection": {
                    "id": 131292,
                    "name": "Iron Man Collection",
                    "poster_path": "/fbeJ7f0aD4A112Bc1tnpzyn82xO.jpg",
                    "backdrop_path": "/rI8zOWkRQJdlAyQ6WJOSlYK6JxZ.jpg"
                },
                "budget": 140000000,
                "genres": [{"id": 28, "name": "Action"}, {"id": 878, "name": "Science Fiction"}, {"id": 12, "name": "Adventure"}],
                "homepage": "https://www.marvel.com/movies/iron-man",
                "id": 1726,
                "imdb_id": "tt0371746",
                "original_language": "en",
                "original_title": "Iron Man",
                "overview": "After being held captive in an Afghan cave, billionaire engineer Tony Stark creates a unique weaponized suit of armor to fight evil.",
                "popularity": 38.373,
                "poster_path": "/78lPtwv72eTNqFW9COBYI0dWDJa.jpg",
                "production_companies": [{
                    "id": 420,
                    "logo_path": "/hUzeosd33nzE5MCNsZxCGEKTXaQ.png",
                    "name": "Marvel Studios",
                    "origin_country": "US"
                }, {"id": 4, "logo_path": "/fycMZt242LVjagMByZOLUGbCvv3.png", "name": "Paramount", "origin_country": "US"}, {
                    "id": 7297,
                    "logo_path": "/l29JYQVZbTcjZXoz4CUYFpKRmM3.png",
                    "name": "Fairview Entertainment",
                    "origin_country": "US"
                }],
                "production_countries": [{"iso_3166_1": "US", "name": "United States of America"}],
                "release_date": "2008-04-30",
                "revenue": 585174222,
                "runtime": 126,
                "spoken_languages": [{"iso_639_1": "en", "name": "English"}, {"iso_639_1": "fa", "name": "فارسی"}, {
                    "iso_639_1": "ur",
                    "name": "اردو"
                }, {"iso_639_1": "ar", "name": "العربية"}],
                "status": "Released",
                "tagline": "Heroes aren't born. They're built.",
                "title": "Iron Man",
                "video": false,
                "vote_average": 7.6,
                "vote_count": 18926
            }
        },
        "request_netflix_originals_success": {
            "$status": 200,
            "$headers": {
                "access-control-allow-methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
                "access-control-allow-origin": "*",
                "access-control-expose-headers": "ETag, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After, Content-Length, Content-Range",
                "cache-control": "public, max-age=120",
                "content-encoding": "br",
                "content-type": "application/json;charset=utf-8",
                "date": "Tue, 25 Aug 2020 03:46:55 GMT",
                "server": "openresty",
                "status": "200",
                "vary": "Accept-Encoding",
                "via": "1.1 519f948816b5a5f20661b64827cc02b1.cloudfront.net (CloudFront)",
                "x-amz-cf-id": "VLJw6fDTJiaNyEqnqT5QMHfjFqMov196sYaHpfPwHZrw2f6bBLpCbA==",
                "x-amz-cf-pop": "ORD51-C1",
                "x-cache": "Miss from cloudfront"
            },
            "$body": {
                "page": 1,
                "total_results": 906,
                "total_pages": 46,
                "results": [{
                    "original_name": "Lucifer",
                    "genre_ids": [80, 10765],
                    "name": "Lucifer",
                    "popularity": 286.139,
                    "origin_country": ["US"],
                    "vote_count": 4150,
                    "first_air_date": "2016-01-25",
                    "backdrop_path": "/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg",
                    "original_language": "en",
                    "id": 63174,
                    "vote_average": 8.5,
                    "overview": "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
                    "poster_path": "/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg"
                }, {
                    "original_name": "Biohackers",
                    "genre_ids": [18, 10765],
                    "name": "Biohackers",
                    "popularity": 60.401,
                    "origin_country": ["DE"],
                    "vote_count": 30,
                    "first_air_date": "2020-08-20",
                    "backdrop_path": "/3l96kBw60kOyfWh0hG2cphA6ST1.jpg",
                    "original_language": "de",
                    "id": 100074,
                    "vote_average": 8,
                    "overview": "Mia goes to medical school to get close to a professor she suspects had a hand in her past family tragedy and gets tangled in the world of biohacking.",
                    "poster_path": "/5vo9FY2aXSuoqtawSLP99EqbsUn.jpg"
                }, {
                    "original_name": "Stranger Things",
                    "genre_ids": [18, 9648, 10765],
                    "name": "Stranger Things",
                    "popularity": 63.125,
                    "origin_country": ["US"],
                    "vote_count": 5336,
                    "first_air_date": "2016-07-15",
                    "backdrop_path": "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
                    "original_language": "en",
                    "id": 66732,
                    "vote_average": 8.5,
                    "overview": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
                    "poster_path": "/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg"
                }, {
                    "original_name": "The Umbrella Academy",
                    "genre_ids": [35, 18, 10759, 10765],
                    "name": "The Umbrella Academy",
                    "popularity": 65.124,
                    "origin_country": ["US"],
                    "vote_count": 1337,
                    "first_air_date": "2019-02-15",
                    "backdrop_path": "/qJxzjUjCpTPvDHldNnlbRC4OqEh.jpg",
                    "original_language": "en",
                    "id": 75006,
                    "vote_average": 8.6,
                    "overview": "A dysfunctional family of superheroes comes together to solve the mystery of their father's death, the threat of the apocalypse and more.",
                    "poster_path": "/scZlQQYnDVlnpxFTxaIv2g0BWnL.jpg"
                }, {
                    "original_name": "Dark",
                    "genre_ids": [80, 18, 9648, 10765],
                    "name": "Dark",
                    "popularity": 57.453,
                    "origin_country": ["DE"],
                    "vote_count": 3179,
                    "first_air_date": "2017-12-01",
                    "backdrop_path": "/3lBDg3i6nn5R2NKFCJ6oKyUo2j5.jpg",
                    "original_language": "de",
                    "id": 70523,
                    "vote_average": 8.5,
                    "overview": "A missing child causes four families to help each other for answers. What they could not imagine is that this mystery would be connected to innumerable other secrets of the small town.",
                    "poster_path": "/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg"
                }, {
                    "original_name": "Star Wars: The Clone Wars",
                    "genre_ids": [16, 10759, 10765],
                    "name": "Star Wars: The Clone Wars",
                    "popularity": 55.145,
                    "origin_country": ["US"],
                    "vote_count": 682,
                    "first_air_date": "2008-10-03",
                    "backdrop_path": "/m6eRgkR1KC6Mr6gKx6gKCzSn6vD.jpg",
                    "original_language": "en",
                    "id": 4194,
                    "vote_average": 8.3,
                    "overview": "Yoda, Obi-Wan Kenobi, Anakin Skywalker, Mace Windu and other Jedi Knights lead the Grand Army of the Republic against the droid army of the Separatists.",
                    "poster_path": "/e1nWfnnCVqxS2LeTO3dwGyAsG2V.jpg"
                }, {
                    "original_name": "Black Mirror",
                    "genre_ids": [18, 10765],
                    "name": "Black Mirror",
                    "popularity": 52.529,
                    "origin_country": ["GB"],
                    "vote_count": 2037,
                    "first_air_date": "2011-12-04",
                    "backdrop_path": "/p39K75uoZLwnhGlEAJxRG5xAD9y.jpg",
                    "original_language": "en",
                    "id": 42009,
                    "vote_average": 8.3,
                    "overview": "A contemporary British re-working of The Twilight Zone with stories that tap into the collective unease about our modern world. \n\nOver the last ten years, technology has transformed almost every aspect of our lives before we've had time to stop and question it. In every home; on every desk; in every palm - a plasma screen; a monitor; a smartphone - a black mirror of our 21st Century existence.",
                    "poster_path": "/pXeuSWSKgWUnhRFHZ4TjAUU8lbE.jpg"
                }, {
                    "original_name": "La casa de papel",
                    "genre_ids": [80, 18],
                    "name": "Money Heist",
                    "popularity": 54.711,
                    "origin_country": ["ES"],
                    "vote_count": 8796,
                    "first_air_date": "2017-05-02",
                    "backdrop_path": "/xGexTKCJDkl12dTW4YCBDXWb1AD.jpg",
                    "original_language": "es",
                    "id": 71446,
                    "vote_average": 8.4,
                    "overview": "To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose. Five months of seclusion - memorizing every step, every detail, every probability - culminate in eleven days locked up in the National Coinage and Stamp Factory of Spain, surrounded by police forces and with dozens of hostages in their power, to find out whether their suicide wager will lead to everything or nothing.",
                    "poster_path": "/MoEKaPFHABtA1xKoOteirGaHl1.jpg"
                }, {
                    "original_name": "Anne with an E",
                    "genre_ids": [18, 10751],
                    "name": "Anne with an E",
                    "popularity": 44.869,
                    "origin_country": ["CA"],
                    "vote_count": 1639,
                    "first_air_date": "2017-03-19",
                    "backdrop_path": "/ywQtHG17LZhAFZyZtBflhtFMtJ7.jpg",
                    "original_language": "en",
                    "id": 70785,
                    "vote_average": 8.8,
                    "overview": "A coming-of-age story about an outsider who, against all odds and numerous challenges, fights for love and acceptance and for her place in the world. The series centers on a young orphaned girl in the late 1890’s, who, after an abusive childhood spent in orphanages and the homes of strangers, is mistakenly sent to live with an elderly woman and her aging brother. Over time, 13-year-old Anne will transform their lives and eventually the small town in which they live with her unique spirit, fierce intellect and brilliant imagination.",
                    "poster_path": "/6P6tXhjT5tK3qOXzxF9OMLlG7iz.jpg"
                }, {
                    "original_name": "Hoops",
                    "genre_ids": [16, 35],
                    "name": "Hoops",
                    "popularity": 35.813,
                    "origin_country": ["US"],
                    "vote_count": 15,
                    "first_air_date": "2020-08-21",
                    "backdrop_path": "/rpHJRtrmy1MIOS3hoYJQ2vK32mE.jpg",
                    "original_language": "en",
                    "id": 106238,
                    "vote_average": 6.9,
                    "overview": "A foul-mouthed high school basketball coach is sure he'll hit the big leagues if he can only turn his terrible team around. Good luck with that.",
                    "poster_path": "/3umUQ5DcZe7mSZGImCAStl2FRbm.jpg"
                }, {
                    "original_name": "BoJack Horseman",
                    "genre_ids": [16, 35, 18],
                    "name": "BoJack Horseman",
                    "popularity": 43.248,
                    "origin_country": ["US"],
                    "vote_count": 734,
                    "first_air_date": "2014-08-22",
                    "backdrop_path": "/AmIHaw6CQWOfBCQYom15Jzsu7OB.jpg",
                    "original_language": "en",
                    "id": 61222,
                    "vote_average": 8.5,
                    "overview": "Meet the most beloved sitcom horse of the 90s - 20 years later. BoJack Horseman was the star of the hit TV show \"Horsin' Around,\" but today he's washed up, living in Hollywood, complaining about everything, and wearing colorful sweaters.",
                    "poster_path": "/pB9L0jAnEQLMKgexqCEocEW8TA.jpg"
                }, {
                    "original_name": "DreamWorks Dragons",
                    "genre_ids": [16, 35, 10759, 10765],
                    "name": "DreamWorks Dragons",
                    "popularity": 41.666,
                    "origin_country": ["US"],
                    "vote_count": 269,
                    "first_air_date": "2012-08-07",
                    "backdrop_path": "/l8MgpYzOl8ejMn1lKCKO73bMrGY.jpg",
                    "original_language": "en",
                    "id": 44305,
                    "vote_average": 7.3,
                    "overview": "From the creators of \"How to Train Your Dragon\" comes a new series that takes Hiccup and Toothless to the edge of adventure.",
                    "poster_path": "/fDzGH0jGhJMMxbgsb9JiC7Ep4uk.jpg"
                }, {
                    "original_name": "13 Reasons Why",
                    "genre_ids": [18, 9648],
                    "name": "13 Reasons Why",
                    "popularity": 45.604,
                    "origin_country": ["US"],
                    "vote_count": 2033,
                    "first_air_date": "2017-03-31",
                    "backdrop_path": "/sZb21d6EWKAEKZ9GrLQeMwX4cWN.jpg",
                    "original_language": "en",
                    "id": 66788,
                    "vote_average": 7.7,
                    "overview": "After a teenage girl's perplexing suicide, a classmate receives a series of tapes that unravel the mystery of her tragic choice.",
                    "poster_path": "/nel144y4dIOdFFid6twN5mAX9Yd.jpg"
                }, {
                    "original_name": "Trollhunters: Tales of Arcadia",
                    "genre_ids": [16, 35, 10751, 10759],
                    "name": "Trollhunters: Tales of Arcadia",
                    "popularity": 38.132,
                    "origin_country": ["US"],
                    "vote_count": 330,
                    "first_air_date": "2016-12-23",
                    "backdrop_path": "/mhETUY8XxLewCZb6bKm6FyBlnhh.jpg",
                    "original_language": "en",
                    "id": 68267,
                    "vote_average": 8.3,
                    "overview": "After uncovering a mysterious amulet, an average teen assumes an unlikely destiny and sets out to save two worlds.",
                    "poster_path": "/zmFfWfUVJI3UgVOOUZbRbRQUIE5.jpg"
                }, {
                    "original_name": "House of Cards",
                    "genre_ids": [18],
                    "name": "House of Cards",
                    "popularity": 43.318,
                    "origin_country": ["US"],
                    "vote_count": 1491,
                    "first_air_date": "2013-02-01",
                    "backdrop_path": "/ex4kvQb0Ski5KL2fsnKQU2hV3oo.jpg",
                    "original_language": "en",
                    "id": 1425,
                    "vote_average": 8.1,
                    "overview": "Set in present day Washington, D.C., House of Cards is the story of Frank Underwood, a ruthless and cunning politician, and his wife Claire who will stop at nothing to conquer everything. This wicked political drama penetrates the shadowy world of greed, sex and corruption in modern D.C.",
                    "poster_path": "/hKWxWjFwnMvkWQawbhvC0Y7ygQ8.jpg"
                }, {
                    "original_name": "Ozark",
                    "genre_ids": [80, 18],
                    "name": "Ozark",
                    "popularity": 34.403,
                    "origin_country": ["US"],
                    "vote_count": 766,
                    "first_air_date": "2017-07-21",
                    "backdrop_path": "/hNaBXLiLTxMhtj7IFjOdJngXxxr.jpg",
                    "original_language": "en",
                    "id": 69740,
                    "vote_average": 8.1,
                    "overview": "A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss.",
                    "poster_path": "/oy7Peo5iFIt9sNM59lN6csbJeX2.jpg"
                }, {
                    "original_name": "Orange Is the New Black",
                    "genre_ids": [35, 18],
                    "name": "Orange Is the New Black",
                    "popularity": 37.689,
                    "origin_country": ["US"],
                    "vote_count": 1103,
                    "first_air_date": "2013-07-11",
                    "backdrop_path": "/z8Mg3YVZGd1iSnoDinEAoh9WTck.jpg",
                    "original_language": "en",
                    "id": 1424,
                    "vote_average": 7.6,
                    "overview": "A crime she committed in her youthful past sends Piper Chapman to a women's prison, where she trades her comfortable New York life for one of unexpected camaraderie and conflict in an eccentric group of fellow inmates.",
                    "poster_path": "/ekaa7YjGPTkFLcPhwWXTnARuCEU.jpg"
                }, {
                    "original_name": "Alta mar",
                    "genre_ids": [80, 18],
                    "name": "High Seas",
                    "popularity": 29.478,
                    "origin_country": ["ES"],
                    "vote_count": 46,
                    "first_air_date": "2019-05-24",
                    "backdrop_path": "/vSgn4IeZMiUE7mOgcNaTexPDwcX.jpg",
                    "original_language": "es",
                    "id": 88239,
                    "vote_average": 6.7,
                    "overview": "Two sisters discover disturbing family secrets after a string of mysterious deaths occur on a luxury ship traveling from Spain to Brazil in the 1940s.",
                    "poster_path": "/lzrnCDxQDvciVPWH9idxKRNaLKk.jpg"
                }, {
                    "original_name": "Las chicas del cable",
                    "genre_ids": [18],
                    "name": "Cable Girls",
                    "popularity": 35.374,
                    "origin_country": ["ES"],
                    "vote_count": 234,
                    "first_air_date": "2017-04-28",
                    "backdrop_path": "/iHLexEHCET03oGwe22gbHw0BfLL.jpg",
                    "original_language": "es",
                    "id": 71225,
                    "vote_average": 8,
                    "overview": "In 1920s Madrid, four women at the National Telephone Company ring in revolution as they deal with romance, envy and the modern workplace.",
                    "poster_path": "/lAwLmgq1zy0xJnusszmvWTLjFlO.jpg"
                }, {
                    "original_name": "Élite",
                    "genre_ids": [80, 18, 9648],
                    "name": "Elite",
                    "popularity": 33.947,
                    "origin_country": [],
                    "vote_count": 4498,
                    "first_air_date": "2018-10-05",
                    "backdrop_path": "/1qOA3kMtQO8bjnW8M2smjA8tp10.jpg",
                    "original_language": "es",
                    "id": 76669,
                    "vote_average": 8.4,
                    "overview": "When three working class kids enroll in the most exclusive school in Spain, the clash between the wealthy and the poor students leads to tragedy.",
                    "poster_path": "/3NTAbAiao4JLzFQw6YxP1YZppM8.jpg"
                }]
            }
        },
        "request_trending_success": {
            "$status": 200,
            "$headers": {
                "access-control-allow-methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
                "access-control-allow-origin": "*",
                "access-control-expose-headers": "ETag, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After, Content-Length, Content-Range",
                "age": "247",
                "cache-control": "public, max-age=600",
                "content-encoding": "br",
                "content-type": "application/json;charset=utf-8",
                "date": "Sat, 29 Aug 2020 04\":\"27\":\"41 GMT",
                "etag": "W/\"d1ff97a0ddbe410d33403406cb518cc8\"",
                "last-modified": "Sat, 29 Aug 2020 04\":\"27\":\"41 GMT",
                "server": "openresty",
                "status": "200",
                "vary": "Accept-Encoding",
                "via": "1.1 b0269df93790acb24b691aaeb1850a5f.cloudfront.net (CloudFront)",
                "x-amz-cf-id": "qOB9nGgqbIHIlpfG97E6QYobTs2RFg8hw68xGP_u9ywG3QMPbsxNMg==",
                "x-amz-cf-pop": "ORD52-C2",
                "x-cache": "Hit from cloudfront",
                "x-memc": "HIT",
                "x-memc-age": "550",
                "x-memc-expires": "50",
                "x-memc-key": "f87c4df7f5f8d8d02422303838dc7faf"
            },
            "$body": {
                "page": 1,
                "results": [{
                    "id": 605116,
                    "video": false,
                    "vote_count": 869,
                    "vote_average": 6.7,
                    "title": "Project Power",
                    "release_date": "2020-08-14",
                    "original_language": "en",
                    "original_title": "Project Power",
                    "genre_ids": [28, 80, 878],
                    "backdrop_path": "/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg",
                    "adult": false,
                    "overview": "An ex-soldier, a teen and a cop collide in New Orleans as they hunt for the source behind a dangerous new pill that grants users temporary superpowers.",
                    "poster_path": "/TnOeov4w0sTtV2gqICqIxVi74V.jpg",
                    "popularity": 614.082,
                    "media_type": "movie"
                }, {
                    "id": 539885,
                    "video": false,
                    "vote_count": 118,
                    "vote_average": 6.5,
                    "title": "Ava",
                    "release_date": "2020-08-06",
                    "original_language": "en",
                    "original_title": "Ava",
                    "genre_ids": [28, 80, 18, 53],
                    "backdrop_path": "/ekkuqt9Q2ad1F7xq2ZONP0oq36P.jpg",
                    "adult": false,
                    "overview": "A black ops assassin is forced to fight for her own survival after a job goes dangerously wrong.",
                    "poster_path": "/A3z0KMLIEGL22mVrgaV7KDxKRmT.jpg",
                    "popularity": 375.928,
                    "media_type": "movie"
                }, {
                    "id": 581392,
                    "video": false,
                    "vote_count": 165,
                    "vote_average": 7.4,
                    "title": "Peninsula",
                    "release_date": "2020-07-15",
                    "original_language": "ko",
                    "original_title": "반도",
                    "genre_ids": [28, 27, 53],
                    "backdrop_path": "/gEjNlhZhyHeto6Fy5wWy5Uk3A9D.jpg",
                    "adult": false,
                    "overview": "A soldier and his team battle hordes of post-apocalyptic zombies in the wastelands of the Korean Peninsula.",
                    "poster_path": "/sy6DvAu72kjoseZEjocnm2ZZ09i.jpg",
                    "popularity": 172.911,
                    "media_type": "movie"
                }, {
                    "original_name": "Lucifer",
                    "id": 63174,
                    "name": "Lucifer",
                    "vote_count": 4389,
                    "vote_average": 8.5,
                    "first_air_date": "2016-01-25",
                    "poster_path": "/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg",
                    "genre_ids": [80, 10765],
                    "original_language": "en",
                    "backdrop_path": "/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg",
                    "overview": "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
                    "origin_country": ["US"],
                    "popularity": 963.864,
                    "media_type": "tv"
                }, {
                    "id": 508570,
                    "video": false,
                    "vote_count": 71,
                    "vote_average": 7.2,
                    "title": "The One and Only Ivan",
                    "release_date": "2020-08-21",
                    "original_language": "en",
                    "original_title": "The One and Only Ivan",
                    "genre_ids": [35, 18, 10751],
                    "backdrop_path": "/fFdOJxmG2U7IYYlkFKtDk1nGPhF.jpg",
                    "adult": false,
                    "overview": "Ivan is a 400-pound silverback gorilla who shares a communal habitat in a suburban shopping mall with Stella the elephant, Bob the dog, and various other animals. He has few memories of the jungle where he was captured, but when a baby elephant named Ruby arrives, it touches something deep within him. Ruby is recently separated from her family in the wild, which causes him to question his life, where he comes from and where he ultimately wants to be.",
                    "poster_path": "/e7ZsW5EbLbQwoGx0548KCmCAXA9.jpg",
                    "popularity": 81.278,
                    "media_type": "movie"
                }, {
                    "id": 577922,
                    "video": false,
                    "vote_count": 401,
                    "vote_average": 7.6,
                    "title": "Tenet",
                    "release_date": "2020-08-22",
                    "original_language": "en",
                    "original_title": "Tenet",
                    "genre_ids": [28, 53],
                    "backdrop_path": "/wzJRB4MKi3yK138bJyuL9nx47y6.jpg",
                    "adult": false,
                    "overview": "Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
                    "poster_path": "/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
                    "popularity": 353.67,
                    "media_type": "movie"
                }, {
                    "id": 626393,
                    "video": false,
                    "vote_count": 82,
                    "vote_average": 6.7,
                    "title": "The Sleepover",
                    "release_date": "2020-08-21",
                    "original_language": "en",
                    "original_title": "The Sleepover",
                    "genre_ids": [28, 10751],
                    "backdrop_path": "/mQngZ4DtXqdkX9fOQRsm9iym5OW.jpg",
                    "adult": false,
                    "overview": "Two siblings who discover their seemingly normal mom is a former thief in witness protection. Mom is forced to pull one last job, and the kids team up to rescue her over the course of an action-packed night.",
                    "poster_path": "/9iEc34Qje2V3FZnrSXKfZsbiHjW.jpg",
                    "popularity": 178.485,
                    "media_type": "movie"
                }, {
                    "id": 718444,
                    "video": false,
                    "vote_count": 82,
                    "vote_average": 6.0,
                    "title": "Rogue",
                    "release_date": "2020-08-20",
                    "original_language": "en",
                    "original_title": "Rogue",
                    "genre_ids": [28],
                    "backdrop_path": "/jvKIBaMssk3D7ZH4VF4rLz6A3OK.jpg",
                    "adult": false,
                    "overview": "Battle-hardened O’Hara leads a lively mercenary team of soldiers on a daring mission: rescue hostages from their captors in remote Africa. But as the mission goes awry and the team is stranded, O’Hara’s squad must face a bloody, brutal encounter with a gang of rebels.",
                    "poster_path": "/uOw5JD8IlD546feZ6oxbIjvN66P.jpg",
                    "popularity": 435.961,
                    "media_type": "movie"
                }, {
                    "id": 501979,
                    "video": false,
                    "vote_count": 18,
                    "vote_average": 6.4,
                    "title": "Bill \u0026 Ted Face the Music",
                    "release_date": "2020-08-27",
                    "original_language": "en",
                    "original_title": "Bill \u0026 Ted Face the Music",
                    "genre_ids": [12, 35, 878],
                    "backdrop_path": "/zeVs5f9zY5W4Lf0CUlFpsHDusnj.jpg",
                    "adult": false,
                    "overview": "Yet to fulfill their rock and roll destiny, the now middle aged best friends Bill and Ted set out on a new adventure when a visitor from the future warns them that only their song can save life as we know it. Along the way, they will be helped by their daughters, a new batch of historical figures, and a few music legends — to seek the song that will set their world right and bring harmony in the universe.",
                    "poster_path": "/y9YLNfUOrqFbYl8q1FpQuuo5MLx.jpg",
                    "popularity": 83.405,
                    "media_type": "movie"
                }, {
                    "original_name": "Lovecraft Country",
                    "id": 82816,
                    "name": "Lovecraft Country",
                    "vote_count": 89,
                    "vote_average": 7.4,
                    "first_air_date": "2020-08-16",
                    "poster_path": "/fz7bdjxPColvEWCGr5Kiclzc86d.jpg",
                    "genre_ids": [18, 9648, 10765],
                    "original_language": "en",
                    "backdrop_path": "/qx7qy2GJOc7yGY6WENyBU3OVv7A.jpg",
                    "overview": "The anthology horror series follows 25-year-old Atticus Black, who joins up with his friend Letitia and his Uncle George to embark on a road trip across 1950s Jim Crow America to find his missing father. They must survive and overcome both the racist terrors of white America and the malevolent spirits that could be ripped from a Lovecraft paperback.",
                    "origin_country": ["US"],
                    "popularity": 310.264,
                    "media_type": "tv"
                }, {
                    "id": 621013,
                    "video": false,
                    "vote_count": 214,
                    "vote_average": 8.1,
                    "title": "Chemical Hearts",
                    "release_date": "2020-08-21",
                    "original_language": "en",
                    "original_title": "Chemical Hearts",
                    "genre_ids": [18, 10749],
                    "backdrop_path": "/1eq896TCOEeN9Q8iTJL0n9u31Qf.jpg",
                    "adult": false,
                    "overview": "A high school transfer student finds a new passion when she begins to work on the school's newspaper.",
                    "poster_path": "/q1MNlZYqhoD4U7sd7pjxD6SUf4z.jpg",
                    "popularity": 223.007,
                    "media_type": "movie"
                }, {
                    "id": 726664,
                    "video": false,
                    "vote_count": 46,
                    "vote_average": 6.7,
                    "title": "Fearless",
                    "release_date": "2020-08-14",
                    "original_language": "en",
                    "original_title": "Fearless",
                    "genre_ids": [16, 35],
                    "backdrop_path": "/s7NC2kntiPB3WltWj9bnNTkoqUp.jpg",
                    "adult": false,
                    "overview": "A teen gamer is forced to level up to full-time babysitter when his favorite video game drops three superpowered infants from space into his backyard.",
                    "poster_path": "/5oQJ6HeNGWnEtP9Qyt5IZjuKI7j.jpg",
                    "popularity": 109.451,
                    "media_type": "movie"
                }, {
                    "id": 703771,
                    "video": false,
                    "vote_count": 116,
                    "vote_average": 6.9,
                    "title": "Deathstroke: Knights \u0026 Dragons - The Movie",
                    "release_date": "2020-08-04",
                    "original_language": "en",
                    "original_title": "Deathstroke: Knights \u0026 Dragons - The Movie",
                    "genre_ids": [28, 16],
                    "backdrop_path": "/owraiceOKtSOa3t8sp3wA9K2Ox6.jpg",
                    "adult": false,
                    "overview": "Ten years ago, Slade Wilson-aka the super-assassin called Deathstroke-made a tragic mistake and his wife and son paid a terrible price. Now, a decade later, Wilson's family is threatened once again by the murderous Jackal and the terrorists of H.IV.E. Can Deathstroke atone for the sins of the past-or will his family pay the ultimate price?",
                    "poster_path": "/vFIHbiy55smzi50RmF8LQjmpGcx.jpg",
                    "popularity": 144.507,
                    "media_type": "movie"
                }, {
                    "adult": false,
                    "backdrop_path": "/86L8wqGMDbwURPni2t7FQ0nDjsH.jpg",
                    "genre_ids": [28, 53],
                    "id": 724989,
                    "original_language": "en",
                    "original_title": "Hard Kill",
                    "overview": "The work of billionaire tech CEO Donovan Chalmers is so valuable that he hires mercenaries to protect it, and a terrorist group kidnaps his daughter just to get it.",
                    "poster_path": "/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg",
                    "release_date": "2020-08-25",
                    "title": "Hard Kill",
                    "video": false,
                    "vote_average": 5.9,
                    "vote_count": 12,
                    "popularity": 68.428,
                    "media_type": "movie"
                }, {
                    "id": 618354,
                    "video": false,
                    "vote_count": 75,
                    "vote_average": 7.5,
                    "title": "Superman: Man of Tomorrow",
                    "release_date": "2020-08-23",
                    "original_language": "en",
                    "original_title": "Superman: Man of Tomorrow",
                    "genre_ids": [28, 16, 878],
                    "backdrop_path": "/bazlsLkNuhy3IuhviepqvlMm2hV.jpg",
                    "adult": false,
                    "overview": "It’s the dawn of a new age of heroes, and Metropolis has just met its first. But as Daily Planet intern Clark Kent – working alongside reporter Lois Lane – secretly wields his alien powers of flight, super-strength and x-ray vision in the battle for good, there’s even greater trouble on the horizon.",
                    "poster_path": "/6Bbq8qQWpoApLZYWFFAuZ1r2gFw.jpg",
                    "popularity": 305.2,
                    "media_type": "movie"
                }, {
                    "id": 721452,
                    "video": false,
                    "vote_count": 41,
                    "vote_average": 7.5,
                    "title": "One Night in Bangkok",
                    "release_date": "2020-08-25",
                    "original_language": "en",
                    "original_title": "One Night in Bangkok",
                    "genre_ids": [28, 53],
                    "backdrop_path": "/riDrpqQtZpXGeiJdlmfcwwPH7nN.jpg",
                    "adult": false,
                    "overview": "A hit man named Kai flies into Bangkok, gets a gun, and orders a cab. He offers a professional female driver big money to be his all-night driver. But when she realizes Kai is committing brutal murders at each stop, it's too late to walk away. Meanwhile, an offbeat police detective races to decode the string of slayings before more blood is spilled.",
                    "poster_path": "/i4kPwXPlM1iy8Jf3S1uuLuwqQAV.jpg",
                    "popularity": 189.465,
                    "media_type": "movie"
                }, {
                    "id": 299534,
                    "video": false,
                    "vote_count": 14758,
                    "vote_average": 8.3,
                    "title": "Avengers: Endgame",
                    "release_date": "2019-04-24",
                    "original_language": "en",
                    "original_title": "Avengers: Endgame",
                    "genre_ids": [28, 12, 878],
                    "backdrop_path": "/orjiB3oUIsyz60hoEqkiGpy5CeO.jpg",
                    "adult": false,
                    "overview": "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
                    "poster_path": "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
                    "popularity": 92.306,
                    "media_type": "movie"
                }, {
                    "id": 521034,
                    "video": false,
                    "vote_count": 118,
                    "vote_average": 7.2,
                    "title": "The Secret Garden",
                    "release_date": "2020-07-08",
                    "original_language": "en",
                    "original_title": "The Secret Garden",
                    "genre_ids": [18, 14, 10751],
                    "backdrop_path": "/8PK4X8U3C79ilzIjNTkTgjmc4js.jpg",
                    "adult": false,
                    "overview": "Mary Lennox is born in India to wealthy British parents who never wanted her. When her parents suddenly die, she is sent back to England to live with her uncle. She meets her sickly cousin, and the two children find a wondrous secret garden lost in the grounds of Misselthwaite Manor.",
                    "poster_path": "/5MSDwUcqnGodFTvtlLiLKK0XKS.jpg",
                    "popularity": 42.577,
                    "media_type": "movie"
                }, {
                    "id": 516486,
                    "video": false,
                    "vote_count": 1014,
                    "vote_average": 7.5,
                    "title": "Greyhound",
                    "release_date": "2020-06-19",
                    "original_language": "en",
                    "original_title": "Greyhound",
                    "genre_ids": [28, 18, 10752],
                    "backdrop_path": "/xXBnM6uSTk6qqCf0SRZKXcga9Ba.jpg",
                    "adult": false,
                    "overview": "A first-time captain leads a convoy of allied ships carrying thousands of soldiers across the treacherous waters of the “Black Pit” to the front lines of WW2. With no air cover protection for 5 days, the captain and his convoy must battle the surrounding enemy Nazi U-boats in order to give the allies a chance to win the war.",
                    "poster_path": "/kjMbDciooTbJPofVXgAoFjfX8Of.jpg",
                    "popularity": 176.302,
                    "media_type": "movie"
                }, {
                    "original_name": "Game of Thrones",
                    "id": 1399,
                    "name": "Game of Thrones",
                    "vote_count": 10018,
                    "vote_average": 8.3,
                    "first_air_date": "2011-04-17",
                    "poster_path": "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
                    "genre_ids": [18, 10765],
                    "original_language": "en",
                    "backdrop_path": "/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
                    "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
                    "origin_country": ["US"],
                    "popularity": 201.652,
                    "media_type": "tv"
                }],
                "total_pages": 1000,
                "total_results": 20000
            }
        },
        "request_search_success": {
            "$status": 200,
            "$headers": {
                "access-control-allow-methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
                "access-control-allow-origin": "*",
                "access-control-expose-headers": "ETag, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After, Content-Length, Content-Range",
                "cache-control": "public, max-age=120",
                "content-encoding": "br",
                "content-type": "application/json;charset=utf-8",
                "date": "Tue, 01 Sep 2020 02:35:55 GMT",
                "server": "openresty",
                "status": "200",
                "vary": "Accept-Encoding",
                "via": "1.1 519f948816b5a5f20661b64827cc02b1.cloudfront.net (CloudFront)",
                "x-amz-cf-id": "2O-qHF9LcttPnCA1dh7-iuACDBNhCuTVrEALPJRkYPDqAg2n0qS6uQ==",
                "x-amz-cf-pop": "ORD51-C1",
                "x-cache": "Miss from cloudfront"
            },
            "$body": {
                "page": 1,
                "total_results": 2586,
                "total_pages": 130,
                "results": [{
                    "poster_path": "/soq3AxjALdBfdPAm8H7yuMmNL5Y.jpg",
                    "popularity": 67.1,
                    "vote_count": 945,
                    "video": false,
                    "media_type": "movie",
                    "id": 303857,
                    "adult": false,
                    "backdrop_path": "/kIgfFzjjBNgx6Tr2LCw8Zkq921s.jpg",
                    "original_language": "ja",
                    "original_title": "ドラゴンボールZ 復活の「F」",
                    "genre_ids": [28, 16, 878],
                    "title": "Dragon Ball Z: Resurrection 'F'",
                    "vote_average": 6.9,
                    "overview": "One peaceful day on Earth, two remnants of Frieza's army named Sorbet and Tagoma arrive searching for the Dragon Balls with the aim of reviving Frieza. They succeed, and Frieza subsequently seeks revenge on the Saiyans.",
                    "release_date": "2015-04-18"
                }, {
                    "poster_path": "/18NzrINUtiYRkk2TlLnQaKo8FDB.jpg",
                    "popularity": 14.498,
                    "vote_count": 119,
                    "video": false,
                    "media_type": "movie",
                    "id": 137145,
                    "adult": false,
                    "backdrop_path": "/9dibbnwFz6mSdFewyrVzk36NGLN.jpg",
                    "original_language": "en",
                    "original_title": "247°F",
                    "genre_ids": [27, 53],
                    "title": "247°F",
                    "vote_average": 5.2,
                    "overview": "Four friends travel to a lakeside cabin for a carefree weekend, but the fun turns into a nightmare when 3 of them end up locked in a hot sauna. Every minute counts and every degree matters as they fight for their lives in the heat up to 247°F.",
                    "release_date": "2011-09-01"
                }, {
                    "poster_path": "/1vh1i0JwSeKs5sD8jamH4dvTmVX.jpg",
                    "popularity": 19.42,
                    "vote_count": 241,
                    "video": false,
                    "media_type": "movie",
                    "id": 487702,
                    "adult": false,
                    "backdrop_path": "/bWvV3T3EWH608tRRNsd9AgU3xWD.jpg",
                    "original_language": "en",
                    "original_title": "F*&% the Prom",
                    "genre_ids": [35],
                    "title": "F*&% the Prom",
                    "vote_average": 5.6,
                    "overview": "Maddy and Cole were inseparable friends until high school started and Maddy became the most popular girl on campus. When she starts feeling lonely and heartbroken, she reconnects with Cole and the duo conspire to destroy the ultimate teen popularity contest",
                    "release_date": "2017-12-05"
                }, {
                    "poster_path": "/8m3Y2IkND1XqeDLKWiEaEJwhS0F.jpg",
                    "popularity": 13.102,
                    "vote_count": 203,
                    "video": false,
                    "media_type": "movie",
                    "id": 9873,
                    "adult": false,
                    "backdrop_path": "/9eciZ9R8d1y23QpIfW4cJRInbqG.jpg",
                    "original_language": "en",
                    "original_title": "F/X",
                    "genre_ids": [28, 80, 53],
                    "title": "F/X",
                    "vote_average": 6.4,
                    "overview": "A movies special effects man is hired by a government agency to help stage the assassination of a well known gangster. When the agency double cross him, he uses his special effects to trap the gangster and the corrupt agents.",
                    "release_date": "1986-02-07"
                }, {
                    "original_name": "F is for Family",
                    "id": 63522,
                    "media_type": "tv",
                    "name": "F is for Family",
                    "popularity": 29.507,
                    "vote_count": 127,
                    "vote_average": 7.2,
                    "first_air_date": "2015-12-18",
                    "poster_path": "/86hMUI1sRMmDPOWRd6kLa3nO181.jpg",
                    "genre_ids": [35, 16],
                    "original_language": "en",
                    "backdrop_path": "/bdntcURJ4dSr7zoLeyB6ZGrMynD.jpg",
                    "overview": "Follow the Murphy family back to the 1970s, when kids roamed wild, beer flowed freely and nothing came between a man and his TV.",
                    "origin_country": ["US"]
                }, {
                    "poster_path": "/v0xCAl44FEJQn7E1FvmY0pUTB14.jpg",
                    "popularity": 11.909,
                    "vote_count": 116,
                    "video": false,
                    "media_type": "movie",
                    "id": 16820,
                    "adult": false,
                    "backdrop_path": "/cWRwP7nBMI0c5JXNLxGpGdAX8O5.jpg",
                    "original_language": "en",
                    "original_title": "F/X2",
                    "genre_ids": [28, 12, 35, 53],
                    "title": "F/X2",
                    "vote_average": 6,
                    "overview": "F/X man Rollie Tyler is now a toymaker. Mike, the ex-husband of his girlfriend Kim, is a cop. He asks Rollie to help catch a killer. The operation goes well until some unknown man kills both the killer and Mike. Mike's boss, Silak says it was the killer who killed Mike but Rollie knows it wasn't. Obviously, Silak is involved with Mike's death, so he calls on Leo McCarthy, the cop from the last movie, who is now a P.I., for help and they discover it's not just Silak they have to worry about.",
                    "release_date": "1991-04-16"
                }, {
                    "poster_path": "/dwJWWc2xhTZEYKrIWn52uhYvbyn.jpg",
                    "popularity": 7.509,
                    "vote_count": 74,
                    "video": false,
                    "media_type": "movie",
                    "id": 53459,
                    "adult": false,
                    "backdrop_path": null,
                    "original_language": "en",
                    "original_title": "F",
                    "genre_ids": [27, 53],
                    "title": "F",
                    "vote_average": 5.6,
                    "overview": "A group of teachers must defend themselves from a gang of murderous kids when their school comes under siege after hours.",
                    "release_date": "2010-09-07"
                }, {
                    "original_name": "F Troop",
                    "genre_ids": [35, 37],
                    "media_type": "tv",
                    "name": "F Troop",
                    "popularity": 11.527,
                    "origin_country": ["US"],
                    "vote_count": 14,
                    "first_air_date": "1965-09-14",
                    "backdrop_path": "/snDkDNYn9noRysBWWFuBaEqV1V0.jpg",
                    "original_language": "en",
                    "id": 1062,
                    "vote_average": 7.2,
                    "overview": "F Troop is a satirical American television sitcom that originally aired for two seasons on ABC-TV. It debuted in the United States on September 14, 1965 and concluded its run on April 6, 1967 with a total of 65 episodes. The first season of 34 episodes was filmed in black-and-white, but the show switched to color for its second season.",
                    "poster_path": "/v3YlepJIUhzydMNKfhsExkP3sd.jpg"
                }, {
                    "poster_path": "/oIxGqt2XKTLEKLHVffIv9hUlW0T.jpg",
                    "popularity": 16.995,
                    "vote_count": 201,
                    "video": false,
                    "media_type": "movie",
                    "id": 598133,
                    "adult": false,
                    "backdrop_path": "/1FlAXJdpBgBXFnFpKQo44J91yGc.jpg",
                    "original_language": "en",
                    "original_title": "The F**k-It List",
                    "genre_ids": [35],
                    "title": "The F**k-It List",
                    "vote_average": 6.2,
                    "overview": "After a prank blows up a studious high school senior's life, he shares a list of certain things he wishes he'd done differently — and maybe still can.",
                    "release_date": "2020-07-01"
                }, {
                    "original_name": "The End of the F***ing World",
                    "genre_ids": [35, 80, 18],
                    "media_type": "tv",
                    "name": "The End of the F***ing World",
                    "popularity": 54.553,
                    "origin_country": ["GB"],
                    "vote_count": 1090,
                    "first_air_date": "2017-10-24",
                    "backdrop_path": "/qBw99h23veY7bTccAzV4bRCg86n.jpg",
                    "original_language": "en",
                    "id": 74577,
                    "vote_average": 8.2,
                    "overview": "James is 17 and is pretty sure he is a psychopath. Alyssa, also 17, is the cool and moody new girl at school. The pair make a connection and she persuades him to embark on a darkly comedic road trip in search of her real father.",
                    "poster_path": "/vZQKQcB5n91c6tBofAVXq88Uuti.jpg"
                }, {
                    "poster_path": "/pxjCfoKO48JJN7L3QieYGOwWDig.jpg",
                    "popularity": 15.179,
                    "vote_count": 793,
                    "video": false,
                    "media_type": "movie",
                    "id": 9589,
                    "adult": false,
                    "backdrop_path": "/rfMYnpiXtpuWJPHbuC6xlDnupOC.jpg",
                    "original_language": "de",
                    "original_title": "Christiane F. - Wir Kinder vom Bahnhof Zoo",
                    "genre_ids": [18],
                    "title": "Christiane F.",
                    "vote_average": 7.3,
                    "overview": "This movie portrays the drug scene in Berlin in the 70s, following tape recordings of Christiane F. 14 years old Christiane lives with her mother and little sister in a typical multi-storey apartment building in Berlin. She's fascinated by the 'Sound', a new disco with most modern equipment. Although she's legally too young, she asks a friend to take her. There she meets Detlef, who's in a clique where everybody's on drugs. Step by step she gets drawn deeper into the scene.",
                    "release_date": "1981-04-01"
                }, {
                    "poster_path": "/tSyh7XLyVOxUP3AwYCcgcyQxew0.jpg",
                    "popularity": 9.777,
                    "vote_count": 102,
                    "video": false,
                    "media_type": "movie",
                    "id": 20348,
                    "adult": false,
                    "backdrop_path": "/rZs4l2gwhzCk3G9OhSiLEbB35i1.jpg",
                    "original_language": "en",
                    "original_title": "Fandango",
                    "genre_ids": [35, 18],
                    "title": "Fandango",
                    "vote_average": 6.6,
                    "overview": "Five college buddies from the University of Texas circa 1971 embark on a final road trip odyssey across the Mexican border before facing up to uncertain futures, in Vietnam and otherwise.",
                    "release_date": "1985-01-25"
                }, {
                    "poster_path": "/hZwIseIiGDQrmktbcG4DA139H8y.jpg",
                    "popularity": 16.149,
                    "vote_count": 85,
                    "video": false,
                    "media_type": "movie",
                    "id": 146631,
                    "adult": false,
                    "backdrop_path": "/kjMFnngbARSnaxqq1JFVxZnilJc.jpg",
                    "original_language": "en",
                    "original_title": "U.F.O.",
                    "genre_ids": [28, 12, 35, 27, 878],
                    "title": "U.F.O.",
                    "vote_average": 3.4,
                    "overview": "A group of friends awake one morning to find all electricity and power shut off and an immense alien aircraft hovering in the air above their heads. Suddenly this regular group of friends is battling to survive as the entire human race is threatened by the alien army hovering ominously above.",
                    "release_date": "2012-12-15"
                }, {
                    "original_name": "T.U.F.F. Puppy",
                    "genre_ids": [16, 35, 10759],
                    "media_type": "tv",
                    "name": "T.U.F.F. Puppy",
                    "popularity": 13.059,
                    "origin_country": ["US"],
                    "vote_count": 14,
                    "first_air_date": "2010-10-02",
                    "backdrop_path": "/kllii8HzUP6W8A9x4oaMh099VMz.jpg",
                    "original_language": "en",
                    "id": 18828,
                    "vote_average": 7.7,
                    "overview": "T.U.F.F. Puppy is an American animated television series created by Butch Hartman for Nickelodeon. It premiered on October 2, 2010 on Nickelodeon along with Planet Sheen. T.U.F.F. Puppy is Butch Hartman's third animated series for Nickelodeon, after The Fairly OddParents and Danny Phantom.\n\nIn early 2011, the series was renewed for a second season and premiered on December 10, 2011. The first season contained 20 episodes and seasons 2 and 3 are scheduled for the same. Currently, the series is on hiatus from the Nickelodeon channel, although reruns air every day in 90 minute to 3 hour blocks on the Nicktoons channel. The show temporarily returned on August 5, 2013 at 1:30 PM for one week before going back on hiatus.",
                    "poster_path": "/A7qAtSucoTuqpgLJBILTXgAH4U3.jpg"
                }, {
                    "poster_path": "/cQFJ0lWaR5sYg06KQWtMy8TRYFI.jpg",
                    "popularity": 13.454,
                    "vote_count": 82,
                    "video": false,
                    "media_type": "movie",
                    "id": 438435,
                    "adult": false,
                    "backdrop_path": "/eWUZQXzqkgU9ShrUZt2EiKpMyj0.jpg",
                    "original_language": "en",
                    "original_title": "M.F.A.",
                    "genre_ids": [53],
                    "title": "M.F.A.",
                    "vote_average": 6.1,
                    "overview": "After the accidental death of her rapist, an art student becomes an unlikely vigilante, set out to avenge college girls whose rapists were not charged.",
                    "release_date": "2017-03-13"
                }, {
                    "original_name": "キューティーハニーＦ",
                    "genre_ids": [35, 10759, 10765],
                    "media_type": "tv",
                    "name": "Cutie Honey Flash",
                    "popularity": 6.431,
                    "origin_country": ["JP"],
                    "vote_count": 1,
                    "first_air_date": "1997-02-15",
                    "backdrop_path": "/xcCTezlBi75qB9LIuUgEtxdsMfO.jpg",
                    "original_language": "ja",
                    "id": 36001,
                    "vote_average": 4,
                    "overview": "Cutie Honey Flash is a 1997 anime television series in the Cutie Honey franchise. In its native Japan, the series assumed the timeslot of Sailor Stars, the final story arc of the long-running Sailor Moon anime. Employing many of the same animation staff of Sailor Stars, including animation director Miho Shimagasa, Flash features very similar character designs and fits the more traditional mold of magical girl series, aimed at the Sailor Moon demographic. The series was also broadcast in Germany.",
                    "poster_path": "/9uUSPKekXh9gc0FBqK0i95kFqsO.jpg"
                }, {
                    "poster_path": "/2bhI7Ivk7VmvUaJaDTxJUgOXp1E.jpg",
                    "popularity": 12.95,
                    "vote_count": 486,
                    "video": false,
                    "media_type": "movie",
                    "id": 291984,
                    "adult": false,
                    "backdrop_path": "/duXbSimVAH4ZThehr8EFq8d4zlU.jpg",
                    "original_language": "en",
                    "original_title": "The Death & Life of John F. Donovan",
                    "genre_ids": [18],
                    "title": "The Death & Life of John F. Donovan",
                    "vote_average": 7.1,
                    "overview": "A decade after the death of an American TV star, a young actor reminisces about the written correspondence he once shared with the former, as well as the impact those letters had on both their lives.",
                    "release_date": "2019-03-13"
                }, {
                    "original_name": "Code F.",
                    "id": 73658,
                    "media_type": "tv",
                    "name": "Code F.",
                    "popularity": 4.081,
                    "vote_count": 0,
                    "vote_average": 0,
                    "first_air_date": "2015-06-15",
                    "poster_path": "/p6UaMaH2FTaylBMvqYxf4UYEdYZ.jpg",
                    "genre_ids": [10767],
                    "original_language": "fr",
                    "backdrop_path": "/fdXlzdADyeZhOrxFYBf0dBYHMam.jpg",
                    "overview": "Hip young women take on the unwritten laws of the female universe. No topic will escape the frank, funny and self-deprecating comments of the women of Code F.",
                    "origin_country": ["CA"]
                }, {
                    "poster_path": "/3vDQbXCliqQCsH0EcC2v5NMuLgp.jpg",
                    "popularity": 8.947,
                    "vote_count": 45,
                    "video": false,
                    "media_type": "movie",
                    "id": 421044,
                    "adult": false,
                    "backdrop_path": "/tdCHGB6Syji3xg8LRvv5tmvPtRY.jpg",
                    "original_language": "en",
                    "original_title": "Best F(r)iends: Volume 1",
                    "genre_ids": [35, 18, 53],
                    "title": "Best F(r)iends: Volume 1",
                    "vote_average": 5,
                    "overview": "When a drifter befriends a quirky mortician, an unlikely business partnership is formed. Paranoia soon develops, however, and both men are forced to come to terms with the fragility of friendship and loyalty.",
                    "release_date": "2017-09-04"
                }, {
                    "original_name": "The F Word",
                    "genre_ids": [10764],
                    "media_type": "tv",
                    "name": "The F Word",
                    "popularity": 5.418,
                    "origin_country": ["US"],
                    "vote_count": 6,
                    "first_air_date": "2017-05-31",
                    "backdrop_path": "/sUm5KxbeZrdlMk1pdBbwLQDAjuy.jpg",
                    "original_language": "en",
                    "id": 71989,
                    "vote_average": 3.5,
                    "overview": "Good food and good cooking are combined with Ramsay’s passion, energy and humor into a one-of-a-kind LIVE series. Foodies from across the U.S. will battle it out in a high-stakes cook-off, as Ramsay chats with surprise guests and appears in unique field segments.",
                    "poster_path": "/skWtbfPT79vzmZiCp399HgLqG24.jpg"
                }]
            }
        },
        "request_tv_success": {
            "$status": 200,
            "$headers": {
                "access-control-allow-methods": "GET, HEAD, POST, PUT, DELETE, OPTIONS",
                "access-control-allow-origin": "*",
                "access-control-expose-headers": "ETag, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After, Content-Length, Content-Range",
                "age": "58",
                "cache-control": "public, max-age=3600",
                "content-encoding": "br",
                "content-type": "application/json;charset=utf-8",
                "date": "Sat, 22 Aug 2020 14:55:15 GMT",
                "etag": "W/\"72743df27d5050181a671c94c5f9e124\"",
                "last-modified": "Sat, 22 Aug 2020 14:54:17 GMT",
                "server": "openresty",
                "status": "304",
                "vary": "Accept-Encoding",
                "via": "1.1 545e523089dd0806c0ea03a8c1e73d53.cloudfront.net (CloudFront)",
                "x-amz-cf-id": "1wRUOo_zHRWpnx_3iy4oib2snSUmmPrz_uG76SKcmsKUaRcvRs8Fmw==",
                "x-amz-cf-pop": "ORD52-C2",
                "x-cache": "Hit from cloudfront",
                "x-memc": "HIT",
                "x-memc-age": "2365",
                "x-memc-expires": "1235",
                "x-memc-key": "4e7258d5e4dd9f6ec63b81e4aa940114"
            },
            "$body": {
                "backdrop_path": "/yJPI9e3H5fGNTWNzW2p4iSG5qdc.jpg",
                "created_by": [{
                    "id": 64506,
                    "credit_id": "55bb0ab592514123dd00622e",
                    "name": "Chris Brancato",
                    "gender": 2,
                    "profile_path": null
                }, {
                    "id": 25867,
                    "credit_id": "57d85979c3a3685342000f2f",
                    "name": "Carlos Bernard",
                    "gender": 2,
                    "profile_path": "/oAHPWN2kHx3LEE8FtdUXxGqgGXq.jpg"
                }, {
                    "id": 81203,
                    "credit_id": "57d85988c3a36878e90023ba",
                    "name": "Doug Miro",
                    "gender": 2,
                    "profile_path": "/adpgP3GMefldcZyJnReMmz9nY8Q.jpg"
                }],
                "episode_run_time": [57],
                "first_air_date": "2015-08-28",
                "genres": [{"id": 80, "name": "Crime"}, {"id": 18, "name": "Drama"}],
                "homepage": "http://www.netflix.com/title/80025172",
                "id": 63351,
                "in_production": false,
                "languages": ["es", "en"],
                "last_air_date": "2017-09-01",
                "last_episode_to_air": {
                    "air_date": "2017-09-01",
                    "episode_number": 10,
                    "id": 1358983,
                    "name": "Going Back to Cali",
                    "overview": "David and Peña are in a race against each other to find Pallomari. Peña makes a serious decision about the future of his career.",
                    "production_code": "",
                    "season_number": 3,
                    "show_id": 63351,
                    "still_path": "/7h9ZhFl5ymMefSjRv5vKDsAU4jH.jpg",
                    "vote_average": 8.25,
                    "vote_count": 8
                },
                "name": "Narcos",
                "next_episode_to_air": null,
                "networks": [{"name": "Netflix", "id": 213, "logo_path": "/wwemzKWzjKYJFfCeiB57q3r4Bcm.png", "origin_country": ""}],
                "number_of_episodes": 30,
                "number_of_seasons": 3,
                "origin_country": ["US"],
                "original_language": "en",
                "original_name": "Narcos",
                "overview": "A gritty chronicle of the war against Colombia's infamously violent and powerful drug cartels.",
                "popularity": 33.774,
                "poster_path": "/rTmal9fDbwh5F0waol2hq35U4ah.jpg",
                "production_companies": [{
                    "id": 36812,
                    "logo_path": "/t0cibwMPVH7RD7UsQNqmugDMnw7.png",
                    "name": "Gaumont International Television",
                    "origin_country": "US"
                }],
                "seasons": [{
                    "air_date": "2015-08-28",
                    "episode_count": 10,
                    "id": 68934,
                    "name": "Season 1",
                    "overview": "Season one chronicles the rise of drug lord Pablo Escobar, the ruthless boss of the Medellin Cartel and a known terrorist who was also a congressman, a family man and revered by the poor as a new Robin Hood.",
                    "poster_path": "/9lNSJ7l6Dc7aXVrywBlFxhNqXeF.jpg",
                    "season_number": 1
                }, {
                    "air_date": "2016-09-02",
                    "episode_count": 10,
                    "id": 78512,
                    "name": "Season 2",
                    "overview": "Season two continues the story of drug lord Pablo Escobar, the ruthless boss of the Medellin Cartel, including his incarceration in a prison he himself builds and his subsequent fall from power.",
                    "poster_path": "/fshLrkdP1JaRphpN69EMzCsfqg9.jpg",
                    "season_number": 2
                }, {
                    "air_date": "2017-09-01",
                    "episode_count": 10,
                    "id": 89967,
                    "name": "Season 3",
                    "overview": "Season three shifts its focus to Pablo Escobar’s real-life successors in the drug trade: Colombia’s Cali Cartel, \"the biggest drug lords you’ve probably never heard of.\"",
                    "poster_path": "/phoLqMMhtzqyThMNSodTJp2DZMz.jpg",
                    "season_number": 3
                }],
                "status": "Ended",
                "type": "Scripted",
                "vote_average": 8.0,
                "vote_count": 1267
            }
        }
    },
    "$actions": {
        "request_movie": {
            "$action": "request_movie",
            "$request": {
                "$request": "request_movie",
                "$uri": [
                    {
                        "$compose": "create",
                        "$value": {
                            "id": {"$compose": "read", "$value": "$.app['$states'].movie.id", "$default": 0},
                            "api_key": {"$compose": "read", "$value": "$.app['$states'].api_key", "$default": ""}
                        }
                    },
                    {
                        "$compose": "expand", "$type": "uri_template",
                        "$value": "https://api.themoviedb.org/3/movie/{id}?api_key={api_key}",
                        "$default": "https://api.themoviedb.org/3/movie/{id}?api_key={api_key}"
                    }
                ]
            },
            "$responses": [{"$mock": false, "$response": "request_movie_success"}],
            "$events": {"200": {"$event": "on_request_movie_success"}}
        },
        "request_tv": {
            "$action": "request_tv",
            "$request": {
                "$request": "request_tv",
                "$uri": [
                    {
                        "$compose": "create",
                        "$value": {
                            "id": {"$compose": "read", "$value": "$.app['$states'].movie.id", "$default": 0},
                            "api_key": {"$compose": "read", "$value": "$.app['$states'].api_key", "$default": ""}
                        }
                    },
                    {
                        "$compose": "expand", "$type": "uri_template",
                        "$value": "https://api.themoviedb.org/3/tv/{id}?api_key={api_key}",
                        "$default": "https://api.themoviedb.org/3/tv/{id}?api_key={api_key}"
                    }
                ]
            },
            "$responses": [{"$mock": false, "$response": "request_tv_success"}],
            "$events": {"200": {"$event": "on_request_tv_success"}}
        },
        "request_netflix_originals": {
            "$action": "request_netflix_originals",
            "$request": {
                "$request": "request_netflix_originals",
                "$uri": [
                    {
                        "$compose": "create",
                        "$value": {"api_key": {"$compose": "read", "$value": "$.app['$states'].api_key", "$default": ""}}
                    },
                    {
                        "$compose": "expand", "$type": "uri_template",
                        "$value": "https://api.themoviedb.org/3/discover/tv?with_networks=213&api_key={api_key}",
                        "$default": "https://api.themoviedb.org/3/discover/tv?with_networks=213&api_key={api_key}"
                    }
                ]
            },
            "$responses": [{"$mock": false, "$response": "request_netflix_originals_success"}],
            "$events": {"200": {"$event": "on_request_netflix_originals_success"}}
        },
        "request_trending": {
            "$action": "request_trending",
            "$request": {
                "$request": "request_trending",
                "$uri": [
                    {
                        "$compose": "create",
                        "$value": {"api_key": {"$compose": "read", "$value": "$.app['$states'].api_key", "$default": ""}}
                    },
                    {
                        "$compose": "expand", "$type": "uri_template",
                        "$value": "https://api.themoviedb.org/3/trending/all/week?api_key={api_key}",
                        "$default": "https://api.themoviedb.org/3/trending/all/week?api_key={api_key}"
                    }
                ]
            },
            "$responses": [{"$mock": false, "$response": "request_trending_success"}],
            "$events": {"200": {"$event": "on_request_trending_success"}}
        },
        "request_search": {
            "$action": "request_search",
            "$request": {
                "$request": "request_search",
                "$uri": [
                    {
                        "$compose": "create",
                        "$value": {
                            "api_key": {"$compose": "read", "$value": "$.app['$states'].api_key", "$default": ""},
                            "query": {"$compose": "read", "$value": "$.app['$states'].title", "$default": ""}
                        }
                    },
                    {
                        "$compose": "expand", "$type": "uri_template",
                        "$value": "https://api.themoviedb.org/3/search/multi?query={query}&api_key={api_key}",
                        "$default": "https://api.themoviedb.org/3/search/multi?query={query}&api_key={api_key}"
                    }
                ]
            },
            "$responses": [{"$mock": false, "$response": "request_search_success"}],
            "$events": {"200": {"$event": "on_request_search_success"}}
        },
        "request_movie_background_image": {
            "$action": "request_movie_background_image",
            "$request": {
                "$request": "request_movie_background_image",
                "$uri": {"$compose": "movie_background_image"}
            }
        }
    },
    "$events": {
        "on_click_movie": [
            {"$action": "create_$states_items", "$value": {"items": {"should_show_modal": true}}},
            {
                "$action": "update_$states_item",
                "$value": {
                    "key": "movie",
                    "item": {
                        "id": [
                            {"$compose": "read", "$value": "$.input.id.0", "$default": "0"},
                            {"$compose": "decode", "$type": "json", "$default": 0}
                        ],
                        "media_type": [
                            {"$compose": "read", "$value": "$.input.media_type.0", "$default": "\"tv\""},
                            {"$compose": "decode", "$type": "json", "$default": "tv"}
                        ]
                    }
                }
            },
            {"$action": "request_movie", "$if": {"$compose": "is_movie", "$default": false}},
            {"$action": "request_tv", "$unless": {"$compose": "is_movie", "$default": false}},
        ],
        "on_click_modal_background": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"should_show_modal": false}}
            }
        ],
        "on_request_movie_success": [
            {
                "$action": "create_$states_items",
                "$value": {
                    "items": {
                        "movie": {
                            "id": {"$compose": "read", "$value": "$.response.body.id", "$default": 0},
                            "title": {"$compose": "read", "$value": "$.response.body.title", "$default": ""},
                            "overview": {"$compose": "read", "$value": "$.response.body.overview", "$default": ""},
                            "runtime": {"$compose": "read", "$value": "$.response.body.runtime", "$default": 0},
                            "rating": {"$compose": "read", "$value": "$.response.body.vote_average", "$default": 0},
                            "release": {"$compose": "read", "$value": "$.response.body.release_date", "$default": ""},
                            "background_image": {"$compose": "read", "$value": "$.response.body.backdrop_path", "$default": ""},
                        }
                    }
                },
                "$if": [
                    {"$compose": "read", "$value": "$.response", "$default": {"status": 0, "headers": {}, "body": {}}},
                    {
                        "$compose": "match", "$type": "json_schema", "$value": {"$schema": "request_movie_success_schema"},
                        "$default": false
                    }
                ]
            }
        ],
        "on_request_tv_success": [
            {
                "$action": "create_$states_items",
                "$value": {
                    "items": {
                        "movie": {
                            "id": {"$compose": "read", "$value": "$.response.body.id", "$default": 0},
                            "title": {"$compose": "read", "$value": "$.response.body.name", "$default": ""},
                            "overview": {"$compose": "read", "$value": "$.response.body.overview", "$default": ""},
                            "runtime": {"$compose": "read", "$value": "$.response.body.episode_run_time.0", "$default": 0},
                            "rating": {"$compose": "read", "$value": "$.response.body.vote_average", "$default": 0},
                            "release": {"$compose": "read", "$value": "$.response.body.first_air_date", "$default": ""},
                            "background_image": {"$compose": "read", "$value": "$.response.body.backdrop_path", "$default": ""},
                        }
                    }
                },
                "$if": [
                    {"$compose": "read", "$value": "$.response", "$default": {"status": 0, "headers": {}, "body": {}}},
                    {
                        "$compose": "match", "$type": "json_schema", "$value": {"$schema": "request_tv_success_schema"},
                        "$default": false
                    }
                ]
            }
        ],
        "on_request_netflix_originals_success": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"netflix_originals": {"$compose": "read", "$value": "$.response.body.results", "$default": []}}},
                "$if": [
                    {"$compose": "read", "$value": "$.response", "$default": {"status": 0, "headers": {}, "body": {}}},
                    {
                        "$compose": "match", "$type": "json_schema",
                        "$value": {"$schema": "request_netflix_originals_success_schema"}, "$default": false
                    }
                ]
            }
        ],
        "on_request_trending_success": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"trending": {"$compose": "read", "$value": "$.response.body.results", "$default": []}}},
                "$if": [
                    {"$compose": "read", "$value": "$.response", "$default": {"status": 0, "headers": {}, "body": {}}},
                    {
                        "$compose": "match", "$type": "json_schema",
                        "$value": {"$schema": "request_trending_success_schema"}, "$default": false
                    }
                ]
            }
        ],
        "on_request_search_success": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"query": {"$compose": "read", "$value": "$.response.body.results", "$default": []}}},
                "$if": [
                    {"$compose": "read", "$value": "$.response", "$default": {"status": 0, "headers": {}, "body": {}}},
                    {
                        "$compose": "match", "$type": "json_schema",
                        "$value": {"$schema": "request_search_success_schema"}, "$default": false
                    }
                ]
            }
        ],
        "on_logo_click": [
            {"$action": "request_netflix_originals"},
            {"$action": "request_trending"},
            {"$action": "route_replace", "$value": {"uri": {"pathname": "/"}}}
        ],
        "on_change_title": [
            {
                "$action": "create_$states_items",
                "$value": {"items": {"title": {"$compose": "read", "$value": "$.input", "$default": ""}}}
            },
            {
                "$action": "route_replace",
                "$value": {"uri": {"pathname": "/search"}},
                "$if": {"$compose": "is_title"}
            },
            {
                "$action": "route_replace",
                "$value": {"uri": {"pathname": "/"}},
                "$unless": {"$compose": "is_title"}
            },
            {
                "$action": "request_search",
                "$if": {"$compose": "is_title"}
            }
        ],
        "on_click_play": []
    },
    "$route": {},
    "$states": {
        "api_key": "6eef0740d3ea72e3ca8701f8207cac60",
        "user_one": "Laura",
        "user_two": "Tony",
        "user_three": "Joey",
        "home_title": "Home",
        "shows_title": "TV Shows",
        "movies_title": "Movies",
        "recently_added_title": "Recently Added",
        "my_list_title": "My List",
        "play_title": "Play",
        "kids_title": "KIDS",
        "dvd_title": "DVD",
        "netflix_originals_title": "Netflix Originals",
        "trending_title": "Trending Now",
        "manage_profiles_title": "Manage Profiles",
        "account_title": "Account",
        "help_title": "Help Center",
        "sign_out_title": "Sign Out",
        "search_no_results_body": `
        Your search for {title} did not have any matches.

        Suggestions:

        ⦿ Try different keywords.
        ⦿ Looking for a movie or TV show?
        ⦿ Try using a movie, TV show title, an actor or director.
        ⦿ Try a genre, like comedy, romance, sports, or drama.
        `,
        "404_body": `
        Lost your way?

        Sorry, we can't find that page. You'll find lots to explore on the home page.

        Error Code NSES-404
        `,
        "netflix_logo": "https://github.com/AndresXI/Netflix-Clone/blob/057d454087bce94762bfae7a45dc1b0c4cfe62f2/src/static/images/Netflix_Logo_RGB.png?raw=true",
        "should_show_modal": false,
        "netflix_originals": [
            {
                "original_name": "Lucifer",
                "genre_ids": [80, 10765],
                "name": "Lucifer",
                "popularity": 286.139,
                "origin_country": ["US"],
                "vote_count": 4150,
                "first_air_date": "2016-01-25",
                "backdrop_path": "/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg",
                "original_language": "en",
                "id": 63174,
                "vote_average": 8.5,
                "overview": "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
                "poster_path": "/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg"
            }, {
                "original_name": "Biohackers",
                "genre_ids": [18, 10765],
                "name": "Biohackers",
                "popularity": 60.401,
                "origin_country": ["DE"],
                "vote_count": 30,
                "first_air_date": "2020-08-20",
                "backdrop_path": "/3l96kBw60kOyfWh0hG2cphA6ST1.jpg",
                "original_language": "de",
                "id": 100074,
                "vote_average": 8,
                "overview": "Mia goes to medical school to get close to a professor she suspects had a hand in her past family tragedy and gets tangled in the world of biohacking.",
                "poster_path": "/5vo9FY2aXSuoqtawSLP99EqbsUn.jpg"
            }, {
                "original_name": "Stranger Things",
                "genre_ids": [18, 9648, 10765],
                "name": "Stranger Things",
                "popularity": 63.125,
                "origin_country": ["US"],
                "vote_count": 5336,
                "first_air_date": "2016-07-15",
                "backdrop_path": "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
                "original_language": "en",
                "id": 66732,
                "vote_average": 8.5,
                "overview": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
                "poster_path": "/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg"
            }, {
                "original_name": "The Umbrella Academy",
                "genre_ids": [35, 18, 10759, 10765],
                "name": "The Umbrella Academy",
                "popularity": 65.124,
                "origin_country": ["US"],
                "vote_count": 1337,
                "first_air_date": "2019-02-15",
                "backdrop_path": "/qJxzjUjCpTPvDHldNnlbRC4OqEh.jpg",
                "original_language": "en",
                "id": 75006,
                "vote_average": 8.6,
                "overview": "A dysfunctional family of superheroes comes together to solve the mystery of their father's death, the threat of the apocalypse and more.",
                "poster_path": "/scZlQQYnDVlnpxFTxaIv2g0BWnL.jpg"
            }, {
                "original_name": "Dark",
                "genre_ids": [80, 18, 9648, 10765],
                "name": "Dark",
                "popularity": 57.453,
                "origin_country": ["DE"],
                "vote_count": 3179,
                "first_air_date": "2017-12-01",
                "backdrop_path": "/3lBDg3i6nn5R2NKFCJ6oKyUo2j5.jpg",
                "original_language": "de",
                "id": 70523,
                "vote_average": 8.5,
                "overview": "A missing child causes four families to help each other for answers. What they could not imagine is that this mystery would be connected to innumerable other secrets of the small town.",
                "poster_path": "/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg"
            }, {
                "original_name": "Star Wars: The Clone Wars",
                "genre_ids": [16, 10759, 10765],
                "name": "Star Wars: The Clone Wars",
                "popularity": 55.145,
                "origin_country": ["US"],
                "vote_count": 682,
                "first_air_date": "2008-10-03",
                "backdrop_path": "/m6eRgkR1KC6Mr6gKx6gKCzSn6vD.jpg",
                "original_language": "en",
                "id": 4194,
                "vote_average": 8.3,
                "overview": "Yoda, Obi-Wan Kenobi, Anakin Skywalker, Mace Windu and other Jedi Knights lead the Grand Army of the Republic against the droid army of the Separatists.",
                "poster_path": "/e1nWfnnCVqxS2LeTO3dwGyAsG2V.jpg"
            }, {
                "original_name": "Black Mirror",
                "genre_ids": [18, 10765],
                "name": "Black Mirror",
                "popularity": 52.529,
                "origin_country": ["GB"],
                "vote_count": 2037,
                "first_air_date": "2011-12-04",
                "backdrop_path": "/p39K75uoZLwnhGlEAJxRG5xAD9y.jpg",
                "original_language": "en",
                "id": 42009,
                "vote_average": 8.3,
                "overview": "A contemporary British re-working of The Twilight Zone with stories that tap into the collective unease about our modern world. \n\nOver the last ten years, technology has transformed almost every aspect of our lives before we've had time to stop and question it. In every home; on every desk; in every palm - a plasma screen; a monitor; a smartphone - a black mirror of our 21st Century existence.",
                "poster_path": "/pXeuSWSKgWUnhRFHZ4TjAUU8lbE.jpg"
            }, {
                "original_name": "La casa de papel",
                "genre_ids": [80, 18],
                "name": "Money Heist",
                "popularity": 54.711,
                "origin_country": ["ES"],
                "vote_count": 8796,
                "first_air_date": "2017-05-02",
                "backdrop_path": "/xGexTKCJDkl12dTW4YCBDXWb1AD.jpg",
                "original_language": "es",
                "id": 71446,
                "vote_average": 8.4,
                "overview": "To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose. Five months of seclusion - memorizing every step, every detail, every probability - culminate in eleven days locked up in the National Coinage and Stamp Factory of Spain, surrounded by police forces and with dozens of hostages in their power, to find out whether their suicide wager will lead to everything or nothing.",
                "poster_path": "/MoEKaPFHABtA1xKoOteirGaHl1.jpg"
            }, {
                "original_name": "Anne with an E",
                "genre_ids": [18, 10751],
                "name": "Anne with an E",
                "popularity": 44.869,
                "origin_country": ["CA"],
                "vote_count": 1639,
                "first_air_date": "2017-03-19",
                "backdrop_path": "/ywQtHG17LZhAFZyZtBflhtFMtJ7.jpg",
                "original_language": "en",
                "id": 70785,
                "vote_average": 8.8,
                "overview": "A coming-of-age story about an outsider who, against all odds and numerous challenges, fights for love and acceptance and for her place in the world. The series centers on a young orphaned girl in the late 1890’s, who, after an abusive childhood spent in orphanages and the homes of strangers, is mistakenly sent to live with an elderly woman and her aging brother. Over time, 13-year-old Anne will transform their lives and eventually the small town in which they live with her unique spirit, fierce intellect and brilliant imagination.",
                "poster_path": "/6P6tXhjT5tK3qOXzxF9OMLlG7iz.jpg"
            }, {
                "original_name": "Hoops",
                "genre_ids": [16, 35],
                "name": "Hoops",
                "popularity": 35.813,
                "origin_country": ["US"],
                "vote_count": 15,
                "first_air_date": "2020-08-21",
                "backdrop_path": "/rpHJRtrmy1MIOS3hoYJQ2vK32mE.jpg",
                "original_language": "en",
                "id": 106238,
                "vote_average": 6.9,
                "overview": "A foul-mouthed high school basketball coach is sure he'll hit the big leagues if he can only turn his terrible team around. Good luck with that.",
                "poster_path": "/3umUQ5DcZe7mSZGImCAStl2FRbm.jpg"
            }, {
                "original_name": "BoJack Horseman",
                "genre_ids": [16, 35, 18],
                "name": "BoJack Horseman",
                "popularity": 43.248,
                "origin_country": ["US"],
                "vote_count": 734,
                "first_air_date": "2014-08-22",
                "backdrop_path": "/AmIHaw6CQWOfBCQYom15Jzsu7OB.jpg",
                "original_language": "en",
                "id": 61222,
                "vote_average": 8.5,
                "overview": "Meet the most beloved sitcom horse of the 90s - 20 years later. BoJack Horseman was the star of the hit TV show \"Horsin' Around,\" but today he's washed up, living in Hollywood, complaining about everything, and wearing colorful sweaters.",
                "poster_path": "/pB9L0jAnEQLMKgexqCEocEW8TA.jpg"
            }, {
                "original_name": "DreamWorks Dragons",
                "genre_ids": [16, 35, 10759, 10765],
                "name": "DreamWorks Dragons",
                "popularity": 41.666,
                "origin_country": ["US"],
                "vote_count": 269,
                "first_air_date": "2012-08-07",
                "backdrop_path": "/l8MgpYzOl8ejMn1lKCKO73bMrGY.jpg",
                "original_language": "en",
                "id": 44305,
                "vote_average": 7.3,
                "overview": "From the creators of \"How to Train Your Dragon\" comes a new series that takes Hiccup and Toothless to the edge of adventure.",
                "poster_path": "/fDzGH0jGhJMMxbgsb9JiC7Ep4uk.jpg"
            }, {
                "original_name": "13 Reasons Why",
                "genre_ids": [18, 9648],
                "name": "13 Reasons Why",
                "popularity": 45.604,
                "origin_country": ["US"],
                "vote_count": 2033,
                "first_air_date": "2017-03-31",
                "backdrop_path": "/sZb21d6EWKAEKZ9GrLQeMwX4cWN.jpg",
                "original_language": "en",
                "id": 66788,
                "vote_average": 7.7,
                "overview": "After a teenage girl's perplexing suicide, a classmate receives a series of tapes that unravel the mystery of her tragic choice.",
                "poster_path": "/nel144y4dIOdFFid6twN5mAX9Yd.jpg"
            }, {
                "original_name": "Trollhunters: Tales of Arcadia",
                "genre_ids": [16, 35, 10751, 10759],
                "name": "Trollhunters: Tales of Arcadia",
                "popularity": 38.132,
                "origin_country": ["US"],
                "vote_count": 330,
                "first_air_date": "2016-12-23",
                "backdrop_path": "/mhETUY8XxLewCZb6bKm6FyBlnhh.jpg",
                "original_language": "en",
                "id": 68267,
                "vote_average": 8.3,
                "overview": "After uncovering a mysterious amulet, an average teen assumes an unlikely destiny and sets out to save two worlds.",
                "poster_path": "/zmFfWfUVJI3UgVOOUZbRbRQUIE5.jpg"
            }, {
                "original_name": "House of Cards",
                "genre_ids": [18],
                "name": "House of Cards",
                "popularity": 43.318,
                "origin_country": ["US"],
                "vote_count": 1491,
                "first_air_date": "2013-02-01",
                "backdrop_path": "/ex4kvQb0Ski5KL2fsnKQU2hV3oo.jpg",
                "original_language": "en",
                "id": 1425,
                "vote_average": 8.1,
                "overview": "Set in present day Washington, D.C., House of Cards is the story of Frank Underwood, a ruthless and cunning politician, and his wife Claire who will stop at nothing to conquer everything. This wicked political drama penetrates the shadowy world of greed, sex and corruption in modern D.C.",
                "poster_path": "/hKWxWjFwnMvkWQawbhvC0Y7ygQ8.jpg"
            }, {
                "original_name": "Ozark",
                "genre_ids": [80, 18],
                "name": "Ozark",
                "popularity": 34.403,
                "origin_country": ["US"],
                "vote_count": 766,
                "first_air_date": "2017-07-21",
                "backdrop_path": "/hNaBXLiLTxMhtj7IFjOdJngXxxr.jpg",
                "original_language": "en",
                "id": 69740,
                "vote_average": 8.1,
                "overview": "A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss.",
                "poster_path": "/oy7Peo5iFIt9sNM59lN6csbJeX2.jpg"
            }, {
                "original_name": "Orange Is the New Black",
                "genre_ids": [35, 18],
                "name": "Orange Is the New Black",
                "popularity": 37.689,
                "origin_country": ["US"],
                "vote_count": 1103,
                "first_air_date": "2013-07-11",
                "backdrop_path": "/z8Mg3YVZGd1iSnoDinEAoh9WTck.jpg",
                "original_language": "en",
                "id": 1424,
                "vote_average": 7.6,
                "overview": "A crime she committed in her youthful past sends Piper Chapman to a women's prison, where she trades her comfortable New York life for one of unexpected camaraderie and conflict in an eccentric group of fellow inmates.",
                "poster_path": "/ekaa7YjGPTkFLcPhwWXTnARuCEU.jpg"
            }, {
                "original_name": "Alta mar",
                "genre_ids": [80, 18],
                "name": "High Seas",
                "popularity": 29.478,
                "origin_country": ["ES"],
                "vote_count": 46,
                "first_air_date": "2019-05-24",
                "backdrop_path": "/vSgn4IeZMiUE7mOgcNaTexPDwcX.jpg",
                "original_language": "es",
                "id": 88239,
                "vote_average": 6.7,
                "overview": "Two sisters discover disturbing family secrets after a string of mysterious deaths occur on a luxury ship traveling from Spain to Brazil in the 1940s.",
                "poster_path": "/lzrnCDxQDvciVPWH9idxKRNaLKk.jpg"
            }, {
                "original_name": "Las chicas del cable",
                "genre_ids": [18],
                "name": "Cable Girls",
                "popularity": 35.374,
                "origin_country": ["ES"],
                "vote_count": 234,
                "first_air_date": "2017-04-28",
                "backdrop_path": "/iHLexEHCET03oGwe22gbHw0BfLL.jpg",
                "original_language": "es",
                "id": 71225,
                "vote_average": 8,
                "overview": "In 1920s Madrid, four women at the National Telephone Company ring in revolution as they deal with romance, envy and the modern workplace.",
                "poster_path": "/lAwLmgq1zy0xJnusszmvWTLjFlO.jpg"
            }, {
                "original_name": "Élite",
                "genre_ids": [80, 18, 9648],
                "name": "Elite",
                "popularity": 33.947,
                "origin_country": [],
                "vote_count": 4498,
                "first_air_date": "2018-10-05",
                "backdrop_path": "/1qOA3kMtQO8bjnW8M2smjA8tp10.jpg",
                "original_language": "es",
                "id": 76669,
                "vote_average": 8.4,
                "overview": "When three working class kids enroll in the most exclusive school in Spain, the clash between the wealthy and the poor students leads to tragedy.",
                "poster_path": "/3NTAbAiao4JLzFQw6YxP1YZppM8.jpg"
            }
        ],
        "trending": [{
            "id": 605116,
            "video": false,
            "vote_count": 869,
            "vote_average": 6.7,
            "title": "Project Power",
            "release_date": "2020-08-14",
            "original_language": "en",
            "original_title": "Project Power",
            "genre_ids": [28, 80, 878],
            "backdrop_path": "/qVygtf2vU15L2yKS4Ke44U4oMdD.jpg",
            "adult": false,
            "overview": "An ex-soldier, a teen and a cop collide in New Orleans as they hunt for the source behind a dangerous new pill that grants users temporary superpowers.",
            "poster_path": "/TnOeov4w0sTtV2gqICqIxVi74V.jpg",
            "popularity": 614.082,
            "media_type": "movie"
        }, {
            "id": 539885,
            "video": false,
            "vote_count": 118,
            "vote_average": 6.5,
            "title": "Ava",
            "release_date": "2020-08-06",
            "original_language": "en",
            "original_title": "Ava",
            "genre_ids": [28, 80, 18, 53],
            "backdrop_path": "/ekkuqt9Q2ad1F7xq2ZONP0oq36P.jpg",
            "adult": false,
            "overview": "A black ops assassin is forced to fight for her own survival after a job goes dangerously wrong.",
            "poster_path": "/A3z0KMLIEGL22mVrgaV7KDxKRmT.jpg",
            "popularity": 375.928,
            "media_type": "movie"
        }, {
            "id": 581392,
            "video": false,
            "vote_count": 165,
            "vote_average": 7.4,
            "title": "Peninsula",
            "release_date": "2020-07-15",
            "original_language": "ko",
            "original_title": "반도",
            "genre_ids": [28, 27, 53],
            "backdrop_path": "/gEjNlhZhyHeto6Fy5wWy5Uk3A9D.jpg",
            "adult": false,
            "overview": "A soldier and his team battle hordes of post-apocalyptic zombies in the wastelands of the Korean Peninsula.",
            "poster_path": "/sy6DvAu72kjoseZEjocnm2ZZ09i.jpg",
            "popularity": 172.911,
            "media_type": "movie"
        }, {
            "original_name": "Lucifer",
            "id": 63174,
            "name": "Lucifer",
            "vote_count": 4389,
            "vote_average": 8.5,
            "first_air_date": "2016-01-25",
            "poster_path": "/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg",
            "genre_ids": [80, 10765],
            "original_language": "en",
            "backdrop_path": "/ta5oblpMlEcIPIS2YGcq9XEkWK2.jpg",
            "overview": "Bored and unhappy as the Lord of Hell, Lucifer Morningstar abandoned his throne and retired to Los Angeles, where he has teamed up with LAPD detective Chloe Decker to take down criminals. But the longer he's away from the underworld, the greater the threat that the worst of humanity could escape.",
            "origin_country": ["US"],
            "popularity": 963.864,
            "media_type": "tv"
        }, {
            "id": 508570,
            "video": false,
            "vote_count": 71,
            "vote_average": 7.2,
            "title": "The One and Only Ivan",
            "release_date": "2020-08-21",
            "original_language": "en",
            "original_title": "The One and Only Ivan",
            "genre_ids": [35, 18, 10751],
            "backdrop_path": "/fFdOJxmG2U7IYYlkFKtDk1nGPhF.jpg",
            "adult": false,
            "overview": "Ivan is a 400-pound silverback gorilla who shares a communal habitat in a suburban shopping mall with Stella the elephant, Bob the dog, and various other animals. He has few memories of the jungle where he was captured, but when a baby elephant named Ruby arrives, it touches something deep within him. Ruby is recently separated from her family in the wild, which causes him to question his life, where he comes from and where he ultimately wants to be.",
            "poster_path": "/e7ZsW5EbLbQwoGx0548KCmCAXA9.jpg",
            "popularity": 81.278,
            "media_type": "movie"
        }, {
            "id": 577922,
            "video": false,
            "vote_count": 401,
            "vote_average": 7.6,
            "title": "Tenet",
            "release_date": "2020-08-22",
            "original_language": "en",
            "original_title": "Tenet",
            "genre_ids": [28, 53],
            "backdrop_path": "/wzJRB4MKi3yK138bJyuL9nx47y6.jpg",
            "adult": false,
            "overview": "Armed with only one word - Tenet - and fighting for the survival of the entire world, the Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
            "poster_path": "/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
            "popularity": 353.67,
            "media_type": "movie"
        }, {
            "id": 626393,
            "video": false,
            "vote_count": 82,
            "vote_average": 6.7,
            "title": "The Sleepover",
            "release_date": "2020-08-21",
            "original_language": "en",
            "original_title": "The Sleepover",
            "genre_ids": [28, 10751],
            "backdrop_path": "/mQngZ4DtXqdkX9fOQRsm9iym5OW.jpg",
            "adult": false,
            "overview": "Two siblings who discover their seemingly normal mom is a former thief in witness protection. Mom is forced to pull one last job, and the kids team up to rescue her over the course of an action-packed night.",
            "poster_path": "/9iEc34Qje2V3FZnrSXKfZsbiHjW.jpg",
            "popularity": 178.485,
            "media_type": "movie"
        }, {
            "id": 718444,
            "video": false,
            "vote_count": 82,
            "vote_average": 6.0,
            "title": "Rogue",
            "release_date": "2020-08-20",
            "original_language": "en",
            "original_title": "Rogue",
            "genre_ids": [28],
            "backdrop_path": "/jvKIBaMssk3D7ZH4VF4rLz6A3OK.jpg",
            "adult": false,
            "overview": "Battle-hardened O’Hara leads a lively mercenary team of soldiers on a daring mission: rescue hostages from their captors in remote Africa. But as the mission goes awry and the team is stranded, O’Hara’s squad must face a bloody, brutal encounter with a gang of rebels.",
            "poster_path": "/uOw5JD8IlD546feZ6oxbIjvN66P.jpg",
            "popularity": 435.961,
            "media_type": "movie"
        }, {
            "id": 501979,
            "video": false,
            "vote_count": 18,
            "vote_average": 6.4,
            "title": "Bill \u0026 Ted Face the Music",
            "release_date": "2020-08-27",
            "original_language": "en",
            "original_title": "Bill \u0026 Ted Face the Music",
            "genre_ids": [12, 35, 878],
            "backdrop_path": "/zeVs5f9zY5W4Lf0CUlFpsHDusnj.jpg",
            "adult": false,
            "overview": "Yet to fulfill their rock and roll destiny, the now middle aged best friends Bill and Ted set out on a new adventure when a visitor from the future warns them that only their song can save life as we know it. Along the way, they will be helped by their daughters, a new batch of historical figures, and a few music legends — to seek the song that will set their world right and bring harmony in the universe.",
            "poster_path": "/y9YLNfUOrqFbYl8q1FpQuuo5MLx.jpg",
            "popularity": 83.405,
            "media_type": "movie"
        }, {
            "original_name": "Lovecraft Country",
            "id": 82816,
            "name": "Lovecraft Country",
            "vote_count": 89,
            "vote_average": 7.4,
            "first_air_date": "2020-08-16",
            "poster_path": "/fz7bdjxPColvEWCGr5Kiclzc86d.jpg",
            "genre_ids": [18, 9648, 10765],
            "original_language": "en",
            "backdrop_path": "/qx7qy2GJOc7yGY6WENyBU3OVv7A.jpg",
            "overview": "The anthology horror series follows 25-year-old Atticus Black, who joins up with his friend Letitia and his Uncle George to embark on a road trip across 1950s Jim Crow America to find his missing father. They must survive and overcome both the racist terrors of white America and the malevolent spirits that could be ripped from a Lovecraft paperback.",
            "origin_country": ["US"],
            "popularity": 310.264,
            "media_type": "tv"
        }, {
            "id": 621013,
            "video": false,
            "vote_count": 214,
            "vote_average": 8.1,
            "title": "Chemical Hearts",
            "release_date": "2020-08-21",
            "original_language": "en",
            "original_title": "Chemical Hearts",
            "genre_ids": [18, 10749],
            "backdrop_path": "/1eq896TCOEeN9Q8iTJL0n9u31Qf.jpg",
            "adult": false,
            "overview": "A high school transfer student finds a new passion when she begins to work on the school's newspaper.",
            "poster_path": "/q1MNlZYqhoD4U7sd7pjxD6SUf4z.jpg",
            "popularity": 223.007,
            "media_type": "movie"
        }, {
            "id": 726664,
            "video": false,
            "vote_count": 46,
            "vote_average": 6.7,
            "title": "Fearless",
            "release_date": "2020-08-14",
            "original_language": "en",
            "original_title": "Fearless",
            "genre_ids": [16, 35],
            "backdrop_path": "/s7NC2kntiPB3WltWj9bnNTkoqUp.jpg",
            "adult": false,
            "overview": "A teen gamer is forced to level up to full-time babysitter when his favorite video game drops three superpowered infants from space into his backyard.",
            "poster_path": "/5oQJ6HeNGWnEtP9Qyt5IZjuKI7j.jpg",
            "popularity": 109.451,
            "media_type": "movie"
        }, {
            "id": 703771,
            "video": false,
            "vote_count": 116,
            "vote_average": 6.9,
            "title": "Deathstroke: Knights \u0026 Dragons - The Movie",
            "release_date": "2020-08-04",
            "original_language": "en",
            "original_title": "Deathstroke: Knights \u0026 Dragons - The Movie",
            "genre_ids": [28, 16],
            "backdrop_path": "/owraiceOKtSOa3t8sp3wA9K2Ox6.jpg",
            "adult": false,
            "overview": "Ten years ago, Slade Wilson-aka the super-assassin called Deathstroke-made a tragic mistake and his wife and son paid a terrible price. Now, a decade later, Wilson's family is threatened once again by the murderous Jackal and the terrorists of H.IV.E. Can Deathstroke atone for the sins of the past-or will his family pay the ultimate price?",
            "poster_path": "/vFIHbiy55smzi50RmF8LQjmpGcx.jpg",
            "popularity": 144.507,
            "media_type": "movie"
        }, {
            "adult": false,
            "backdrop_path": "/86L8wqGMDbwURPni2t7FQ0nDjsH.jpg",
            "genre_ids": [28, 53],
            "id": 724989,
            "original_language": "en",
            "original_title": "Hard Kill",
            "overview": "The work of billionaire tech CEO Donovan Chalmers is so valuable that he hires mercenaries to protect it, and a terrorist group kidnaps his daughter just to get it.",
            "poster_path": "/ugZW8ocsrfgI95pnQ7wrmKDxIe.jpg",
            "release_date": "2020-08-25",
            "title": "Hard Kill",
            "video": false,
            "vote_average": 5.9,
            "vote_count": 12,
            "popularity": 68.428,
            "media_type": "movie"
        }, {
            "id": 618354,
            "video": false,
            "vote_count": 75,
            "vote_average": 7.5,
            "title": "Superman: Man of Tomorrow",
            "release_date": "2020-08-23",
            "original_language": "en",
            "original_title": "Superman: Man of Tomorrow",
            "genre_ids": [28, 16, 878],
            "backdrop_path": "/bazlsLkNuhy3IuhviepqvlMm2hV.jpg",
            "adult": false,
            "overview": "It’s the dawn of a new age of heroes, and Metropolis has just met its first. But as Daily Planet intern Clark Kent – working alongside reporter Lois Lane – secretly wields his alien powers of flight, super-strength and x-ray vision in the battle for good, there’s even greater trouble on the horizon.",
            "poster_path": "/6Bbq8qQWpoApLZYWFFAuZ1r2gFw.jpg",
            "popularity": 305.2,
            "media_type": "movie"
        }, {
            "id": 721452,
            "video": false,
            "vote_count": 41,
            "vote_average": 7.5,
            "title": "One Night in Bangkok",
            "release_date": "2020-08-25",
            "original_language": "en",
            "original_title": "One Night in Bangkok",
            "genre_ids": [28, 53],
            "backdrop_path": "/riDrpqQtZpXGeiJdlmfcwwPH7nN.jpg",
            "adult": false,
            "overview": "A hit man named Kai flies into Bangkok, gets a gun, and orders a cab. He offers a professional female driver big money to be his all-night driver. But when she realizes Kai is committing brutal murders at each stop, it's too late to walk away. Meanwhile, an offbeat police detective races to decode the string of slayings before more blood is spilled.",
            "poster_path": "/i4kPwXPlM1iy8Jf3S1uuLuwqQAV.jpg",
            "popularity": 189.465,
            "media_type": "movie"
        }, {
            "id": 299534,
            "video": false,
            "vote_count": 14758,
            "vote_average": 8.3,
            "title": "Avengers: Endgame",
            "release_date": "2019-04-24",
            "original_language": "en",
            "original_title": "Avengers: Endgame",
            "genre_ids": [28, 12, 878],
            "backdrop_path": "/orjiB3oUIsyz60hoEqkiGpy5CeO.jpg",
            "adult": false,
            "overview": "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
            "poster_path": "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
            "popularity": 92.306,
            "media_type": "movie"
        }, {
            "id": 521034,
            "video": false,
            "vote_count": 118,
            "vote_average": 7.2,
            "title": "The Secret Garden",
            "release_date": "2020-07-08",
            "original_language": "en",
            "original_title": "The Secret Garden",
            "genre_ids": [18, 14, 10751],
            "backdrop_path": "/8PK4X8U3C79ilzIjNTkTgjmc4js.jpg",
            "adult": false,
            "overview": "Mary Lennox is born in India to wealthy British parents who never wanted her. When her parents suddenly die, she is sent back to England to live with her uncle. She meets her sickly cousin, and the two children find a wondrous secret garden lost in the grounds of Misselthwaite Manor.",
            "poster_path": "/5MSDwUcqnGodFTvtlLiLKK0XKS.jpg",
            "popularity": 42.577,
            "media_type": "movie"
        }, {
            "id": 516486,
            "video": false,
            "vote_count": 1014,
            "vote_average": 7.5,
            "title": "Greyhound",
            "release_date": "2020-06-19",
            "original_language": "en",
            "original_title": "Greyhound",
            "genre_ids": [28, 18, 10752],
            "backdrop_path": "/xXBnM6uSTk6qqCf0SRZKXcga9Ba.jpg",
            "adult": false,
            "overview": "A first-time captain leads a convoy of allied ships carrying thousands of soldiers across the treacherous waters of the “Black Pit” to the front lines of WW2. With no air cover protection for 5 days, the captain and his convoy must battle the surrounding enemy Nazi U-boats in order to give the allies a chance to win the war.",
            "poster_path": "/kjMbDciooTbJPofVXgAoFjfX8Of.jpg",
            "popularity": 176.302,
            "media_type": "movie"
        }, {
            "original_name": "Game of Thrones",
            "id": 1399,
            "name": "Game of Thrones",
            "vote_count": 10018,
            "vote_average": 8.3,
            "first_air_date": "2011-04-17",
            "poster_path": "/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg",
            "genre_ids": [18, 10765],
            "original_language": "en",
            "backdrop_path": "/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
            "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
            "origin_country": ["US"],
            "popularity": 201.652,
            "media_type": "tv"
        }],
        "title": "",
        "query": [],
        "movie": {
            "id": 1726,
            "title": "Iron Man",
            "overview": "Overview.",
            "runtime": 0,
            "rating": 0,
            "release": "",
            "background_image": "/vbY95t58MDArtyUXUIb8Fx1dCry.jpg",
            "media_type": "tv"
        },
        "categories": [
            {
                "title": "Netflix Originals",
                "url": "/discover/tv?api_key=6eef0740d3ea72e3ca8701f8207cac60&with_networks=213",
                "movies": [],
            },
            {
                "title": "Trending Now",
                "url": "/trending/all/week?api_key=6eef0740d3ea72e3ca8701f8207cac60&language=en-US",
                "movies": [],
            }
        ]
    },
    "$styles": {},
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
        "": (
            <div data-state="movies">
                <span data-state="title"/>
            </div>
        ),
        "netflix_originals": (
            <ShowRow data-state="netflix_originals" data-bind-state="shows"/>
        ),
        "trending": (
            // <ShowRow poster="false" data-state="trending" data-bind-state="shows"/>
            {"type": "ShowRow", "props": {"poster": false, "data-state": "trending", "data-bind-state": "shows"}}
        ),
        "movies": {"type": "MovieRow", "props": {"data-state": "movies", "data-bind-state": "movies"}},
        "netflix_originals_row": (
            <>
                <h1 className="movieShowcase__heading" data-state="netflix_originals_title"/>
                <div className="movieShowcase__container" draggable="true">
                    {/*<MovieRow data-state="movies" data-bind-state="movies"/>*/}
                    {/*<div data-view="movies"/>*/}
                    <div data-view="netflix_originals"/>
                </div>
            </>
        ),
        "trending_row": (
            <>
                <h1 className="movieShowcase__heading" data-state="trending_title"/>
                <div className="movieShowcase__container" draggable="true">
                    {/*<MovieRow data-state="movies" data-bind-state="movies"/>*/}
                    {/*<div data-view="movies"/>*/}
                    <div data-view="trending"/>
                </div>
            </>
        ),
        "header": (
            <header data-style="header_style" className="header">
                <div className="header__container">
                    <h1 className="header_title" data-state="movie_title"/>
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
                    <p className="header__container-overview" data-state="movie_overview"/>
                </div>
                <div className="header--fadeBottom"/>
            </header>
        ),
        "modal": (
            <>
                <div className="backdrop" data-bind-event="onClick" data-event="on_click_modal_background"/>
                <div className="modal show" data-style="modal_style">
                    <div className="modal__container">
                        <h1 className="modal__title" data-state="movie_title"/>
                        <p className="modal__info">
                            <span className="modal__rating" data-state="movie_rating"/>
                            <span data-state="movie_release"/>
                            <span data-state="movie_runtime"/>
                        </p>
                        <p className="modal__overview" data-state="movie_overview"/>
                        <button className="modal__btn modal__btn--red" data-bind-event="onClick"
                                data-event="on_click_play">
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
                    <p data-state="search_no_results_body"/>
                </div>
            </div>
        ),
        "results": (
            <SearchRow data-state="query" data-bind-state="query"/>
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
                    <p data-state="404_body"/>
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
            <nav className="navigation">
                <ul className="navigation__container">
                    <img className="navigation__container--logo" data-state="netflix_logo" data-bind-state="src"
                         data-bind-event="onClick" data-event="on_logo_click" alt=""/>
                    <div data-view="down_icon" className="navigation__container--downArrow-2"/>
                    <div className="navigation_bar_link pseudo-link" data-state="home_title"/>
                    <div className="navigation_bar_link pseudo-link" data-state="shows_title"/>
                    <div className="navigation_bar_link pseudo-link" data-state="movies_title"/>
                    <div className="navigation_bar_link pseudo-link" data-state="recently_added_title"/>
                    <div className="navigation_bar_link pseudo-link" data-state="my_list_title"/>
                    <div className="navigation__container--left">
                        <div data-view="search_icon" className="logo"/>
                        <input className="navigation__container--left__input" name="title" type="text"
                               data-bind-state="value" data-state="title" data-bind-event="onChange"
                               data-event="on_change_title" placeholder="Title, Genres, People"/>
                        {/*// Use a JSON Path selector composition to select application state.*/}
                        {/*// If application state is found, bind it to a prop.*/}
                        {/*// If application state is not found, bind default to a prop.*/}
                        {/*// Default state may be composed or a direct identifier to state.*/}
                        {/*data-state-path-type="json_path"*/}
                        {/*data-state-path="$.app['$states'].placeholder"*/}
                        {/*data-state-default="placeholder"*/}
                        {/*data-bind-state="placeholder"*/}
                        {/*data-state="placeholder"*/}
                        {/*data-bind-state="value"*/}
                        {/*data-state="title"*/}
                        {/*data-bind-event="onChange"*/}
                        {/*data-event="on_change_title"/>*/}
                    </div>
                    <div className="navigation_bar_link pseudo-link" data-state="kids_title"/>
                    <div className="navigation_bar_link pseudo-link" data-state="dvd_title"/>
                    <div data-view="bell_icon" className="navigation__container--bellLogo"/>
                    <div data-view="dropdown"/>
                    <div data-view="down_icon" className="navigation__container--downArrow"/>
                </ul>
            </nav>
        ),
    },
    // <pre data-composer="read" data-composer-type="json_path" data-composer-value="$.view.primitive" data-composer-default="0"/>
    // data-compose="expand" data-state-default="composition"
    // data-state-path-type="json_path" data-state-path="$.input.netflix_originals[n].name"

    // How to compose state with `data-state` or `data-state-path`?
    // Since children nodes MUST BE elements or text, then interpolate all text nodes interspersed between elements.
    // Interpolate the state into strings.
    // 1. If `data-bind-state` is still the default `children` prop, then ...
    // a. If `children` is `undefined`, create a text node that has a placeholder to interpolate and interpolate any value,
    // simple or complex, e.g., "(data-state)".
    // If children is defined as a string, interpolate the string with any value, simple or complex, e.g., "Start (data-state) Finish"
    // If the value is a primitive, interpolate it in (data-state).
    // If the value is an object, interpolate its keys to (data-state.key) (data-state.0) ...
    // If children is other JSX elements, ...
    "$view": (
        <>
            <div data-view="navigation_bar"/>
            <div data-if-path="/" data-view="home"/>
            <div data-if-path="/search" data-view="search"/>
            <div data-unless-path="^/(?:search)?$" data-view="404" data-path-type="regular_expression"/>
            <div style={{color: "red", fontSize: 14}}>
                <pre data-state="boolean" data-state-value={false}/>
                <pre data-state="null" data-state-value={null}/>
                <pre data-state="number" data-state-value={9000}/>
                <pre data-state="string" data-state-value={"string"}/>
                {/*<pre data-state="symbol" data-state-value={Symbol.for("symbol")}/>*/}
                <pre data-state="undefined" data-state-value={undefined}/>
                <pre data-state="object" data-state-value={{"0": 0, "1": 1}}/>
                <pre data-state="array" data-state-value={[0, 1]}/>

                <pre data-state="boolean" data-state-value={false}>(boolean)</pre>
                <pre data-state="null" data-state-value={null}>(null)</pre>
                <pre data-state="number" data-state-value={9000}>(number)</pre>
                <pre data-state="string" data-state-value={"string"}>(string)</pre>
                {/*<pre data-state="symbol" data-state-value={Symbol.for("symbol")}>(symbol)</pre>*/}
                <pre data-state="undefined" data-state-value={undefined}>(undefined)</pre>
                <pre data-state="primitive" data-state-value={true}>(primitive) <span/> (primitive)</pre>
                <pre data-state="object" data-state-value={{"0": 0, "1": 1}}>(0) <span/> (1)</pre>
                <pre data-state="array" data-state-value={[0, 1]}>(0) <span/> (1)</pre>

                <pre data-state="noop"/>
                <pre data-state="noop" data-state-default="noop"/>
                <pre data-state="title" data-state-path="$.app['$states'].noop" data-state-default="noop"/>
                <pre data-state="noop" data-state-default-value="default"/>
                <pre data-state="title" data-state-path="$.app['$states'].noop" data-state-default-value="default"/>
                <pre data-state="title"/>
                <pre data-state="noop" data-state-default="title"/>
                <pre data-state="title" data-state-path="$.app['$states'].title"/>
                <pre data-state="title" data-state-path="$.app['$states'].noop" data-state-default="title"/>

                <div data-state-repeat="true" data-state-repeat-key="9000" data-state="nested_primitive" data-state-value={9000}>
                    <pre data-state="9000" data-state-path="$.view.9000"/>
                </div>
                <div data-state-repeat="true" data-state-repeat-key="integer" data-state="nested_array_of_integers" data-state-value={[0, 1, 2, 3]}>
                    <pre data-state="integer" data-state-path="$.view.integer"/>
                </div>
            </div>
            {
                /*
                    + Support Binding Multiple Props From State, e.g., children and value.
                    + Support Expanding Templates For Props Other Than Children, e.g., .
                    + Support Encoding JSON Values From State.
                    + Memoize Views?
                */
            }
            <div className="showcase" data-state="netflix_originals" data-state-repeat="true" data-state-repeat-key="show">
                <div className="showcase_movie" data-state="id" data-state-path="$.view.show.id" data-bind-state="key">
                    <form className="showcase_movie_image" data-event="on_click_movie" data-bind-event="onSubmit" data-state-type="dictionary">
                        <input type="hidden" data-bind-state="defaultValue" data-state="original_name" data-state-path="$.view.show.original_name"/>
                        <input type="hidden" data-bind-state="defaultValue" data-state="name" data-state-path="$.view.show.name"/>
                        <input type="hidden" data-bind-state="defaultValue" data-state="first_air_date" data-state-path="$.view.show.first_air_date"/>
                        <input type="hidden" data-bind-state="defaultValue" data-state="backdrop_path" data-state-path="$.view.show.backdrop_path"/>
                        <input type="hidden" data-bind-state="defaultValue" data-state="original_language" data-state-path="$.view.show.original_language"/>
                        <input type="hidden" data-bind-state="defaultValue" data-state="overview" data-state-path="$.view.show.overview"/>
                        <input type="hidden" data-bind-state="defaultValue" data-state="poster_path" data-state-path="$.view.show.poster_path"/>
                        <input type="hidden" data-bind-state="defaultValue" data-state="genre_ids" data-state-path="$.view.show.genre_ids"/>
                        <input type="hidden" data-bind-state="defaultValue" data-state="popularity" data-state-path="$.view.show.popularity"/>
                        <input type="hidden" data-bind-state="defaultValue" data-state="origin_country" data-state-path="$.view.show.origin_country"/>
                        <input type="hidden" data-bind-state="defaultValue" data-state="vote_count" data-state-path="$.view.show.vote_count"/>
                        <input type="hidden" data-bind-state="defaultValue" data-state="id" data-state-path="$.view.show.id"/>
                        <input type="hidden" data-bind-state="defaultValue" data-state="vote_average" data-state-path="$.view.show.vote_average"/>
                        <input type="hidden" data-bind-state="defaultValue" data-state="media_type" data-state-path="$.view.show.media_type"/>
                        <input className="showcase_movie_image" type="image" data-bind-state="src" data-state="show_poster_image" alt=""/>
                        <div data-state-repeat="true" data-state-repeat-key="country" data-state="origin_country"
                             data-state-path="$.view.show.origin_country">
                            <input type="text" data-state="country" data-state-path="$.view.country" data-bind-state="defaultValue"/>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};