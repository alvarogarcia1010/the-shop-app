import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import { View, FlatList, Platform, StyleSheet, Button, ActivityIndicator, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../component/shop/ProductItem";
import CustomHeaderButton from "../../component/UI/CustomHeaderButton";
import Colors from "../../constants/Colors";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState()
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const onSelectProduct = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  }

  const loadProducts = useCallback(async () => {
    console.log("LOAD PRODUCTS")
    setError(null)
    setIsRefreshing(true)
    try {
      await dispatch(productsActions.fetchProducts())
    } catch (error) {
      console.log(error)

      setError(error)
    }
    setIsRefreshing(false)
  }, [dispatch, setIsLoading, setError])

  useEffect(() => {
    setIsLoading(true)
    loadProducts()
      .then(() => {
        setIsLoading(false)
      })
  }, [dispatch, loadProducts])

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts)

    return () => {
      willFocusSub.remove()
    }
  }, [loadProducts])

  if(error)
  {
    return (
      <View style={styles.centered}>
        <Text>Un error ocurrio</Text>
        <Button title="Try again" onPress={loadProducts} />
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

  if(!isLoading && products.length === 0)
  {
    return (
      <View style={styles.centered}>
        <Text>No hay productos</Text>
      </View>
    )
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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

const styles = StyleSheet.create({
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'}
});

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
