import * as React from 'react';
import { Image, StatusBar, Text, View } from 'react-native';
import { registerRootComponent } from 'expo';
import AppLoading from 'expo-app-loading';
import { colors, fonts, func, gStyle, images } from './constants';
import { createAppContainer, withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ModalAddProfile, ModalManageProfiles } from './screens/ModalManageProfiles';
import Svg, { Path } from 'react-native-svg';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';
import Profile from './screens/Profile';
import ProfileAppSettings from './screens/ProfileAppSettings';
import ProfileWatchlist from './screens/ProfileWatchlist';
import SvgBackground from './components/Svg.Background';
import Header from './components/Header';

const SvgDownloads = ({ active = true, fill = null, size = 24 }) => {
  const fillColor = fill || active ? colors.white : colors.inactiveGrey;
  return (
    <Svg height={size} width={size} viewBox="0 0 20 20">
      <Path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" fill={fillColor} />
    </Svg>
  );
};

const DownloadsScreen = () => (
  <View style={gStyle.container}>
    <View style={gStyle.posAbsolute}>
      <SvgBackground />
    </View>

    <Header title="Downloads" />

    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1
    }}>
      <View style={{
        alignItems: 'center',
        borderColor: colors.profileBackground,
        borderRadius: 50,
        borderWidth: 2,
        height: 100,
        justifyContent: 'center',
        marginBottom: 32,
        marginTop: 48,
        width: 100
      }}>
        <SvgDownloads fill={colors.profileBackground} size={48} />
      </View>

      <Text style={{
        color: colors.white,
        fontFamily: fonts.medium,
        fontSize: 18,
        marginBottom: 16,
        textAlign: 'center',
        width: 300
      }}>
        You have no downloads
      </Text>

      <Text style={{
        color: colors.heading,
        fontFamily: fonts.regular,
        fontSize: 16,
        marginBottom: 48,
        textAlign: 'center',
        width: 300
      }}>
        Movies and series you download will appear here.
      </Text>
    </View>
  </View>
);

const SvgHome = ({ active = true, size = 32 }) => {
  const fill = active ? colors.white : colors.inactiveGrey;
  return (
    <Svg height={size} width={size} viewBox="0 0 36 36">
      <Path
        d="M26.882 19.414v10.454h-5.974v-5.227h-5.974v5.227H8.961V19.414H5.227L17.921 6.72l12.694 12.694h-3.733z"
        fill={fill}
      />
    </Svg>
  );
};

const SvgSearch = ({ active = true, fill = null, size = 32 }) => {
  const fillColor = fill || active ? colors.white : colors.inactiveGrey;
  return (
    <Svg height={size} width={size} viewBox="0 0 36 36">
      <Path
        d="M21.866 24.337c-3.933 2.762-9.398 2.386-12.914-1.13-3.936-3.936-3.936-10.318 0-14.255 3.937-3.936 10.32-3.936 14.256 0 3.327 3.327 3.842 8.402 1.545 12.27l4.56 4.558a2 2 0 0 1 0 2.829l-.174.173a2 2 0 0 1-2.828 0l-4.445-4.445zm-5.786-1.36a6.897 6.897 0 1 0 0-13.794 6.897 6.897 0 0 0 0 13.794z"
        fill={fillColor}
      />
    </Svg>
  );
};

const Stack = createAppContainer(createStackNavigator(
  {
    Main: {
      screen: createBottomTabNavigator(
        {
          StackHome: createStackNavigator(
            {
              HomeMain: {
                screen: HomeScreen,
                navigationOptions: { headerStyle: gStyle.navHeaderStyle }
              }
            },
            {
              headerMode: 'none',
              navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ focused }) => <SvgHome active={focused} />
              }
            }
          ),
          StackSearch: createStackNavigator(
            {
              SearchMain: {
                screen: SearchScreen,
                navigationOptions: { headerStyle: gStyle.navHeaderStyle }
              }
            },
            {
              headerMode: 'none',
              navigationOptions: {
                tabBarLabel: 'Search',
                tabBarIcon: ({ focused }) => <SvgSearch active={focused} />
              }
            }
          ),
          StackDownloads: createStackNavigator(
            {
              DownloadsMain: {
                screen: DownloadsScreen,
                navigationOptions: { headerStyle: gStyle.navHeaderStyle }
              }
            },
            {
              headerMode: 'none',
              navigationOptions: {
                tabBarLabel: 'Downloads',
                tabBarIcon: ({ focused }) => <SvgDownloads active={focused} />
              }
            }
          ),
          StackProfile: createStackNavigator(
            {
              Profile: {
                screen: Profile,
                navigationOptions: { headerStyle: gStyle.navHeaderStyle }
              },
              ProfileAppSettings,
              ProfileWatchlist
            },
            {
              initialRouteName: 'Profile',
              headerMode: 'none',
              navigationOptions: {
                tabBarLabel: 'More',
                tabBarIcon: ({ focused }) => {
                  return (
                    <View style={{
                      alignItems: 'center',
                      borderColor: focused ? colors.white : 'transparent',
                      borderRadius: 20,
                      borderWidth: 2,
                      height: 40,
                      justifyContent: 'center',
                      overflow: 'hidden',
                      width: 40
                    }}>
                      <Image source={images.stormtrooper} style={{
                        height: '100%',
                        resizeMode: 'contain',
                        width: '100%'
                      }} />
                    </View>
                  );
                }
              }
            }
          )
        },
        {
          initialRouteName: 'StackHome',
          tabBarOptions: {
            activeTintColor: colors.white,
            inactiveTintColor: colors.inactiveGrey,
            showLabel: false,
            style: { backgroundColor: colors.tabBackground, borderTopWidth: 0 }
          }
        }
      )
    },
    ModalAddProfile: withNavigation(ModalAddProfile),
    ModalManageProfiles
  },
  { headerMode: 'none', initialRouteName: 'Main', mode: 'modal' }
));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true };
  }

  render() {
    const { isLoading } = this.state;

    return isLoading
      ? (
        <AppLoading
          onError={() => undefined}
          onFinish={() => this.setState({ isLoading: false })}
          startAsync={func.loadAssetsAsync}
        />
      )
      : (
        <React.Fragment>
          <StatusBar barStyle="light-content" />
          <Stack />
        </React.Fragment>
      );
  }
}

registerRootComponent(App);
