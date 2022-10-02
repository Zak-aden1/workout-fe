import { useState } from 'react'
import axios from "axios";
import { useAuthContext } from "./useAuthContext";


export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const login = (email, password) => {
    setIsLoading(true)
    axios.post('https://your-workouts.herokuapp.com/api/user/login', {email, password})
      .then(({data}) => {
        setError(null)
        setIsLoading(false)
        dispatch({type: 'LOGIN', payload: data })
        localStorage.setItem('user',  JSON.stringify(data))
      })
      .catch(error => {
        setError(error.response)
        setIsLoading(false)
      })
  }

  return {login, error, isLoading}
}