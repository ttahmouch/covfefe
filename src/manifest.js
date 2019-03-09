const manifest = {
    "state": {
        "title": "",
        "titlesArray": [],
        "titlesDictionary": {}
    },
    "style": {
        "header": {
            "backgroundColor": "#282c34",
            "display": "flex",
            "flexDirection": "column",
            "alignItems": "center",
            "justifyContent": "center",
            "color": "white"
        }
    },
    "request": {
        "createTitlesDictionary": {
            "method": "POST",
            "uri": "/titlesDictionary.json",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": {
                "titles": []
            },
            "username": "",
            "password": "",
            "withCredentials": "false",
            "responses": [
                {
                    "status": 201,
                    "headers": {
                        "content-type": "application/json",
                        "location": "/titlesDictionary.json"
                    },
                    "body": {
                        "type": "object",
                        "properties": {
                            "titles": {
                                "type": "array"
                            }
                        }
                    }
                }
            ]
        },
        "readTitlesDictionary": {
            "method": "GET",
            "uri": "/titlesDictionary.json",
            "headers": {
                "accept": "application/json"
            },
            "body": "",
            "username": "",
            "password": "",
            "withCredentials": "false",
            "responses": [
                {
                    "status": 200,
                    "headers": {
                        "content-type": "application/json"
                    },
                    "body": {
                        "type": "object",
                        "properties": {
                            "titles": {
                                "type": "array"
                            }
                        }
                    }
                }
            ]
        },
        "updateTitlesDictionary": {
            "method": "PUT",
            "uri": "/titlesDictionary.json",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": {
                "titles": []
            },
            "username": "",
            "password": "",
            "withCredentials": "false",
            "responses": [
                {
                    "status": 200,
                    "headers": {
                        "content-type": "application/json"
                    },
                    "body": {
                        "type": "object",
                        "properties": {
                            "titles": {
                                "type": "array"
                            }
                        }
                    }
                }
            ]
        },
        "removeTitlesDictionary": {
            "method": "DELETE",
            "uri": "/titlesDictionary.json",
            "headers": {
                "accept": "application/json"
            },
            "body": "",
            "username": "",
            "password": "",
            "withCredentials": "false",
            "responses": [
                {
                    "status": 204,
                    "headers": {},
                    "body": {}
                }
            ]
        }
    }
};

export const state = manifest.state;
export const style = manifest.style;
export const request = manifest.request;
