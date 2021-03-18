import Product from "../../models/product";
import * as Notifications from 'expo-notifications'
import * as Permisions from 'expo-permisions'
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    try {
      const currentState = getState()
      const response = await fetch('https://alerta-covid-sv.firebaseio.com/products.json')
      
      if(!response.ok) {
        throw new Error("Algo salio mal")
      }
      
      const resData = await response.json()
      const loadedProducts = []
  
      for(const key in resData)
      {
        loadedProducts.push(new Product(
          key,
          resData[key].ownerId,
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          +resData[key].price,
        ))
      }
  
      console.log(resData)
      dispatch( {
        type: SET_PRODUCTS, 
        products: loadedProducts, 
        userProducts: loadedProducts.filter(prod => prod.ownerId == currentState.auth.userId)})
    } 
    catch (error) {
      throw error
    }

  }
}

export const deleteProduct = productId => {
  return async (dispatch, getState) => {

    const response = await fetch(`https://alerta-covid-sv.firebaseio.com/products/${productId}.json?auth=${getState().auth.token}`, { 
      method: 'DELETE'
    })

    if(!response.ok)
    {
      throw new Error("Hubo un error")
    }

    return dispatch({ type: DELETE_PRODUCT, pid: productId })
  }
}

export const createProduct = (title, imageUrl, price, description) => {
  return async (dispatch, getState) => {
    let pushToken;
    let statusObj = await Permisions.getAsync(Permisions.Notifications)
    
    if(statusObj.status != 'granted') {
      statusObj = await Permisions.getAsync(Permisions.Notifications)
    }

    if(statusObj.status != 'granted'){
      pushToken = null;
    }
    else{
      pushToken = (await Notifications.getExpoPushTokenAsync()).data
    }
    
    const currentState = getState()
    const response = await fetch(`https://alerta-covid-sv.firebaseio.com/products.json?auth=${currentState.auth.token}`,{ 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, imageUrl, price, description, ownerId: currentState.auth.userId, ownerPushToken: pushToken})
    })

    const resData = await response.json()

    dispatch({
      type: CREATE_PRODUCT,
      productData: {id: resData.name, title, imageUrl, price, description, ownerId: currentState.auth.userId}
    })
  }
}

export const updateProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const response = await fetch(`https://alerta-covid-sv.firebaseio.com/products/${id}.json?auth=${getState().auth.token}`, { 
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, imageUrl, description})
    })

    if(!response.ok)
    {
      throw new Error("Hubo un error")
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {title, imageUrl, description}
    })
  }
 
}

