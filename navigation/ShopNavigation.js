import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screen/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screen/shop/ProductDetailScreen'
import CartScreen from '../screen/shop/CartScreen'
import OrdersScreen from '../screen/shop/OrdersScreen'
import { Ionicons } from '@expo/vector-icons';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android'? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android'? 'white' : Colors.primary
}

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductsOverviewScreen,
      navigationOptions: {
        headerTitle: 'Todos los productos'
      }
    },
    ProductDetail: ProductDetailScreen,
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        headerTitle: 'Tu carrito'
      }
    }
  }, 
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons 
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"} 
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: {
      screen: OrdersScreen,
      navigationOptions: {
        headerTitle: 'Tus ordenes'
      }
    }
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons 
          name={Platform.OS === "android" ? "md-create" : "ios-create"} 
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
)


const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
)

export default createAppContainer(ShopNavigator)