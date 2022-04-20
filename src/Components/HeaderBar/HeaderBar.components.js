import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.Logo = this.props.Logo;
    this.ComponentRightHeader = this.props.ComponentRightHeader;
    this.ComponentLeftHeader = this.props.ComponentLeftHeader;
  }

  LogoImage() {
    return (
      <View style={styles.LogoImageStyle}>
        <this.Logo />
      </View>
    );
  }

  LogoText() {
    return (
      <View>
        <Text>{this.Logo}</Text>
      </View>
    );
  }

  LeftHeader() {
    return (
      <View style={styles.leftHeader}>
        <this.ComponentLeftHeader />
      </View>
    );
  }

  RightHeader() {
    return (
      <View style={styles.rightHeader}>
        <this.ComponentRightHeader />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  LogoImageStyle: {
    width: 27,
    height: 22,
  },
  leftHeader: {
    marginLeft: 12,
  },
  rightHeader: {
    marginRight: 12,
    width: 22,
    height: 21,
  },
});
