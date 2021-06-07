import * as ReactNativeSnapCarousel from "react-native-snap-carousel";
import * as ReactNativeSvg from "react-native-svg";
import Constants from "expo-constants";
import React, {createElement, useState} from "react";
import ReactNative, {Alert, Dimensions, Platform} from "react-native";
import app, {$states} from "./disneyplux.json";
import {App, createElementWithCustomDataProps, createEventMiddleware, createLogMiddleware, createRouteMiddleware, storeFromConfiguration} from "covfefe";
import {composeWithDevTools} from "redux-devtools-extension";
import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createMemoryHistory} from "history";
import {createStackNavigator} from "react-navigation-stack";
import {registerRootComponent} from "expo";

const {height, width} = Dimensions.get("window");
const device = {
    width,
    "iPhoneNotch":
        Platform.OS === "ios" &&
        (height === 812 || height === 844 || height === 896 || height === 926)
};

// const fonts = {
//     "bold": Platform.select({
//         "android": "sans-serif-condensed",
//         "ios": "HelveticaNeue-Bold",
//         "web": "Helvetica Neue"
//     }),
//     "light": Platform.select({
//         "android": "sans-serif-light",
//         "ios": "HelveticaNeue-Light",
//         "web": "Helvetica Neue"
//     }),
//     "medium": Platform.select({
//         "android": "sans-serif-medium",
//         "ios": "HelveticaNeue-Medium",
//         "web": "Helvetica Neue"
//     }),
//     "regular": Platform.select({
//         "android": "sans-serif",
//         "ios": "HelveticaNeue",
//         "web": "Helvetica Neue"
//     })
// };

// const ImageSlide = ({source = null, width: imageWidth = device.width}) => {
//     const [{height, width}, setState] = useState({"height": 168, "width": imageWidth});
//
//     // useEffect(() => {
//     //     if (source) {
//     //         const {height, width} = Image.resolveAssetSource(source);
//     //         setState({
//     //             "height": Math.round((imageWidth * height) / width),
//     //             "width": imageWidth
//     //         });
//     //     }
//     // }, [source, imageWidth]);
//
//     return React.createElement({
//         "$type": "Image",
//         "style": {height, width},
//         "source": source
//     });
// };

const DPImage = ({image, ...props}) => {
    // const [source, setSource] = useState({"height": 168, "width": imageWidth});
    // useEffect(() => {
    //     const {height, width} = Image.resolveAssetSource(image);
    //
    // }, [image]);
    return React.createElement({
        "$type": "Image",
        "source": image,
        // "source": Image.resolveAssetSource(image),
        ...props
    });
};

// class SlideShow extends React.Component {
//     render() {
//         // autoplay={true}
//         // autoplayInterval={5000}
//         // ref={(c) => (this.carousel = c)}
//         // loop={true}
//         // renderItem={({"item": {image}}) => (<ImageSlide source={image} width={device.width - 52}/>)}
//         return React.createElement({
//             "$type": "Carousel",
//             "data-state": "carousel",
//             "data-bind-state": "data",
//             "renderItem": ({"item": {image}}) => React.createElement({"$type": "Image", "source": image}),
//             "sliderWidth": device.width,
//             "itemWidth": device.width - 52,
//             "vertical": false
//         });
//         // return (
//         //     <Carousel
//         //         data-state="carousel"
//         //         data-bind-state="data"
//         //         renderItem={({"item": {image}}) => React.createElement({"$type": "Image", "source": image})}
//         //         sliderWidth={device.width}
//         //         itemWidth={device.width - 52}
//         //         vertical={false}/>
//         // );
//     }
// }

const DPStack = createAppContainer(createStackNavigator(
    {
        "Main": {
            "screen": createBottomTabNavigator(
                {
                    "StackHome": createStackNavigator(
                        {
                            "HomeMain": () => React.createElement({
                                "$type": "View",
                                "data-view": "screen_home"
                            })
                        },
                        {
                            "headerMode": "none",
                            "navigationOptions": {
                                "tabBarLabel": "Home",
                                "tabBarIcon": ({focused}) => React.createElement({
                                    "$type": "Svg",
                                    "height": 32,
                                    "width": 32,
                                    "viewBox": "0 0 36 36",
                                    "children": {
                                        "$type": "View",
                                        "data-view": "svg_home_path",
                                        "fill": focused ? "#FFFFFF" : "#A4A3A2"
                                    }
                                })
                            }
                        }
                    ),
                    "StackSearch": createStackNavigator(
                        {
                            "SearchMain": () => React.createElement({
                                "$type": "View",
                                "data-view": "screen_search"
                            })
                        },
                        {
                            "headerMode": "none",
                            "navigationOptions": {
                                "tabBarLabel": "Search",
                                "tabBarIcon": ({focused}) => React.createElement({
                                    "$type": "Svg",
                                    "height": 32,
                                    "width": 32,
                                    "viewBox": "0 0 36 36",
                                    "children": {
                                        "$type": "View",
                                        "data-view": "svg_search_path",
                                        "fill": focused ? "#FFFFFF" : "#A4A3A2"
                                    }
                                })
                            }
                        }
                    ),
                    "StackDownloads": createStackNavigator(
                        {
                            "DownloadsMain": () => React.createElement({
                                "$type": "View",
                                "data-view": "screen_downloads"
                            })
                        },
                        {
                            "headerMode": "none",
                            "navigationOptions": {
                                "tabBarLabel": "Downloads",
                                "tabBarIcon": ({focused}) => React.createElement({
                                    "$type": "Svg",
                                    "height": 24,
                                    "width": 24,
                                    "viewBox": "0 0 20 20",
                                    "children": {
                                        "$type": "View",
                                        "data-view": "svg_downloads_path",
                                        "fill": focused ? "#FFFFFF" : "#A4A3A2"
                                    }
                                })
                            }
                        }
                    ),
                    "StackProfile": createStackNavigator(
                        {
                            "Profile": ({navigation}) => {
                                return React.createElement({
                                    "$type": "View",
                                    "style": {
                                        "backgroundColor": "#0B0D15",
                                        "flex": 1
                                    },
                                    "children": [
                                        // Background
                                        {
                                            "$type": "View",
                                            "data-view": "screen_background"
                                        },
                                        // Header
                                        {
                                            "$type": "View",
                                            "style": {
                                                "alignItems": "center",
                                                "width": "100%"
                                            },
                                            "children": [
                                                {
                                                    "$type": "View",
                                                    "style": {
                                                        "alignItems": "center",
                                                        "flexDirection": "row",
                                                        "justifyContent": "center",
                                                        "paddingBottom": 30,
                                                        "paddingTop": device.iPhoneNotch ? 64 : 40,
                                                        "width": "100%"
                                                    },
                                                    "children": [
                                                        {
                                                            "$type": "View",
                                                            "style": {
                                                                "alignItems": "center",
                                                                "marginHorizontal": 10
                                                            },
                                                            "children": [
                                                                {
                                                                    "$type": "View",
                                                                    "data-view": "profile_image",
                                                                    "source": {
                                                                        "uri": "https://github.com/ttahmouch/covfefe/blob/feature/jsonml+disneyplus/disneyplus/src/assets/images/profiles/stormtrooper.jpg?raw=true",
                                                                        "width": 30,
                                                                        "height": 30
                                                                    }
                                                                },
                                                                {
                                                                    "$type": "View",
                                                                    "data-view": "profile_name_selected",
                                                                    "children": "Laura"
                                                                },
                                                                {
                                                                    "$type": "View",
                                                                    "data-view": "profile_image_selected"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "$type": "View",
                                                            "style": {
                                                                "alignItems": "center",
                                                                "marginHorizontal": 10
                                                            },
                                                            "children": [
                                                                {
                                                                    "$type": "View",
                                                                    "data-view": "profile_image",
                                                                    "source": {
                                                                        "uri": "https://github.com/ttahmouch/covfefe/blob/feature/jsonml+disneyplus/disneyplus/src/assets/images/profiles/iron-man.jpg?raw=true",
                                                                        "width": 30,
                                                                        "height": 30
                                                                    }
                                                                },
                                                                {
                                                                    "$type": "View",
                                                                    "data-view": "profile_name",
                                                                    "children": "Tony"
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            "$type": "View",
                                                            "onPress": () => navigation.navigate("ModalAddProfile"),
                                                            "data-view": "profile_add_button"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "$type": "View",
                                                    "onPress": () => navigation.navigate("ModalManageProfiles"),
                                                    "data-view": "profile_edit_button"
                                                }
                                            ]
                                        },
                                        // Body
                                        {
                                            "$type": "ScrollView",
                                            "children": [
                                                {
                                                    "$type": "View",
                                                    "data-view": "profile_row",
                                                    "onPress": () => navigation.navigate("ProfileWatchList"),
                                                    "children": [
                                                        {
                                                            "$type": "Text",
                                                            "data-style": "profile_row_text",
                                                            "children": "Watch List"
                                                        },
                                                        {
                                                            "$type": "View",
                                                            "data-view": "profile_arrow_right"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "$type": "View",
                                                    "data-view": "profile_row",
                                                    "onPress": () => navigation.navigate("ProfileAppSettings"),
                                                    "children": [
                                                        {
                                                            "$type": "Text",
                                                            "data-style": "profile_row_text",
                                                            "children": "App Settings"
                                                        },
                                                        {
                                                            "$type": "View",
                                                            "data-view": "profile_arrow_right"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "$type": "View",
                                                    "data-view": "profile_row",
                                                    "onPress": () => undefined,
                                                    "children": [
                                                        {
                                                            "$type": "Text",
                                                            "data-style": "profile_row_text",
                                                            "children": "Account"
                                                        },
                                                        {
                                                            "$type": "View",
                                                            "data-view": "profile_arrow_right"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "$type": "View",
                                                    "data-view": "profile_row",
                                                    "onPress": () => undefined,
                                                    "children": [
                                                        {
                                                            "$type": "Text",
                                                            "data-style": "profile_row_text",
                                                            "children": "Legal"
                                                        },
                                                        {
                                                            "$type": "View",
                                                            "data-view": "profile_arrow_right"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "$type": "View",
                                                    "data-view": "profile_row",
                                                    "onPress": () => undefined,
                                                    "children": [
                                                        {
                                                            "$type": "Text",
                                                            "data-style": "profile_row_text",
                                                            "children": "Help"
                                                        },
                                                        {
                                                            "$type": "View",
                                                            "data-view": "profile_arrow_right"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "$type": "View",
                                                    "data-view": "profile_row",
                                                    "onPress": () => Alert.alert(
                                                        "Sign Out",
                                                        "Are you sure that you want to sign out?",
                                                        [{"text": "No"}, {"text": "Yes"}],
                                                        {"cancelable": false}
                                                    ),
                                                    "children": [
                                                        {
                                                            "$type": "Text",
                                                            "data-style": "profile_row_text",
                                                            "children": "Log Out"
                                                        },
                                                        {
                                                            "$type": "View",
                                                            "data-view": "profile_arrow_right"
                                                        }
                                                    ]
                                                },
                                                {
                                                    "$type": "Text",
                                                    "style": {
                                                        "color": "#A4A3A2",
                                                        "fontWeight": "normal",
                                                        // "fontFamily": fonts.regular,
                                                        "fontSize": 18,
                                                        "marginLeft": 16,
                                                        "paddingVertical": 16
                                                    },
                                                    "data-state": "app_version",
                                                    "data-bind-template": "Version: (app_version)"
                                                }
                                            ]
                                        }
                                    ]
                                });
                            },
                            "ProfileAppSettings": ({navigation}) => {
                                return React.createElement({
                                    "$type": "View",
                                    "style": {
                                        "backgroundColor": "#0B0D15",
                                        "flex": 1
                                    },
                                    "children": [
                                        {
                                            "$type": "View",
                                            "data-view": "screen_background"
                                        },
                                        {
                                            "$type": "View",
                                            "data-style": "header",
                                            "children": [
                                                {
                                                    "$type": "View",
                                                    "data-view": "header_back_button_with_left_arrow",
                                                    "onPress": () => navigation.goBack()
                                                },
                                                {
                                                    "$type": "View",
                                                    "style": {
                                                        "flex": 4,
                                                        "height": 35,
                                                        "justifyContent": "flex-end"
                                                    },
                                                    "children": {
                                                        "$type": "View",
                                                        "data-view": "header_title_text",
                                                        "children": "App Settings"
                                                    }
                                                },
                                                {
                                                    "$type": "View",
                                                    "style": {"flex": 1}
                                                }
                                            ]
                                        },
                                        {
                                            "$type": "View",
                                            "data-view": "screen_settings_body"
                                        }
                                    ]
                                });
                            },
                            "ProfileWatchList": ({navigation}) => {
                                return React.createElement({
                                    "$type": "View",
                                    "style": {
                                        "backgroundColor": "#0B0D15",
                                        "flex": 1
                                    },
                                    "children": [
                                        {
                                            "$type": "View",
                                            "data-view": "screen_background"
                                        },
                                        {
                                            "$type": "View",
                                            "data-style": "header",
                                            "children": [
                                                {
                                                    "$type": "View",
                                                    "data-view": "header_back_button_with_left_arrow",
                                                    "onPress": () => navigation.goBack()
                                                },
                                                {
                                                    "$type": "View",
                                                    "style": {
                                                        "flex": 4,
                                                        "height": 35,
                                                        "justifyContent": "flex-end"
                                                    },
                                                    "children": {
                                                        "$type": "View",
                                                        "data-view": "header_title_text",
                                                        "children": "Watch List"
                                                    }
                                                },
                                                {
                                                    "$type": "View",
                                                    "style": {"flex": 1}
                                                }
                                            ]
                                        }
                                    ]
                                });
                            }
                        },
                        {
                            "initialRouteName": "Profile",
                            "headerMode": "none",
                            "navigationOptions": {
                                "tabBarLabel": "More",
                                "tabBarIcon": ({focused}) => React.createElement({
                                    "$type": "View",
                                    "style": {
                                        "alignItems": "center",
                                        "borderColor": focused ? "#FFFFFF" : "transparent",
                                        "borderRadius": 20,
                                        "borderWidth": 2,
                                        "height": 40,
                                        "justifyContent": "center",
                                        "overflow": "hidden",
                                        "width": 40
                                    },
                                    "children": {
                                        "$type": "DPImage",
                                        "style": {
                                            "height": "100%",
                                            "width": "100%",
                                            "resizeMode": "contain"
                                        },
                                        "data-state": "profile_image_source",
                                        "data-bind-state": "image"
                                    }
                                })
                            }
                        }
                    )
                },
                {
                    "initialRouteName": "StackHome",
                    "tabBarOptions": {
                        "activeTintColor": "#FFFFFF",
                        "inactiveTintColor": "#A4A3A2",
                        "showLabel": false,
                        "style": {
                            "backgroundColor": "#202024",
                            "borderTopWidth": 0
                        }
                    }
                }
            )
        },
        "ModalAddProfile": ({navigation}) => {
            const [{forKidsValue, text}, setState] = useState({
                "forKidsValue": false, "text": ""
            });
            return React.createElement({
                "$type": "View",
                "style": {
                    "backgroundColor": "#000000",
                    "flex": 1
                },
                "children": [
                    {
                        "$type": "View",
                        "data-style": "header",
                        "children": [
                            {
                                "$type": "View",
                                "data-view": "header_back_button_with_text",
                                "onPress": () => navigation.goBack(null),
                                "children": {
                                    "$type": "Text",
                                    "data-style": "header_back_button_with_text",
                                    "children": "Cancel"
                                }
                            },
                            {
                                "$type": "View",
                                "style": {
                                    "flex": 4,
                                    "height": 35,
                                    "justifyContent": "flex-end"
                                },
                                "children": {
                                    "$type": "View",
                                    "data-view": "header_title_text",
                                    "children": "Create Profile"
                                }
                            },
                            {
                                "$type": "TouchableOpacity",
                                "activeOpacity": 0.7,
                                "onPress": () => navigation.goBack(null),
                                "style": {
                                    "alignItems": "flex-end",
                                    "flex": 1,
                                    "justifyContent": "center",
                                    "height": 35
                                },
                                "children": {
                                    "$type": "Text",
                                    "style": {
                                        "color": text !== "" ? "#FFFFFF" : "#595959",
                                        "fontWeight": "bold"
                                        // "fontFamily": fonts.bold
                                    },
                                    "children": "Save"
                                }
                            }
                        ]
                    },
                    {
                        "$type": "View",
                        "style": {
                            "alignSelf": "center",
                            "alignItems": "center",
                            "paddingHorizontal": 16,
                            "paddingVertical": 60
                        },
                        "children": [
                            {
                                "$type": "Image",
                                "source": {
                                    "uri": "https://github.com/ttahmouch/covfefe/blob/feature/jsonml+disneyplus/disneyplus/src/assets/images/profiles/stormtrooper.jpg?raw=true",
                                    "width": 30,
                                    "height": 30
                                },
                                "style": {
                                    "height": 108,
                                    "width": 108,
                                    "borderRadius": 54,
                                    "overflow": 'hidden',
                                    "resizeMode": "contain"
                                }
                            },
                            {
                                "$type": "Text",
                                "style": {
                                    "color": "#FFFFFF",
                                    "fontSize": 16,
                                    // "fontFamily": fonts.regular,
                                    "fontWeight": "normal",
                                    "marginBottom": 24,
                                    "marginTop": 8,
                                    "textAlign": "center"
                                },
                                "children": "CHANGE"
                            },
                            {
                                "$type": "TextInput",
                                "autoCapitalize": "none",
                                "autoFocus": true,
                                "keyboardAppearance": "dark",
                                "onChangeText": (input) => setState({forKidsValue, "text": input}),
                                "selectionColor": "#3070CB",
                                "style": {
                                    "borderColor": "#FFFFFF",
                                    "borderWidth": 1,
                                    "color": "#FFFFFF",
                                    "fontSize": 16,
                                    "paddingHorizontal": 8,
                                    "paddingVertical": 12,
                                    "width": 260
                                },
                                "value": text
                            },
                            {
                                "$type": "View",
                                "style": {
                                    "alignItems": "center",
                                    "flexDirection": "row",
                                    "marginTop": 16
                                },
                                "children": [
                                    {
                                        "$type": "Text",
                                        "style": {
                                            "color": "#FFFFFF",
                                            // "fontFamily": fonts.light,
                                            "fontWeight": "300",
                                            "fontSize": 16,
                                            "marginRight": 8,
                                            "textTransform": "uppercase"
                                        },
                                        "children": "For Kids"
                                    },
                                    {
                                        "$type": "Switch",
                                        "onValueChange": (value) => {
                                            if (value === false) {
                                                Alert.alert(
                                                    "This profile will now allow access to TV shows and movies of all maturity levels.",
                                                    "",
                                                    [{"text": "OK"}],
                                                    {"cancelable": false}
                                                );
                                            }

                                            setState({"forKidsValue": value, text});
                                        },
                                        "value": forKidsValue
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
        },
        "ModalManageProfiles": ({navigation}) => {
            return React.createElement({
                "$type": "View",
                "style": {
                    "backgroundColor": "#000000",
                    "flex": 1
                },
                "children": [
                    {
                        "$type": "View",
                        "data-style": "header",
                        "children": [
                            {
                                "$type": "View",
                                "data-view": "header_back_button_with_text",
                                "onPress": () => navigation.goBack(null),
                                "children": {
                                    "$type": "Text",
                                    "data-style": "header_back_button_with_text",
                                    "children": "Done"
                                }
                            },
                            {
                                "$type": "View",
                                "style": {
                                    "flex": 4,
                                    "height": 35,
                                    "justifyContent": "flex-end"
                                },
                                "children": {
                                    "$type": "View",
                                    "data-view": "header_title_text",
                                    "children": "Manage Profiles"
                                }
                            },
                            {
                                "$type": "View",
                                "style": {"flex": 1}
                            }
                        ]
                    },
                    {
                        "$type": "View",
                        "style": {
                            "alignSelf": "center",
                            "flexDirection": "row",
                            "flexWrap": "wrap",
                            "justifyContent": "space-between",
                            "paddingHorizontal": 16,
                            "paddingVertical": 60,
                            "width": 280
                        },
                        "children": [
                            {
                                "$type": "View",
                                "style": {
                                    "marginBottom": 16
                                },
                                "children": [
                                    {
                                        "$type": "DPImage",
                                        // "data-state": "stormtrooper",
                                        "data-state-path": "$.app.$states.profiles.0.image",
                                        "data-bind-state": "image",
                                        "style": {
                                            "height": 108,
                                            "width": 108,
                                            "borderRadius": 54,
                                            "overflow": "hidden",
                                            "resizeMode": "contain"
                                        }
                                    },
                                    // {
                                    //     "$type": "Image",
                                    //     // "data-state": "stormtrooper",
                                    //     // "data-state-path": "$.app.$states.profiles.0.image",
                                    //     // "data-state-path-value": require("../src/assets/images/profiles/stormtrooper.jpg"),
                                    //     // "data-bind-state": "source",
                                    //     "source": require("../src/assets/images/profiles/stormtrooper.jpg"),
                                    //     "style": {
                                    //         "height": 108,
                                    //         "width": 108,
                                    //         "borderRadius": 54,
                                    //         "overflow": "hidden",
                                    //         "resizeMode": "contain"
                                    //     }
                                    // },
                                    {
                                        "$type": "Text",
                                        "data-state-path": "$.app.$states.profiles.0.name",
                                        "style": {
                                            "color": "#FFFFFF",
                                            "fontSize": 16,
                                            // "fontFamily": fonts.regular,
                                            "fontWeight": "normal",
                                            "marginTop": 8,
                                            "textAlign": "center"
                                        }
                                    },
                                    {
                                        "$type": "View",
                                        "style": {
                                            "backgroundColor": "rgba(0, 0, 0, 0.5)",
                                            "height": 108,
                                            "top": 0,
                                            "position": "absolute",
                                            "width": 108
                                        }
                                    },
                                    {
                                        "$type": "View",
                                        "style": {
                                            "alignItems": "center",
                                            "height": 108,
                                            "justifyContent": "center",
                                            "position": "absolute",
                                            "width": 108
                                        },
                                        "children": {
                                            "$type": "Svg",
                                            "height": 40,
                                            "width": 40,
                                            "viewBox": "0 0 24 24",
                                            "children": {
                                                "$type": "View",
                                                "data-view": "svg_edit_path",
                                                "fill": "#FFFFFF"
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                "$type": "View",
                                "style": {
                                    "marginBottom": 16
                                },
                                "children": [
                                    {
                                        "$type": "DPImage",
                                        "data-state-path": "$.app.$states.profiles.1.image",
                                        "data-bind-state": "image",
                                        "style": {
                                            "height": 108,
                                            "width": 108,
                                            "borderRadius": 54,
                                            "overflow": 'hidden',
                                            "resizeMode": "contain"
                                        }
                                    },
                                    // {
                                    //     "$type": "Image",
                                    //     "data-state-path": "$.app.$states.profiles.1.image",
                                    //     // "data-state-path-value": require("../src/assets/images/profiles/stormtrooper.jpg"),
                                    //     "data-bind-state": "source",
                                    //     // "source": require("../src/assets/images/profiles/stormtrooper.jpg"),
                                    //     "style": {
                                    //         "height": 108,
                                    //         "width": 108,
                                    //         "borderRadius": 54,
                                    //         "overflow": 'hidden',
                                    //         "resizeMode": "contain"
                                    //     }
                                    // },
                                    {
                                        "$type": "Text",
                                        "data-state-path": "$.app.$states.profiles.1.name",
                                        "style": {
                                            "color": "#FFFFFF",
                                            "fontSize": 16,
                                            // "fontFamily": fonts.regular,
                                            "fontWeight": "normal",
                                            "marginTop": 8,
                                            "textAlign": "center"
                                        }
                                    },
                                    {
                                        "$type": "View",
                                        "style": {
                                            "backgroundColor": "rgba(0, 0, 0, 0.5)",
                                            "height": 108,
                                            "top": 0,
                                            "position": "absolute",
                                            "width": 108
                                        }
                                    },
                                    {
                                        "$type": "View",
                                        "style": {
                                            "alignItems": "center",
                                            "height": 108,
                                            "justifyContent": "center",
                                            "position": "absolute",
                                            "width": 108
                                        },
                                        "children": {
                                            "$type": "Svg",
                                            "height": 40,
                                            "width": 40,
                                            "viewBox": "0 0 24 24",
                                            "children": {
                                                "$type": "View",
                                                "data-view": "svg_edit_path",
                                                "fill": "#FFFFFF"
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                "$type": "TouchableOpacity",
                                "style": {
                                    "marginBottom": 16
                                },
                                "activeOpacity": 0.7,
                                "onPress": () => navigation.navigate("ModalAddProfile"),
                                "children": [
                                    {
                                        "$type": "View",
                                        "style": {
                                            "alignItems": "center",
                                            "height": 108,
                                            "justifyContent": "center",
                                            "width": 108
                                        },
                                        "children": {
                                            "$type": "View",
                                            "style": {
                                                "alignItems": "center",
                                                "backgroundColor": "#0B0B0B",
                                                "borderRadius": 34,
                                                "height": 68,
                                                "justifyContent": "center",
                                                "width": 68
                                            },
                                            "children": {
                                                "$type": "Svg",
                                                "height": 40,
                                                "width": 40,
                                                "viewBox": "0 0 24 24",
                                                "children": {
                                                    "$type": "View",
                                                    "data-view": "svg_plus_path",
                                                    "fill": "#FFFFFF"
                                                }
                                            }
                                        }
                                    },
                                    {
                                        "$type": "Text",
                                        "style": {
                                            "color": "#FFFFFF",
                                            "fontSize": 16,
                                            // "fontFamily": fonts.regular,
                                            "fontWeight": "normal",
                                            "marginTop": 8,
                                            "textAlign": "center"
                                        },
                                        "children": "Add Profile"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
        }
    },
    {
        "headerMode": "none",
        "initialRouteName": "Main",
        "mode": "modal"
    }
));
// Corrected ambiguous component issues between RN and RNSVG.
// Moved from a black list to a white list approach for allowing core components from RN and RNSVG.
// Ensured that issues with event type and dataset in RN are corrected to match the behavior from the DOM in React.JS.
const window = Dimensions.get("window");
const react_native_svg_components = [
    "Circle",
    "ClipPath",
    "Defs",
    "Ellipse",
    "ForeignObject",
    "G",
    "Image",
    "Line",
    "LinearGradient",
    "LocalSvg",
    "Marker",
    "Mask",
    "Path",
    "Pattern",
    "Polygon",
    "Polyline",
    "RadialGradient",
    "Rect",
    "Shape",
    "Stop",
    "Svg",
    "SvgAst",
    "SvgCss",
    "SvgCssUri",
    "SvgFromUri",
    "SvgFromXml",
    "SvgUri",
    "SvgWithCss",
    "SvgWithCssUri",
    "SvgXml",
    "Symbol",
    "TSpan",
    "Text",
    "TextPath",
    "Use",
    "WithLocalSvg"
];
const react_native_components = [
    "ActivityIndicator",
    "Button",
    "DrawerLayoutAndroid",
    "FlatList",
    "Image",
    "ImageBackground",
    "InputAccessoryView",
    "KeyboardAvoidingView",
    "Modal",
    "Pressable",
    "RefreshControl",
    "SafeAreaView",
    "ScrollView",
    "SectionList",
    "StatusBar",
    "Switch",
    "Text",
    "TextInput",
    "TouchableHighlight",
    "TouchableNativeFeedback",
    "TouchableOpacity",
    "TouchableWithoutFeedback",
    "View",
    "VirtualizedList"
];
const react_native_snap_carousel_components = [
    "Carousel",
    "Pagination",
    "ParallaxImage"
];
const ambiguous_react_native_svg_components = react_native_svg_components
    .filter((component = "") => react_native_components.includes(component));
const state = {
    ...app,
    "$composers": {
        ...react_native_snap_carousel_components
            .reduce((snap_carousel, key) => ({...snap_carousel, [key]: ReactNativeSnapCarousel[key]}), {}),
        ...react_native_svg_components
            .reduce((svg, key) => ({...svg, [key]: ReactNativeSvg[key]}), {}),
        ...react_native_components
            .reduce((react_native, key) => ({...react_native, [key]: ReactNative[key]}), {}),
        ...ambiguous_react_native_svg_components
            .reduce((svg, key) => ({...svg, [`Svg${key}`]: ReactNativeSvg[key]}), {}),
        // Disney Plux
        DPStack,
        DPImage,
        "category_size": [
            {
                "$compose": "create",
                "$value": {
                    "window_width": {
                        "$compose": "read",
                        "$value": "$.app.$states.window_width",
                        "$default": 0
                    },
                    "number_of_categories": {
                        "$compose": "read",
                        "$value": "$.app.$states.categories.length",
                        "$default": 0
                    }
                }
            },
            {
                "$compose": "math",
                "$value": "ceil((window_width - 16 - number_of_categories * 18) / number_of_categories)",
                "$default": 0
            }
        ],
        "category_size_minus_two": [
            {
                "$compose": "create",
                "$value": {
                    "category_size": {
                        "$compose": "category_size"
                    }
                }
            },
            {
                "$compose": "math",
                "$value": "category_size - 2",
                "$default": 0
            }
        ],
        "category_style": {
            "$compose": "create",
            "$value": {
                "alignItems": "center",
                "borderColor": "#384569",
                "borderRadius": 4,
                "borderWidth": 1,
                "flex": 1,
                "justifyContent": "center",
                "marginRight": 16,
                "height": {
                    "$compose": "category_size"
                }
            }
        },
        "profile_image_source": {
            "$compose": "create",
            "$value": {
                "uri": {
                    "$compose": "encode",
                    "$type": "uri",
                    "$value": {
                        "href": "https://github.com",
                        "pathname": "/ttahmouch/covfefe/blob/feature/jsonml+disneyplus/disneyplus/src/assets/images/profiles/stormtrooper.jpg",
                        "searchParams": {
                            "raw": "true"
                        }
                    }
                },
                "width": 30,
                "height": 30
            }
        },
        "carousel_item_width": [
            {
                "$compose": "create",
                "$value": {
                    "window_width": {
                        "$compose": "read",
                        "$value": "$.app.$states.window_width",
                        "$default": 0
                    }
                }
            },
            {
                "$compose": "math",
                "$value": "window_width - 52",
                "$default": 0
            }
        ]
    },
    "$states": {
        ...$states,
        "window_width": window.width,
        "window_height": window.height,
        "app_version": Constants.manifest.version,
        "device_model": typeof Constants.platform.ios !== "undefined" ? Constants.platform.ios.model : "Unknown Device",
        "should_show_modal": true
    },
    "$styles": {
        "categories": {
            "alignItems": "flex-start",
            "flexDirection": "row",
            "justifyContent": "space-between",
            "paddingBottom": 8,
            "paddingLeft": 16,
            "paddingTop": 24
        },
        "header": {
            "alignItems": "flex-start",
            "flexDirection": "row",
            "justifyContent": "space-between",
            "paddingBottom": 4,
            "paddingHorizontal": 16,
            "paddingTop": device.iPhoneNotch ? 54 : 30
        },
        "profile_row": {
            "borderBottomColor": "#A4A3A2",
            "borderBottomWidth": 1,
            "flexDirection": "row",
            "justifyContent": "space-between",
            "marginLeft": 16,
            "paddingRight": 16,
            "paddingVertical": 20
        },
        "profile_row_text": {
            "color": "#FFFFFF",
            "flex": 2,
            "fontWeight": "normal",
            // "fontFamily": fonts.regular,
            "fontSize": 16
        },
        "header_back_button_with_text": {
            "color": "#FFFFFF",
            "fontWeight": "bold"
            // "fontFamily": fonts.bold
        },
        "header_title": {
            "flex": 4,
            "height": 35,
            "justifyContent": "flex-end"
        },
        "home_row_item": {
            "height": 130,
            "width": 93,
            "borderRadius": 4,
            "marginRight": 8,
            "overflow": "hidden"
        }
    },
    "$events": {
        "on_press_logo": [
            {
                "$action": "create_$states_items",
                "$value": {
                    "items": {
                        "should_show_modal": false
                    }
                }
            }
        ]
    },
    "$views": {
        "svg_arrow_left_path": {
            "$type": "Path",
            "d": "M10.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-6 6c-.4.4-.4 1 0 1.4l6 6c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L10.4 12z",
            "fill": "#A4A3A2"
        },
        "svg_arrow_left": {
            "$type": "Svg",
            "height": 24,
            "width": 24,
            "viewBox": "0 0 24 24",
            "children": {
                "$type": "View",
                "data-view": "svg_arrow_left_path"
            }
        },
        "svg_arrow_right_path": {
            "$type": "Path",
            "d": "M15.7 11.3l-6-6c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3l6-6c.4-.4.4-1 0-1.4z",
            "fill": "#A4A3A2"
        },
        "svg_arrow_right": {
            "$type": "Svg",
            "height": 24,
            "width": 24,
            "viewBox": "0 0 24 24",
            "children": {
                "$type": "View",
                "data-view": "svg_arrow_right_path"
            }
        },
        "svg_background": {
            "$type": "Svg",
            "height": "812",
            "width": "375",
            "children": [
                {
                    "$type": "Defs",
                    "children": [
                        {
                            "$type": "LinearGradient",
                            "id": "c",
                            "x1": "100%",
                            "y1": "70%",
                            "x2": "0%",
                            "y2": "30%",
                            "children": [
                                {
                                    "$type": "Stop",
                                    "stopColor": "#0b0d15",
                                    "offset": "0"
                                },
                                {
                                    "$type": "Stop",
                                    "stopColor": "#292c3c",
                                    "offset": "48%"
                                },
                                {
                                    "$type": "Stop",
                                    "stopColor": "#292c3c",
                                    "offset": "52%"
                                },
                                {
                                    "$type": "Stop",
                                    "stopColor": "#0b0d15",
                                    "offset": "100%"
                                }
                            ]
                        }
                    ]
                },
                {
                    "$type": "Rect",
                    "x": "0",
                    "y": "0",
                    "width": "100%",
                    "height": "100%",
                    "fill": "url(#c)"
                }
            ]
        },
        "svg_plus_path": {
            "$type": "Path",
            "d": "M19 11h-6V5c0-.6-.4-1-1-1s-1 .4-1 1v6H5c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1v-6h6c.6 0 1-.4 1-1s-.4-1-1-1z",
            "fill": "#A4A3A2"
        },
        "svg_plus": {
            "$type": "Svg",
            "height": 24,
            "width": 24,
            "viewBox": "0 0 24 24",
            "children": {
                "$type": "View",
                "data-view": "svg_plus_path"
            }
        },
        "svg_edit_path": {
            "$type": "Path",
            "d": "M21.7 7.3l-5-5c-.4-.4-1-.4-1.4 0l-13 13c-.2.2-.3.4-.3.7v5c0 .6.4 1 1 1h5c.3 0 .5-.1.7-.3l13-13c.4-.4.4-1 0-1.4zM7.6 20H4v-3.6l12-12L19.6 8l-12 12z",
            "fill": "#A4A3A2"
        },
        "svg_edit": {
            "$type": "Svg",
            "height": 24,
            "width": 24,
            "viewBox": "0 0 24 24",
            "children": {
                "$type": "View",
                "data-view": "svg_edit_path"
            }
        },
        "svg_disney_plus_logo_path": {
            "$type": "Path",
            "d": "M1174.8 624.7c-14.4 3.3-52.3 5.2-52.3 5.2l-4.8 15s18.9-1.6 32.7-.2c0 0 4.5-.5 5 5.1.2 5.2-.4 10.8-.4 10.8s-.3 3.4-5.1 4.2c-5.2.9-40.8 2.2-40.8 2.2l-5.8 19.5s-2.1 4.5 2.7 3.2c4.5-1.2 41.8-8.2 46.7-7.2 5.2 1.3 11 8.2 9.3 14.6-2 7.8-39.2 31.6-61.9 29.9 0 0-11.9.8-22-15.3-9.4-15.3 3.6-44.4 3.6-44.4s-5.9-13.6-1.6-18.1c0 0 2.6-2.3 10-2.9l9.1-18.9s-10.4.7-16.6-6.9c-5.8-7.3-6.2-10.6-1.8-12.6 4.7-2.3 48-10.2 77.8-9.2 0 0 10.4-1 19.3 17-.1 0 4.3 7.3-3.1 9zm-112.1 72.6c-3.8 9-13.9 18.6-26.4 12.6-12.4-6-32.1-46.3-32.1-46.3s-7.5-15-8.9-14.7c0 0-1.6-2.9-2.6 13.5s.2 48.3-6.3 53.3c-6.2 5-13.7 3-17.6-2.9-3.5-5.8-5-19.6-3.1-43.8 2.3-24.2 7.9-50 15.1-58.1 7.2-8 13-2.2 15.2-.1 0 0 9.6 8.7 25.5 34.3l2.8 4.7s14.4 24.2 15.9 24.1c0 0 1.2 1.1 2.2.3 1.5-.4.9-8.2.9-8.2s-3-26.3-16.1-70.9c0 0-2-5.6-.6-10.8 1.3-5.3 6.6-2.8 6.6-2.8s20.4 10.2 30.2 43.4c9.7 33.5 3.1 63.4-.7 72.4zM962.5 612c-1.7 3.4-2.7 8.3-11.3 9.6 0 0-82.3 5.6-86.2 11.4 0 0-2.9 3.4 1.6 4.4 4.5.9 23.1 3.4 32.1 3.9 9.6.1 42 .4 53.6 14.9 0 0 6.9 6.9 6.6 22.5-.3 16-3.1 21.6-9.3 27.4-6.5 5.4-62.3 30.4-98.3-8 0 0-16.6-18.5 5.7-32.5 0 0 16.1-9.7 57 1.7 0 0 12.4 4.5 11.8 9-.7 4.8-10.2 9.9-24 9.6-13.4-.4-23.2-6.8-21.3-5.8 1.8.7-14.4-7.8-19.4-2-5 5.3-3.8 8.6 1.1 11.9 12.5 7.1 60.8 4.6 75.2-11.4 0 0 5.7-6.5-3-11.8-8.7-5-33.6-8-43.3-8.5-9.3-.5-43.9.1-48.9-9.1 0 0-5-6.2.5-23.8 5.8-18.4 46.1-25.5 63.5-27.1 0 0 47.9-1.7 56.7 8.1-.1 0 1.1 2.3-.4 5.6zm-136 107.9c-5.8 4.3-18.1 2.4-21.6-2.4-3.5-4.3-4.7-21.4-4-48.2.7-27.1 1.3-60.7 7.1-66 6.2-5.4 10-.7 12.4 3 2.6 3.6 5.7 7.6 6.4 16.1.6 8.5 2.6 53.1 2.6 53.1s2.6 40.2-2.9 44.4zM839 576.1c-16.9 5.6-28.5 3.7-38.3-.5-4.3 7.5-6.8 9.8-10.1 10.3-4.8.5-9.1-7.2-9.9-9.7-.8-1.9-3.1-5.1-.3-12.7-9.6-8.6-10.3-20.2-8.7-28 2.4-9 18.6-43.2 67.9-47.2 0 0 24.1-1.8 28.2 11.1h.7s23.4.1 22.9 20.9c-.3 20.9-26 46.9-52.4 55.8zm-46-46.3c-5 8-5.2 12.8-2.9 16.1 5.7-8.7 16.1-22.4 31.4-32.8-11.8 1-21.7 6.1-28.5 16.7zm68.1-13.4c-15.5 2.3-39.5 23.1-50.9 40.1 17.5 3.2 48.4 2 62.1-25.9-.1 0 6.5-17.3-11.2-14.2zm420.8 161.1c-9.3 16.2-35.4 50-70.2 42.1-11.5 27.9-21.1 56-26.6 98.2 0 0-1.2 8.2-8 5.3-6.7-2.4-17.9-13.6-20.1-29.1-2.4-20.4 6.7-54.9 25.2-94.4-5.4-8.8-9.1-21.4-5.9-39.3 0 0 4.7-33.2 38-63.2 0 0 4-3.5 6.3-2.4 2.6 1.1 1.4 11.9-.7 17.1-2.1 5.2-17 31-17 31s-9.3 17.4-6.7 31.1c17.5-26.9 57.3-81.2 82-64.1 8.3 5.9 12.1 18.8 12.1 32.7-.1 12.3-3 25.3-8.4 35zm-7.2-42.6s-1.4-10.7-11.8 1.1c-9 9.9-25.2 28.6-38.3 53.9 13.7-1.5 26.9-9 30.9-12.8 6.5-5.8 21.6-21.4 19.2-42.2zm-485.5 13.6c-1.9 24.2-11.2 64.9-77.1 85-43.5 13.1-84.6 6.8-107 1.1-.5 8.9-1.5 12.7-2.9 14.2-1.9 1.9-16.1 10.1-23.9-1.5-3.5-5.5-5.3-15.5-6.3-24.4-50.4-23.2-73.6-56.6-74.5-58.1-1.1-1.1-12.6-13.1-1.1-27.8 10.8-13.3 46.1-26.6 77.9-32 1.1-27.2 4.3-47.7 8.1-57.1 4.6-10.9 10.4-1.1 15.4 6.3 4.2 5.5 6.7 29.2 6.9 48.1 20.8-1 33.1.5 56.3 4.7 30.2 5.5 50.4 20.9 48.6 38.4-1.3 17.2-17.1 24.3-23.1 24.8-6.3.5-16.1-4-16.1-4-6.7-3.2-.5-6 7.6-9.5 8.8-4.3 6.8-8.7 6.8-8.7-3.3-9.6-42.5-16.3-81.5-16.3-.2 21.5.9 57.2 1.4 78 27.3 5.2 47.7 4.2 47.7 4.2s99.6-2.8 102.6-66.4c3.1-63.7-99.3-124.8-175-144.2-75.6-19.8-118.4-6-122.1-4.1-4 2-.3 2.6-.3 2.6s4.1.6 11.2 3c7.5 2.4 1.7 6.3 1.7 6.3-12.9 4.1-27.4 1.5-30.2-4.4-2.8-5.9 1.9-11.2 7.3-18.8 5.4-8 11.3-7.7 11.3-7.7 93.5-32.4 207.4 26.2 207.4 26.2C773 560.5 791.2 623.9 789.2 648.5zM507 645.2c-10.6 5.2-3.3 12.7-3.3 12.7 19.9 21.4 44.4 34.8 67.7 43.1 2.7-36.9 2.3-49.9 2.6-68.5-36.4 2.5-57.4 8.3-67 12.7zM1479.9 637.6v13.2c0 2.9-2.3 5.2-5.2 5.2h-62.9c0 3.3.1 6.2.1 8.9 0 19.5-.8 35.4-2.7 53.3-.3 2.7-2.5 4.7-5.1 4.7h-13.6c-1.4 0-2.7-.6-3.6-1.6-.9-1-1.4-2.4-1.2-3.8 1.9-17.8 2.8-33.5 2.8-52.6 0-2.8 0-5.7-.1-8.9h-62.2c-2.9 0-5.2-2.3-5.2-5.2v-13.2c0-2.9 2.3-5.2 5.2-5.2h61.3c-1.3-21.5-3.9-42.2-8.1-63.2-.2-1.3.1-2.6.9-3.6s2-1.6 3.3-1.6h14.7c2.3 0 4.2 1.6 4.7 3.9 4.1 21.7 6.7 42.8 8 64.5h63.7c2.8 0 5.2 2.4 5.2 5.2z",
            "fill": "#FFFFFF"
        },
        "svg_disney_plus_logo": {
            "$type": "Svg",
            "height": 80,
            "width": 120,
            "viewBox": "400 200 1120 680",
            "children": {
                "$type": "View",
                "data-view": "svg_disney_plus_logo_path"
            }
        },
        "svg_downloads_path": {
            "$type": "Path",
            "d": "M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z",
            "fill": "#50525D"
        },
        "svg_downloads": {
            "$type": "Svg",
            "height": 48,
            "width": 48,
            "viewBox": "0 0 20 20",
            "children": {
                "$type": "View",
                "data-view": "svg_downloads_path"
            }
        },
        "svg_home_path": {
            "$type": "Path",
            "d": "M26.882 19.414v10.454h-5.974v-5.227h-5.974v5.227H8.961V19.414H5.227L17.921 6.72l12.694 12.694h-3.733z",
            "fill": "#A4A3A2"
        },
        "svg_home": {
            "$type": "Svg",
            "height": 32,
            "width": 32,
            "viewBox": "0 0 36 36",
            "children": {
                "$type": "View",
                "data-view": "svg_home_path"
            }
        },
        "svg_search_path": {
            "$type": "Path",
            "d": "M21.866 24.337c-3.933 2.762-9.398 2.386-12.914-1.13-3.936-3.936-3.936-10.318 0-14.255 3.937-3.936 10.32-3.936 14.256 0 3.327 3.327 3.842 8.402 1.545 12.27l4.56 4.558a2 2 0 0 1 0 2.829l-.174.173a2 2 0 0 1-2.828 0l-4.445-4.445zm-5.786-1.36a6.897 6.897 0 1 0 0-13.794 6.897 6.897 0 0 0 0 13.794z",
            "fill": "#A4A3A2"
        },
        "svg_search": {
            "$type": "Svg",
            "height": 32,
            "width": 32,
            "viewBox": "0 0 36 36",
            "children": {
                "$type": "View",
                "data-view": "svg_downloads_path"
            }
        },
        "svg_trash_path_one": {
            "$type": "Path",
            "d": "M21 5h-4V4c0-1.7-1.3-3-3-3h-4C8.3 1 7 2.3 7 4v1H3c-.6 0-1 .4-1 1s.4 1 1 1h1v13c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V7h1c.6 0 1-.4 1-1s-.4-1-1-1zM9 4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v1H9V4zm9 16c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V7h12v13z",
            "fill": "#A4A3A2"
        },
        "svg_trash_path_two": {
            "$type": "Path",
            "d": "M10 10c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1s1-.4 1-1v-6c0-.6-.4-1-1-1zM14 10c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1s1-.4 1-1v-6c0-.6-.4-1-1-1z",
            "fill": "#A4A3A2"
        },
        "svg_trash": {
            "$type": "Svg",
            "height": 24,
            "width": 24,
            "viewBox": "0 0 24 24",
            "children": [
                {
                    "$type": "View",
                    "data-view": "svg_trash_path_one"
                },
                {
                    "$type": "View",
                    "data-view": "svg_trash_path_two"
                }
            ]
        },
        "svg_category_background": {
            "$type": "Svg",
            "height": 24,
            "width": 24,
            "children": [
                {
                    "$type": "Defs",
                    "children": {
                        "$type": "LinearGradient",
                        "id": "a",
                        "x1": "50%",
                        "y1": "0%",
                        "x2": "50%",
                        "y2": "100%",
                        "children": [
                            {
                                "$type": "Stop",
                                "stopColor": "#0B173D",
                                "offset": "0"
                            },
                            {
                                "$type": "Stop",
                                "stopColor": "#204C9A",
                                "offset": "100%"
                            }
                        ]
                    }
                },
                {
                    "$type": "Rect",
                    "x": "0",
                    "y": "0",
                    "width": "100%",
                    "height": "100%",
                    "fill": "url(#a)"
                }
            ]
        },
        "settings_row_title": {
            "$type": "Text",
            "style": {
                "color": "#CACACA",
                "fontWeight": "normal",
                // "fontFamily": fonts.regular,
                "fontSize": 16
            },
            "children": ""
        },
        "settings_row_subtitle": {
            "$type": "Text",
            "style": {
                "color": "#979797",
                "fontWeight": "normal",
                // "fontFamily": fonts.regular,
                "fontSize": 12,
                "marginTop": 4
            },
            "children": ""
        },
        "settings_row_arrow_right": {
            "$type": "View",
            "style": {
                "justifyContent": "center"
            },
            "children": {
                "$type": "View",
                "data-view": "svg_arrow_right",
                "height": 20,
                "width": 20
            }
        },
        "settings_row_trash": {
            "$type": "View",
            "style": {
                "justifyContent": "center",
                "marginRight": 4
            },
            "children": {
                "$type": "View",
                "data-view": "svg_trash",
                "height": 20,
                "width": 20
            }
        },
        "settings_row": {
            "$type": "TouchableOpacity",
            "activeOpacity": 0.7,
            "onPress": null,
            "style": {
                "flexDirection": "row",
                "justifyContent": "space-between",
                "paddingHorizontal": 8,
                "paddingVertical": 16
            },
            "children": []
        },
        "settings_header": {
            "$type": "Text",
            "style": {
                "color": "#979797",
                "fontWeight": "300",
                // "fontFamily": fonts.light,
                "fontSize": 16,
                "textTransform": "uppercase",
                "marginHorizontal": 8,
                "marginVertical": 16
            },
            "children": ""
        },
        "settings_divider": {
            "$type": "View",
            "style": {
                "borderBottomColor": "#3E3E3F",
                "borderBottomWidth": 1
            }
        },
        "header_back_button": {
            "$type": "TouchableOpacity",
            "activeOpacity": 0.7,
            "onPress": null,
            "children": []
        },
        "header_back_button_with_left_arrow": {
            "$type": "View",
            "data-view": "header_back_button",
            "style": {
                "alignSelf": "center",
                "flex": 1
            },
            "children": {
                "$type": "View",
                "data-view": "svg_arrow_left"
            }
        },
        "header_back_button_with_text": {
            "$type": "View",
            "data-view": "header_back_button",
            "style": {
                "alignItems": "flex-start",
                "flex": 1,
                "justifyContent": "center",
                "height": 35
            },
            "children": []
        },
        "header_title": {
            "$type": "View",
            "data-style": "header_title",
            "children": []
        },
        "header_title_text": {
            "$type": "Text",
            "style": {
                "color": "#FFFFFF",
                "fontSize": 18,
                "paddingBottom": 4,
                "textAlign": "center"
            },
            "children": ""
        },
        "header": {
            "$type": "View",
            "data-style": "header",
            "children": []
        },
        "profile_add_image": {
            "$type": "View",
            "style": {
                "height": 74,
                "width": 74,
                "borderRadius": 37,
                "alignItems": "center",
                "backgroundColor": "#50525D",
                "justifyContent": "center",
                "marginBottom": 4
            },
            "children": {
                "$type": "View",
                "data-view": "svg_plus",
                "height": 40,
                "width": 40
            }
        },
        "profile_image": {
            "$type": "Image",
            "source": 0,
            "style": {
                "height": 74,
                "width": 74,
                "borderRadius": 37,
                "marginBottom": 6,
                "overflow": "hidden",
                "resizeMode": "contain",
            }
        },
        "profile_image_selected": {
            "$type": "View",
            "style": {
                "position": "absolute",
                "borderColor": "#FFFFFF",
                "borderRadius": 37,
                "borderWidth": 2,
                "height": 74,
                "width": 74
            }
        },
        "profile_name": {
            "$type": "Text",
            "style": {
                "color": "#A4A3A2",
                "fontSize": 12,
                "fontWeight": "500",
                // "fontFamily": fonts.medium,
                "marginTop": 4
            },
            "children": ""
        },
        "profile_name_selected": {
            "$type": "Text",
            "style": {
                "color": "#FFFFFF",
                "fontSize": 12,
                "fontWeight": "bold",
                // "fontFamily": fonts.medium,
                "marginTop": 4
            },
            "children": ""
        },
        "profile_edit_button_title": {
            "$type": "Text",
            "style": {
                "color": "#FFFFFF",
                "fontWeight": "500",
                // "fontFamily": fonts.medium,
                "paddingHorizontal": 16,
                "paddingVertical": 8,
                "textTransform": "uppercase"
            },
            "children": "Edit Profiles"
        },
        "profile_edit_button": {
            "$type": "TouchableOpacity",
            "activeOpacity": 0.7,
            "onPress": null,
            "style": {
                "alignItems": "center",
                "backgroundColor": "#404249",
                "borderRadius": 4,
                "flexDirection": "row",
                "justifyContent": "center",
                "marginBottom": 24
            },
            "children": {
                "$type": "View",
                "data-view": "profile_edit_button_title"
            }
        },
        "profile_add_button": {
            "$type": "TouchableOpacity",
            "activeOpacity": 0.7,
            "style": {
                "alignItems": "center",
                "marginHorizontal": 10
            },
            "children": [
                {
                    "$type": "View",
                    "data-view": "profile_add_image"
                },
                {
                    "$type": "View",
                    "data-view": "profile_name",
                    "children": "Add Profile"
                }
            ]
        },
        "profile_arrow_right": {
            "$type": "View",
            "style": {
                "justifyContent": "center"
            },
            "children": {
                "$type": "View",
                "data-view": "svg_arrow_right",
                "height": 20,
                "width": 20
            }
        },
        "profile_row": {
            "$type": "TouchableOpacity",
            "activeOpacity": 0.7,
            "onPress": null,
            "data-style": "profile_row",
            "children": []
        },
        "settings_downloads_bar": {
            "$type": "View",
            "style": {
                "borderBottomColor": "#3E3E3F",
                "borderBottomWidth": 0.5,
                "marginHorizontal": 8,
                "paddingVertical": 8
            },
            "children": [
                {
                    "$type": "Text",
                    "style": {
                        "color": "#FFFFFF"
                    },
                    "data-state": "device_model"
                },
                {
                    "$type": "View",
                    "style": {
                        "backgroundColor": "#D8D8D8",
                        "flexDirection": "row",
                        "height": 10,
                        "marginVertical": 8,
                        "width": "100%"
                    },
                    "children": [
                        {
                            "$type": "View",
                            "style": {
                                "backgroundColor": "#4A4A4A",
                                "height": "100%",
                                "width": "24%"
                            }
                        },
                        {
                            "$type": "View",
                            "style": {
                                "backgroundColor": "#3070CB",
                                "height": "100%",
                                "width": "4%"
                            }
                        }
                    ]
                },
                {
                    "$type": "View",
                    "style": {
                        "flexDirection": "row",
                        "justifyContent": "space-between"
                    },
                    "children": [
                        {
                            "$type": "View",
                            "style": {
                                "alignItems": "center",
                                "flexDirection": "row",
                                "justifyContent": "center"
                            },
                            "children": [
                                {
                                    "$type": "View",
                                    "style": {
                                        "borderRadius": 3,
                                        "height": 14,
                                        "marginRight": 10,
                                        "width": 14,
                                        "backgroundColor": "#4A4A4A"
                                    }
                                },
                                {
                                    "$type": "Text",
                                    "style": {
                                        "color": "#FFFFFF"
                                    },
                                    "children": "Used"
                                }
                            ]
                        },
                        {
                            "$type": "View",
                            "style": {
                                "alignItems": "center",
                                "flexDirection": "row",
                                "justifyContent": "center"
                            },
                            "children": [
                                {
                                    "$type": "View",
                                    "style": {
                                        "borderRadius": 3,
                                        "height": 14,
                                        "marginRight": 10,
                                        "width": 14,
                                        "backgroundColor": "#3070CB"
                                    }
                                },
                                {
                                    "$type": "Text",
                                    "style": {
                                        "color": "#FFFFFF"
                                    },
                                    "children": "Disney+"
                                }
                            ]
                        },
                        {
                            "$type": "View",
                            "style": {
                                "alignItems": "center",
                                "flexDirection": "row",
                                "justifyContent": "center"
                            },
                            "children": [
                                {
                                    "$type": "View",
                                    "style": {
                                        "borderRadius": 3,
                                        "height": 14,
                                        "marginRight": 10,
                                        "width": 14,
                                        "backgroundColor": "#D8D8D8"
                                    }
                                },
                                {
                                    "$type": "Text",
                                    "style": {
                                        "color": "#FFFFFF"
                                    },
                                    "children": "Free"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "home_row_item_image": {
            "$type": "Image",
            "style": {
                "height": "100%",
                "width": "100%",
                "resizeMode": "contain",
                "backgroundColor": "#A4A4A4"
            },
            "source": 0
        },
        "home_row_item": {
            "$type": "View",
            "style": {
                "height": 130,
                "width": 93,
                "borderRadius": 4,
                "marginRight": 8,
                "overflow": "hidden"
            },
            "children": {
                "$type": "View",
                "data-view": "home_row_item_image"
            }
        },
        "home_row": {
            "$type": "FlatList",
            "data-state": "originals",
            "data-bind-state": "data",
            "contentContainerStyle": {
                "paddingLeft": 16,
                "paddingRight": 8
            },
            "showsHorizontalScrollIndicator": false,
            "horizontal": true,
        },
        "home_categories": {
            "$type": "View",
            "data-style": "categories",
            "data-state": "categories",
            "data-state-repeat": "true",
            "data-state-repeat-key": "category",
            "children": {
                "$type": "TouchableOpacity",
                "activeOpacity": 0.7,
                "data-state": "id",
                "data-state-path": "$.view.category.id",
                "data-bind-state": "key",
                "onPress": () => undefined,
                // "data-event": "on_press_logo",
                // "data-bind-event": "onPress",
                "data-style": "category_style",
                "children": [
                    {
                        "$type": "View",
                        "style": {
                            "borderRadius": 2,
                            "overflow": "hidden",
                            "position": "absolute"
                        },
                        "children": {
                            "$type": "View",
                            "data-view": "svg_category_background",
                            "data-states": {
                                "width": "category_size",
                                "height": "category_size_minus_two"
                            }
                        }
                    },
                    {
                        "$type": "DPImage",
                        "data-state": "image",
                        "data-state-path": "$.view.category.image",
                        "data-bind-state": "image",
                        "style": {
                            "height": 36,
                            "width": 64
                        }
                    }
                ]
            }
        },
        "screen_background": {
            "$type": "View",
            "style": {"position": "absolute"},
            "children": {
                "$type": "View",
                "data-view": "svg_background"
            }
        },
        "screen_downloads": {
            "$type": "View",
            "style": {
                "backgroundColor": "#0B0D15",
                "flex": 1
            },
            "children": [
                {
                    "$type": "View",
                    "data-view": "screen_background"
                },
                {
                    "$type": "View",
                    "data-style": "header",
                    "children": [
                        {
                            "$type": "View",
                            "style": {
                                "flex": 4,
                                "height": 35,
                                "justifyContent": "flex-end"
                            },
                            "children": {
                                "$type": "View",
                                "data-view": "header_title_text",
                                "children": "Downloads"
                            }
                        }
                    ]
                },
                {
                    "$type": "View",
                    "style": {
                        "alignItems": "center",
                        "justifyContent": "center",
                        "flex": 1
                    },
                    "children": [
                        {
                            "$type": "View",
                            "style": {
                                "alignItems": "center",
                                "borderColor": "#50525D",
                                "borderRadius": 50,
                                "borderWidth": 2,
                                "height": 100,
                                "justifyContent": "center",
                                "marginBottom": 32,
                                "marginTop": 48,
                                "width": 100
                            },
                            "children": {
                                "$type": "View",
                                "data-view": "svg_downloads",
                                "height": 48,
                                "width": 48
                            }
                        },
                        {
                            "$type": "Text",
                            "style": {
                                "color": "#FFFFFF",
                                // "fontFamily": fonts.medium,
                                "fontWeight": "500",
                                "fontSize": 18,
                                "marginBottom": 16,
                                "textAlign": "center",
                                "width": 300
                            },
                            "children": "You have no downloads"
                        },
                        {
                            "$type": "Text",
                            "style": {
                                "color": "#CACACA",
                                // "fontFamily": fonts.regular,
                                "fontWeight": "normal",
                                "fontSize": 16,
                                "marginBottom": 48,
                                "textAlign": "center",
                                "width": 300
                            },
                            "children": "Movies and series you download will appear here."
                        }
                    ]
                }
            ]
        },
        "screen_home": {
            "$type": "View",
            "style": {
                "backgroundColor": "#0B0D15",
                "flex": 1
            },
            "children": [
                {
                    "$type": "View",
                    "data-view": "screen_background"
                },
                {
                    "$type": "ScrollView",
                    "scrollEventThrottle": 16,
                    "showsVerticalScrollIndicator": false,
                    "children": [
                        {
                            "$type": "TouchableOpacity",
                            "data-event": "on_press_logo",
                            "data-bind-event": "onPress",
                            "children": {
                                "$type": "View",
                                "style": {
                                    "alignItems": "center",
                                    "marginBottom": 8,
                                    "paddingTop": device.iPhoneNotch ? 36 : 6
                                },
                                "children": {
                                    "$type": "View",
                                    "data-if": "should_show_modal",
                                    "data-view": "svg_disney_plus_logo"
                                }
                            }
                        },
                        {
                            "$type": "Carousel",
                            "renderItem": ({"item": {image}}) => React.createElement({
                                "$type": "Image",
                                "source": image
                            }),
                            "data-states": {
                                "data": "carousel",
                                "sliderWidth": "window_width",
                                "itemWidth": "carousel_item_width"
                            }
                        },
                        {
                            "$type": "View",
                            "data-view": "home_categories"
                        },
                        {
                            "$type": "Text",
                            "style": {
                                "color": "#CACACA",
                                // "fontFamily": fonts.regular,
                                "fontWeight": "normal",
                                "fontSize": 16,
                                "marginBottom": 4,
                                "marginTop": 16,
                                "paddingLeft": 16
                            },
                            "children": "Originals"
                        },
                        {
                            "$type": "View",
                            "data-view": "home_row",
                            "data-state": "originals",
                            "data-bind-state": "data",
                            "keyExtractor": ({id}) => id.toString(),
                            "renderItem": ({"item": {image}}) => {
                                return React.createElement({
                                    "$type": "View",
                                    "data-style": "home_row_item",
                                    "children": {
                                        "$type": "View",
                                        "data-view": "home_row_item_image",
                                        "source": image
                                    }
                                });
                            },
                        },
                        {
                            "$type": "Text",
                            "style": {
                                "color": "#CACACA",
                                // "fontFamily": fonts.regular,
                                "fontWeight": "normal",
                                "fontSize": 16,
                                "marginBottom": 4,
                                "marginTop": 16,
                                "paddingLeft": 16
                            },
                            "children": "Recommended For You"
                        },
                        {
                            "$type": "View",
                            "data-view": "home_row",
                            "data-state": "recommended",
                            "data-bind-state": "data",
                            "keyExtractor": ({id}) => id.toString(),
                            "renderItem": ({"item": {image}}) => {
                                return React.createElement({
                                    "$type": "View",
                                    "data-style": "home_row_item",
                                    "children": {
                                        "$type": "View",
                                        "data-view": "home_row_item_image",
                                        "source": image
                                    }
                                });
                            },
                        },
                        {
                            "$type": "Text",
                            "style": {
                                "color": "#CACACA",
                                // "fontFamily": fonts.regular,
                                "fontWeight": "normal",
                                "fontSize": 16,
                                "marginBottom": 4,
                                "marginTop": 16,
                                "paddingLeft": 16
                            },
                            "children": "Hit Movies"
                        },
                        {
                            "$type": "View",
                            "data-view": "home_row",
                            "data-state": "hits",
                            "data-bind-state": "data",
                            "keyExtractor": ({id}) => id.toString(),
                            "renderItem": ({"item": {image}}) => {
                                return React.createElement({
                                    "$type": "View",
                                    "data-style": "home_row_item",
                                    "children": {
                                        "$type": "View",
                                        "data-view": "home_row_item_image",
                                        "source": image
                                    }
                                });
                            },
                        },
                        {
                            "$type": "Text",
                            "style": {
                                "color": "#CACACA",
                                // "fontFamily": fonts.regular,
                                "fontWeight": "normal",
                                "fontSize": 16,
                                "marginBottom": 4,
                                "marginTop": 16,
                                "paddingLeft": 16
                            },
                            "children": "Trending"
                        },
                        {
                            "$type": "View",
                            "data-view": "home_row",
                            "data-state": "trending",
                            "data-bind-state": "data",
                            "keyExtractor": ({id}) => id.toString(),
                            "renderItem": ({"item": {image}}) => {
                                return React.createElement({
                                    "$type": "View",
                                    "data-style": "home_row_item",
                                    "children": {
                                        "$type": "View",
                                        "data-view": "home_row_item_image",
                                        "source": image
                                    }
                                });
                            },
                        },
                        {
                            "$type": "Text",
                            "style": {
                                "color": "#CACACA",
                                // "fontFamily": fonts.regular,
                                "fontWeight": "normal",
                                "fontSize": 16,
                                "marginBottom": 4,
                                "marginTop": 16,
                                "paddingLeft": 16
                            },
                            "children": "Out of the Vault"
                        },
                        {
                            "$type": "View",
                            "data-view": "home_row",
                            "data-state": "vault",
                            "data-bind-state": "data",
                            "keyExtractor": ({id}) => id.toString(),
                            "renderItem": ({"item": {image}}) => {
                                return React.createElement({
                                    "$type": "View",
                                    "data-style": "home_row_item",
                                    "children": {
                                        "$type": "View",
                                        "data-view": "home_row_item_image",
                                        "source": image
                                    }
                                });
                            },
                        },
                        {
                            "$type": "Text",
                            "style": {
                                "color": "#CACACA",
                                // "fontFamily": fonts.regular,
                                "fontWeight": "normal",
                                "fontSize": 16,
                                "marginBottom": 4,
                                "marginTop": 16,
                                "paddingLeft": 16
                            },
                            "children": "Ultra HD and HDR"
                        },
                        {
                            "$type": "View",
                            "data-view": "home_row",
                            "data-state": "hdr",
                            "data-bind-state": "data",
                            "keyExtractor": ({id}) => id.toString(),
                            "renderItem": ({"item": {image}}) => {
                                return React.createElement({
                                    "$type": "View",
                                    "data-style": "home_row_item",
                                    "children": {
                                        "$type": "View",
                                        "data-view": "home_row_item_image",
                                        "source": image
                                    }
                                });
                            },
                        },
                        {
                            "$type": "View",
                            "style": {
                                "height": 24,
                                "width": "100%"
                            }
                        }
                    ]
                }
            ]
        },
        "screen_search": {
            "$type": "View",
            "style": {
                "backgroundColor": "#0B0D15",
                "flex": 1
            },
            "children": [
                {
                    "$type": "View",
                    "data-view": "screen_background"
                },
                {
                    "$type": "ScrollView",
                    "scrollEventThrottle": 16,
                    "showsVerticalScrollIndicator": false,
                    "children": {
                        "$type": "View"
                    }
                }
            ]
        },
        "screen_settings_body": {
            "$type": "ScrollView",
            "children": [
                {
                    "$type": "View",
                    "data-view": "settings_header",
                    "children": "Video Playback"
                },
                {
                    "$type": "View",
                    "data-view": "settings_divider"
                },
                {
                    "$type": "View",
                    "data-view": "settings_row",
                    "children": [
                        {
                            "$type": "View",
                            "children": [
                                {
                                    "$type": "View",
                                    "data-view": "settings_row_title",
                                    "children": "Cellular Data Usage"
                                },
                                {
                                    "$type": "View",
                                    "data-view": "settings_row_subtitle",
                                    "children": "Automatic"
                                }
                            ]
                        },
                        {
                            "$type": "View",
                            "data-view": "settings_row_arrow_right"
                        }
                    ]
                },
                {
                    "$type": "View",
                    "data-view": "settings_header",
                    "children": "Downloads"
                },
                {
                    "$type": "View",
                    "data-view": "settings_divider"
                },
                {
                    "$type": "View",
                    "data-view": "settings_row",
                    "children": [
                        {
                            "$type": "View",
                            "children": [
                                {
                                    "$type": "View",
                                    "data-view": "settings_row_title",
                                    "children": "Video Quality"
                                },
                                {
                                    "$type": "View",
                                    "data-view": "settings_row_subtitle",
                                    "children": "Standard"
                                }
                            ]
                        },
                        {
                            "$type": "View",
                            "data-view": "settings_row_arrow_right"
                        }
                    ]
                },
                {
                    "$type": "View",
                    "data-view": "settings_row",
                    "onPress": () => Alert.alert(
                        "Delete All Downloads",
                        "Are you sure you want to delete this one download?",
                        [
                            {"text": "Cancel"},
                            {"style": "destructive", "text": "Delete"}
                        ],
                        {"cancelable": false}
                    ),
                    "children": [
                        {
                            "$type": "View",
                            "data-view": "settings_row_title",
                            "children": "Delete All Downloads"
                        },
                        {
                            "$type": "View",
                            "data-view": "settings_row_trash"
                        }
                    ]
                },
                {
                    "$type": "View",
                    "data-view": "settings_downloads_bar"
                },
                {
                    "$type": "View",
                    "data-state": "movies",
                    "data-state-value": [
                        {
                            "id": "0",
                            "name": "Pokemon: The First Movie"
                        },
                        {
                            "id": "1",
                            "name": "Pokemon: The Movie 2000"
                        }
                    ],
                    "data-state-repeat": "true",
                    "data-state-repeat-key": "movie",
                    "children": [
                        {
                            "$type": "View",
                            "data-state": "id",
                            "data-state-path": "$.view.movie.id",
                            "data-bind-state": "key",
                            "children": {
                                "$type": "Text",
                                "style": {
                                    "color": "purple"
                                },
                                "data-state": "name",
                                "data-state-path": "$.view.movie.name",
                            }
                        }
                    ]
                }
            ]
        }
    },
    "$view": {
        "$children": [
            {
                "$type": "StatusBar",
                "hidden": true
            },
            // {
            //     "$type": "Svg",
            //     "height": 200,
            //     "width": 200,
            //     "children": [
            //         {
            //             "$type": "SvgImage",
            //             "x": "5%",
            //             "y": "5%",
            //             "width": "50%",
            //             "height": "90%",
            //             "preserveAspectRatio": "xMidYMid slice",
            //             "opacity": "0.5",
            //             "href": "https://picsum.photos/200/200",
            //             "clipPath": "url(#clip)"
            //         },
            //         {
            //             "$type": "SvgText",
            //             "x": "50",
            //             "y": "50",
            //             "textAnchor": "middle",
            //             "fontWeight": "bold",
            //             "fontSize": "16",
            //             "fill": "blue",
            //             "children": "HOGWARTS"
            //         }
            //     ]
            // },
            {
                "$type": "DPStack"
            }
        ]
    }
};
const history = createMemoryHistory();
const {"location": route = {}} = history;
const middleware = [createLogMiddleware(), createEventMiddleware(), createRouteMiddleware(history)];
const composer = composeWithDevTools({"trace": false, "maxAge": 1000});
const store = storeFromConfiguration({state, middleware, composer, route});
const view = {};

React.createElement = createElementWithCustomDataProps({createElement}, store, view);
// ReactDOM.render(<App store={store} view={view}/>, document.getElementById("root"));
registerRootComponent(() => <App store={store} view={view}/>);
