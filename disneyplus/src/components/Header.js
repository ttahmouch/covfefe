import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import { colors, device, fonts } from '../constants';
import Svg, { Path } from 'react-native-svg';

const SvgArrowLeft = ({ active = true, size = 24 }) => {
  const fill = active ? colors.white : colors.inactiveGrey;
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24">
      <Path
        d="M10.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-6 6c-.4.4-.4 1 0 1.4l6 6c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L10.4 12z"
        fill={fill}
      />
    </Svg>
  );
};

const Header = ({ close = false, closeText = 'Cancel', navigation, showBack = false, title = null }) => (
  <View style={{
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4,
    paddingHorizontal: 16,
    paddingTop: device.iPhoneNotch ? 54 : 30
  }}>
    {showBack && (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.goBack(null)}
        style={{
          alignSelf: 'center',
          flex: 1
        }}>
        <SvgArrowLeft />
      </TouchableOpacity>
    )}

    {title && (
      <View style={{
        flex: 4,
        height: 35,
        justifyContent: 'flex-end'
      }}>
        <Text style={{
          color: colors.white,
          fontSize: 18,
          paddingBottom: 4,
          textAlign: 'center'
        }}>
          {title}
        </Text>
      </View>
    )}

    {showBack && !close && <View style={{ flex: 1 }} />}

    {close && (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.goBack(null)}
        style={{
          alignItems: 'flex-end',
          flex: 1,
          justifyContent: 'center',
          height: 35
        }}>
        <Text style={{
          color: colors.white,
          fontFamily: fonts.light,
          fontSize: 16
        }}>
          {closeText}
        </Text>
      </TouchableOpacity>
    )}
  </View>
);

export default withNavigation(Header);
