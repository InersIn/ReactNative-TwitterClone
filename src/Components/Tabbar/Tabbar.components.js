import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {HomeRouter} from '../../Routers';

import {
  HomeIcon,
  HomeIconSolid,
  BellIcon,
  BellIconSolid,
  SearchIcon,
  SearchIconSolid,
  MessageIcon,
  MessageIconSolid,
} from '../../Components';

const Tab = createBottomTabNavigator();

export default class TabBar extends React.Component {
  constructor(props) {
    super(props);

    this.tabRoute = [
      {key: 'Home', route: HomeRouter, icon: HomeIcon, active: HomeIconSolid},
      {key: 'Search', route: this.Home, icon: BellIcon, active: BellIconSolid},
      {
        key: 'Notification',
        route: this.Home,
        icon: SearchIcon,
        active: SearchIconSolid,
      },
      {
        key: 'Messages',
        route: this.Home,
        icon: MessageIcon,
        active: MessageIconSolid,
      },
    ];

    this.route = this.tabRoute.map(route => {
      return (
        <Tab.Screen
          options={{
            tabBarIcon: ({focused, color, size}) => {
              return focused ? <route.active /> : <route.icon />;
            },
            tabBarShowLabel: false,
          }}
          name={route.key}
          key={route.key}
          component={route.route}
        />
      );
    });
  }

  Home() {
    return (
      <View>
        <Text>Belum Tersedia</Text>
      </View>
    );
  }

  render() {
    return (
      <Tab.Navigator
        screenOptions={{tabBarStyle: styles.tabContainer, headerShown: false}}>
        {this.route}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  tabContainer: {
    height: 49,
  },
  tabbarIconStyle: {
    color: '#687684',
  },
  tabbarIconStyleActive: {
    color: '#4C9EEB',
  },
});
