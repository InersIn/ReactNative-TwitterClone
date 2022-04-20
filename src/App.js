/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {TabBar, ScreenLoading} from './Components';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {finish: false};
    this.data = () => {};
  }

  componentDidMount() {
    this.data = () => {
      return (
        <NavigationContainer>
          <TabBar />
        </NavigationContainer>
      );
    };
    const renderer = setInterval(() => {
      this.setState({finish: true});
      clearInterval(renderer);
    }, 500);
  }

  render() {
    if (!this.state.finish) {
      return <ScreenLoading />;
    }
    return this.data();
  }
}
