import {Platform} from 'react-native';
export default {
  colors: {
    primary: '#f25c50',
    white: '#fff',
    classyGrey: '#6f7176',
    transparent: 'rgba(52, 52, 52, 0.03)',
  },
  isAndroid: Platform.OS === 'android',
  isIos: Platform.OS === 'ios',
};
