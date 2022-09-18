import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from '../styles/componentStyles';

function Header({moves, onPressRestart}) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onPressRestart}>
        <Text style={[styles.headerTextStyles, {marginLeft: 20}]}>Restart</Text>
      </TouchableOpacity>
      <Text style={styles.headerTextStyles}>STEPS: {moves}</Text>
    </View>
  );
}
export default Header;
