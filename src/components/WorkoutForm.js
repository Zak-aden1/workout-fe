import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFormik } from "formik";
import axios from 'axios'

import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext';

/* Form to create new specific workout */
const WorkoutForm = ({ workout, handleClose }) => {
  const { dispatch } = useWorkoutsContext();
  const { type } = useParams();
  const { user } = useAuthContext();


  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = (values) => {
    if(!user) {
      setError("You must be logged in")
      return
    }

    if(workout) {
      axios.patch(`https://your-workouts.herokuapp.com/api/workouts/${workout.id}`, {...values}, { headers: {'Authorization' : `Bearer ${user?.token}`}})
        .then(data => {
          dispatch({type: 'UPDATE_WORKOUT', payload: values})
          setError(null)
          setEmptyFields([])
          handleClose()
        })
        .catch(({response: {data}}) => {
          setError(data.error)
          setEmptyFields(data.emptyFields)
        })
    } else {
      axios.post('https://your-workouts.herokuapp.com/api/workouts', {...values, type}, { headers: {'Authorization' : `Bearer ${user?.token}`}})
      .then(({data}) => {
        setError(null)
        setEmptyFields([])
        dispatch({type: 'CREATE_WORKOUT', payload: data})
      })
      .catch(({response: { data }}) => {
        setError(data.error)
        setEmptyFields(data.emptyFields)
      })
    }
  }

  const formik = useFormik({
    initialValues: {
      title:  '',
      sets:  '',
      reps:  '',
      ...workout
    },
    onSubmit: handleSubmit,
  });

  return (
    <form className='create' onSubmit={formik.handleSubmit}>
      <h3>Add new {type} workout</h3>

      <label>Title for excercise</label>
      <input 
        type="text"
        id="title"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        className={emptyFields.includes('title') ? 'error': ''}
      />

      <label>sets</label>
      <input 
        type="number"
        id="sets"
        name="sets"
        value={formik.values.sets}
        onChange={formik.handleChange}
        className={emptyFields.includes('sets') ? 'error': ''}
      />
      <label>reps</label>
      <input 
        type="number"
        id="reps"
        name="reps"
        value={formik.values.reps}
        onChange={formik.handleChange}
        className={emptyFields.includes('reps') ? 'error': ''}
      />
      <button type="submit">Add workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm;