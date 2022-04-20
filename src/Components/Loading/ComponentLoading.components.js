import React from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';

export default class ComponentLoading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.loadContainer}>
        <ActivityIndicator size="large" color="#1DA1F2" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadContainer: {
    flex: 1,
    marginTop: '78%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
