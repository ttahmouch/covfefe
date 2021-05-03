import * as React from 'react';
import { Alert, Image, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors, device, fonts, gStyle, images } from '../constants';
import Svg, { Path } from 'react-native-svg';
import { withNavigation } from 'react-navigation';

const SvgEdit = ({ active = true, size = 24 }) => {
  const fill = active ? colors.white : colors.inactiveGrey;
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24">
      <Path
        d="M21.7 7.3l-5-5c-.4-.4-1-.4-1.4 0l-13 13c-.2.2-.3.4-.3.7v5c0 .6.4 1 1 1h5c.3 0 .5-.1.7-.3l13-13c.4-.4.4-1 0-1.4zM7.6 20H4v-3.6l12-12L19.6 8l-12 12z"
        fill={fill}
      />
    </Svg>
  );
};

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

const HeaderManage = withNavigation(({
                                       backText = 'Done',
                                       navigation,
                                       save = false,
                                       saveActive = false,
                                       title = 'Manage Profiles'
                                     }) => {
  return (
    <View style={{
      alignItems: 'flex-start',
      backgroundColor: colors.black,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 4,
      paddingHorizontal: 16,
      paddingTop: device.iPhoneNotch ? 54 : 30
    }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.goBack(null)}
        style={{
          alignItems: 'flex-start',
          flex: 1,
          justifyContent: 'center',
          height: 35
        }}>
        <Text style={{
          color: colors.white,
          fontFamily: fonts.bold
        }}>
          {backText}
        </Text>
      </TouchableOpacity>

      {title && (
        <View style={{
          flex: 4,
          height: 35,
          justifyContent: 'flex-end'
        }}>
          <Text style={{
            color: colors.heading,
            fontSize: 18,
            paddingBottom: 4,
            textAlign: 'center'
          }}>
            {title}
          </Text>
        </View>
      )}

      {!save && <View style={{ flex: 1 }} />}

      {save && (
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
            color: saveActive ? colors.white : colors.moreSaveText,
            fontFamily: fonts.bold
          }}>
            Save
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

export const ModalManageProfiles = ({ navigation }) => (
  <View style={[gStyle.container, { backgroundColor: colors.black }]}>
    <HeaderManage />

    <View style={{
      alignSelf: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 60,
      width: 280
    }}>
      <View style={{
        marginBottom: 16
      }}>
        <Image source={images.robot} style={{
          height: 108,
          resizeMode: 'contain',
          width: 108
        }} />
        <Text style={{
          color: colors.white,
          fontSize: 16,
          fontFamily: fonts.regular,
          marginTop: 8,
          textAlign: 'center'
        }}>
          Caleb
        </Text>
        <View style={{
          backgroundColor: colors.black50,
          height: 108,
          top: 0,
          position: 'absolute',
          width: 108
        }} />
        <View style={{
          alignItems: 'center',
          height: 108,
          justifyContent: 'center',
          position: 'absolute',
          width: 108
        }}>
          <SvgEdit active size={40} />
        </View>
      </View>
      <View style={{
        marginBottom: 16
      }}>
        <Image source={images.penguin} style={{
          height: 108,
          resizeMode: 'contain',
          width: 108
        }} />
        <Text style={{
          color: colors.white,
          fontSize: 16,
          fontFamily: fonts.regular,
          marginTop: 8,
          textAlign: 'center'
        }}>
          Kim
        </Text>
        <View style={{
          backgroundColor: colors.black50,
          height: 108,
          top: 0,
          position: 'absolute',
          width: 108
        }} />
        <View style={{
          alignItems: 'center',
          height: 108,
          justifyContent: 'center',
          position: 'absolute',
          width: 108
        }}>
          <SvgEdit active size={40} />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('ModalAddProfile')}
        style={{
          marginBottom: 16
        }}>
        <View style={{
          alignItems: 'center',
          height: 108,
          justifyContent: 'center',
          width: 108
        }}>
          <View style={{
            alignItems: 'center',
            backgroundColor: colors.moreAddProfileBg,
            borderRadius: 34,
            height: 68,
            justifyContent: 'center',
            width: 68
          }}>
            <SvgPlus active size={40} />
          </View>
        </View>
        <Text style={{
          color: colors.white,
          fontSize: 16,
          fontFamily: fonts.regular,
          marginTop: 8,
          textAlign: 'center'
        }}>
          Add Profile
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export class ModalAddProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { forKidsValue: false, text: '' };
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  handleSwitchChange(value) {
    if (value === false) {
      Alert.alert(
        'This profile will now allow access to TV shows and movies of all maturity levels.',
        '',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }

    this.setState({ forKidsValue: value });
  }

  render() {
    const { forKidsValue, text } = this.state;

    return (
      <View style={{ backgroundColor: colors.black, flex: 1 }}>
        <HeaderManage backText="Cancel" save saveActive={text !== ''} title="Create Profile" />

        <View style={{
          alignSelf: 'center',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 60
        }}>
          <Image source={images.mask} style={{
            height: 108,
            resizeMode: 'contain',
            width: 108
          }} />
          <Text style={{
            color: colors.white,
            fontSize: 16,
            fontFamily: fonts.regular,
            marginBottom: 24,
            marginTop: 8,
            textAlign: 'center'
          }}>
            CHANGE
          </Text>

          <TextInput
            autoCapitalize="none"
            autoFocus
            keyboardAppearance="dark"
            onChangeText={(input) => this.setState({ text: input })}
            selectionColor={colors.storageBlue}
            style={{
              borderColor: colors.white,
              borderWidth: 1,
              color: colors.white,
              fontSize: 16,
              paddingHorizontal: 8,
              paddingVertical: 12,
              width: 260
            }}
            value={text}
          />

          <View style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 16
          }}>
            <Text style={{
              color: colors.white,
              fontFamily: fonts.light,
              fontSize: 16,
              marginRight: 8,
              textTransform: 'uppercase'
            }}>
              For Kids
            </Text>
            <Switch
              onValueChange={(val) => this.handleSwitchChange(val)}
              value={forKidsValue}
            />
          </View>
        </View>
      </View>
    );
  }
}
