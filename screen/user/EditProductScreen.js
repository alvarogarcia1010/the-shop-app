import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { View, StyleSheet, Text, Platform, Alert } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from "../../component/UI/CustomHeaderButton";
import * as productActions from '../../store/actions/products'

const REDUCER_UPDATE = 'UPDATE'

const formReducer = (state, action) => {
  switch (action.type) {
    case REDUCER_UPDATE:
      
      break;
  
    default:
      break;
  }
}

const EditProductScreen = props => {
  const prodId = props.navigation.getParam('productId')
  const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId))
  const dispatch = useDispatch()
  
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct?.title || "",
      imageUrl: editedProduct?.imageUrl || "",
      price: "",
      description: editedProduct?.description || ""
    },
    inputValidities: {
      title: Boolean(editedProduct),
      imageUrl: Boolean(editedProduct),
      description: Boolean(editedProduct),
      price: Boolean(editedProduct)
    },
    formIsValid: Boolean(editedProduct)
  })
  
  const [title, setTitle] = useState(editedProduct?.title || "")
  const [imageUrl, setImageUrl] = useState(editedProduct?.imageUrl || "")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState(editedProduct?.description || "")
  
  const [titleIsValid, setTitleIsValid] = useState(false)
  

  const submitHandler = useCallback(() => {
    if(!titleIsValid)
    {
      Alert.alert('Wrong input!', 'Please check the error in the form', [
        { text: 'Okay'}
      ])
      return;
    }

    if(editedProduct)
    {
      dispatch(productActions.updateProduct(prodId, title, imageUrl, description))
    }
    else
    {
      dispatch(productActions.createProduct(title, imageUrl, price, description))
    }

    props.navigation.goBack()
  }, [dispatch, prodId, title, imageUrl, price, description, titleIsValid])

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler})
  }, [submitHandler])

  const titleChangeHandler = text => {

    if(text.trim().length === 0) {
      setTitleIsValid(false)
    }
    else{
      setTitleIsValid(true)
    }

    setTitle(text)
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput 
            style={styles.input} 
            value={title} 
            onChangeText={titleChangeHandler}
            keyboardType='default'
            autoCapitalize='sentences'
            returnKeyType='next'
            autoCorrect
          />
          {!titleIsValid && <Text>Please enter a valid title!</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} value={imageUrl} onChangeText={setImageUrl} />
        </View>
        {!editedProduct &&
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput 
              style={styles.input} 
              value={price} 
              onChangeText={setPrice}
              keyboardType='decimal-pad'           
            />
          </View>
        }
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input} value={description} onChangeText={setDescription} />
        </View> 
      </View>                 
    </ScrollView>
  )
}


EditProductScreen.navigationOptions = navData => {

  const submitFn = navData.navigation.getParam('submit')
  return {
    headerTitle: navData.navigation.getParam('productId')? 'Edit product' : 'Add product',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Save"
        iconName={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
        onPress={submitFn}
      />
    </HeaderButtons>
    )
  }
};

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  formControl: {
    width: "100%"
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  }
})

export default EditProductScreen
