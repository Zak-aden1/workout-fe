import React from 'react'
import { Link } from 'react-router-dom';
import Card from '../components/Card';

const Details = () => {
  const bodyTypes = ['chest', 'legs', 'arms', 'back']
  return (
    <div className='details'>
      <h2>What are you working on today?</h2>

      <div className='card-container'>
        {bodyTypes.map(type => (
          <Link to={`/${type}`} key={type}>
          <Card type={type}/>
        </Link>
        ))}
      </div>
    </div>
  )
}

export default Details;