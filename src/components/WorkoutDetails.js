import axios from 'axios';
import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import Modal from './Modal';
import { useAuthContext } from '../hooks/useAuthContext';

/* card to show and delete specific workout */
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const [showModal, setShowModal] = useState(false)
  const closeModal = () => setShowModal(false)
  const openModal = () => setShowModal(true)

  const handleDelete = () => {
    if(!user) {
      return alert('You need to be logged in mate')
    }

    axios.delete(`https://your-workouts.herokuapp.com/api/workouts/${workout._id}`, { headers: {'Authorization' : `Bearer ${user?.token}`}})
      .then(({data}) => {
        console.log('deleted', data);
        dispatch({type: 'DELETE_WORKOUT', payload: data })
      })
      .catch(err => console.log('del err', err))
  }

  return (
    <>
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Sets: </strong>{workout.sets}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined delete"  onClick={handleDelete}>delete</span>
      <span className="material-symbols-outlined edit"  onClick={openModal}>edit</span>
    </div>
    {showModal &&<Modal workout={workout} handleClose={closeModal}/>}
    </>
  )
}

export default WorkoutDetails;