import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  outerCardContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  innerCardContainer: {
    width: '32%',
    height: '24%',
    borderWidth: 2,
    borderRadius: 10,
    margin: 2,
    overflow: 'hidden',
  },
});
