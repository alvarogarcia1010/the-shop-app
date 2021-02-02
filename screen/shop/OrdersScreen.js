import React from "react";
import {View, StyleSheet, Text, Platform} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {FlatList} from "react-native-gesture-handler";
import {useSelector} from "react-redux";
import CustomHeaderButton from "../../component/UI/CustomHeaderButton";
import OrderItem from "../../component/shop/OrderItem";

const OrdersScreen = () => {
  const orders = useSelector(state => state.orders.orders);
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

const styles = StyleSheet.create({});

OrdersScreen.navigationOptions = navData => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "andorid" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  }
};


export default OrdersScreen;
