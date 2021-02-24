import React from 'react'
import { useDispatch } from 'react-redux'
import { Button, Platform, SafeAreaView, View } from 'react-native'
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screen/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screen/shop/ProductDetailScreen'
import CartScreen from '../screen/shop/CartScreen'
import OrdersScreen from '../screen/shop/OrdersScreen'
import UserProductsScreen from '../screen/user/UserProductsScreen'
import StartupScreen from '../screen/user/StartupScreen'
import { Ionicons } from '@expo/vector-icons';
import EditProductScreen from '../screen/user/EditProductScreen';
import AuthScreen from '../screen/user/AuthScreen';
import * as authAction from '../store/actions/auth'

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
          name={Platform.OS === "android" ? "md-list" : "ios-list"} 
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
)

const AdminNavigator = createStackNavigator(
  {
    UserProducts: {
      screen: UserProductsScreen,
      navigationOptions: {
        headerTitle: 'Your products'
      }
    },
    EditProduct: {
      screen: EditProductScreen
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
    Orders: OrdersNavigator,
    Admin: AdminNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    },
    contentComponent: props => {
      const dispatch = useDispatch()

      return (
        <View style={{flex: 1, padding: 20}} >
          <SafeAreaView forceInset={{top:'always', horizontal: 'never'}}>
            <DrawerNavigatorItems {...props} />
            <Button title="Logout" color={Colors.primary} onPress={() => {
              dispatch(authAction.logout())
              props.navigation.navigate('Auth')
            }} />
          </SafeAreaView>
        </View>
      )
    }
  }
)

const AuthNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen,
      navigationOptions: {
        headerTitle: 'Inicio de sesion'
      }
    }
  },
  {
    defaultNavigationOptions: defaultNavOptions
  }
)

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator
})

export default createAppContainer(MainNavigator)