import Product from "../../models/product";

export const SET_PRODUCTS = 'SET_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const fetchProducts = () => {
  return async dispatch => {
    try {
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
          'u1',
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          +resData[key].price,
        ))
      }
  
      console.log(resData)
      dispatch( {type: SET_PRODUCTS, products: loadedProducts})
    } 
    catch (error) {
      throw error
    }

  }
}

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId }
}

export const createProduct = (title, imageUrl, price, description) => {
  return async dispatch => {
    const response = await fetch('https://alerta-covid-sv.firebaseio.com/products.json',{ 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title, imageUrl, price, description})
    })

    const resData = await response.json()

    dispatch({
      type: CREATE_PRODUCT,
      productData: {id: resData.name, title, imageUrl, price, description}
    })
  }
}

export const updateProduct = (id, title, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: {title, imageUrl, description}
  }
}

