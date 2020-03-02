import React, { Component } from 'react';
import {
    Text
} from 'react-native';

export default class Font extends Component {
  render () {
    return (
        <Text style={[this.props.style, {
            fontWeight: this.props.bold ? 'bold' : 'normal',
            marginLeft: this.props.left || 0,
            marginRight: this.props.right || 0,
            color: this.props.color || 'white',
            fontSize: this.props.size || 15,
            fontFamily: 'Poppins-Regular',
            textAlign: this.props.center ? 'center' : null,
            padding: this.props.padding || 0,
            marginTop: this.props.top || 0
        }]}>
            {this.props.children}
        </Text>
    )
  }
};