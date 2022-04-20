import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class FeedDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.Test}>Feed Details</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Test: {
    size: 24,
    fontFamily: 'Montserrat',
  },
});
