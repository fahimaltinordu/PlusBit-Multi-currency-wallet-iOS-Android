import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Animated,
  Dimensions,
  Easing
} from 'react-native';

import Root from './app/Root'
import Login from './app/Login'
import Dashboard from './app/Dashboard'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class App extends Component {

  constructor(){
    super()
    this.state = {
      root: new Animated.Value(0),
      main: new Animated.Value(0),
      dashboard: new Animated.Value(0),
      hashSplash: false
    }
  }
  componentDidMount(){
    setTimeout(() => {
      Animated.timing(this.state.main, {
        toValue: -height,
        duration: 1000,
        easing: Easing.elastic(1.2)
      }).start();
    }, 1800);
  }

  dashboard = () => {
    Animated.timing(this.state.main, {
      toValue: 0,
      duration: 1000,
    }).start();
    setTimeout(() => {
      Animated.timing(this.state.root, {
        toValue: -width,
        duration: 1000,
        easing: Easing.elastic(1.2)
      }).start();
      Animated.timing(this.state.dashboard, {
        toValue: -width,
        duration: 1000,
        easing: Easing.elastic(1.2)
      }).start();
    }, 1000);
  }

  render() {
    return (
      <View style={{backgroundColor: '#222222'}}>
      <Animated.View style={[styles.container, {transform: [{translateY: this.state.main}]}]}>
        <Animated.View style={{transform: [{translateX: this.state.root}]}}>
          <Root
            hashSplash={this.state.hashSplash}
          />
        </Animated.View>
        <Animated.View style={{transform: [{translateX: this.state.dashboard}]}}>
          <Dashboard
            hashSplash={this.state.hashSplash}
          />
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.container, {transform: [{translateY: this.state.main}]}]}>
        <Animated.View>
          <Login
            dashboard={this.dashboard}
          />
        </Animated.View>
      </Animated.View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#222222',
    height: height
  }
});