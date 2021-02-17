import React, { useReducer, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { View, StyleSheet, KeyboardAvoidingView, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import Card from '../../component/UI/Card'
import Input from '../../component/UI/Input'
import Colors from '../../constants/Colors'
import * as authActions from '../../store/actions/auth'

const FORM_INPUT_UPDATE = 'UPDATE'

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      }

      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      }

      let formIsValid = true

      for(let key in updatedValidities) {
        formIsValid = formIsValid && updatedValidities[key]
      }
      
      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: formIsValid
      };
  
    default:
      return state;
  }
}

const AuthScreen = () => {
  const dispatch = useDispatch()

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  })

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE, 
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])

  const signUpHandler = () => {
    dispatch(authActions.signup(formState.inputValues.email, formState.inputValues.password))
  }

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
              errorText="Please enter a valid email address"
              onValueChange={inputChangeHandler}
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
              errorText="Please enter a valid password"
              onValueChange={inputChangeHandler}
              initialValue=""
            />

            <View style={styles.buttonContainer}>
              <Button title="Login" color={Colors.primary} onPress={signUpHandler} />
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
