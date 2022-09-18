import React from 'react';
import {SafeAreaView} from 'react-native';
import styles from '../styles/componentStyles';

function ScreenContainer(props) {
  return (
    <SafeAreaView style={styles.screenContainer}>{props.children}</SafeAreaView>
  );
}

export default ScreenContainer;
