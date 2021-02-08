import React, { useState, useEffect } from "react";
import { FlatList, Platform, StyleSheet, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../component/shop/ProductItem";
import CustomHeaderButton from "../../component/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const onSelectProduct = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  }

  useEffect(() => {
    dispatch(productsActions.fetchProducts())
  }, [dispatch])

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => onSelectProduct(itemData.item.id, itemData.item.title)}
        >
          <Button 
            color={Colors.primary} 
            title="View details" 
            onPress={() => onSelectProduct(itemData.item.id, itemData.item.title)}/>
          <Button 
            color={Colors.primary} 
            title="To card" 
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}/>
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({});

ProductsOverviewScreen.navigationOptions = navData => {
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
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate('Cart')
          }}
        />
      </HeaderButtons>
    )
  }
};

export default ProductsOverviewScreen;
