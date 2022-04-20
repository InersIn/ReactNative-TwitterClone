import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {View, StyleSheet} from 'react-native';

import {PhotoProfile, HeaderBar} from '../../Components';

import Logo from '../../Assets/Images/Logo/Twitter.svg';
import Feature from '../../Assets/Images/Items/tweetPopuler.svg';

import {Feed, FeedDetails} from '../../Pages';

const HomeNavigator = createStackNavigator();

export default class HomeRouter extends React.Component {
  constructor(props) {
    super(props);

    this.homeRoute = [
      {key: 'Feed', component: Feed},
      {key: 'FeedDetails', component: FeedDetails},
    ];

    this.route = this.homeRoute.map(item => {
      const header = new HeaderBar({
        Logo,
        ComponentRightHeader: Feature,
        ComponentLeftHeader: PhotoProfile.Small,
      });
      return (
        <HomeNavigator.Screen
          options={{
            headerTitle: () => {
              return <View>{header.LogoImage()}</View>;
            },
            headerTitleAlign: 'center',

            headerLeft: () => {
              return header.LeftHeader();
            },
            headerRight: () => {
              return header.RightHeader();
            },

            animationEnabled: false,
            headerStyle: styles.headerContainer,
          }}
          name={item.key}
          key={item.key}
          component={item.component}
        />
      );
    });
  }

  render() {
    return (
      <HomeNavigator.Navigator initialRouteName="Feed">
        {this.route}
      </HomeNavigator.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 66,
  },
  leftHeader: {
    marginLeft: 20,
  },
  rightHeader: {
    marginRight: 20,
  },
});
