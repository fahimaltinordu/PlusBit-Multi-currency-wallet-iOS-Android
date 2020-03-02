import React, {Component} from 'react';
import { StyleSheet, Platform, Animated, View } from 'react-native';

export default class Card extends Component {
  render() {
    return (
        <Animated.View style={[Platform.OS == 'ios' ? styles.shadow : null, {
            width: this.props.width ? this.props.width : 100,
            height: this.props.height ? this.props.height : 100,
            borderRadius: this.props.radius ? this.props.radius : 10,
            backgroundColor: this.props.color ? this.props.color : '#363636',
            alignItems: 'center',
            marginTop: this.props.top ? this.props.top : 0,
            marginBottom: this.props.bottom ? this.props.bottom : 0,
            justifyContent: this.props.justifyCenter ? 'center' : 'flex-start',
            flexDirection: this.props.direction,
            padding: this.props.padding ? this.props.padding : 0,
            opacity: this.props.disabled ? 0.5 : 1,
            elevation: this.props.disableElevation ? 0 : 20
        }, this.props.style ? this.props.style : null]}
        onPress={() => this.props.onPress()}>
            {this.props.children}
        </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#181818",
    shadowOffset: {
  	width: 7,
  	height: 7,
  },
  shadowOpacity: 1,
  shadowRadius: 7,

  elevation: 1000,
  
  }
})