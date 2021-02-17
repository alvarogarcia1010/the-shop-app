export const SIGNUP = "SIGNUP"

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
      throw new Error("Algo salio mal")
    }

    const resData = await response.json();
    console.log(resData)

    dispatch({ type: SIGNUP })
  }
}