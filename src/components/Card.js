import React from 'react'

/* card for user to see diff types of workouts */
const Card = ({ type }) => {
  return (
    <div className='card'>
      <h4>{type}</h4>
    </div>
  )
}

export default Card;