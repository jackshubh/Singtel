import {StyleSheet} from 'react-native';
import config from '../utils/config';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: config.colors.classyGrey,
  },
  buttonStyles: {
    backgroundColor: config.colors.transparent,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    width: 80,
    borderWidth: 0.5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    backgroundColor: config.colors.classyGrey,
  },
  headerTextStyles: {
    marginRight: 20,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 20,
  },
  insideCardText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 50,
    textAlignVertical: 'center',
  },
});
