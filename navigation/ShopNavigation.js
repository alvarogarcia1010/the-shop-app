import { createStackNavigator } from 'react-native'
import ProductsOverviewScreen from '/screen/shop/ProductsOverviewScreen'

const ProductsNavigator = createStackNavigator({
  ProductsOverview: ProductsOverviewScreen

}, {
  defaultNavigationOptions: {
    headerStyle: {
      //backgroundColor:
    }
  }
});