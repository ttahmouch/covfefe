import * as React from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import { colors, device, fonts, gStyle, images } from '../constants';
import SvgBackground from '../components/Svg.Background';
import Svg, { Path } from 'react-native-svg';
import { withNavigation } from 'react-navigation';

const SvgPlus = ({ active = true, size = 24 }) => {
  const fill = active ? colors.white : colors.inactiveGrey;
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24">
      <Path
        d="M19 11h-6V5c0-.6-.4-1-1-1s-1 .4-1 1v6H5c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1v-6h6c.6 0 1-.4 1-1s-.4-1-1-1z"
        fill={fill}
      />
    </Svg>
  );
};

const HeaderAccounts = withNavigation(({ navigation }) => (
  <View style={{
    alignItems: 'center',
    width: '100%'
  }}>
    <View style={{
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingBottom: 30,
      paddingTop: device.iPhoneNotch ? 64 : 40,
      width: '100%'
    }}>
      <View style={{
        alignItems: 'center',
        marginHorizontal: 10
      }}>
        <Image source={images.stormtrooper} style={{
          borderRadius: 74 / 2,
          height: 74,
          marginBottom: 6,
          overflow: 'hidden',
          resizeMode: 'contain',
          width: 74
        }} />
        <Text style={{
          color: colors.white,
          fontSize: 12,
          fontFamily: fonts.bold,
          marginTop: 4
        }}>
          Caleb
        </Text>
        <View style={{
          ...gStyle.posAbsolute,
          borderColor: colors.white,
          borderRadius: 74 / 2,
          borderWidth: 2,
          height: 74,
          width: 74
        }} />
      </View>

      <View style={{
        alignItems: 'center',
        marginHorizontal: 10
      }}>
        <Image source={images.elsa} style={{
          borderRadius: 74 / 2,
          height: 74,
          marginBottom: 6,
          overflow: 'hidden',
          resizeMode: 'contain',
          width: 74
        }} />
        <Text style={{
          color: colors.inactiveGrey,
          fontSize: 12,
          fontFamily: fonts.medium,
          marginTop: 4
        }}>
          Kim
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ModalAddProfile')}
        style={{
          alignItems: 'center',
          marginHorizontal: 10
        }}>
        <View style={{
          alignItems: 'center',
          backgroundColor: colors.profileBackground,
          borderRadius: 74 / 2,
          height: 74,
          justifyContent: 'center',
          marginBottom: 4,
          width: 74
        }}>
          <SvgPlus size={40} />
        </View>
        <Text style={{
          color: colors.inactiveGrey,
          fontSize: 12,
          fontFamily: fonts.medium,
          marginTop: 4
        }}>
          Add Profile
        </Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('ModalManageProfiles')}
      style={{
        alignItems: 'center',
        backgroundColor: colors.profileEditBackground,
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 24
      }}>
      <Text style={{
        color: colors.white,
        fontFamily: fonts.medium,
        paddingHorizontal: 16,
        paddingVertical: 8,
        textTransform: 'uppercase'
      }
      }>
        Edit Profiles
      </Text>
    </TouchableOpacity>
  </View>
));

const SvgArrowRight = ({ active = true, size = 24 }) => (
  <Svg height={size} width={size} viewBox="0 0 24 24">
    <Path
      d="M15.7 11.3l-6-6c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3l6-6c.4-.4.4-1 0-1.4z"
      fill={active ? colors.white : colors.inactiveGrey}
    />
  </Svg>
);

const TouchLineItem = ({ icon = null, iconSize = 20, onPress, text }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={{
      borderBottomColor: colors.inactiveGrey,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 16,
      paddingRight: 16,
      paddingVertical: 20
    }}>
    {icon && (
      <View style={{
        justifyContent: 'center',
        marginRight: 16
      }}>
        {React.cloneElement(icon, { size: iconSize })}
      </View>
    )}
    <Text style={{
      color: colors.white,
      flex: 2,
      fontFamily: fonts.regular,
      fontSize: 16
    }}>
      {text}
    </Text>
    <View style={{
      justifyContent: 'center'
    }}>
      <SvgArrowRight active={false} size={iconSize} />
    </View>
  </TouchableOpacity>
);

const Profile = ({ navigation }) => (
  <View style={gStyle.container}>
    <View style={gStyle.posAbsolute}>
      <SvgBackground />
    </View>

    <HeaderAccounts />

    <ScrollView>
      <TouchLineItem
        onPress={() => navigation.navigate('ProfileWatchlist')}
        text="Watchlist"
      />
      <TouchLineItem
        onPress={() => navigation.navigate('ProfileAppSettings')}
        text="App Settings"
      />
      <TouchLineItem onPress={() => null} text="Account" />
      <TouchLineItem onPress={() => null} text="Legal" />
      <TouchLineItem onPress={() => null} text="Help" />
      <TouchLineItem
        onPress={() => Alert.alert(
          'Sign Out',
          'Are you sure that you want to sign out?',
          [{ text: 'No' }, { text: 'Yes' }],
          { cancelable: false }
        )}
        text="Log Out" />

      <Text style={{
        color: colors.inactiveGrey,
        fontFamily: fonts.regular,
        fontSize: 18,
        marginLeft: 16,
        paddingVertical: 16
      }}>
        {`Version: ${Constants.manifest.version}`}
      </Text>
    </ScrollView>
  </View>
);

export default Profile;
