import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';

export default class App extends Component {

    constructor(){
        super()
        this.state = {
            imageOpacity: new Animated.Value(0)
        }
    }

    componentDidMount(){
        Animated.timing(this.state.imageOpacity, {
            toValue: 1,
            duration: 1800,
          }).start();
    }

  render() {
    return (
        <View style={styles.background}>
            <Animated.Image style={[styles.logo, {
                opacity: this.state.imageOpacity,
                transform: [
                  {
                     scale: this.state.imageOpacity.interpolate({
                       inputRange: [0, 1],
                       outputRange: [0.85, 1]
                     })
                   }
                ]
            }]} source={require('../assets/vertical-2.png')}/>
        </View>
    )
  }
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#222222',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 150,
        height: 150
    }
});