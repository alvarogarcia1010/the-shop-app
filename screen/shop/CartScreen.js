import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, ActivityIndicator} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import CartItem from '../../component/shop/CartItem'
import * as cartActions from "../../store/actions/cart";
import * as orderActions from "../../store/actions/orders";
import Card from '../../component/UI/Card'

const CartScreen = props => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const cartTotalAmount = useSelector(state => state.cart.totalAmount)
  const cartItems = useSelector(state => {
      const transformedCartItems = []

      for(let key in state.cart.items)
      {
        transformedCartItems.push({
          productId: key,
          productTitle: state.cart.items[key].productTitle,
          productPrice: state.cart.items[key].productPrice,
          quantity: state.cart.items[key].quantity,
          sum: state.cart.items[key].sum,
        })
      }
      return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
  })

  const sendOrderHandler = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
    } 
    catch (error) 
    {
      setError(error)  
    }

    setIsLoading(false)
  }

  useEffect(() => {
    if(error)
    {
      Alert.alert("An error occurred", error, [{text: "Okay"}])
    }
  }, [error])

  if(isLoading)
  {
    return (
      <View style={styles.centered}>
        <ActivityIndicator 
          size="large"
          color={Colors.primary}
        />
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        <Button 
          color={Colors.accent} 
          title="Order now" 
          disabled={cartItems.length === 0}
          onPress={sendOrderHandler}
        />
      </Card>
      <FlatList 
        data={cartItems}
        keyExtractor= {item => item.productId}
        renderItem={itemData => (
          <CartItem  
            title={itemData.item.productTitle}
            quantity={itemData.item.quantity}
            amount={itemData.item.sum}
            onRemoveItem={() => dispatch(cartActions.removeFromCart(itemData.item.productId))}
            deletable
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  centered: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary
  }
})

export default CartScreen
