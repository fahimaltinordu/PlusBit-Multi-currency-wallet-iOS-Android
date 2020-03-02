import React, {Component} from 'react';
import { Text, View, Dimensions } from 'react-native';

export default class Row extends Component {
    render() {
      return (
          <View style={[this.props.style, {
              justifyContent: 'space-around',
              alignItems: 'center',
              flexDirection: 'row',
              flex: 1,
              width: Dimensions.get('window').width,
              marginTop: this.props.top ? this.props.top : 0
          }]}>
              {this.props.children}
          </View>
      );
    }
  }
  