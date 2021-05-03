import * as React from 'react';
import { View } from 'react-native';
import { gStyle } from '../constants';
import Header from '../components/Header';
import SvgBackground from '../components/Svg.Background';

const ProfileWatchlist = () => (
  <View style={gStyle.container}>
    <View style={gStyle.posAbsolute}>
      <SvgBackground />
    </View>

    <Header showBack title="Watchlist" />
  </View>
);

export default ProfileWatchlist;
