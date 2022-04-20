import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';

import TwitterIcon from '../../Assets/Images/Logo/TwitterSplashScreen.svg';

export default class ScreenLoading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.SplashScreen}>
        <StatusBar backgroundColor="#1DA1F2" />
        <View>
          <TwitterIcon />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  SplashScreen: {
    flex: 1,
    backgroundColor: '#1DA1F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
