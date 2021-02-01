import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStore, combineReducers } from 'redux';
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import productReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ShopNavigation from './navigation/ShopNavigation';
import * as Font from 'expo-font';
// import { composeWithDevTools } from 'redux-devtools-extension'

enableScreens()

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer
})

// const store = createStore(rootReducer, composeWithDevTools());
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });
};


export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  
  if (!dataLoaded) 
  {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setDataLoaded(true)
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigation/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
