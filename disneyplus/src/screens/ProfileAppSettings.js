import * as React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import { colors, fonts, gStyle } from '../constants';
import Header from '../components/Header';
import SvgBackground from '../components/Svg.Background';
import Svg, { Path } from 'react-native-svg';

const SvgTrash = ({ active = false, size = 24 }) => {
  const fill = active ? colors.white : colors.inactiveGrey;
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24">
      <Path
        d="M21 5h-4V4c0-1.7-1.3-3-3-3h-4C8.3 1 7 2.3 7 4v1H3c-.6 0-1 .4-1 1s.4 1 1 1h1v13c0 1.7 1.3 3 3 3h10c1.7 0 3-1.3 3-3V7h1c.6 0 1-.4 1-1s-.4-1-1-1zM9 4c0-.6.4-1 1-1h4c.6 0 1 .4 1 1v1H9V4zm9 16c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V7h12v13z"
        fill={fill}
      />
      <Path
        d="M10 10c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1s1-.4 1-1v-6c0-.6-.4-1-1-1zM14 10c-.6 0-1 .4-1 1v6c0 .6.4 1 1 1s1-.4 1-1v-6c0-.6-.4-1-1-1z"
        fill={fill}
      />
    </Svg>
  );
};

const SvgArrowRight = ({ active = true, size = 24 }) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path
      d="M15.7 11.3l-6-6c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3l6-6c.4-.4.4-1 0-1.4z"
      fill={active ? colors.white : colors.inactiveGrey}
    />
  </Svg>
);

const TouchLineItemApp = ({ iconSize = 20, onPress, showArrow = true, tagline = null, text }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      paddingVertical: 16
    }}>
    <View>
      <Text style={{
        color: colors.heading,
        fontFamily: fonts.regular,
        fontSize: 16
      }}>
        {text}
      </Text>
      {tagline && <Text style={{
        color: colors.moreSectionText,
        fontFamily: fonts.regular,
        fontSize: 12,
        marginTop: 4
      }}>{tagline}</Text>}
    </View>
    {showArrow && (
      <View style={{ justifyContent: 'center' }}>
        <SvgArrowRight size={iconSize} />
      </View>
    )}
  </TouchableOpacity>
);

const TouchLineItemElement = ({ element, onPress, text }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 8,
      paddingVertical: 16
    }}>
    <Text style={{
      color: colors.heading,
      fontFamily: fonts.regular,
      fontSize: 16
    }}>
      {text}
    </Text>
    <View style={{
      justifyContent: 'center',
      marginRight: 4
    }}>
      {React.cloneElement(element)}
    </View>
  </TouchableOpacity>
);

const ProfileAppSettings = () => {
  const { platform } = Constants;
  let deviceType = 'Unknown Device';

  // is iOS?
  if (typeof platform.ios !== 'undefined') {
    deviceType = platform.ios.model;
  }

  return (
    <View style={gStyle.container}>
      <View style={gStyle.posAbsolute}>
        <SvgBackground />
      </View>

      <ScrollView>
        <Header showBack title="App Settings" />

        <View style={{
          borderBottomColor: colors.moreSectionBorder,
          borderBottomWidth: 1,
          paddingHorizontal: 8,
          paddingVertical: 16
        }}>
          <Text style={{
            color: colors.moreSectionText,
            fontFamily: fonts.light,
            fontSize: 16,
            textTransform: 'uppercase'
          }}>
            Video Playback
          </Text>
        </View>

        <TouchLineItemApp
          onPress={() => null}
          tagline="Automatic"
          text="Cellular Data Usage"
        />

        <View style={{
          borderBottomColor: colors.moreSectionBorder,
          borderBottomWidth: 1,
          paddingHorizontal: 8,
          paddingVertical: 16
        }}>
          <Text style={{
            color: colors.moreSectionText,
            fontFamily: fonts.light,
            fontSize: 16,
            textTransform: 'uppercase'
          }}>
            Downloads
          </Text>
        </View>

        <TouchLineItemApp
          onPress={() => null}
          tagline="Standard"
          text="Video Quality"
        />

        <TouchLineItemElement
          onPress={() => Alert.alert(
            'Delete All Downloads',
            'Are you sure you want to delete this one download?',
            [
              { text: 'Cancel' },
              { style: 'destructive', text: 'Delete' }
            ],
            { cancelable: false }
          )}
          element={<SvgTrash size={20} />}
          text="Delete All Downloads"
        />

        <View style={{
          borderBottomColor: colors.moreSectionBorder,
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginHorizontal: 8,
          paddingVertical: 8
        }}>
          <Text style={{
            color: colors.white
          }}>
            {deviceType}
          </Text>
          <View style={{
            backgroundColor: colors.moreFree,
            flexDirection: 'row',
            height: 10,
            marginVertical: 8,
            width: '100%'
          }}>
            <View style={{
              backgroundColor: colors.moreUsed,
              height: '100%',
              width: '24%'
            }} />
            <View style={{
              backgroundColor: colors.storageBlue,
              height: '100%',
              width: '4%'
            }} />
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
              <View style={{
                borderRadius: 3,
                height: 14,
                marginRight: 10,
                width: 14,
                backgroundColor: colors.moreUsed
              }} />
              <Text style={{
                color: colors.white
              }}>
                Used
              </Text>
            </View>
            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
              <View style={{
                borderRadius: 3,
                height: 14,
                marginRight: 10,
                width: 14,
                backgroundColor: colors.storageBlue
              }} />
              <Text style={{
                color: colors.white
              }}>
                Disney+
              </Text>
            </View>
            <View style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center'
            }}>
              <View style={{
                borderRadius: 3,
                height: 14,
                marginRight: 10,
                width: 14,
                backgroundColor: colors.moreFree
              }} />
              <Text style={{
                color: colors.white
              }}>
                Free
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileAppSettings;
