import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.mainText}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>$ {props.amount?.toFixed(2)}</Text>
        <TouchableOpacity onPress={props.onRemoveItem} style={styles.deleteButton}>
          <Ionicons 
            name={Platform.OS === 'android'? 'md-trash' : 'ios-trash'} 
            size={23}
            color='red'
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  deleteButton: {
    marginLeft: 20
  }
});
export default CartItem
