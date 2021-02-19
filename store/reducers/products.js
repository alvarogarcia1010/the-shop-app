import PRODUCTS from "../../data/dummy-data"
import Product from "../../models/product";
import { SET_PRODUCTS, CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from "../actions/products";

const initialState = {
  availableProducts: [],
  userProducts: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: 
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.userProducts
      }
    case CREATE_PRODUCT:
      const newProduct  = new Product(
        action.productData.id,
        action.poductData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        parseInt(action.productData.price),
      )

      console.log(newProduct)
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.availableProducts.concat(newProduct),
      }
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid)
      const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.pid)
      
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );

      const updatedAvailableProducts = [ ...state.availableProducts]
      updatedAvailableProducts[availableProductIndex] = updatedProduct
      
      const updatedUserProducts = [ ...state.userProducts]
      updatedUserProducts[productIndex] = updatedProduct

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== action.pid),
        availableProducts: state.availableProducts.filter(product => product.id !== action.pid)
      };
    default:
      return state;
  }
}