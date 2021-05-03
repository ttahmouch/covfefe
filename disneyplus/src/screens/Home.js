import * as React from 'react';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { colors, device, gStyle, images } from '../constants';
import SvgBackground from '../components/Svg.Background';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import Carousel from 'react-native-snap-carousel';

const mockData = {
  dumbData: [
    { id: 1, title: 'movie 1' },
    { id: 2, title: 'movie 2' },
    { id: 3, title: 'movie 3' },
    { id: 4, title: 'movie 4' },
    { id: 5, title: 'movie 5' },
    { id: 6, title: 'movie 6' },
    { id: 7, title: 'movie 7' },
    { id: 8, title: 'movie 8' }
  ],
  hdr: [
    { id: 1, image: 'tfae7' },
    { id: 2, image: 'roasws' },
    { id: 3, image: 'ae' },
    { id: 4, image: 'cm' }
  ],
  hits: [
    { id: 1, image: 'tlm' },
    { id: 2, image: 'tlk' },
    { id: 3, image: 'thond' },
    { id: 4, image: 'roasws' },
    { id: 5, image: 'ae' },
    { id: 6, image: 'fz' }
  ],
  originals: [
    { id: 1, image: 'tm' },
    { id: 2, image: 'f' },
    { id: 3, image: 'tlk' },
    { id: 4, image: 'sb' },
    { id: 5, image: 'fz' },
    { id: 6, image: 'i' },
    { id: 7, image: 'b' }
  ],
  recommended: [
    { id: 1, image: 'ae' },
    { id: 2, image: 'anhe4' },
    { id: 3, image: 'cm' },
    { id: 4, image: 'tpme1' },
    { id: 5, image: 'tfae7' },
    { id: 6, image: 'cacw' },
    { id: 7, image: 'tesbe5' },
    { id: 8, image: 'aotce2' }
  ],
  trending: [
    { id: 1, image: 'ae' },
    { id: 2, image: 'tm' },
    { id: 3, image: 'ts' },
    { id: 4, image: 'cm' },
    { id: 5, image: 'tlk' },
    { id: 6, image: 'z' },
    { id: 7, image: 'a' }
  ],
  vault: [
    { id: 1, image: 'a' },
    { id: 2, image: 'aiw' },
    { id: 3, image: 'b' },
    { id: 4, image: 'batb' },
    { id: 5, image: 'h' },
    { id: 6, image: 'f' },
    { id: 7, image: 'p' },
    { id: 8, image: 'sb' },
    { id: 9, image: 'swatsd' },
    { id: 10, image: 'thond' },
    { id: 11, image: 'tsits' }
  ]
};

const MediaItemScroller = ({ dataset = 'dumbData' }) => {
  const dataArray = Object.values(mockData[dataset]);

  return (
    <FlatList
      contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
      data={dataArray}
      horizontal
      keyExtractor={({ id }) => id.toString()}
      renderItem={({ item }) => {
        const renderItem = item.image
          ? (
            <Image source={images[item.image]} style={{
              height: '100%',
              resizeMode: 'contain',
              width: '100%'
            }} />
          )
          : (
            <View style={{
              backgroundColor: colors.infoGrey,
              height: '100%',
              width: '100%'
            }} />
          );

        return <View style={{
          borderRadius: 4,
          height: 130,
          marginRight: 8,
          overflow: 'hidden',
          width: 93
        }}>
          {renderItem}
        </View>;
      }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

class ImageSlide extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { height: 0, width: 0 };
  }

  componentDidMount() {
    const { source = null, width: imageWidth = device.width } = this.props;

    if (source) {
      const { height, width } = Image.resolveAssetSource(source);
      const responsiveHeight = Math.round((imageWidth * height) / width);

      this.setState({ height: responsiveHeight, width: imageWidth });
    }
  }

  render() {
    const { source = null } = this.props;
    const { height, width = device.width } = this.state;

    return <Image source={source} style={{ height, width }} />;
  }
}

const categoriesData = [
  { id: 1, image: 'logoDisney' },
  { id: 2, image: 'logoPixar' },
  { id: 3, image: 'logoMarvel' },
  { id: 4, image: 'logoStarWars' },
  { id: 5, image: 'logoNatGeo' }
];

const SvgCategoryBackground = ({ height = 24, width = 24 }) => (
  <Svg height={height} width={width}>
    <Defs>
      <LinearGradient id="a" x1="50%" y1="0%" x2="50%" y2="100%">
        <Stop stopColor={colors.categoryGradStart} offset="0" />
        <Stop stopColor={colors.categoryGradEnd} offset="100%" />
      </LinearGradient>
    </Defs>
    <Rect x="0" y="0" width="100%" height="100%" fill="url(#a)" />
  </Svg>
);

const Categories = () => {
  const { length } = categoriesData;
  const size = Math.ceil((device.width - 16 - length * 18) / length);

  return (
    <View style={{
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 8,
      paddingLeft: 16,
      paddingTop: 24
    }}>
      {categoriesData.map((item) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item.id}
            onPress={() => null}
            style={{
              alignItems: 'center',
              borderColor: colors.categoryBorder,
              borderRadius: 4,
              borderWidth: 1,
              flex: 1,
              justifyContent: 'center',
              marginRight: 16,
              height: size
            }}
          >
            <View style={{
              borderRadius: 2,
              overflow: 'hidden',
              position: 'absolute'
            }}>
              <SvgCategoryBackground height={size - 2} width={size} />
            </View>
            <Image source={images[item.image]} style={{
              height: 36,
              width: 64
            }} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

class SlideShow extends React.Component {
  render() {
    const itemWidth = device.width - 52;

    return (
      <Carousel
        ref={(c) => {
          this.carousel = c;
        }}
        autoplay
        autoplayInterval={5000}
        data={[
          { image: 'slideStarWarsMandalorian' },
          { image: 'slideAvengersEndgame' },
          { image: 'slideAvatar' },
          { image: 'slideCaptainMarvel' }
        ]}
        loop
        renderItem={({ item: { image } }) => (
          <ImageSlide source={images[image]} width={itemWidth} />
        )}
        sliderWidth={device.width}
        itemWidth={itemWidth}
        vertical={false} />
    );
  }
}

const SvgDisneyPlusLogo = () => (
  <Svg height="80" width="120" viewBox="400 200 1120 680">
    <Path
      d="M1174.8 624.7c-14.4 3.3-52.3 5.2-52.3 5.2l-4.8 15s18.9-1.6 32.7-.2c0 0 4.5-.5 5 5.1.2 5.2-.4 10.8-.4 10.8s-.3 3.4-5.1 4.2c-5.2.9-40.8 2.2-40.8 2.2l-5.8 19.5s-2.1 4.5 2.7 3.2c4.5-1.2 41.8-8.2 46.7-7.2 5.2 1.3 11 8.2 9.3 14.6-2 7.8-39.2 31.6-61.9 29.9 0 0-11.9.8-22-15.3-9.4-15.3 3.6-44.4 3.6-44.4s-5.9-13.6-1.6-18.1c0 0 2.6-2.3 10-2.9l9.1-18.9s-10.4.7-16.6-6.9c-5.8-7.3-6.2-10.6-1.8-12.6 4.7-2.3 48-10.2 77.8-9.2 0 0 10.4-1 19.3 17-.1 0 4.3 7.3-3.1 9zm-112.1 72.6c-3.8 9-13.9 18.6-26.4 12.6-12.4-6-32.1-46.3-32.1-46.3s-7.5-15-8.9-14.7c0 0-1.6-2.9-2.6 13.5s.2 48.3-6.3 53.3c-6.2 5-13.7 3-17.6-2.9-3.5-5.8-5-19.6-3.1-43.8 2.3-24.2 7.9-50 15.1-58.1 7.2-8 13-2.2 15.2-.1 0 0 9.6 8.7 25.5 34.3l2.8 4.7s14.4 24.2 15.9 24.1c0 0 1.2 1.1 2.2.3 1.5-.4.9-8.2.9-8.2s-3-26.3-16.1-70.9c0 0-2-5.6-.6-10.8 1.3-5.3 6.6-2.8 6.6-2.8s20.4 10.2 30.2 43.4c9.7 33.5 3.1 63.4-.7 72.4zM962.5 612c-1.7 3.4-2.7 8.3-11.3 9.6 0 0-82.3 5.6-86.2 11.4 0 0-2.9 3.4 1.6 4.4 4.5.9 23.1 3.4 32.1 3.9 9.6.1 42 .4 53.6 14.9 0 0 6.9 6.9 6.6 22.5-.3 16-3.1 21.6-9.3 27.4-6.5 5.4-62.3 30.4-98.3-8 0 0-16.6-18.5 5.7-32.5 0 0 16.1-9.7 57 1.7 0 0 12.4 4.5 11.8 9-.7 4.8-10.2 9.9-24 9.6-13.4-.4-23.2-6.8-21.3-5.8 1.8.7-14.4-7.8-19.4-2-5 5.3-3.8 8.6 1.1 11.9 12.5 7.1 60.8 4.6 75.2-11.4 0 0 5.7-6.5-3-11.8-8.7-5-33.6-8-43.3-8.5-9.3-.5-43.9.1-48.9-9.1 0 0-5-6.2.5-23.8 5.8-18.4 46.1-25.5 63.5-27.1 0 0 47.9-1.7 56.7 8.1-.1 0 1.1 2.3-.4 5.6zm-136 107.9c-5.8 4.3-18.1 2.4-21.6-2.4-3.5-4.3-4.7-21.4-4-48.2.7-27.1 1.3-60.7 7.1-66 6.2-5.4 10-.7 12.4 3 2.6 3.6 5.7 7.6 6.4 16.1.6 8.5 2.6 53.1 2.6 53.1s2.6 40.2-2.9 44.4zM839 576.1c-16.9 5.6-28.5 3.7-38.3-.5-4.3 7.5-6.8 9.8-10.1 10.3-4.8.5-9.1-7.2-9.9-9.7-.8-1.9-3.1-5.1-.3-12.7-9.6-8.6-10.3-20.2-8.7-28 2.4-9 18.6-43.2 67.9-47.2 0 0 24.1-1.8 28.2 11.1h.7s23.4.1 22.9 20.9c-.3 20.9-26 46.9-52.4 55.8zm-46-46.3c-5 8-5.2 12.8-2.9 16.1 5.7-8.7 16.1-22.4 31.4-32.8-11.8 1-21.7 6.1-28.5 16.7zm68.1-13.4c-15.5 2.3-39.5 23.1-50.9 40.1 17.5 3.2 48.4 2 62.1-25.9-.1 0 6.5-17.3-11.2-14.2zm420.8 161.1c-9.3 16.2-35.4 50-70.2 42.1-11.5 27.9-21.1 56-26.6 98.2 0 0-1.2 8.2-8 5.3-6.7-2.4-17.9-13.6-20.1-29.1-2.4-20.4 6.7-54.9 25.2-94.4-5.4-8.8-9.1-21.4-5.9-39.3 0 0 4.7-33.2 38-63.2 0 0 4-3.5 6.3-2.4 2.6 1.1 1.4 11.9-.7 17.1-2.1 5.2-17 31-17 31s-9.3 17.4-6.7 31.1c17.5-26.9 57.3-81.2 82-64.1 8.3 5.9 12.1 18.8 12.1 32.7-.1 12.3-3 25.3-8.4 35zm-7.2-42.6s-1.4-10.7-11.8 1.1c-9 9.9-25.2 28.6-38.3 53.9 13.7-1.5 26.9-9 30.9-12.8 6.5-5.8 21.6-21.4 19.2-42.2zm-485.5 13.6c-1.9 24.2-11.2 64.9-77.1 85-43.5 13.1-84.6 6.8-107 1.1-.5 8.9-1.5 12.7-2.9 14.2-1.9 1.9-16.1 10.1-23.9-1.5-3.5-5.5-5.3-15.5-6.3-24.4-50.4-23.2-73.6-56.6-74.5-58.1-1.1-1.1-12.6-13.1-1.1-27.8 10.8-13.3 46.1-26.6 77.9-32 1.1-27.2 4.3-47.7 8.1-57.1 4.6-10.9 10.4-1.1 15.4 6.3 4.2 5.5 6.7 29.2 6.9 48.1 20.8-1 33.1.5 56.3 4.7 30.2 5.5 50.4 20.9 48.6 38.4-1.3 17.2-17.1 24.3-23.1 24.8-6.3.5-16.1-4-16.1-4-6.7-3.2-.5-6 7.6-9.5 8.8-4.3 6.8-8.7 6.8-8.7-3.3-9.6-42.5-16.3-81.5-16.3-.2 21.5.9 57.2 1.4 78 27.3 5.2 47.7 4.2 47.7 4.2s99.6-2.8 102.6-66.4c3.1-63.7-99.3-124.8-175-144.2-75.6-19.8-118.4-6-122.1-4.1-4 2-.3 2.6-.3 2.6s4.1.6 11.2 3c7.5 2.4 1.7 6.3 1.7 6.3-12.9 4.1-27.4 1.5-30.2-4.4-2.8-5.9 1.9-11.2 7.3-18.8 5.4-8 11.3-7.7 11.3-7.7 93.5-32.4 207.4 26.2 207.4 26.2C773 560.5 791.2 623.9 789.2 648.5zM507 645.2c-10.6 5.2-3.3 12.7-3.3 12.7 19.9 21.4 44.4 34.8 67.7 43.1 2.7-36.9 2.3-49.9 2.6-68.5-36.4 2.5-57.4 8.3-67 12.7zM1479.9 637.6v13.2c0 2.9-2.3 5.2-5.2 5.2h-62.9c0 3.3.1 6.2.1 8.9 0 19.5-.8 35.4-2.7 53.3-.3 2.7-2.5 4.7-5.1 4.7h-13.6c-1.4 0-2.7-.6-3.6-1.6-.9-1-1.4-2.4-1.2-3.8 1.9-17.8 2.8-33.5 2.8-52.6 0-2.8 0-5.7-.1-8.9h-62.2c-2.9 0-5.2-2.3-5.2-5.2v-13.2c0-2.9 2.3-5.2 5.2-5.2h61.3c-1.3-21.5-3.9-42.2-8.1-63.2-.2-1.3.1-2.6.9-3.6s2-1.6 3.3-1.6h14.7c2.3 0 4.2 1.6 4.7 3.9 4.1 21.7 6.7 42.8 8 64.5h63.7c2.8 0 5.2 2.4 5.2 5.2z"
      fill="#ffffff"
    />
  </Svg>
);

const Home = () => (
  <View style={gStyle.container}>
    <View style={gStyle.posAbsolute}>
      <SvgBackground />
    </View>

    <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
      <View style={{
        alignItems: 'center',
        marginBottom: 8,
        paddingTop: device.iPhoneNotch ? 36 : 6
      }}>
        <SvgDisneyPlusLogo />
      </View>
      <SlideShow />
      <Categories />
      <Text style={gStyle.heading}>Originals</Text>
      <MediaItemScroller dataset="originals" />
      <Text style={gStyle.heading}>Recommended For You</Text>
      <MediaItemScroller dataset="recommended" />
      <Text style={gStyle.heading}>Hit Movies</Text>
      <MediaItemScroller dataset="hits" />
      <Text style={gStyle.heading}>Trending</Text>
      <MediaItemScroller dataset="trending" />
      <Text style={gStyle.heading}>Out of the Vault</Text>
      <MediaItemScroller dataset="vault" />
      <Text style={gStyle.heading}>Ultra HD and HDR</Text>
      <MediaItemScroller dataset="hdr" />
      <View style={gStyle.spacer24} />
    </ScrollView>
  </View>
);

export default Home;
