import React, { useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import * as authAction from '../../store/actions/auth'

const StartupScreen = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData')
      if(!userData)
      {
        props.navigation.navigate('Auth')
        return
      }
      
      const transformedData = JSON.parse(userData)
      const { token, userId, expiryDate } = transformedData

      const expirationDate = new Date(expiryDate)

      if(expirationDate <= new Date() || !token || !userId)
      {
        props.navigation.navigate('Auth')
        return;
      }

      const expirationTime = expirationDate.getTime() - new Date().getTime()

      dispatch(authAction.authenticate(userId, token, expirationTime))
      props.navigation.navigate('Shop')
    }

    tryLogin()
  }, [dispatch])

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default StartupScreen
