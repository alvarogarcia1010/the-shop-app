import { Platform } from 'react-native'
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screen/shop/ProductsOverviewScreen'


const ProductsNavigator = createStackNavigator({
  ProductsOverview: {
    screen: ProductsOverviewScreen,
    navigationOptions: {
      headerTitle: 'Todos los productos'
    }
  }

}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android'? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android'? 'white' : Colors.primary
  }
});


export default createAppContainer(ProductsNavigator)