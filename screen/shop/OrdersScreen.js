import React, { useEffect, useState }  from "react";
import {View, StyleSheet, Text, Button, Platform, ActivityIndicator} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {FlatList} from "react-native-gesture-handler";
import {useSelector, useDispatch} from "react-redux";
import CustomHeaderButton from "../../component/UI/CustomHeaderButton";
import OrderItem from "../../component/shop/OrderItem";
import * as ordersActions from "../../store/actions/orders"
import Colors from "../../constants/Colors";

const OrdersScreen = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch()

  useEffect(() => {
    setIsLoading(true)
    dispatch(ordersActions.fetchOrders())
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [dispatch])


  if(error)
  {
    return (
      <View style={styles.centered}>
        <Text>Un error ocurrio</Text>
        {/* <Button title="Try again" onPress={loadProducts} /> */}
      </View>
    )
  }

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
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem 
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'}
});

OrdersScreen.navigationOptions = navData => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  }
};


export default OrdersScreen;
