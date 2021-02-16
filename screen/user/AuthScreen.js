import React from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import Card from '../../component/UI/Card'
import Input from '../../component/UI/Input'
import Colors from '../../constants/Colors'

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={50} style={styles.screen}>
      <LinearGradient 
        colors={['#ffedff', '#ffe3ff']}
        style={styles.gradient}
      >
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email" 
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email address"
              onValueChange={() => {}}
              initialValue=""
            />
  
            <Input
              id="password" 
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorMessage="Please enter a valid password"
              onValueChange={() => {}}
              initialValue=""
            />

            <View style={styles.buttonContainer}>
              <Button title="Login" color={Colors.primary} onPress={() => {}} />
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Switch lo sign up" color={Colors.accent} onPress={() => {}} />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center"
  },
  buttonContainer: {
    marginTop: 10
  }
})


export default AuthScreen
