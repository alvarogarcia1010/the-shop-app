import AsyncStorage from "@react-native-async-storage/async-storage"

// export const SIGNUP = "SIGNUP"
// export const LOGIN = "LOGIN"
export const AUTHENTICATE = "AUTHENTICATE"
export const LOGOUT = "LOGOUT"

let timer;

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime))
    dispatch({ type: AUTHENTICATE, userId, token})
  } 
}

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxLfZXQCmBoBd3FvhnEGLSKwHK8HBWHJQ', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    })

    if(!response.ok)
    {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Ups! Algo salio mal..."

      if(errorId === "EMAIL_EXISTS")
      {
        message = "El correo ya tiene una cuenta asociada"
      }

      throw new Error(message)
    }

    const resData = await response.json();
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)

    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  }
}

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxLfZXQCmBoBd3FvhnEGLSKwHK8HBWHJQ', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({ email, password, returnSecureToken: true })
    })

    if(!response.ok)
    {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = "Ups! Algo salio mal..."

      if(errorId === "EMAIL_NOT_FOUND")
      {
        message = "El correo no se ha encontrado"
      }
      else if(errorId === "INVALID_PASSWORD")
      {
        message = "La contraseña es incorrecta"
      }

      throw new Error(message)
    }

    const resData = await response.json();
    console.log(resData)

    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000))
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
    saveDataToStorage(resData.idToken, resData.localId, expirationDate)
  }
}

export const logout = () => {
  clearLogoutTimer()
  AsyncStorage.removeItem('authData')
  return { type: LOGOUT }
}

const clearLogoutTimer = () => {
  if(timer)
  {
    clearTimeout(timer)
  }
}

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout())
    }, expirationTime)
  }
}

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({token, userId, expiryDate: expirationDate.toISOString()}))
}