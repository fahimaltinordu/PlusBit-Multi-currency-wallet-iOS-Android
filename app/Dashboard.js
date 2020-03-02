import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

export default class Dashboard extends Component {
  render () {
    return (
        <View style={styles.background}>
            <Text style={{color: 'white', marginTop: 300}}>test</Text>
        </View>
    )
  }
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#222222',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center'
    },
})