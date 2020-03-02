import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, ScrollView, KeyboardAvoidingView, TextInput, Easing, Alert } from 'react-native';
import Card from '../components/Card'
import LineGradient from '../components/LineGradient'
import Row from '../components/Row'
import Text from '../components/Text'
import GradientButton from '../components/GradentButton'
import RNSecureKeyStore, {ACCESSIBLE} from "react-native-secure-key-store";
import bcrypt from 'react-native-bcrypt'

export default class App extends Component {

    constructor(){
        super()
        this.state = {
            isLogin: true,
            isRegister: false,
            loginPosition: new Animated.Value(Dimensions.get('window').width / 2),
            registerPosition: new Animated.Value(Dimensions.get('window').width / 2),
            loginUsername: '',
            loginPassword: '',
            registerUsername: '',
            registerPassword: '',
            confirmPassword: '',
            user: {}
        }
    }

    componentDidMount(){
      RNSecureKeyStore.get("userData")
        .then((res) => {
          this.setState({user: JSON.parse(res)})
        }, (err) => {
          this.switchToRegister()
      })
    }

    switchToRegister = () => {
      this.setState({isLogin: false, isRegister: true})
      Animated.sequence([
          Animated.timing(this.state.loginPosition, { toValue: -Dimensions.get('window').width / 2, easing: Easing.elastic(1.2),  duration: 250}),
          Animated.timing(this.state.registerPosition, { toValue: -Dimensions.get('window').width / 2, easing: Easing.elastic(1.2),  duration: 250}),
        ]).start()
  }
  switchToLogin = () => {
      this.setState({isLogin: true, isRegister: false})
      Animated.sequence([
          Animated.timing(this.state.registerPosition, { toValue: Dimensions.get('window').width / 2, easing: Easing.elastic(1.2),  duration: 250}),
          Animated.timing(this.state.loginPosition, { toValue: Dimensions.get('window').width / 2, easing: Easing.elastic(1.2),  duration: 250}),
        ]).start()
  }

  login = () => {
    if (this.state.user.username == undefined){ 
      Alert.alert('No account registered locally') 
      this.switchToRegister()
    } else {
      if (this.state.loginUsername !== this.state.user.username){ Alert.alert('No user registed with that username') } else {
        if (!bcrypt.compareSync(this.state.loginPassword, this.state.user.password)){ Alert.alert('Incorrect password') } else {
          this.props.dashboard()
        }
      }
    }
   }

   register = () => {
     if (this.state.registerPassword == '' || this.state.registerUsername == '' || this.state.confirmPassword == ''){ Alert.alert('Please fill out all feilds') } else {
       if (this.state.registerPassword !== this.state.confirmPassword){ Alert.alert('Passwords do not match') } else {
        let userData = {username: this.state.registerUsername, password: bcrypt.hashSync(this.state.registerPassword, 10), biometrics: false, defaultUnit: 'coin', fiatUnit: 'USD'}
        RNSecureKeyStore.set("userData", JSON.stringify(userData), {accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY})
        .then((res) => {
            //this.props.updateUserInfo(userData)
            this.props.dashboard()
        }, (err) => {
            Alert.alert('There was an error saving profile')
        });
       }
     }
   }

  render() {
    return (
        <View style={styles.background}>
          <Animated.Image style={styles.logo} source={require('../assets/cutOffLogo.png')}/>
          <Card top={120} width={210} height={70} style={{marginLeft: -140}}>
          <Row>
                    <TouchableOpacity onPress={this.switchToLogin} style={{width: 100, alignItems: 'center', marginLeft: 100}}>
                      <Text bold>LOGIN</Text>
                      {
                          this.state.isLogin ? (
                            <LineGradient top={2} width={70}/>
                          ) : (
                            <LineGradient clear top={2} width={1}/>
                          )
                      }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.switchToRegister} style={{width: 100, alignItems: 'center', marginRight: 100}}>
                        <Text bold>REGISTER</Text>
                        {
                            this.state.isRegister ? (
                                <LineGradient top={2} width={70}/>
                            ) : (
                                <LineGradient clear top={2} width={100}/>
                            )
                        }
                    </TouchableOpacity>
                </Row>
          </Card>
          <ScrollView style={{width: Dimensions.get('window').width, marginBottom: 10, height: Dimensions.get('window').height - 270, marginTop: 40}} contentContainerStyle={{alignItems: 'center'}}>
            <KeyboardAvoidingView behavior="position">
            <View style={{flexDirection: 'row'}}>
                <Animated.View style={{transform: [{translateX: this.state.loginPosition}], width: Dimensions.get('window').width, alignItems: 'center'}}>
                    <Card justifyCenter width={Dimensions.get('window').width - 100} height={50} top={70} radius={100}>
                        <TextInput placeholder='Username' placeholderTextColor="grey" style={styles.input} onChangeText={(loginUsername) => this.setState({loginUsername})} value={this.state.loginUsername}/>
                    </Card>
                    <Card justifyCenter width={Dimensions.get('window').width - 100} height={50} top={30} radius={100}>
                        <TextInput secureTextEntry placeholder='Password' placeholderTextColor="grey" style={styles.input} onChangeText={(loginPassword) => this.setState({loginPassword})} value={this.state.loginPassword}/>
                    </Card>
                    <GradientButton onPress={this.login} top={70} width={Dimensions.get('window').width - 100} title='LOGIN'/>
                    <Text top={-20} center padding={50} color="grey">If you have an account on another device you will need to register a new account with the same cridentials to restore your account.</Text>
                </Animated.View>
                <Animated.View style={{transform: [{translateX: this.state.registerPosition}], width: Dimensions.get('window').width, alignItems: 'center'}}>
                <Card justifyCenter width={Dimensions.get('window').width - 100} height={50} top={50} radius={100}>
                        <TextInput placeholder='Username' placeholderTextColor="grey" style={styles.input} onChangeText={(registerUsername) => this.setState({registerUsername})} value={this.state.registerUsername}/>
                    </Card>
                    <Card justifyCenter width={Dimensions.get('window').width - 100} height={50} top={30} radius={100}>
                        <TextInput secureTextEntry placeholder='Password' placeholderTextColor="grey" style={styles.input} onChangeText={(registerPassword) => this.setState({registerPassword})} value={this.state.registerPassword}/>
                    </Card>
                    <Card justifyCenter width={Dimensions.get('window').width - 100} height={50} top={30} radius={100}>
                        <TextInput secureTextEntry placeholder='Confirm Password' placeholderTextColor="grey" style={styles.input} onChangeText={(confirmPassword) => this.setState({confirmPassword})} value={this.state.confirmPassword}/>
                    </Card>
                    <GradientButton onPress={this.register} top={70} width={Dimensions.get('window').width - 100} title='REGISTER'/>
                    <Text top={-20} center padding={50} color="grey">Accounts are registed locally. No account details will ever leave this device.</Text>
                </Animated.View>
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
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
    logo: {
        width: 150,
        height: 150,
        position: 'absolute',
        right: 0
    }
});