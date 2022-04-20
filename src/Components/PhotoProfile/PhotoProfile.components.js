import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

const photoProfile = require('../../Assets/Images/Profile/photoProfile.png');

export default class PhotoProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  static Small(url) {
    const Url = typeof url.url === 'undefined' ? photoProfile : {uri: url.url};

    return (
      <View style={styles.general}>
        <Image style={styles.small} source={Url} />
      </View>
    );
  }

  static Medium(url) {
    const Url = typeof url.url === 'undefined' ? photoProfile : {uri: url.url};
    return (
      <View style={styles.general}>
        <Image style={styles.medium} source={Url} />
      </View>
    );
  }

  static Normal(url) {
    const Url = typeof url.url === 'undefined' ? photoProfile : {uri: url.url};
    return (
      <View style={styles.general}>
        <Image style={styles.normal} source={Url} />
      </View>
    );
  }

  render() {
    return null;
  }
}

const styles = StyleSheet.create({
  general: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 100,
  },
  small: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  medium: {
    width: 37,
    height: 37,
    borderRadius: 100,
  },
  normal: {
    width: 55,
    height: 55,
    borderRadius: 100,
  },
});
