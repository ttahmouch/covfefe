import { Dimensions, Image, Platform } from 'react-native';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

const { height, width } = Dimensions.get('window');
const preloadFonts = [{}];
const cacheFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));
const cacheImages = (images) => {
  return Object.values(images).map((image) => {
    return typeof image === 'string'
      ? Image.prefetch(image)
      : Asset.fromModule(image).downloadAsync();
  });
};

const func = {
  cacheFonts,
  cacheImages,
  loadAssetsAsync: async () => Promise.all([...(cacheFonts(preloadFonts)), ...(cacheImages(images))])
};

const device = {
  android: Platform.OS === 'android',
  aspectRatio: height / width,
  iOS: Platform.OS === 'ios',
  iPhoneNotch:
    Platform.OS === 'ios' &&
    (height === 812 || height === 844 || height === 896 || height === 926),
  isPad: Platform.isPad,
  web: Platform.OS === 'web',
  height,
  width
};

const colors = {
  black: '#000',
  black20: 'rgba(0, 0, 0, 0.2)',
  black40: 'rgba(0, 0, 0, 0.4)',
  black50: 'rgba(0, 0, 0, 0.5)',
  white: '#fff',
  background: '#0b0d15',
  tabBackground: '#202024',
  heading: '#cacaca',
  categoryBorder: '#384569',
  categoryGradStart: '#0b173d',
  categoryGradEnd: '#204c9a',
  profileBackground: '#50525d',
  profileEditBackground: '#404249',
  storageBlue: '#3070cb',
  inactiveGrey: '#a4a3a2',
  infoGrey: '#a4a4a4',
  searchBarBg: '#323232',
  searchIcon: '#7f7f7f',
  moreAddProfileBg: '#0b0b0b',
  moreUsed: '#4a4a4a',
  moreFree: '#d8d8d8',
  moreSectionText: '#979797',
  moreSectionBorder: '#3e3e3f',
  moreSaveText: '#595959'
};

const fonts = {
  bold: Platform.select({
    android: 'sans-serif-condensed',
    ios: 'HelveticaNeue-Bold',
    web: 'Helvetica Neue'
  }),
  light: Platform.select({
    android: 'sans-serif-light',
    ios: 'HelveticaNeue-Light',
    web: 'Helvetica Neue'
  }),
  medium: Platform.select({
    android: 'sans-serif-medium',
    ios: 'HelveticaNeue-Medium',
    web: 'Helvetica Neue'
  }),
  regular: Platform.select({
    android: 'sans-serif',
    ios: 'HelveticaNeue',
    web: 'Helvetica Neue'
  })
};

const gStyle = {
  container: { backgroundColor: colors.background, flex: 1 },
  flex1: { flex: 1 },
  posAbsolute: { position: 'absolute' },
  navHeaderStyle: { backgroundColor: colors.black, borderBottomWidth: 0, elevation: 0 },
  heading: {
    color: colors.heading,
    fontFamily: fonts.regular,
    fontSize: 16,
    marginBottom: 4,
    marginTop: 16,
    paddingLeft: 16
  },
  spacer24: { height: 24, width: '100%' },
  spacer96: { height: 96, width: '100%' },
  mB8: { marginBottom: 8 },
  mR8: { marginRight: 8 },
  mR16: { marginRight: 16 },
  mV16: { marginVertical: 16 },
  mV24: { marginVertical: 24 },
  mV32: { marginVertical: 32 },
  p4: { padding: 4 },
  p8: { padding: 8 },
  p16: { padding: 16 },
  pH4: { paddingHorizontal: 4 },
  pH8: { paddingHorizontal: 8 },
  pH16: { paddingHorizontal: 16 }
};

const images = {
  logoDisney: require('../assets/images/logo/disney.png'),
  logoMarvel: require('../assets/images/logo/marvel.png'),
  logoNatGeo: require('../assets/images/logo/national-geographic.png'),
  logoPixar: require('../assets/images/logo/pixar.png'),
  logoStarWars: require('../assets/images/logo/star-wars.png'),
  slideAvatar: require('../assets/images/slides/avatar.png'),
  slideAvengersEndgame: require('../assets/images/slides/avengers-endgame.png'),
  slideCaptainMarvel: require('../assets/images/slides/captain-marvel.png'),
  slideStarWarsMandalorian: require('../assets/images/slides/star-wars-mandalorian.png'),
  a: require('../assets/images/movies/a.jpg'),
  ae: require('../assets/images/movies/ae.jpg'),
  aiw: require('../assets/images/movies/aiw.jpg'),
  anhe4: require('../assets/images/movies/anhe4.jpg'),
  aotce2: require('../assets/images/movies/aotce2.jpg'),
  b: require('../assets/images/movies/b.jpg'),
  batb: require('../assets/images/movies/batb.jpg'),
  cacw: require('../assets/images/movies/cacw.jpg'),
  cm: require('../assets/images/movies/cm.jpg'),
  f: require('../assets/images/movies/f.jpg'),
  fz: require('../assets/images/movies/fz.jpg'),
  h: require('../assets/images/movies/h.jpg'),
  i: require('../assets/images/movies/i.jpg'),
  p: require('../assets/images/movies/p.jpg'),
  roasws: require('../assets/images/movies/roasws.jpg'),
  sb: require('../assets/images/movies/sb.jpg'),
  swatsd: require('../assets/images/movies/swatsd.jpg'),
  tesbe5: require('../assets/images/movies/tesbe5.jpg'),
  tfae7: require('../assets/images/movies/tfae7.jpg'),
  thond: require('../assets/images/movies/thond.jpg'),
  tlk: require('../assets/images/movies/tlk.jpg'),
  tlm: require('../assets/images/movies/tlm.jpg'),
  tm: require('../assets/images/movies/tm.jpg'),
  tpme1: require('../assets/images/movies/tpme1.jpg'),
  ts: require('../assets/images/movies/ts.jpg'),
  tsits: require('../assets/images/movies/tsits.jpg'),
  z: require('../assets/images/movies/z.jpg'),
  elsa: require('../assets/images/profiles/elsa.jpg'),
  ironMan: require('../assets/images/profiles/iron-man.jpg'),
  stormtrooper: require('../assets/images/profiles/stormtrooper.jpg'),
  yoda: require('../assets/images/profiles/yoda.jpg')
};

export { colors, device, fonts, func, gStyle, images };
