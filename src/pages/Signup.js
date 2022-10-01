import React from 'react'
import { useFormik } from "formik";
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const { signup, error, isLoading} = useSignup();
  const errorFields = error?.data?.errorFields || []

  const formik = useFormik({
    initialValues: {
      email:  '',
      password:  '',
      username: ''
    },
    onSubmit: ({email, password, username}) => {
      signup(email, password, username)
    },
  });

  return (
    <form className='signup' onSubmit={formik.handleSubmit}>
      <h3>Sign up</h3>

      <label>Email:</label>
      <input 
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        className={errorFields.includes('email') ? 'error' : ''}
      />

      <label>Username:</label>
      <input 
        name="username"
        type="username"
        onChange={formik.handleChange}
        value={formik.values.username}
        className={errorFields.includes('username') ? 'error' : ''}
      />

      <label>Password:</label>
      <input 
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
        className={errorFields.includes('password') ? 'error' : ''}
      />

      <button disabled={isLoading}>Login</button>
      {error && <div className='error'>{error.data.error}</div>}
      {isLoading&& <div className='error'>loading</div>}
    </form>
  )
}

export default Signup;