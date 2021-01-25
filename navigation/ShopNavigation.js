import { Platform } from 'react-native'
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screen/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screen/shop/ProductDetailScreen'


const ProductsNavigator = createStackNavigator({
  ProductsOverview: {
    screen: ProductsOverviewScreen,
    navigationOptions: {
      headerTitle: 'Todos los productos'
    }
  },
  ProductDetail: ProductDetailScreen
}, {
  defaultNavigationOptions: {
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
});

export default createAppContainer(ProductsNavigator)