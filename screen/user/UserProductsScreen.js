import React from 'react'
import { Button, Platform, Alert } from 'react-native'
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

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item", [
      {text: 'No', style: 'default'},
      {text: 'Si', style: 'destructive', onPress: () => {
        dispatch(productsActions.deleteProduct(id))
      }}
    ])
  }

  const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct', {
      productId: id
    })
  }

  return (
    <FlatList 
      data={userProduct}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem 
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => editProductHandler(itemData.item.id)}
        >
          <Button 
            color={Colors.primary} 
            title="Edit" 
            onPress={() => editProductHandler(itemData.item.id)}/>
          <Button 
            color={Colors.primary} 
            title="Delete" 
            onPress={() => deleteHandler(itemData.item.id)}/>
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
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Add"
        iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
        onPress={() => navData.navigation.navigate('EditProduct')}
      />
    </HeaderButtons>
    )
  }
};


export default UserProductsScreen
