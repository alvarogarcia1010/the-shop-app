export const SIGNUP = "SIGNUP"
export const LOGIN = "LOGIN"


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
    console.log(resData)

    dispatch({ type: SIGNUP, token: resData.idToken, userId:resData.localId })
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

    dispatch({ type: LOGIN, token: resData.idToken, userId:resData.localId })
  }
}