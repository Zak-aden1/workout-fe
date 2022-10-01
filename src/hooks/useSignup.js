import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const { dispatch } = useAuthContext();

   const signup = (email, password, username) => {
    setError(null)
    setIsLoading(true)
    console.log('signup', username);

    axios.post('/api/user/signup', {email, password, username})
      .then(({data}) => {
        dispatch({type: 'LOGIN', payload: data})
        setIsLoading(false)
        localStorage.setItem('user', JSON.stringify(data))
      })
      .catch((error) => {
        setIsLoading(false)
        setError(error.response)
      })
   }

   return {signup, isLoading, error}
}