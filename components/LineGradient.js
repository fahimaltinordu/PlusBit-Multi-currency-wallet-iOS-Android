import React, {Component} from 'react';
import { Text, View, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class Row extends Component {
    render() {
      return (
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={this.props.clear ? ['rgba(94, 236, 223, 0)', 'rgba(40, 215, 129, 0)'] : ['rgb(94, 236, 255)', '#00cbb3']} style={{height: 2, width: this.props.width, marginTop: this.props.top || 0}}/>
      );
    }
  }
  