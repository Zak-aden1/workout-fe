import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';

import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { type } = useParams();
  const {workouts, dispatch} = useWorkoutsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    axios.get('/api/workouts', { headers: {'Authorization' : `Bearer ${user?.token}`}})
      .then(({data}) => {
        dispatch({type: 'SET_WORKOUTS', payload: data})
      })
      .catch(err => console.log(err))
  }, [dispatch, user])

  const bodyWorkout = workouts?.filter(({ type: workoutType }) => workoutType === type);
  
  return (
    <div className='home'>
      <div className='workouts'>
        {bodyWorkout?.length > 0 ? bodyWorkout.map((workout) => 
          <WorkoutDetails key={workout._id} workout={workout}/>
        ) : (
          <h4>Start by adding a workout!</h4>
        )}

      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home;