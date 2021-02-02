import React from 'react'
import { Button, Platform } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../component/UI/CustomHeaderButton";
import ProductItem from '../../component/shop/ProductItem'
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products'

const UserProductsScreen = props => {
  const userProduct = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch()

  return (
    <FlatList 
      data={userProduct}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem 
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {}}
        >
          <Button 
            color={Colors.primary} 
            title="Edit" 
            onPress={() => {}}/>
          <Button 
            color={Colors.primary} 
            title="Delete" 
            onPress={() => dispatch(productsActions.deleteProduct(itemData.item.id))}/>
        </ProductItem>
      )}
    />

  )
}

UserProductsScreen.navigationOptions = navData => {
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


export default UserProductsScreen
