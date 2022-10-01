import React from 'react'
import { useFormik } from "formik";
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const { login, error, isLoading } = useLogin()

  const formik = useFormik({
    initialValues: {
      email:  '',
      password:  '',
    },
    onSubmit: ({email, password}) => {
      login(email, password)
    },
  });

  return (
    <form className='signup' onSubmit={formik.handleSubmit}>
      <h3>Login</h3>

      <label>Email:</label>
      <input 
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />

      <label>Password:</label>
      <input 
        name="password"
        type="password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button disabled={isLoading}>Login</button>
      {error && <div className='error'>{error.data.error}</div>}
      {isLoading&& <div className='error'>loading</div>}
    </form>
  )
}

export default Login;