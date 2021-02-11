import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { View, StyleSheet, Platform, Alert, KeyboardAvoidingView, ActivityIndicator, Text, Button } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from "../../component/UI/CustomHeaderButton";
import Input from '../../component/UI/Input';
import Colors from '../../constants/Colors';
import * as productActions from '../../store/actions/products'

const FORM_INPUT_UPDATE = 'UPDATE'

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE:
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      }

      const updatedValidities = {
        ...state.inputValidities,
        [action.input]: action.isValid
      }

      let formIsValid = true

      for(let key in updatedValidities) {
        formIsValid = formIsValid && updatedValidities[key]
      }
      
      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid: formIsValid
      };
  
    default:
      return state;
  }
}

const EditProductScreen = props => {
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
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

  useEffect(() => {
    if(error)
    {
      Alert.alert("An error occurred", error, [{text: "Okay"}])
    }
  }, [error])
  
  const submitHandler = useCallback(async () => {
    if(!formState.formIsValid)
    {
      Alert.alert('Wrong input!', 'Please check the error in the form', [
        { text: 'Okay'}
      ])
      return;
    }

    setIsLoading(true)
    setError(null)

    try 
    {
      if(editedProduct)
      {
        await dispatch(productActions.updateProduct(
          prodId, 
          formState.inputValues.title, 
          formState.inputValues.imageUrl, 
          formState.inputValues.description))
      }
      else
      {
       await dispatch(productActions.createProduct(
          formState.inputValues.title, 
          formState.inputValues.imageUrl, 
          +formState.inputValues.price, 
          formState.inputValues.description))
      }

      props.navigation.goBack()
    } 
    catch (error) 
    {
      setError(error)
    }

    setIsLoading(false)
    
  }, [dispatch, prodId, formState])

  useEffect(() => {
    props.navigation.setParams({submit: submitHandler})
  }, [submitHandler])

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE, 
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])

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

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          <Input 
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            initialValue={formState.inputValues.title}
            initiallyValid={formState.inputValidities.title}
            onInputChange={inputChangeHandler}
            keyboardType='default'
            autoCapitalize='sentences'
            returnKeyType='next'
            autoCorrect
            required
          />
          <Input 
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            initialValue={formState.inputValues.imageUrl}
            initiallyValid={formState.inputValidities.imageUrl}
            onInputChange={inputChangeHandler}
            returnKeyType='next'
            keyboardType='default'
            required
          />
          {!editedProduct &&
            <Input 
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              onInputChange={inputChangeHandler}
              returnKeyType='next'
              keyboardType='decimal-pad' 
              required
              min={0.1}          
            />
          }
          <Input 
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            initialValue={formState.inputValues.description}
            initiallyValid={formState.inputValidities.description}
            onInputChange={inputChangeHandler}
            keyboardType='default'
            multiline
            numberOfLines={3}
            required
          />
        </View>                 
      </ScrollView>
    </KeyboardAvoidingView>
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
  centered: {flex: 1, justifyContent: 'center', alignItems: 'center'}
})

export default EditProductScreen
